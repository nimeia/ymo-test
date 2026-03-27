import type { RuntimePersistenceAdapter } from './h5-persistence-adapter';
import type { RuntimeAnalyticsEvent, AnalyticsBufferRecord } from './h5-persistence-analytics.schema';
import type { RemoteSyncAdapter, RemoteSyncFailure, RemoteSyncJobType } from './h5-remote-sync.schema';
import { computeRetryDelayMs } from './h5-remote-sync-adapter';
import type { RuntimeMachineEvent, RuntimeMachineState, RuntimeEventType } from './h5-runtime-events.schema';

export const UPLOAD_SCHEDULER_VERSION = '1.0.0' as const;

export type UploadSchedulerPhase = 'idle' | 'running' | 'paused' | 'stopped';
export type UploadSchedulerTrigger =
  | 'manual'
  | 'threshold'
  | 'interval'
  | 'visibility_hidden'
  | 'network_online'
  | 'session_finalize'
  | 'transition';

export type VisibilityStateLike = 'visible' | 'hidden' | 'unknown';

export interface UploadSchedulerEnvironment {
  now?: () => number;
  setTimeout?: (handler: () => void, ms: number) => ReturnType<typeof setTimeout>;
  clearTimeout?: (handle: ReturnType<typeof setTimeout>) => void;
  isOnline?: () => boolean;
  getVisibilityState?: () => VisibilityStateLike;
  subscribeOnlineChange?: (listener: (online: boolean) => void) => () => void;
  subscribeVisibilityChange?: (listener: (state: VisibilityStateLike) => void) => () => void;
}

export interface UploadSchedulerTaskState {
  inFlight: boolean;
  scheduledAtMs?: number;
  dueAtMs?: number;
  lastAttemptAtMs?: number;
  lastSuccessAtMs?: number;
  lastFailure?: RemoteSyncFailure;
  consecutiveFailures: number;
  pendingReason?: string;
}

export interface RuntimeUploadSchedulerState {
  version: typeof UPLOAD_SCHEDULER_VERSION;
  machineId: string;
  phase: UploadSchedulerPhase;
  online: boolean;
  visibilityState: VisibilityStateLike;
  analyticsPendingCount: number;
  snapshotDirty: boolean;
  analytics: UploadSchedulerTaskState;
  snapshot: UploadSchedulerTaskState;
  lastTickAtMs?: number;
}

export interface RuntimeUploadSchedulerOptions {
  machineId: string;
  flushIntervalMs?: number;
  analyticsThreshold?: number;
  analyticsRetryFloorMs?: number;
  snapshotDebounceMs?: number;
  uploadOnHidden?: boolean;
  uploadOnOnline?: boolean;
  snapshotTriggerEvents?: RuntimeEventType[];
  analyticsFlushEvents?: RuntimeEventType[];
  maxBufferedAnalyticsEvents?: number;
  autoStart?: boolean;
  environment?: UploadSchedulerEnvironment;
}

export interface SchedulerTransitionInput {
  event: RuntimeMachineEvent;
  after: RuntimeMachineState;
  analyticsEvents?: RuntimeAnalyticsEvent[];
}

export interface RuntimeUploadScheduler {
  readonly state: RuntimeUploadSchedulerState;
  start(): void;
  pause(): void;
  resume(): void;
  stop(): void;
  destroy(): void;
  getState(): RuntimeUploadSchedulerState;
  appendAnalyticsEvents(events: RuntimeAnalyticsEvent[]): AnalyticsBufferRecord;
  onRuntimeTransition(input: SchedulerTransitionInput): Promise<void>;
  scheduleAnalyticsUpload(reason: string, delayMs?: number): void;
  scheduleSnapshotPush(state: RuntimeMachineState, reason: string, delayMs?: number): void;
  tick(trigger?: UploadSchedulerTrigger): Promise<void>;
  flushNow(state?: RuntimeMachineState, trigger?: UploadSchedulerTrigger): Promise<void>;
}

const DEFAULT_OPTIONS: Required<Omit<RuntimeUploadSchedulerOptions, 'machineId' | 'environment'>> = {
  flushIntervalMs: 15_000,
  analyticsThreshold: 12,
  analyticsRetryFloorMs: 2_000,
  snapshotDebounceMs: 1_000,
  uploadOnHidden: true,
  uploadOnOnline: true,
  snapshotTriggerEvents: ['SUBMIT_CURRENT_QUESTION', 'FINALIZE_SESSION', 'RESTART_SESSION'],
  analyticsFlushEvents: ['FINALIZE_SESSION'],
  maxBufferedAnalyticsEvents: 400,
  autoStart: true,
};

