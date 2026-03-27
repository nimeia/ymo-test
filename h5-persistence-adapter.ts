import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';
import type { RuntimeMachineEvent, RuntimeMachineState, RuntimeViewPhase } from './h5-runtime-events.schema';
import {
  ANALYTICS_SCHEMA_VERSION,
  PERSISTENCE_SCHEMA_VERSION,
  type AnalyticsBufferRecord,
  type HydratedMachineSnapshotResult,
  type PersistedMachineSnapshot,
  type PersistenceAdapterOptions,
  type PersistenceStorageDriver,
  type RuntimeAnalyticsContext,
  type RuntimeAnalyticsEvent,
  type RuntimeAnalyticsEventName,
  type RuntimeAnalyticsSink,
  type RuntimeAnalyticsTrackerOptions,
  type RuntimeTransitionAnalyticsInput,
  type SnapshotManifestEntry,
} from './h5-persistence-analytics.schema';

export const PERSISTENCE_ADAPTER_VERSION = '1.0.0' as const;

const DEFAULT_OPTIONS: Required<PersistenceAdapterOptions> = {
  appNamespace: 'ymo.h5.runtime',
  snapshotVersion: '1',
  maxSnapshotCount: 20,
  eventLogTailLimit: 40,
};

export class MemoryStorageDriver implements PersistenceStorageDriver {
  readonly kind = 'memory' as const;
  private readonly data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  keys(): string[] {
    return Array.from(this.data.keys());
  }
}

export function createLocalStorageDriver(storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'key' | 'length'>): PersistenceStorageDriver {
  const target = storage ?? globalThis.localStorage;
  return {
    kind: 'local_storage',
    getItem(key) {
      return target?.getItem(key) ?? null;
    },
    setItem(key, value) {
      target?.setItem(key, value);
    },
    removeItem(key) {
      target?.removeItem(key);
    },
    keys() {
      if (!target) return [];
      const results: string[] = [];
      for (let i = 0; i < target.length; i += 1) {
        const key = target.key(i);
        if (key) results.push(key);
      }
      return results;
    },
  };
}

export interface RuntimePersistenceAdapter {
  readonly version: typeof PERSISTENCE_ADAPTER_VERSION;
  readonly driver: PersistenceStorageDriver;
  readonly options: Required<PersistenceAdapterOptions>;
  saveMachineState(state: RuntimeMachineState, extensions?: Record<string, unknown>): PersistedMachineSnapshot;
  loadMachineSnapshot(machineId: string): HydratedMachineSnapshotResult;
  hydrateMachineState(machineId: string, questions: Record<string, RuntimeQuestionPageViewModel>): RuntimeMachineState | undefined;
  listSnapshots(): SnapshotManifestEntry[];
  deleteMachineSnapshot(machineId: string): boolean;
  clearSnapshots(): number;
  saveAnalyticsBuffer(machineId: string, events: RuntimeAnalyticsEvent[]): AnalyticsBufferRecord;
  loadAnalyticsBuffer(machineId: string): AnalyticsBufferRecord | undefined;
  clearAnalyticsBuffer(machineId: string): boolean;
}

export function createRuntimePersistenceAdapter(
  driver: PersistenceStorageDriver,
  adapterOptions: PersistenceAdapterOptions,
): RuntimePersistenceAdapter {
  const options = { ...DEFAULT_OPTIONS, ...adapterOptions };

  return {
    version: PERSISTENCE_ADAPTER_VERSION,
    driver,
    options,
    saveMachineState(state, extensions) {
      const snapshot = createPersistedMachineSnapshot(state, options, extensions);
      driver.setItem(getSnapshotKey(options.appNamespace, state.machineId), JSON.stringify(snapshot));
      pruneSnapshots(driver, options);
      return snapshot;
    },
    loadMachineSnapshot(machineId) {
      const raw = driver.getItem(getSnapshotKey(options.appNamespace, machineId));
      if (!raw) {
        return { snapshot: undefined as unknown as PersistedMachineSnapshot, found: false };
      }
      return { snapshot: JSON.parse(raw) as PersistedMachineSnapshot, found: true };
    },
    hydrateMachineState(machineId, questions) {
      const loaded = this.loadMachineSnapshot(machineId);
      if (!loaded.found) return undefined;
      return hydrateRuntimeMachineState(loaded.snapshot, questions);
    },
    listSnapshots() {
      return listSnapshots(driver, options.appNamespace);
    },
    deleteMachineSnapshot(machineId) {
      const key = getSnapshotKey(options.appNamespace, machineId);
      const exists = driver.getItem(key) !== null;
      if (exists) driver.removeItem(key);
      return exists;
    },
    clearSnapshots() {
      const snapshots = this.listSnapshots();
      snapshots.forEach((item) => driver.removeItem(item.key));
      return snapshots.length;
    },
    saveAnalyticsBuffer(machineId, events) {
      const record: AnalyticsBufferRecord = {
        schemaVersion: PERSISTENCE_SCHEMA_VERSION,
        appNamespace: options.appNamespace,
        entityType: 'analytics_buffer',
        machineId,
        updatedAtMs: Date.now(),
        events,
      };
      driver.setItem(getAnalyticsBufferKey(options.appNamespace, machineId), JSON.stringify(record));
      return record;
    },
    loadAnalyticsBuffer(machineId) {
      const raw = driver.getItem(getAnalyticsBufferKey(options.appNamespace, machineId));
      return raw ? (JSON.parse(raw) as AnalyticsBufferRecord) : undefined;
    },
    clearAnalyticsBuffer(machineId) {
      const key = getAnalyticsBufferKey(options.appNamespace, machineId);
      const exists = driver.getItem(key) !== null;
      if (exists) driver.removeItem(key);
      return exists;
    },
  };
}

