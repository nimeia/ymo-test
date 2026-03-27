import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';
import { hydrateRuntimeMachineState, type RuntimePersistenceAdapter } from './h5-persistence-adapter';
import type { RuntimeMachineState } from './h5-runtime-events.schema';
import type {
  AnalyticsBufferRecord,
  PersistedMachineSnapshot,
  RuntimeAnalyticsEvent,
} from './h5-persistence-analytics.schema';
import {
  REMOTE_SYNC_SCHEMA_VERSION,
  type AnalyticsBufferMutationResult,
  type AnalyticsUploadBatch,
  type AnalyticsUploadJob,
  type AnalyticsUploadSummary,
  type RemoteHydrateResult,
  type RemoteSnapshotRef,
  type RemoteSyncAdapter,
  type RemoteSyncAdapterOptions,
  type ResolvedRemoteSyncAdapterOptions,
  type RemoteSyncFailure,
  type RemoteSyncJobStatus,
  type RemoteSyncRetryPolicy,
  type RemoteSyncTransport,
  type SnapshotPullJob,
  type SnapshotPushJob,
} from './h5-remote-sync.schema';

export const REMOTE_SYNC_ADAPTER_VERSION = REMOTE_SYNC_SCHEMA_VERSION;

const DEFAULT_RETRY_POLICY: RemoteSyncRetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 800,
  maxDelayMs: 10_000,
  backoffFactor: 2,
  jitterRatio: 0.15,
};

const DEFAULT_OPTIONS: ResolvedRemoteSyncAdapterOptions = {
  appNamespace: 'ymo.h5.runtime',
  deviceId: 'device-local',
  userId: 'user-anonymous',
  retryPolicy: DEFAULT_RETRY_POLICY,
  analyticsBatchSize: 20,
  includeSnapshotExtensions: true,
  now: () => Date.now(),
};