export function createRuntimeUploadScheduler(
  remoteSync: RemoteSyncAdapter,
  persistence: RuntimePersistenceAdapter,
  options: RuntimeUploadSchedulerOptions,
): RuntimeUploadScheduler {
  const resolved = { ...DEFAULT_OPTIONS, ...options };
  const env = resolveUploadSchedulerEnvironment(options.environment);

  let latestState: RuntimeMachineState | undefined;
  let analyticsTimer: ReturnType<typeof setTimeout> | undefined;
  let snapshotTimer: ReturnType<typeof setTimeout> | undefined;
  let heartbeatTimer: ReturnType<typeof setTimeout> | undefined;
  const unsubscribers: Array<() => void> = [];

  const state: RuntimeUploadSchedulerState = {
    version: UPLOAD_SCHEDULER_VERSION,
    machineId: resolved.machineId,
    phase: 'idle',
    online: env.isOnline(),
    visibilityState: env.getVisibilityState(),
    analyticsPendingCount: persistence.loadAnalyticsBuffer(resolved.machineId)?.events.length ?? 0,
    snapshotDirty: false,
    analytics: createEmptyTaskState(),
    snapshot: createEmptyTaskState(),
  };

  function scheduleHeartbeat(): void {
    if (state.phase !== 'running') return;
    if (heartbeatTimer) env.clearTimeout(heartbeatTimer);
    heartbeatTimer = env.setTimeout(async () => {
      await tick('interval');
      scheduleHeartbeat();
    }, resolved.flushIntervalMs);
  }

  function start(): void {
    if (state.phase === 'running') return;
    state.phase = 'running';
    scheduleHeartbeat();
    if (resolved.uploadOnOnline && env.subscribeOnlineChange) {
      unsubscribers.push(
        env.subscribeOnlineChange((online) => {
          state.online = online;
          if (online) {
            scheduleAnalyticsUpload('network_online', 0);
            if (state.snapshotDirty && latestState) {
              scheduleSnapshotPush(latestState, 'network_online', 0);
            }
          }
        }),
      );
    }
    if (resolved.uploadOnHidden && env.subscribeVisibilityChange) {
      unsubscribers.push(
        env.subscribeVisibilityChange((visibilityState) => {
          state.visibilityState = visibilityState;
          if (visibilityState === 'hidden') {
            void flushNow(undefined, 'visibility_hidden');
          }
        }),
      );
    }
  }

  function pause(): void {
    if (state.phase !== 'running') return;
    state.phase = 'paused';
    clearTimers();
  }

  function resume(): void {
    if (state.phase !== 'paused') return;
    state.phase = 'running';
    scheduleHeartbeat();
  }

  function stop(): void {
    state.phase = 'stopped';
    clearTimers();
  }

  function destroy(): void {
    stop();
    while (unsubscribers.length) {
      const unsubscribe = unsubscribers.pop();
      try {
        unsubscribe?.();
      } catch {
        // ignore destroy-time listener errors
      }
    }
  }

  function getState(): RuntimeUploadSchedulerState {
    return JSON.parse(JSON.stringify(state)) as RuntimeUploadSchedulerState;
  }

  function appendAnalyticsEvents(events: RuntimeAnalyticsEvent[]): AnalyticsBufferRecord {
    const existing = persistence.loadAnalyticsBuffer(resolved.machineId);
    const merged = [...(existing?.events ?? []), ...events];
    const compacted = merged.slice(-resolved.maxBufferedAnalyticsEvents);
    const record = persistence.saveAnalyticsBuffer(resolved.machineId, compacted);
    state.analyticsPendingCount = record.events.length;
    if (state.analyticsPendingCount >= resolved.analyticsThreshold) {
      scheduleAnalyticsUpload('threshold', 0);
    }
    return record;
  }

  async function onRuntimeTransition(input: SchedulerTransitionInput): Promise<void> {
    latestState = input.after;
    if (input.analyticsEvents?.length) {
      appendAnalyticsEvents(input.analyticsEvents);
    }

    if (resolved.snapshotTriggerEvents.includes(input.event.type)) {
      const trigger = input.event.type === 'FINALIZE_SESSION' ? 'session_finalize' : 'transition';
      scheduleSnapshotPush(input.after, input.event.type, trigger === 'session_finalize' ? 0 : resolved.snapshotDebounceMs);
    }
    if (resolved.analyticsFlushEvents.includes(input.event.type)) {
      const trigger = input.event.type === 'FINALIZE_SESSION' ? 'session_finalize' : 'transition';
      scheduleAnalyticsUpload(input.event.type, trigger === 'session_finalize' ? 0 : undefined);
    }
  }

  function scheduleAnalyticsUpload(reason: string, delayMs = 0): void {
    state.analytics.pendingReason = reason;
    scheduleTask('analytics_upload', delayMs, reason);
  }

  function scheduleSnapshotPush(machineState: RuntimeMachineState, reason: string, delayMs = resolved.snapshotDebounceMs): void {
    latestState = machineState;
    state.snapshotDirty = true;
    state.snapshot.pendingReason = reason;
    scheduleTask('snapshot_push', delayMs, reason);
  }

  function scheduleTask(kind: RemoteSyncJobType, delayMs: number, reason: string): void {
    const dueAtMs = env.now() + Math.max(0, delayMs);
    const targetState = kind === 'analytics_upload' ? state.analytics : state.snapshot;
    const timerKey = kind === 'analytics_upload' ? 'analytics' : 'snapshot';

    targetState.scheduledAtMs = env.now();
    if (targetState.dueAtMs !== undefined && targetState.dueAtMs <= dueAtMs) {
      return;
    }
    targetState.dueAtMs = dueAtMs;
    targetState.pendingReason = reason;

    if (timerKey === 'analytics') {
      if (analyticsTimer) env.clearTimeout(analyticsTimer);
      analyticsTimer = env.setTimeout(() => {
        void runAnalyticsUpload(reason);
      }, Math.max(0, dueAtMs - env.now()));
    } else {
      if (snapshotTimer) env.clearTimeout(snapshotTimer);
      snapshotTimer = env.setTimeout(() => {
        void runSnapshotPush(reason);
      }, Math.max(0, dueAtMs - env.now()));
    }
  }

  async function tick(trigger: UploadSchedulerTrigger = 'interval'): Promise<void> {
    state.lastTickAtMs = env.now();
    if (state.phase !== 'running') return;
    if (state.analyticsPendingCount > 0) {
      await runAnalyticsUpload(trigger);
    }
    if (state.snapshotDirty && latestState) {
      await runSnapshotPush(trigger);
    }
  }

  async function flushNow(machineState = latestState, trigger: UploadSchedulerTrigger = 'manual'): Promise<void> {
    if (machineState) {
      latestState = machineState;
    }
    await tick(trigger);
  }

  async function runSnapshotPush(reason: string): Promise<void> {
    if (!latestState || state.snapshot.inFlight || !state.online || state.phase === 'stopped') return;
    state.snapshot.inFlight = true;
    state.snapshot.lastAttemptAtMs = env.now();
    state.snapshot.dueAtMs = undefined;
    try {
      const job = await remoteSync.pushSnapshot(latestState, {
        source: 'scheduler',
        reason,
      });
      if (job.status === 'success') {
        state.snapshot.lastSuccessAtMs = env.now();
        state.snapshot.lastFailure = undefined;
        state.snapshot.consecutiveFailures = 0;
        state.snapshotDirty = false;
      } else {
        handleTaskFailure('snapshot_push', job.failure, state.snapshot.consecutiveFailures + 1, reason);
      }
    } catch (error) {
      handleTaskFailure('snapshot_push', normalizeUnknownFailure(error), state.snapshot.consecutiveFailures + 1, reason);
    } finally {
      state.snapshot.inFlight = false;
    }
  }

  async function runAnalyticsUpload(reason: string): Promise<void> {
    if (state.analytics.inFlight || !state.online || state.phase === 'stopped') return;
    const record = persistence.loadAnalyticsBuffer(resolved.machineId);
    state.analyticsPendingCount = record?.events.length ?? 0;
    if (!record || record.events.length === 0) return;

    state.analytics.inFlight = true;
    state.analytics.lastAttemptAtMs = env.now();
    state.analytics.dueAtMs = undefined;
    try {
      const job = await remoteSync.uploadAnalyticsBuffer(resolved.machineId);
      const afterRecord = persistence.loadAnalyticsBuffer(resolved.machineId);
      state.analyticsPendingCount = afterRecord?.events.length ?? 0;
      if (job.status === 'success' || job.status === 'partial_success') {
        state.analytics.lastSuccessAtMs = env.now();
        state.analytics.lastFailure = job.failure;
        state.analytics.consecutiveFailures = job.failure?.retryable ? state.analytics.consecutiveFailures + 1 : 0;
        if (job.failure?.retryable && state.analyticsPendingCount > 0) {
          const retryDelayMs = Math.max(
            resolved.analyticsRetryFloorMs,
            job.failure.retryAfterMs ?? computeRetryDelayMs(state.analytics.consecutiveFailures, remoteSync.options.retryPolicy, env.now),
          );
          scheduleAnalyticsUpload(reason, retryDelayMs);
        }
      } else {
        handleTaskFailure('analytics_upload', job.failure, state.analytics.consecutiveFailures + 1, reason);
      }
    } catch (error) {
      handleTaskFailure('analytics_upload', normalizeUnknownFailure(error), state.analytics.consecutiveFailures + 1, reason);
    } finally {
      state.analytics.inFlight = false;
    }
  }

  function handleTaskFailure(kind: RemoteSyncJobType, failure: RemoteSyncFailure | undefined, consecutiveFailures: number, reason: string): void {
    const target = kind === 'analytics_upload' ? state.analytics : state.snapshot;
    target.lastFailure = failure;
    target.consecutiveFailures = consecutiveFailures;
    const delayMs = failure?.retryable === false
      ? undefined
      : computeRetryDelayMs(consecutiveFailures, remoteSync.options.retryPolicy, env.now);
    if (delayMs !== undefined) {
      if (kind === 'analytics_upload') {
        scheduleAnalyticsUpload(reason, Math.max(resolved.analyticsRetryFloorMs, delayMs));
      } else if (latestState) {
        scheduleSnapshotPush(latestState, reason, Math.max(resolved.snapshotDebounceMs, delayMs));
      }
    }
  }

  function clearTimers(): void {
    if (analyticsTimer) env.clearTimeout(analyticsTimer);
    if (snapshotTimer) env.clearTimeout(snapshotTimer);
    if (heartbeatTimer) env.clearTimeout(heartbeatTimer);
    analyticsTimer = undefined;
    snapshotTimer = undefined;
    heartbeatTimer = undefined;
  }

  const api: RuntimeUploadScheduler = {
    state,
    start,
    pause,
    resume,
    stop,
    destroy,
    getState,
    appendAnalyticsEvents,
    onRuntimeTransition,
    scheduleAnalyticsUpload,
    scheduleSnapshotPush,
    tick,
    flushNow,
  };

  if (resolved.autoStart) {
    start();
  }

  return api;
}