export function createPersistedMachineSnapshot(
  state: RuntimeMachineState,
  adapterOptions: PersistenceAdapterOptions,
  extensions?: Record<string, unknown>,
): PersistedMachineSnapshot {
  const options = { ...DEFAULT_OPTIONS, ...adapterOptions };
  return {
    meta: {
      schemaVersion: PERSISTENCE_SCHEMA_VERSION,
      appNamespace: options.appNamespace,
      snapshotVersion: options.snapshotVersion,
      entityType: 'session_snapshot',
      machineId: state.machineId,
      sessionId: state.session.sessionId,
      mode: state.mode,
      savedAtMs: Date.now(),
      questionCount: state.navigation.total,
      currentQuestionId: state.currentQuestionId,
      currentIndex: state.navigation.currentIndex,
      phase: state.phase,
      status: state.session.status,
      totalScore: state.session.totals.totalScore,
      totalStars: state.session.totals.totalStars,
      correctCount: state.session.totals.correctCount,
    },
    navigationQuestionIds: state.navigation.questionIds,
    session: state.session,
    draftByQuestionId: state.draftByQuestionId,
    lastSubmission: state.lastSubmission,
    lastJudgeResult: state.lastJudgeResult,
    reviewVisible: state.reviewVisible,
    feedbackBanner: state.feedbackBanner,
    error: state.error,
    eventLogTail: state.eventLog.slice(-options.eventLogTailLimit),
    extensions,
  };
}

export function hydrateRuntimeMachineState(
  snapshot: PersistedMachineSnapshot,
  questions: Record<string, RuntimeQuestionPageViewModel>,
): RuntimeMachineState {
  const questionIds = snapshot.navigationQuestionIds.filter((id) => !!questions[id]);
  const currentQuestionId = snapshot.meta.currentQuestionId ?? snapshot.session.currentQuestionId ?? questionIds[0];
  const currentQuestion = currentQuestionId ? questions[currentQuestionId] : undefined;
  const currentQuestionState = currentQuestionId ? snapshot.session.questionStates[currentQuestionId] : undefined;
  const currentIndex = currentQuestionId ? Math.max(0, questionIds.indexOf(currentQuestionId)) + 1 : 0;

  return {
    schemaVersion: '1.0.0',
    machineId: snapshot.meta.machineId,
    mode: snapshot.meta.mode,
    phase: snapshot.meta.phase,
    session: snapshot.session,
    questions,
    navigation: {
      currentIndex,
      total: questionIds.length,
      questionIds,
    },
    currentQuestionId,
    currentQuestion,
    currentQuestionState,
    draftByQuestionId: snapshot.draftByQuestionId,
    lastSubmission: snapshot.lastSubmission,
    lastJudgeResult: snapshot.lastJudgeResult,
    reviewVisible: snapshot.reviewVisible,
    feedbackBanner: snapshot.feedbackBanner,
    ui: {
      submitting: false,
      submitDisabled: isDraftEmpty(snapshot.draftByQuestionId[currentQuestionId ?? '']?.answer),
      canGoPrev: currentIndex > 1,
      canGoNext: currentIndex < questionIds.length,
      timerWarning: !!currentQuestionState?.timer.remainingMs && (currentQuestionState.timer.remainingMs as number) <= 5000,
      lastEventType: 'HYDRATE_SESSION',
    },
    eventLog: snapshot.eventLogTail,
    error: snapshot.error,
  };
}

export class BufferedAnalyticsSink implements RuntimeAnalyticsSink {
  private readonly events: RuntimeAnalyticsEvent[] = [];

  push(event: RuntimeAnalyticsEvent): void {
    this.events.push(event);
  }

