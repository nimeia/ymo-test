import type { PlayModeKey } from './h5-question-bank.types';
import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';
import type {
  RuntimeJudgeResult,
  RuntimeQuestionSessionState,
  RuntimeSessionStateSchema,
  RuntimeSubmissionAnswer,
  RuntimeSubmissionPayload,
} from './h5-runtime-judge.schema';

export const RUNTIME_EVENT_SCHEMA_VERSION = '1.0.0' as const;
export type RuntimeEventSchemaVersion = typeof RUNTIME_EVENT_SCHEMA_VERSION;

export const RUNTIME_VIEW_PHASES = [
  'booting',
  'ready',
  'answering',
  'judged',
  'reviewing',
  'transitioning',
  'completed',
  'paused',
  'error',
] as const;
export type RuntimeViewPhase = (typeof RUNTIME_VIEW_PHASES)[number];

export const RUNTIME_EVENT_TYPES = [
  'BOOTSTRAP_SESSION',
  'START_SESSION',
  'PAUSE_SESSION',
  'RESUME_SESSION',
  'OPEN_QUESTION',
  'TIMER_TICK',
  'CHANGE_DRAFT',
  'CLEAR_DRAFT',
  'SUBMIT_CURRENT_QUESTION',
  'OPEN_REVIEW',
  'GO_TO_NEXT_QUESTION',
  'GO_TO_PREVIOUS_QUESTION',
  'SKIP_CURRENT_QUESTION',
  'FINALIZE_SESSION',
  'RESTART_SESSION',
  'HYDRATE_SESSION',
  'SET_ERROR',
  'CLEAR_ERROR',
] as const;
export type RuntimeEventType = (typeof RUNTIME_EVENT_TYPES)[number];

export interface RuntimeDraftMeta {
  touched?: boolean;
  dirty?: boolean;
  lastChangedAtMs?: number;
  source?: 'keyboard' | 'pointer' | 'drag' | 'system';
}

export interface RuntimeAnswerDraft {
  questionId: string;
  answer?: RuntimeSubmissionAnswer;
  isEmpty: boolean;
  completeness: number;
  meta?: RuntimeDraftMeta;
}

export interface RuntimeTransientUiState {
  submitting: boolean;
  submitDisabled: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  timerWarning: boolean;
  lastEventType?: RuntimeEventType;
}

export interface RuntimeFeedbackBanner {
  tone: 'info' | 'success' | 'warning' | 'error';
  title: string;
  text: string;
  visible: boolean;
}

export interface RuntimeNavigationState {
  currentIndex: number;
  total: number;
  questionIds: string[];
}

export interface RuntimeMachineState {
  schemaVersion: RuntimeEventSchemaVersion;
  machineId: string;
  mode: PlayModeKey | 'mixed_challenge';
  phase: RuntimeViewPhase;
  session: RuntimeSessionStateSchema;
  questions: Record<string, RuntimeQuestionPageViewModel>;
  navigation: RuntimeNavigationState;
  currentQuestionId?: string;
  currentQuestion?: RuntimeQuestionPageViewModel;
  currentQuestionState?: RuntimeQuestionSessionState;
  draftByQuestionId: Record<string, RuntimeAnswerDraft>;
  lastSubmission?: RuntimeSubmissionPayload;
  lastJudgeResult?: RuntimeJudgeResult;
  reviewVisible: boolean;
  feedbackBanner?: RuntimeFeedbackBanner;
  ui: RuntimeTransientUiState;
  eventLog: RuntimeEventLogEntry[];
  error?: string;
}

export interface RuntimeEventBase<T extends RuntimeEventType, P = undefined> {
  type: T;
  atMs: number;
  payload: P;
}

export type BootstrapSessionEvent = RuntimeEventBase<
  'BOOTSTRAP_SESSION',
  {
    machineId: string;
    mode: PlayModeKey | 'mixed_challenge';
    session: RuntimeSessionStateSchema;
    questions: Record<string, RuntimeQuestionPageViewModel>;
    startQuestionId?: string;
  }
>;

