import { BufferedAnalyticsSink, MemoryStorageDriver, createRuntimeAnalyticsTracker, createRuntimePersistenceAdapter } from './h5-persistence-adapter';
import { createRemoteSyncAdapter } from './h5-remote-sync-adapter';
import { createHttpRemoteSyncTransport } from './h5-http-transport';
import { createRuntimeUploadScheduler } from './h5-upload-scheduler';
import { mockRuntimeQuestionPageMap } from './h5-runtime-adapter.mock';
import { mockRuntimeMachineFinalState, mockRuntimeMachineInitialState, mockRuntimeEventFlow } from './h5-runtime-state-machine.mock';
import { runtimeReducer } from './h5-runtime-state-machine';
import type { AnalyticsUploadRequest, AnalyticsUploadResponse, SnapshotPullRequest, SnapshotPushRequest } from './h5-remote-sync.schema';

export interface MockHttpServerState {
  snapshots: Record<string, SnapshotPushRequest['snapshot']>;
  analyticsAcceptedEventIds: string[];
  requestLog: Array<{ url: string; method: string }>;
}

export function createMockHttpFetch(): {
  fetchImpl: typeof fetch;
  state: MockHttpServerState;
} {
  const state: MockHttpServerState = {
    snapshots: {},
    analyticsAcceptedEventIds: [],
    requestLog: [],
  };

  const fetchImpl: typeof fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.toString();
    const method = init?.method ?? 'POST';
    state.requestLog.push({ url, method });
    const raw = typeof init?.body === 'string' ? init.body : '{}';
    const envelope = JSON.parse(raw) as { payload?: unknown };

    if (url.endsWith('/snapshot/push')) {
      const request = envelope.payload as SnapshotPushRequest;
      state.snapshots[request.snapshot.meta.machineId] = request.snapshot;
      return new Response(
        JSON.stringify({
          ok: true,
          result: {
            ok: true,
            status: 'success',
            ref: {
              machineId: request.snapshot.meta.machineId,
              sessionId: request.snapshot.meta.sessionId,
              revision: `${request.snapshot.meta.savedAtMs}`,
              savedAtMs: request.snapshot.meta.savedAtMs,
            },
          },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    }

    if (url.endsWith('/snapshot/pull')) {
      const request = envelope.payload as SnapshotPullRequest;
      const snapshot = state.snapshots[request.machineId];
      return new Response(
        JSON.stringify({
          ok: true,
          result: snapshot
            ? {
                ok: true,
                found: true,
                status: 'success',
                ref: {
                  machineId: request.machineId,
                  revision: `${snapshot.meta.savedAtMs}`,
                  savedAtMs: snapshot.meta.savedAtMs,
                },
                snapshot,
              }
            : {
                ok: true,
                found: false,
                status: 'success',
              },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    }

    if (url.endsWith('/analytics/upload')) {
      const request = envelope.payload as AnalyticsUploadRequest;
      const batchResponses = request.batches.map((batch) => ({
        batchId: batch.batchId,
        acceptedCount: batch.events.length,
        retryableCount: 0,
        permanentRejectedCount: 0,
        outcomes: batch.events.map((event) => {
          state.analyticsAcceptedEventIds.push(event.eventId);
          return {
            eventId: event.eventId,
            status: 'accepted' as const,
          };
        }),
      }));
      const response: AnalyticsUploadResponse = {
        ok: true,
        status: 'success',
        uploadedBatchCount: batchResponses.length,
        acceptedEventCount: batchResponses.reduce((sum, item) => sum + item.acceptedCount, 0),
        retryableEventCount: 0,
        permanentRejectedEventCount: 0,
        batchResponses,
      };
      return new Response(JSON.stringify({ ok: true, result: response }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: false, failure: { kind: 'unknown', code: 'not_found', message: 'Not found.' } }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  };

  return { fetchImpl, state };
}

const httpMock = createMockHttpFetch();
export const mockHttpRemoteSyncTransport = createHttpRemoteSyncTransport({
  baseUrl: 'https://example.test/api/runtime',
  fetchImpl: httpMock.fetchImpl,
  endpoints: {
    snapshotPush: { path: '/snapshot/push', method: 'POST' },
    snapshotPull: { path: '/snapshot/pull', method: 'POST' },
    analyticsUpload: { path: '/analytics/upload', method: 'POST' },
  },
  authToken: 'demo-token',
});

const memoryDriver = new MemoryStorageDriver();
export const mockHttpPersistenceAdapter = createRuntimePersistenceAdapter(memoryDriver, {
  appNamespace: 'ymo.h5.runtime',
});

export const mockHttpRemoteSyncAdapter = createRemoteSyncAdapter(
  mockHttpRemoteSyncTransport,
  mockHttpPersistenceAdapter,
  {
    appNamespace: 'ymo.h5.runtime',
    deviceId: 'wall-screen-01',
    userId: 'demo-parent',
    analyticsBatchSize: 3,
    now: () => 1_710_000_100_000,
  },
);

const analyticsSink = new BufferedAnalyticsSink();
const analyticsTracker = createRuntimeAnalyticsTracker(analyticsSink, {
  includeDraftChanged: true,
  includeTimerTicks: false,
  traceId: 'mock-http-transport-trace',
});

let before = mockRuntimeMachineInitialState;
mockRuntimeEventFlow.forEach((event) => {
  const after = runtimeReducer(before, event);
  analyticsTracker.trackTransition({ event, before, after });
  before = after;
});

const analyticsEvents = analyticsSink.flush();
mockHttpPersistenceAdapter.saveAnalyticsBuffer(mockRuntimeMachineFinalState.machineId, analyticsEvents);

export const mockRuntimeUploadScheduler = createRuntimeUploadScheduler(
  mockHttpRemoteSyncAdapter,
  mockHttpPersistenceAdapter,
  {
    machineId: mockRuntimeMachineFinalState.machineId,
    autoStart: false,
    flushIntervalMs: 5_000,
    analyticsThreshold: 2,
    environment: {
      now: () => 1_710_000_100_000,
      setTimeout: (handler) => {
        queueMicrotask(handler);
        return 0 as ReturnType<typeof setTimeout>;
      },
      clearTimeout: () => undefined,
      isOnline: () => true,
      getVisibilityState: () => 'visible',
      subscribeOnlineChange: () => () => undefined,
      subscribeVisibilityChange: () => () => undefined,
    },
  },
);

export async function buildHttpTransportMockSummary() {
  mockRuntimeUploadScheduler.start();
  mockRuntimeUploadScheduler.scheduleSnapshotPush(mockRuntimeMachineFinalState, 'manual_demo', 0);
  mockRuntimeUploadScheduler.scheduleAnalyticsUpload('manual_demo', 0);
  await mockRuntimeUploadScheduler.flushNow(mockRuntimeMachineFinalState, 'manual');

  const hydrated = await mockHttpRemoteSyncAdapter.pullAndHydrateMachineState(
    mockRuntimeMachineFinalState.machineId,
    mockRuntimeQuestionPageMap,
  );

  return {
    schedulerState: mockRuntimeUploadScheduler.getState(),
    remoteState: httpMock.state,
    pulledHydratedFound: hydrated.found,
    localAnalyticsAfterUpload: mockHttpPersistenceAdapter.loadAnalyticsBuffer(mockRuntimeMachineFinalState.machineId),
  };
}