  flush(): RuntimeAnalyticsEvent[] {
    const copied = [...this.events];
    this.events.length = 0;
    return copied;
  }

  peek(): RuntimeAnalyticsEvent[] {
    return [...this.events];
  }

  clear(): void {
    this.events.length = 0;
  }
}

export interface RuntimeAnalyticsTracker {
  trackTransition(input: RuntimeTransitionAnalyticsInput): RuntimeAnalyticsEvent[];
  trackPersistence(name: Extract<RuntimeAnalyticsEventName, 'persistence_saved' | 'persistence_loaded' | 'persistence_deleted' | 'analytics_buffer_flushed'>, state: RuntimeMachineState, payload?: Record<string, unknown>): RuntimeAnalyticsEvent;
}

export function createRuntimeAnalyticsTracker(
  sink: RuntimeAnalyticsSink,
  trackerOptions: RuntimeAnalyticsTrackerOptions = {},
): RuntimeAnalyticsTracker {
  const options: Required<RuntimeAnalyticsTrackerOptions> = {
    includeTimerTicks: false,
    includeDraftChanged: true,
    traceId: trackerOptions.traceId ?? `trace-${Date.now()}`,
  };

  return {
    trackTransition(input) {
      const events = mapRuntimeTransitionToAnalytics(input, options);
      events.forEach((event) => sink.push(event));
      return events;
    },
    trackPersistence(name, state, payload = {}) {
      const event = buildAnalyticsEvent(
        name,
        state,
        payload,
        state.currentQuestion,
        options.traceId,
        Date.now(),
      );
      sink.push(event);
      return event;
    },
  };
}

