import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';
import type { RuntimeMachineState } from './h5-runtime-events.schema';
import type {
  AnalyticsBufferRecord,
  PersistedMachineSnapshot,
  PersistenceStorageDriver,
  RuntimeAnalyticsEvent,
} from './h5-persistence-analytics.schema';

export const REMOTE_SYNC_SCHEMA_VERSION = '1.0.0' as const;
export type RemoteSyncSchemaVersion = typeof REMOTE_SYNC_SCHEMA_VERSION;

export const REMOTE_SYNC_JOB_TYPES = ['snapshot_push', 'snapshot_pull', 'analytics_upload'] as const;
export type RemoteSyncJobType = (typeof REMOTE_SYNC_JOB_TYPES)[number];

export const REMOTE_SYNC_JOB_STATUSES = ['idle', 'running', 'success', 'partial_success', 'retrying', 'failed'] as const;
export type RemoteSyncJobStatus = (typeof REMOTE_SYNC_JOB_STATUSES)[number];

export const REMOTE_SYNC_FAILURE_KINDS = ['network', 'rate_limit', 'conflict', 'auth', 'validation', 'unknown'] as const;
export type RemoteSyncFailureKind = (typeof REMOTE_SYNC_FAILURE_KINDS)[number];

export const ANALYTICS_UPLOAD_ITEM_STATUSES = ['accepted', 'retryable_rejected', 'permanent_rejected'] as const;
export type AnalyticsUploadItemStatus = (typeof ANALYTICS_UPLOAD_ITEM_STATUSES)[number];

export interface RemoteSyncRetryPolicy {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffFactor: number;
  jitterRatio: number;
}

export interface RemoteSyncNamespaceOptions {
  appNamespace: string;
  deviceId?: string;
  userId?: string;
}

export interface RemoteSyncAdapterOptions extends RemoteSyncNamespaceOptions {
  retryPolicy?: Partial<RemoteSyncRetryPolicy>;
  analyticsBatchSize?: number;
  includeSnapshotExtensions?: boolean;
  now?: () => number;
}

export type ResolvedRemoteSyncAdapterOptions = Omit<Required<RemoteSyncAdapterOptions>, 'retryPolicy'> & {
  retryPolicy: RemoteSyncRetryPolicy;
};

export interface RemoteSyncTransportContext {
  appNamespace: string;
  deviceId?: string;
  userId?: string;
  traceId: string;
  sentAtMs: number;
}

export interface RemoteSnapshotRef {
  machineId: string;
  sessionId?: string;
  revision: string;
  savedAtMs: number;
}

export interface SnapshotPushRequest {
  schemaVersion: RemoteSyncSchemaVersion;
  context: RemoteSyncTransportContext;
  snapshot: PersistedMachineSnapshot;
}

export interface SnapshotPushResponse {
  ok: boolean;
  ref?: RemoteSnapshotRef;
  status: RemoteSyncJobStatus;
  conflict?: {
    remote?: RemoteSnapshotRef;
    reason: string;
  };
  failure?: RemoteSyncFailure;
}

export interface SnapshotPullRequest {
  schemaVersion: RemoteSyncSchemaVersion;
  context: RemoteSyncTransportContext;
  machineId: string;
}

export interface SnapshotPullResponse {
  ok: boolean;
  found: boolean;
  ref?: RemoteSnapshotRef;
  snapshot?: PersistedMachineSnapshot;
  status: RemoteSyncJobStatus;
  failure?: RemoteSyncFailure;
}

export interface AnalyticsUploadBatch {
  batchId: string;
  machineId: string;
  sequence: number;
  totalSequences: number;
  events: RuntimeAnalyticsEvent[];
}

export interface AnalyticsUploadRequest {
  schemaVersion: RemoteSyncSchemaVersion;
  context: RemoteSyncTransportContext;
  machineId: string;
  bufferUpdatedAtMs: number;
  batches: AnalyticsUploadBatch[];
}

export interface AnalyticsUploadItemOutcome {
  eventId: string;
  status: AnalyticsUploadItemStatus;
  code?: string;
  message?: string;
}

export interface AnalyticsUploadBatchResponse {
  batchId: string;
  acceptedCount: number;
  retryableCount: number;
  permanentRejectedCount: number;
  outcomes: AnalyticsUploadItemOutcome[];
}