export type StartSessionEvent = RuntimeEventBase<'START_SESSION', { questionId?: string }>;
export type PauseSessionEvent = RuntimeEventBase<'PAUSE_SESSION', Record<string, never>>;
export type ResumeSessionEvent = RuntimeEventBase<'RESUME_SESSION', Record<string, never>>;
export type OpenQuestionEvent = RuntimeEventBase<'OPEN_QUESTION', { questionId: string; reason?: 'manual' | 'next' | 'prev' | 'restart' }>;
export type TimerTickEvent = RuntimeEventBase<'TIMER_TICK', { nowMs?: number }>;
export type ChangeDraftEvent = RuntimeEventBase<'CHANGE_DRAFT', { questionId: string; answer?: RuntimeSubmissionAnswer; meta?: RuntimeDraftMeta }>;
export type ClearDraftEvent = RuntimeEventBase<'CLEAR_DRAFT', { questionId: string }>;
export type SubmitCurrentQuestionEvent = RuntimeEventBase<
  'SUBMIT_CURRENT_QUESTION',
  { questionId?: string; answer?: RuntimeSubmissionAnswer; meta?: Record<string, unknown>; allowLateSubmit?: boolean }
>;
export type OpenReviewEvent = RuntimeEventBase<'OPEN_REVIEW', { questionId?: string }>;
export type GoToNextQuestionEvent = RuntimeEventBase<'GO_TO_NEXT_QUESTION', { autoStart?: boolean }>;
export type GoToPreviousQuestionEvent = RuntimeEventBase<'GO_TO_PREVIOUS_QUESTION', { autoStart?: boolean }>;
export type SkipCurrentQuestionEvent = RuntimeEventBase<'SKIP_CURRENT_QUESTION', { reason?: string; autoAdvance?: boolean }>;
export type FinalizeSessionEvent = RuntimeEventBase<'FINALIZE_SESSION', Record<string, never>>;
export type RestartSessionEvent = RuntimeEventBase<'RESTART_SESSION', { nowMs?: number }>;
export type HydrateSessionEvent = RuntimeEventBase<
  'HYDRATE_SESSION',
  {
    machineId: string;
    mode: PlayModeKey | 'mixed_challenge';
    session: RuntimeSessionStateSchema;
    questions: Record<string, RuntimeQuestionPageViewModel>;
    draftByQuestionId?: Record<string, RuntimeAnswerDraft>;
  }
>;
export type SetErrorEvent = RuntimeEventBase<'SET_ERROR', { message: string }>;
export type ClearErrorEvent = RuntimeEventBase<'CLEAR_ERROR', Record<string, never>>;

export type RuntimeMachineEvent =
  | BootstrapSessionEvent
  | StartSessionEvent
  | PauseSessionEvent
  | ResumeSessionEvent
  | OpenQuestionEvent
  | TimerTickEvent
  | ChangeDraftEvent
  | ClearDraftEvent
  | SubmitCurrentQuestionEvent
  | OpenReviewEvent
  | GoToNextQuestionEvent
  | GoToPreviousQuestionEvent
  | SkipCurrentQuestionEvent
  | FinalizeSessionEvent
  | RestartSessionEvent
  | HydrateSessionEvent
  | SetErrorEvent
  | ClearErrorEvent;

export interface RuntimeEventLogEntry {
  seq: number;
  type: RuntimeEventType;
  atMs: number;
  questionId?: string;
  phaseBefore?: RuntimeViewPhase;
  phaseAfter?: RuntimeViewPhase;
  summary: string;
}

export interface RuntimeReducerDeps {
  buildResultQuestionMetaMap: (questions: Record<string, RuntimeQuestionPageViewModel>) => Record<string, { title: string; moduleId: RuntimeQuestionPageViewModel['question']['difficulty'] extends never ? never : any; difficulty: number }>;
  buildWrongBookMetaMap: (questions: Record<string, RuntimeQuestionPageViewModel>) => Record<string, { title: string; moduleId: any; moduleName: string; subtypeKey: string }>;
}

export interface RuntimeReducerOptions {
  autoOpenFirstQuestion?: boolean;
  autoStartOnBootstrap?: boolean;
  autoAdvanceAfterSubmit?: boolean;
  autoFinalizeWhenComplete?: boolean;
}