export function createRemoteSyncAdapter(
  transport: RemoteSyncTransport,
  persistenceAdapter: RuntimePersistenceAdapter,
  options: RemoteSyncAdapterOptions,
): RemoteSyncAdapter {
  const resolved = resolveOptions(options);

  return {
    version: REMOTE_SYNC_ADAPTER_VERSION,
    options: resolved,
    transport,
    localDriver: persistenceAdapter.driver,
    async pushSnapshot(state, extensions) {
      const now = resolved.now();
      const localSnapshot = persistenceAdapter.saveMachineState(
        state,
        resolved.includeSnapshotExtensions ? extensions : undefined,
      );

      let attempts = 0;
      let failure: RemoteSyncFailure | undefined;
      let ref: RemoteSnapshotRef | undefined;
      let status: RemoteSyncJobStatus = 'running';

      while (attempts < resolved.retryPolicy.maxAttempts) {
        attempts += 1;
        const response = await transport.pushSnapshot({
          schemaVersion: REMOTE_SYNC_SCHEMA_VERSION,
          context: buildTransportContext(resolved, state.machineId, now, attempts),
          snapshot: localSnapshot,
        });
        if (response.ok) {
          ref = response.ref;
          status = response.status;
          failure = undefined;
          break;
        }
        failure = response.failure ?? {
          kind: 'unknown',
          code: 'snapshot_push_failed',
          message: 'Snapshot push failed.',
          retryable: attempts < resolved.retryPolicy.maxAttempts,
        };
        if (!failure.retryable || attempts >= resolved.retryPolicy.maxAttempts) {
          status = response.status === 'partial_success' ? 'partial_success' : 'failed';
          break;
        }
        status = 'retrying';
      }

      return finalizeJob<SnapshotPushJob>({
        type: 'snapshot_push',
        machineId: state.machineId,
        startedAtMs: now,
        attempts,
        status: ref ? 'success' : status,
        failure,
        result: {
          ref,
          localSavedAtMs: localSnapshot.meta.savedAtMs,
        },
        nextRetryAtMs: !ref && failure?.retryable ? now + computeRetryDelayMs(attempts, resolved.retryPolicy, resolved.now) : undefined,
      });
    },
    async pullSnapshot(machineId) {
      const startedAtMs = resolved.now();
      let attempts = 0;
      let lastFailure: RemoteSyncFailure | undefined;
      let found = false;
      let ref: RemoteSnapshotRef | undefined;
      let snapshot: PersistedMachineSnapshot | undefined;
      let status: RemoteSyncJobStatus = 'running';

      while (attempts < resolved.retryPolicy.maxAttempts) {
        attempts += 1;
        const response = await transport.pullSnapshot({
          schemaVersion: REMOTE_SYNC_SCHEMA_VERSION,
          context: buildTransportContext(resolved, machineId, startedAtMs, attempts),
          machineId,
        });
        if (response.ok) {
          found = response.found;
          ref = response.ref;
          snapshot = response.snapshot;
          status = response.status;
          lastFailure = undefined;
          if (snapshot) {
            persistenceAdapter.driver.setItem(
              `${resolved.appNamespace}:snapshot:${machineId}`,
              JSON.stringify(snapshot),
            );
          }
          break;
        }
        lastFailure = response.failure;
        if (!lastFailure?.retryable || attempts >= resolved.retryPolicy.maxAttempts) {
          status = 'failed';
          break;
        }
        status = 'retrying';
      }

      return finalizeJob<SnapshotPullJob>({
        type: 'snapshot_pull',
        machineId,
        startedAtMs,
        attempts,
        status: snapshot || found ? 'success' : status,
        failure: lastFailure,
        result: {
          ref,
          found,
          hydrated: undefined,
        },
        nextRetryAtMs: !snapshot && lastFailure?.retryable ? startedAtMs + computeRetryDelayMs(attempts, resolved.retryPolicy, resolved.now) : undefined,
      });
    },
    async pullAndHydrateMachineState(machineId, questions) {
      const pullJob = await this.pullSnapshot(machineId);
      const snapshotRaw = persistenceAdapter.loadMachineSnapshot(machineId);
      if (!pullJob.result?.found || !snapshotRaw.found) {
        return {
          found: false,
          ref: pullJob.result?.ref,
        } satisfies RemoteHydrateResult;
      }
      const hydrated = hydrateRuntimeMachineState(snapshotRaw.snapshot, questions);
      return {
        found: true,
        snapshot: snapshotRaw.snapshot,
        hydrated,
        ref: pullJob.result?.ref,
      } satisfies RemoteHydrateResult;
    },
    async uploadAnalyticsBuffer(machineId) {
      const startedAtMs = resolved.now();
      const loaded = persistenceAdapter.loadAnalyticsBuffer(machineId);
      const beforeCount = loaded?.events.length ?? 0;
      const emptySummary: AnalyticsUploadSummary = {
        bufferedEventCountBefore: beforeCount,
        uploadedBatchCount: 0,
        acceptedEventCount: 0,
        retryableEventCount: 0,
        permanentRejectedEventCount: 0,
        keptEventCountAfter: beforeCount,
      };

      if (!loaded || loaded.events.length === 0) {
        return finalizeJob<AnalyticsUploadJob>({
          type: 'analytics_upload',
          machineId,
          startedAtMs,
          attempts: 1,
          status: 'success',
          result: emptySummary,
        });
      }

      const request = createAnalyticsUploadRequest(machineId, loaded, resolved);
      let attempts = 0;
      let failure: RemoteSyncFailure | undefined;
      let summary = emptySummary;
      let status: RemoteSyncJobStatus = 'running';

      while (attempts < resolved.retryPolicy.maxAttempts) {
        attempts += 1;
        const response = await transport.uploadAnalytics(request);
        if (response.ok) {
          const mutation = reconcileAnalyticsBuffer(loaded, response);
          if (mutation.kept.length > 0) {
            persistenceAdapter.saveAnalyticsBuffer(machineId, mutation.kept);
          } else {
            persistenceAdapter.clearAnalyticsBuffer(machineId);
          }
          summary = {
            bufferedEventCountBefore: beforeCount,
            uploadedBatchCount: response.uploadedBatchCount,
            acceptedEventCount: response.acceptedEventCount,
            retryableEventCount: response.retryableEventCount,
            permanentRejectedEventCount: response.permanentRejectedEventCount,
            keptEventCountAfter: mutation.kept.length,
          };
          status = response.retryableEventCount > 0 ? 'partial_success' : 'success';
          failure = response.failure;
          break;
        }
        failure = response.failure ?? {
          kind: 'unknown',
          code: 'analytics_upload_failed',
          message: 'Analytics upload failed.',
          retryable: attempts < resolved.retryPolicy.maxAttempts,
        };
        if (!failure.retryable || attempts >= resolved.retryPolicy.maxAttempts) {
          status = 'failed';
          break;
        }
        status = 'retrying';
      }

      return finalizeJob<AnalyticsUploadJob>({
        type: 'analytics_upload',
        machineId,
        startedAtMs,
        attempts,
        status,
        failure,
        result: summary,
        nextRetryAtMs: status !== 'success' && failure?.retryable
          ? startedAtMs + computeRetryDelayMs(attempts, resolved.retryPolicy, resolved.now)
          : undefined,
      });
    },
  };
}

