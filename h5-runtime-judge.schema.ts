import type { PlayModeKey, ResultPageData, ResultQuestionSummary, SessionProgress, WrongBookEntry, WrongBookPageData } from './h5-question-bank.types';
import type { QuestionAnswer, WrongReason } from './h5-question-content.schema';

export const RUNTIME_JUDGE_SCHEMA_VERSION = '1.0.0' as const;
export type RuntimeJudgeSchemaVersion = typeof RUNTIME_JUDGE_SCHEMA_VERSION;

export const SESSION_STATUSES = ['idle', 'running', 'paused', 'completed', 'abandoned'] as const;
export type RuntimeSessionStatus = (typeof SESSION_STATUSES)[number];

export const QUESTION_SESSION_STATUSES = ['pending', 'active', 'submitted', 'correct', 'wrong', 'reviewed', 'timed_out', 'skipped'] as const;
export type RuntimeQuestionSessionStatus = (typeof QUESTION_SESSION_STATUSES)[number];

export const JUDGE_FEEDBACK_SEVERITIES = ['info', 'warning', 'error'] as const;
export type JudgeFeedbackSeverity = (typeof JUDGE_FEEDBACK_SEVERITIES)[number];

export const JUDGE_FEEDBACK_SOURCES = ['engine', 'content'] as const;
export type JudgeFeedbackSource = (typeof JUDGE_FEEDBACK_SOURCES)[number];

export const SUBMISSION_KINDS = [
  'numeric',
  'choice',
  'slot_mapping',
  'grid_fill',
  'hotspot_selection',
  'sequence',
  'free_text',
  'custom',
] as const;
export type RuntimeSubmissionKind = (typeof SUBMISSION_KINDS)[number];

export const JUDGE_REASON_CODES = [
  'correct',
  'empty_submission',
  'incorrect_value',
  'incorrect_option',
  'incorrect_selection',
  'missing_slot',
  'incorrect_mapping',
  'incorrect_grid',
  'incorrect_sequence',
  'incorrect_text',
  'extra_selection',
  'time_expired',
  'unsupported_answer_kind',
] as const;
export type JudgeReasonCode = (typeof JUDGE_REASON_CODES)[number];

export interface RuntimeSessionTimer {
  startedAtMs: number;
  lastTickAtMs: number;
  elapsedMs: number;
  paused: boolean;
  pausedAccumulatedMs: number;
}

export interface RuntimeQuestionTimerState {
  limitMs?: number;
  startedAtMs?: number;
  lastTickAtMs?: number;
  elapsedMs: number;
  remainingMs?: number;
  expired: boolean;
}

export interface NumericSubmission {
  kind: 'numeric';
  value: string | number;
}

export interface ChoiceSubmission {
  kind: 'choice';
  optionIds: string[];
}

export interface SlotMappingSubmission {
  kind: 'slot_mapping';
  mapping: Record<string, string | string[]>;
}

export interface GridFillSubmission {
  kind: 'grid_fill';
  cells: Record<string, string | number>;
}

export interface HotspotSelectionSubmission {
  kind: 'hotspot_selection';
  hotspotIds: string[];
}

export interface SequenceSubmission {
  kind: 'sequence';
  values: Array<string | number>;
}

export interface FreeTextSubmission {
  kind: 'free_text';
  text: string;
}

export interface CustomSubmission {
  kind: 'custom';
  payload: Record<string, unknown>;
}

export type RuntimeSubmissionAnswer =
  | NumericSubmission
  | ChoiceSubmission
  | SlotMappingSubmission
  | GridFillSubmission
  | HotspotSelectionSubmission
  | SequenceSubmission
  | FreeTextSubmission
  | CustomSubmission;

export interface RuntimeSubmissionPayload {
  questionId: string;
  submittedAtMs: number;
  elapsedMs?: number;
  answer: RuntimeSubmissionAnswer;
  meta?: Record<string, unknown>;
}

export interface JudgeFeedbackItem {
  code: JudgeReasonCode | string;
  title: string;
  text: string;
  severity: JudgeFeedbackSeverity;
  source: JudgeFeedbackSource;
  relatedIds?: string[];
}

export interface RuntimeJudgeTrace {
  expectedKind: QuestionAnswer['kind'];
  submissionKind: RuntimeSubmissionKind;
  normalizedExpected?: unknown;
  normalizedSubmission?: unknown;
  matched: boolean;
}

export interface StarThresholdConfig {
  threeStarMinRemainingRatio: number;
  twoStarMinRemainingRatio: number;
  firstAttemptBonusOnly: boolean;
}

export interface ComboPolicy {
  resetOnWrong: boolean;
  wrongPenalty: number;
  correctBaseIncrement: number;
}