export function resolveUploadSchedulerEnvironment(env?: UploadSchedulerEnvironment): Required<UploadSchedulerEnvironment> {
  const root = globalThis as typeof globalThis & {
    navigator?: { onLine?: boolean };
    document?: { visibilityState?: string; addEventListener?: (name: string, listener: EventListener) => void; removeEventListener?: (name: string, listener: EventListener) => void };
    addEventListener?: (name: string, listener: EventListener) => void;
    removeEventListener?: (name: string, listener: EventListener) => void;
  };

  return {
    now: env?.now ?? (() => Date.now()),
    setTimeout: env?.setTimeout ?? ((handler, ms) => setTimeout(handler, ms)),
    clearTimeout: env?.clearTimeout ?? ((handle) => clearTimeout(handle)),
    isOnline: env?.isOnline ?? (() => root.navigator?.onLine ?? true),
    getVisibilityState: env?.getVisibilityState ?? (() => {
      const state = root.document?.visibilityState;
      return state === 'hidden' || state === 'visible' ? state : 'unknown';
    }),
    subscribeOnlineChange: env?.subscribeOnlineChange ?? ((listener) => {
      if (!root.addEventListener || !root.removeEventListener) return () => undefined;
      const handler = () => listener(root.navigator?.onLine ?? true);
      root.addEventListener('online', handler as EventListener);
      root.addEventListener('offline', handler as EventListener);
      return () => {
        root.removeEventListener?.('online', handler as EventListener);
        root.removeEventListener?.('offline', handler as EventListener);
      };
    }),
    subscribeVisibilityChange: env?.subscribeVisibilityChange ?? ((listener) => {
      if (!root.document?.addEventListener || !root.document?.removeEventListener) return () => undefined;
      const handler = () => listener(root.document?.visibilityState === 'hidden' ? 'hidden' : 'visible');
      root.document.addEventListener('visibilitychange', handler as EventListener);
      return () => root.document?.removeEventListener?.('visibilitychange', handler as EventListener);
    }),
  };
}

export function createEmptyTaskState(): UploadSchedulerTaskState {
  return {
    inFlight: false,
    consecutiveFailures: 0,
  };
}

export function normalizeUnknownFailure(error: unknown): RemoteSyncFailure {
  const maybe = error as { message?: string };
  return {
    kind: 'unknown',
    code: 'scheduler_unknown_error',
    message: maybe?.message ?? 'Unknown scheduler error.',
    retryable: true,
  };
}
