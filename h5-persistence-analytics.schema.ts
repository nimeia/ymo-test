import type { PlayModeKey } from './h5-question-bank.types';
import type { RuntimeMachineEvent, RuntimeMachineState, RuntimeViewPhase, RuntimeAnswerDraft, RuntimeFeedbackBanner } from './h5-runtime-events.schema';
import type { RuntimeJudgeResult, RuntimeSessionStateSchema, RuntimeSubmissionPayload } from './h5-runtime-judge.schema';

export const PERSISTENCE_SCHEMA_VERSION = '1.0.0' as const;
export type PersistenceSchemaVersion = typeof PERSISTENCE_SCHEMA_VERSION;

export const ANALYTICS_SCHEMA_VERSION = '1.0.0' as const;
export type AnalyticsSchemaVersion = typeof ANALYTICS_SCHEMA_VERSION;

export const PERSISTENCE_ENTITY_TYPES = ['session_snapshot', 'analytics_buffer'] as const;
export type PersistenceEntityType = (typeof PERSISTENCE_ENTITY_TYPES)[number];

export const PERSISTENCE_DRIVERS = ['memory', 'local_storage'] as const;
export type PersistenceDriverKind = (typeof PERSISTENCE_DRIVERS)[number];

export interface PersistenceStorageDriver {
  readonly kind: PersistenceDriverKind | string;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  keys?(): string[];
}

export interface PersistenceNamespaceOptions {
  appNamespace: string;
  snapshotVersion?: string;
}

export interface PersistedSnapshotMeta {
  schemaVersion: PersistenceSchemaVersion;
  appNamespace: string;
  snapshotVersion: string;
  entityType: 'session_snapshot';
  machineId: string;
  sessionId: string;
  mode: PlayModeKey | 'mixed_challenge';
  savedAtMs: number;
  questionCount: number;
  currentQuestionId?: string;
  currentIndex: number;
  phase: RuntimeViewPhase;
  status: RuntimeSessionStateSchema['status'];
  totalScore: number;
  totalStars: number;
  correctCount: number;
}

export interface PersistedMachineSnapshot {
  meta: PersistedSnapshotMeta;
  navigationQuestionIds: string[];
  session: RuntimeSessionStateSchema;
  draftByQuestionId: Record<string, RuntimeAnswerDraft>;
  lastSubmission?: RuntimeSubmissionPayload;
  lastJudgeResult?: RuntimeJudgeResult;
  reviewVisible: boolean;
  feedbackBanner?: RuntimeFeedbackBanner;
  error?: string;
  eventLogTail: RuntimeMachineState['eventLog'];
  extensions?: Record<string, unknown>;
}

export interface SnapshotManifestEntry extends PersistedSnapshotMeta {
  key: string;
}

export interface PersistenceAdapterOptions extends PersistenceNamespaceOptions {
  maxSnapshotCount?: number;
  eventLogTailLimit?: number;
}

export const ANALYTICS_EVENT_NAMES = [
  'session_bootstrapped',
  'session_hydrated',
  'session_started',
  'session_paused',
  'session_resumed',
  'session_finalized',
  'session_restarted',
  'question_opened',
  'question_started',
  'question_draft_changed',
  'question_draft_cleared',
  'question_submitted',
  'question_judged',
  'question_review_opened',
  'question_skipped',
  'navigation_next',
  'navigation_previous',
  'timer_tick',
  'timer_expired',
  'runtime_error',
  'persistence_saved',
  'persistence_loaded',
  'persistence_deleted',
  'analytics_buffer_flushed',
] as const;
export type RuntimeAnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export interface RuntimeAnalyticsQuestionMeta {
  questionId?: string;
  moduleId?: string;
  moduleKey?: string;
  difficulty?: number;
  interactionType?: string;
}

export interface RuntimeAnalyticsContext {
  machineId: string;
  sessionId?: string;
  mode?: PlayModeKey | 'mixed_challenge';
  phase?: RuntimeViewPhase;
  question?: RuntimeAnalyticsQuestionMeta;
  traceId?: string;
}

export interface RuntimeAnalyticsEventBase<TName extends RuntimeAnalyticsEventName = RuntimeAnalyticsEventName, TPayload = Record<string, unknown>> {
  schemaVersion: AnalyticsSchemaVersion;
  eventId: string;
  name: TName;
  atMs: number;
  context: RuntimeAnalyticsContext;
  payload: TPayload;
}

export type RuntimeAnalyticsEvent = RuntimeAnalyticsEventBase;

export interface RuntimeAnalyticsSink {
  push(event: RuntimeAnalyticsEvent): void;
  flush?(): RuntimeAnalyticsEvent[];
  peek?(): RuntimeAnalyticsEvent[];
  clear?(): void;
}

export interface RuntimeAnalyticsTrackerOptions {
  includeTimerTicks?: boolean;
  includeDraftChanged?: boolean;
  traceId?: string;
}

export interface AnalyticsBufferRecord {
  schemaVersion: PersistenceSchemaVersion;
  appNamespace: string;
  entityType: 'analytics_buffer';
  machineId: string;
  updatedAtMs: number;
  events: RuntimeAnalyticsEvent[];
}

export interface RuntimeTransitionAnalyticsInput {
  event: RuntimeMachineEvent;
  before: RuntimeMachineState;
  after: RuntimeMachineState;
}

export interface HydratedMachineSnapshotResult {
  snapshot: PersistedMachineSnapshot;
  found: boolean;
}