export function createAnalyticsUploadRequest(
  machineId: string,
  record: AnalyticsBufferRecord,
  options: ResolvedRemoteSyncAdapterOptions,
) {
  const batches = chunkAnalyticsEvents(machineId, record.events, options.analyticsBatchSize);
  return {
    schemaVersion: REMOTE_SYNC_SCHEMA_VERSION,
    context: buildTransportContext(options, machineId, options.now(), 1),
    machineId,
    bufferUpdatedAtMs: record.updatedAtMs,
    batches,
  };
}

export function chunkAnalyticsEvents(machineId: string, events: RuntimeAnalyticsEvent[], batchSize: number): AnalyticsUploadBatch[] {
  if (events.length === 0) return [];
  const size = Math.max(1, batchSize);
  const totalSequences = Math.ceil(events.length / size);
  const batches: AnalyticsUploadBatch[] = [];
  for (let index = 0; index < totalSequences; index += 1) {
    const start = index * size;
    const end = start + size;
    batches.push({
      batchId: `${machineId}-batch-${index + 1}-${totalSequences}`,
      machineId,
      sequence: index + 1,
      totalSequences,
      events: events.slice(start, end),
    });
  }
  return batches;
}

export function reconcileAnalyticsBuffer(
  record: AnalyticsBufferRecord,
  response: {
    batchResponses: Array<{
      outcomes: Array<{ eventId: string; status: 'accepted' | 'retryable_rejected' | 'permanent_rejected' }>;
    }>;
  },
): AnalyticsBufferMutationResult {
  const statusMap = new Map<string, 'accepted' | 'retryable_rejected' | 'permanent_rejected'>();
  response.batchResponses.forEach((batch) => {
    batch.outcomes.forEach((outcome) => {
      statusMap.set(outcome.eventId, outcome.status);
    });
  });

  const kept: RuntimeAnalyticsEvent[] = [];
  const removed: RuntimeAnalyticsEvent[] = [];
  record.events.forEach((event) => {
    const status = statusMap.get(event.eventId);
    if (status === 'retryable_rejected' || status === undefined) {
      kept.push(event);
    } else {
      removed.push(event);
    }
  });

  return {
    before: record,
    kept,
    removed,
  };
}

export function computeRetryDelayMs(
  attempt: number,
  policy: RemoteSyncRetryPolicy,
  now: () => number,
): number {
  const cappedAttempt = Math.max(1, attempt);
  const withoutJitter = Math.min(
    policy.baseDelayMs * Math.pow(policy.backoffFactor, cappedAttempt - 1),
    policy.maxDelayMs,
  );
  const phase = ((now() % 997) / 997) * 2 - 1;
  const jitter = withoutJitter * policy.jitterRatio * phase;
  return Math.max(policy.baseDelayMs, Math.round(withoutJitter + jitter));
}

function resolveOptions(options: RemoteSyncAdapterOptions): ResolvedRemoteSyncAdapterOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    retryPolicy: {
      ...DEFAULT_RETRY_POLICY,
      ...(options.retryPolicy ?? {}),
    },
    now: options.now ?? DEFAULT_OPTIONS.now,
  };
}

function buildTransportContext(
  options: ResolvedRemoteSyncAdapterOptions,
  machineId: string,
  sentAtMs: number,
  attempt: number,
) {
  return {
    appNamespace: options.appNamespace,
    deviceId: options.deviceId,
    userId: options.userId,
    traceId: `${machineId}-${sentAtMs}-${attempt}`,
    sentAtMs,
  };
}

type SyncJobType = 'snapshot_push' | 'snapshot_pull' | 'analytics_upload';

interface FinalizeJobInput<TResult> {
  type: SyncJobType;
  machineId: string;
  startedAtMs: number;
  attempts: number;
  status: RemoteSyncJobStatus;
  result?: TResult;
  failure?: RemoteSyncFailure;
  nextRetryAtMs?: number;
}

function finalizeJob<TJob>(
  input: FinalizeJobInput<TJob extends { result?: infer TResult } ? TResult : never>,
): TJob {
  return {
    schemaVersion: REMOTE_SYNC_SCHEMA_VERSION,
    jobId: `${input.type}-${input.machineId}-${input.startedAtMs}`,
    type: input.type,
    machineId: input.machineId,
    status: input.status,
    startedAtMs: input.startedAtMs,
    finishedAtMs: Date.now(),
    attempts: input.attempts,
    nextRetryAtMs: input.nextRetryAtMs,
    result: input.result,
    failure: input.failure,
  } as unknown as TJob;
}
