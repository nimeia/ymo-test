import { mockRuntimeQuestionPageMap } from './h5-runtime-adapter.mock';
import { BufferedAnalyticsSink, MemoryStorageDriver, createRuntimeAnalyticsTracker, createRuntimePersistenceAdapter } from './h5-persistence-adapter';
import { mockRuntimeEventFlow, mockRuntimeMachineFinalState, mockRuntimeMachineInitialState } from './h5-runtime-state-machine.mock';
import { runtimeReducer } from './h5-runtime-state-machine';
import { createRemoteSyncAdapter, createAnalyticsUploadRequest, reconcileAnalyticsBuffer } from './h5-remote-sync-adapter';
import type {
  AnalyticsUploadRequest,
  AnalyticsUploadResponse,
  MockRemoteTransportOptions,
  MockRemoteTransportState,
  RemoteSyncTransport,
  SnapshotPullRequest,
  SnapshotPullResponse,
  SnapshotPushRequest,
  SnapshotPushResponse,
} from './h5-remote-sync.schema';

export function createMockRemoteSyncTransport(options: MockRemoteTransportOptions = {}): {
  transport: RemoteSyncTransport;
  state: MockRemoteTransportState;
} {
  const failSnapshotPushOnceForMachineIds = new Set(options.failSnapshotPushOnceForMachineIds ?? []);
  const retryableAnalyticsEventIds = new Set(options.retryableAnalyticsEventIds ?? []);
  const permanentRejectedAnalyticsEventIds = new Set(options.permanentRejectedAnalyticsEventIds ?? []);

  const state: MockRemoteTransportState = {
    snapshots: {},
    analyticsAccepted: [],
    analyticsRejected: [],
    uploadRequests: [],
  };

  const transport: RemoteSyncTransport = {
    async pushSnapshot(request: SnapshotPushRequest): Promise<SnapshotPushResponse> {
      const machineId = request.snapshot.meta.machineId;
      if (failSnapshotPushOnceForMachineIds.has(machineId)) {
        failSnapshotPushOnceForMachineIds.delete(machineId);
        return {
          ok: false,
          status: 'retrying',
          failure: {
            kind: 'network',
            code: 'mock_network_once',
            message: 'Mock network failure for first snapshot push.',
            retryable: true,
          },
        };
      }
      const ref = {
        machineId,
        sessionId: request.snapshot.meta.sessionId,
        revision: `${request.snapshot.meta.savedAtMs}`,
        savedAtMs: request.snapshot.meta.savedAtMs,
      };
      state.snapshots[machineId] = {
        ref,
        snapshot: request.snapshot,
      };
      return {
        ok: true,
        status: 'success',
        ref,
      };
    },
    async pullSnapshot(request: SnapshotPullRequest): Promise<SnapshotPullResponse> {
      const entry = state.snapshots[request.machineId];
      if (!entry) {
        return {
          ok: true,
          found: false,
          status: 'success',
        };
      }
      return {
        ok: true,
        found: true,
        status: 'success',
        ref: entry.ref,
        snapshot: entry.snapshot,
      };
    },
    async uploadAnalytics(request: AnalyticsUploadRequest): Promise<AnalyticsUploadResponse> {
      state.uploadRequests.push(request);
      const batchResponses = request.batches.map((batch) => {
        const outcomes = batch.events.map((event) => {
          if (permanentRejectedAnalyticsEventIds.has(event.eventId)) {
            const outcome = {
              eventId: event.eventId,
              status: 'permanent_rejected' as const,
              code: 'mock_invalid_payload',
              message: 'Mock permanent rejection.',
            };
            state.analyticsRejected.push(outcome);
            return outcome;
          }
          if (retryableAnalyticsEventIds.has(event.eventId)) {
            const outcome = {
              eventId: event.eventId,
              status: 'retryable_rejected' as const,
              code: 'mock_rate_limited',
              message: 'Mock retryable rejection.',
            };
            state.analyticsRejected.push(outcome);
            return outcome;
          }
          state.analyticsAccepted.push(event);
          return {
            eventId: event.eventId,
            status: 'accepted' as const,
          };
        });
        return {
          batchId: batch.batchId,
          acceptedCount: outcomes.filter((item) => item.status === 'accepted').length,
          retryableCount: outcomes.filter((item) => item.status === 'retryable_rejected').length,
          permanentRejectedCount: outcomes.filter((item) => item.status === 'permanent_rejected').length,
          outcomes,
        };
      });
      const retryableEventCount = batchResponses.reduce((sum, item) => sum + item.retryableCount, 0);
      const permanentRejectedEventCount = batchResponses.reduce((sum, item) => sum + item.permanentRejectedCount, 0);
      const acceptedEventCount = batchResponses.reduce((sum, item) => sum + item.acceptedCount, 0);
      return {
        ok: true,
        status: retryableEventCount > 0 ? 'partial_success' : 'success',
        uploadedBatchCount: batchResponses.length,
        acceptedEventCount,
        retryableEventCount,
        permanentRejectedEventCount,
        batchResponses,
        failure: retryableEventCount > 0
          ? {
              kind: 'rate_limit',
              code: 'mock_partial_retry',
              message: 'Some events should retry later.',
              retryable: true,
              retryAfterMs: 2000,
            }
          : undefined,
      };
    },
  };

  return { transport, state };
}