export interface AnalyticsUploadResponse {
  ok: boolean;
  status: RemoteSyncJobStatus;
  uploadedBatchCount: number;
  acceptedEventCount: number;
  retryableEventCount: number;
  permanentRejectedEventCount: number;
  batchResponses: AnalyticsUploadBatchResponse[];
  failure?: RemoteSyncFailure;
}

export interface RemoteSyncFailure {
  kind: RemoteSyncFailureKind;
  code: string;
  message: string;
  retryAfterMs?: number;
  retryable?: boolean;
}

export interface RemoteSyncTransport {
  pushSnapshot(request: SnapshotPushRequest): Promise<SnapshotPushResponse>;
  pullSnapshot(request: SnapshotPullRequest): Promise<SnapshotPullResponse>;
  uploadAnalytics(request: AnalyticsUploadRequest): Promise<AnalyticsUploadResponse>;
}

export interface RemoteSyncJobBase<TType extends RemoteSyncJobType, TResult = unknown> {
  schemaVersion: RemoteSyncSchemaVersion;
  jobId: string;
  type: TType;
  machineId: string;
  status: RemoteSyncJobStatus;
  startedAtMs: number;
  finishedAtMs?: number;
  attempts: number;
  nextRetryAtMs?: number;
  result?: TResult;
  failure?: RemoteSyncFailure;
}

export interface SnapshotPushJobResult {
  ref?: RemoteSnapshotRef;
  localSavedAtMs: number;
}

export interface SnapshotPullJobResult {
  ref?: RemoteSnapshotRef;
  found: boolean;
  hydrated?: RuntimeMachineState;
}

export interface AnalyticsUploadSummary {
  bufferedEventCountBefore: number;
  uploadedBatchCount: number;
  acceptedEventCount: number;
  retryableEventCount: number;
  permanentRejectedEventCount: number;
  keptEventCountAfter: number;
}

export type SnapshotPushJob = RemoteSyncJobBase<'snapshot_push', SnapshotPushJobResult>;
export type SnapshotPullJob = RemoteSyncJobBase<'snapshot_pull', SnapshotPullJobResult>;
export type AnalyticsUploadJob = RemoteSyncJobBase<'analytics_upload', AnalyticsUploadSummary>;

export type RemoteSyncJob = SnapshotPushJob | SnapshotPullJob | AnalyticsUploadJob;

export interface RemoteHydrateResult {
  found: boolean;
  snapshot?: PersistedMachineSnapshot;
  hydrated?: RuntimeMachineState;
  ref?: RemoteSnapshotRef;
}

export interface RemoteSyncAdapter {
  readonly version: RemoteSyncSchemaVersion;
  readonly options: ResolvedRemoteSyncAdapterOptions;
  readonly transport: RemoteSyncTransport;
  readonly localDriver?: PersistenceStorageDriver;
  pushSnapshot(state: RuntimeMachineState, extensions?: Record<string, unknown>): Promise<SnapshotPushJob>;
  pullSnapshot(machineId: string): Promise<SnapshotPullJob>;
  pullAndHydrateMachineState(machineId: string, questions: Record<string, RuntimeQuestionPageViewModel>): Promise<RemoteHydrateResult>;
  uploadAnalyticsBuffer(machineId: string): Promise<AnalyticsUploadJob>;
}

export interface RemoteSnapshotStoreEntry {
  ref: RemoteSnapshotRef;
  snapshot: PersistedMachineSnapshot;
}

export interface MockRemoteTransportState {
  snapshots: Record<string, RemoteSnapshotStoreEntry>;
  analyticsAccepted: RuntimeAnalyticsEvent[];
  analyticsRejected: AnalyticsUploadItemOutcome[];
  uploadRequests: AnalyticsUploadRequest[];
}

export interface MockRemoteTransportOptions extends Partial<RemoteSyncNamespaceOptions> {
  failSnapshotPushOnceForMachineIds?: string[];
  retryableAnalyticsEventIds?: string[];
  permanentRejectedAnalyticsEventIds?: string[];
}

export interface RemoteSyncSerializationEnvelope<T> {
  schemaVersion: RemoteSyncSchemaVersion;
  kind: 'snapshot' | 'analytics';
  payload: T;
}

export interface AnalyticsBufferMutationResult {
  before: AnalyticsBufferRecord | undefined;
  kept: RuntimeAnalyticsEvent[];
  removed: RuntimeAnalyticsEvent[];
}