export interface RuntimeJudgePolicy {
  starThresholds: StarThresholdConfig;
  combo: ComboPolicy;
  baseScorePerCorrect: number;
  comboBonusMultiplier: number;
}

export interface QuestionJudgeSnapshot {
  questionId: string;
  status: RuntimeQuestionSessionStatus;
  attemptsUsed: number;
  answeredCorrectly: boolean;
  starsAwarded: number;
  comboAfter: number;
  scoreAwarded: number;
  timeSpentMs: number;
}

export interface RuntimeJudgeResult {
  questionId: string;
  submission: RuntimeSubmissionPayload;
  correct: boolean;
  scoreAwarded: number;
  starsAwarded: number;
  comboBefore: number;
  comboAfter: number;
  timeSpentMs: number;
  timedOut: boolean;
  primaryReasonCode: JudgeReasonCode | string;
  feedback: JudgeFeedbackItem[];
  wrongReasons: WrongReason[];
  trace: RuntimeJudgeTrace;
  questionSnapshot: QuestionJudgeSnapshot;
}

export interface QuestionSubmissionHistoryEntry {
  submission: RuntimeSubmissionPayload;
  result: Pick<RuntimeJudgeResult, 'correct' | 'scoreAwarded' | 'starsAwarded' | 'timeSpentMs' | 'primaryReasonCode'>;
}

export interface RuntimeQuestionSessionState {
  questionId: string;
  orderIndex: number;
  status: RuntimeQuestionSessionStatus;
  attemptsUsed: number;
  answeredCorrectly: boolean;
  starsAwarded: number;
  scoreAwarded: number;
  comboAfter: number;
  timer: RuntimeQuestionTimerState;
  latestSubmission?: RuntimeSubmissionPayload;
  latestJudgeResult?: RuntimeJudgeResult;
  submissionHistory: QuestionSubmissionHistoryEntry[];
  reviewOpened: boolean;
  memoryTag?: string;
}

export interface RuntimeSessionTotals {
  questionCount: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  totalStars: number;
  bestCombo: number;
  currentCombo: number;
  totalScore: number;
  totalElapsedMs: number;
}

export interface RuntimeSessionStateSchema {
  schemaVersion: RuntimeJudgeSchemaVersion;
  sessionId: string;
  mode: PlayModeKey | 'mixed_challenge';
  status: RuntimeSessionStatus;
  createdAtMs: number;
  currentQuestionId?: string;
  questionOrder: string[];
  timer: RuntimeSessionTimer;
  questionStates: Record<string, RuntimeQuestionSessionState>;
  totals: RuntimeSessionTotals;
  resultPage?: ResultPageData;
  wrongBook?: WrongBookPageData;
}

export interface RuntimeJudgeEngineDeps {
  nowMs?: () => number;
  policy?: Partial<RuntimeJudgePolicy>;
}

export interface CreateSessionOptions {
  sessionId?: string;
  mode?: PlayModeKey | 'mixed_challenge';
  createdAtMs?: number;
  questionTimersMs?: Partial<Record<string, number>>;
  memoryTags?: Partial<Record<string, string>>;
}

export interface StartQuestionOptions {
  startedAtMs?: number;
  replaceIfActive?: boolean;
}

export interface UpdateTimerOptions {
  nowMs?: number;
}

export interface JudgeSubmissionOptions {
  nowMs?: number;
  allowLateSubmit?: boolean;
}

export interface SessionProgressSnapshot extends SessionProgress {
  accuracy: number;
  totalScore: number;
  bestCombo: number;
}

export interface BuildResultPageInput {
  session: RuntimeSessionStateSchema;
  questionMetaMap: Record<string, { title: string; moduleId: ResultQuestionSummary['moduleId']; difficulty: ResultQuestionSummary['difficulty'] }>;
}

export interface BuildWrongBookInput {
  session: RuntimeSessionStateSchema;
  questionMetaMap: Record<
    string,
    {
      title: string;
      moduleId: WrongBookEntry['moduleId'];
      moduleName: WrongBookEntry['moduleName'];
      subtypeKey: WrongBookEntry['subtypeKey'];
    }
  >;
  generatedAtIso: string;
}

export const DEFAULT_RUNTIME_JUDGE_POLICY: RuntimeJudgePolicy = {
  starThresholds: {
    threeStarMinRemainingRatio: 0.4,
    twoStarMinRemainingRatio: 0.15,
    firstAttemptBonusOnly: true,
  },
  combo: {
    resetOnWrong: true,
    wrongPenalty: 0,
    correctBaseIncrement: 1,
  },
  baseScorePerCorrect: 100,
  comboBonusMultiplier: 10,
};