const memoryDriver = new MemoryStorageDriver();
export const mockPersistenceAdapter = createRuntimePersistenceAdapter(memoryDriver, {
  appNamespace: 'ymo.h5.runtime',
});

export const mockRemoteTransport = createMockRemoteSyncTransport({
  failSnapshotPushOnceForMachineIds: ['runtime-machine-demo'],
  retryableAnalyticsEventIds: ['evt-retry-1'],
  permanentRejectedAnalyticsEventIds: ['evt-drop-1'],
});

export const mockRemoteSyncAdapter = createRemoteSyncAdapter(
  mockRemoteTransport.transport,
  mockPersistenceAdapter,
  {
    appNamespace: 'ymo.h5.runtime',
    deviceId: 'ipad-wall-screen',
    userId: 'demo-parent',
    analyticsBatchSize: 2,
    now: () => 1_710_000_000_000,
  },
);

export const mockMachineState = mockRuntimeMachineFinalState;

export const mockSnapshotPushJobPromise = mockRemoteSyncAdapter.pushSnapshot(mockMachineState, {
  source: 'mock',
  note: 'first push retries once',
});

const analyticsSink = new BufferedAnalyticsSink();
const analyticsTracker = createRuntimeAnalyticsTracker(analyticsSink, {
  includeDraftChanged: true,
  includeTimerTicks: false,
  traceId: 'mock-remote-sync-trace',
});

let before = mockRuntimeMachineInitialState;
mockRuntimeEventFlow.forEach((event) => {
  const after = runtimeReducer(before, event);
  analyticsTracker.trackTransition({ event, before, after });
  before = after;
});

const flushedEvents = analyticsSink.flush().map((event, index) => {
  if (index === 0) return { ...event, eventId: 'evt-retry-1' };
  if (index === 1) return { ...event, eventId: 'evt-drop-1' };
  return event;
});

mockPersistenceAdapter.saveAnalyticsBuffer(mockMachineState.machineId, flushedEvents);

export const mockAnalyticsRecordBeforeUpload = mockPersistenceAdapter.loadAnalyticsBuffer(mockMachineState.machineId);
export const mockAnalyticsUploadRequest = mockAnalyticsRecordBeforeUpload
  ? createAnalyticsUploadRequest(mockMachineState.machineId, mockAnalyticsRecordBeforeUpload, mockRemoteSyncAdapter.options)
  : undefined;

export const mockAnalyticsUploadJobPromise = mockRemoteSyncAdapter.uploadAnalyticsBuffer(mockMachineState.machineId);

export async function buildRemoteSyncMockSummary() {
  const snapshotPushJob = await mockSnapshotPushJobPromise;
  const uploadJob = await mockAnalyticsUploadJobPromise;
  const localAfter = mockPersistenceAdapter.loadAnalyticsBuffer(mockMachineState.machineId);
  const pulled = await mockRemoteSyncAdapter.pullAndHydrateMachineState(
    mockMachineState.machineId,
    mockRuntimeQuestionPageMap,
  );
  const reconciliation = mockAnalyticsRecordBeforeUpload && mockAnalyticsUploadRequest
    ? reconcileAnalyticsBuffer(
        mockAnalyticsRecordBeforeUpload,
        await mockRemoteTransport.transport.uploadAnalytics(mockAnalyticsUploadRequest),
      )
    : undefined;

  return {
    snapshotPushJob,
    uploadJob,
    localAfter,
    pulled,
    remoteState: mockRemoteTransport.state,
    reconciliation,
  };
}