export function mapRuntimeTransitionToAnalytics(
  input: RuntimeTransitionAnalyticsInput,
  options: Required<RuntimeAnalyticsTrackerOptions> = {
    includeTimerTicks: false,
    includeDraftChanged: true,
    traceId: `trace-${Date.now()}`,
  },
): RuntimeAnalyticsEvent[] {
  const { event, before, after } = input;
  const now = event.atMs;
  const basePayload = {
    eventType: event.type,
    phaseBefore: before.phase,
    phaseAfter: after.phase,
    currentIndex: after.navigation.currentIndex,
    total: after.navigation.total,
  };

  switch (event.type) {
    case 'BOOTSTRAP_SESSION':
      return [buildAnalyticsEvent('session_bootstrapped', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'HYDRATE_SESSION':
      return [buildAnalyticsEvent('session_hydrated', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'START_SESSION':
      return [
        buildAnalyticsEvent('session_started', after, basePayload, after.currentQuestion, options.traceId, now),
        buildAnalyticsEvent('question_started', after, { questionId: after.currentQuestionId }, after.currentQuestion, options.traceId, now),
      ];
    case 'PAUSE_SESSION':
      return [buildAnalyticsEvent('session_paused', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'RESUME_SESSION':
      return [buildAnalyticsEvent('session_resumed', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'OPEN_QUESTION':
      return [buildAnalyticsEvent('question_opened', after, { ...basePayload, reason: event.payload.reason ?? 'manual' }, after.currentQuestion, options.traceId, now)];
    case 'CHANGE_DRAFT':
      if (!options.includeDraftChanged) return [];
      return [buildAnalyticsEvent('question_draft_changed', after, { ...basePayload, completeness: after.draftByQuestionId[event.payload.questionId]?.completeness ?? 0 }, after.currentQuestion, options.traceId, now)];
    case 'CLEAR_DRAFT':
      return [buildAnalyticsEvent('question_draft_cleared', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'SUBMIT_CURRENT_QUESTION': {
      const judged = after.lastJudgeResult;
      const results: RuntimeAnalyticsEvent[] = [
        buildAnalyticsEvent('question_submitted', after, { ...basePayload, allowLateSubmit: event.payload.allowLateSubmit ?? false }, after.currentQuestion, options.traceId, now),
      ];
      if (judged) {
        results.push(
          buildAnalyticsEvent(
            'question_judged',
            after,
            {
              ...basePayload,
              correct: judged.correct,
              scoreAwarded: judged.scoreAwarded,
              starsAwarded: judged.starsAwarded,
              comboAfter: judged.comboAfter,
              primaryReasonCode: judged.primaryReasonCode,
            },
            after.currentQuestion,
            options.traceId,
            now,
          ),
        );
      }
      return results;
    }
    case 'OPEN_REVIEW':
      return [buildAnalyticsEvent('question_review_opened', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'GO_TO_NEXT_QUESTION':
      return [buildAnalyticsEvent('navigation_next', after, { ...basePayload, autoStart: event.payload.autoStart ?? false }, after.currentQuestion, options.traceId, now)];
    case 'GO_TO_PREVIOUS_QUESTION':
      return [buildAnalyticsEvent('navigation_previous', after, { ...basePayload, autoStart: event.payload.autoStart ?? false }, after.currentQuestion, options.traceId, now)];
    case 'SKIP_CURRENT_QUESTION':
      return [buildAnalyticsEvent('question_skipped', after, { ...basePayload, reason: event.payload.reason ?? 'manual_skip' }, after.currentQuestion, options.traceId, now)];
    case 'FINALIZE_SESSION':
      return [buildAnalyticsEvent('session_finalized', after, { ...basePayload, totalScore: after.session.totals.totalScore, totalStars: after.session.totals.totalStars, bestCombo: after.session.totals.bestCombo }, after.currentQuestion, options.traceId, now)];
    case 'RESTART_SESSION':
      return [buildAnalyticsEvent('session_restarted', after, basePayload, after.currentQuestion, options.traceId, now)];
    case 'TIMER_TICK': {
      const events: RuntimeAnalyticsEvent[] = [];
      if (options.includeTimerTicks) {
        events.push(buildAnalyticsEvent('timer_tick', after, basePayload, after.currentQuestion, options.traceId, now));
      }
      const beforeExpired = !!before.currentQuestionState?.timer.expired;
      const afterExpired = !!after.currentQuestionState?.timer.expired;
      if (!beforeExpired && afterExpired) {
        events.push(buildAnalyticsEvent('timer_expired', after, basePayload, after.currentQuestion, options.traceId, now));
      }
      return events;
    }
    case 'SET_ERROR':
      return [buildAnalyticsEvent('runtime_error', after, { ...basePayload, message: event.payload.message }, after.currentQuestion, options.traceId, now)];
    case 'CLEAR_ERROR':
      return [];
    default:
      return [];
  }
}

export function buildAnalyticsEvent(
  name: RuntimeAnalyticsEventName,
  state: RuntimeMachineState,
  payload: Record<string, unknown>,
  question: RuntimeQuestionPageViewModel | undefined,
  traceId: string,
  atMs: number,
): RuntimeAnalyticsEvent {
  const context: RuntimeAnalyticsContext = {
    machineId: state.machineId,
    sessionId: state.session.sessionId,
    mode: state.mode,
    phase: state.phase,
    traceId,
    question: question
      ? {
          questionId: question.questionId,
          difficulty: question.question.difficulty,
          interactionType: question.interaction.type,
        }
      : state.currentQuestionId
        ? { questionId: state.currentQuestionId }
        : undefined,
  };

  return {
    schemaVersion: ANALYTICS_SCHEMA_VERSION,
    eventId: `${name}-${atMs}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    atMs,
    context,
    payload,
  };
}

function listSnapshots(driver: PersistenceStorageDriver, appNamespace: string): SnapshotManifestEntry[] {
  const keys = typeof driver.keys === 'function' ? driver.keys() : [];
  return keys
    .filter((key) => key.startsWith(`${appNamespace}:snapshot:`))
    .map((key) => driver.getItem(key))
    .filter((raw): raw is string => !!raw)
    .map((raw) => JSON.parse(raw) as PersistedMachineSnapshot)
    .map((snapshot) => ({ ...snapshot.meta, key: getSnapshotKey(appNamespace, snapshot.meta.machineId) }))
    .sort((a, b) => b.savedAtMs - a.savedAtMs);
}

function pruneSnapshots(driver: PersistenceStorageDriver, options: Required<PersistenceAdapterOptions>): void {
  const snapshots = listSnapshots(driver, options.appNamespace);
  snapshots.slice(options.maxSnapshotCount).forEach((item) => driver.removeItem(item.key));
}

function getSnapshotKey(appNamespace: string, machineId: string): string {
  return `${appNamespace}:snapshot:${machineId}`;
}

function getAnalyticsBufferKey(appNamespace: string, machineId: string): string {
  return `${appNamespace}:analytics:${machineId}`;
}

function isDraftEmpty(answer: unknown): boolean {
  if (!answer) return true;
  if (typeof answer !== 'object') return false;
  const value = answer as Record<string, unknown>;
  if ('value' in value) return value.value === '' || value.value === undefined || value.value === null;
  if ('optionIds' in value) return !Array.isArray(value.optionIds) || value.optionIds.length === 0;
  if ('hotspotIds' in value) return !Array.isArray(value.hotspotIds) || value.hotspotIds.length === 0;
  if ('cells' in value) return !value.cells || Object.keys(value.cells as object).length === 0;
  if ('mapping' in value) return !value.mapping || Object.keys(value.mapping as object).length === 0;
  if ('values' in value) return !Array.isArray(value.values) || value.values.length === 0;
  if ('text' in value) return typeof value.text !== 'string' || value.text.trim().length === 0;
  return false;
}
