import type { ModuleId } from './h5-question-bank.types';
import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';
import {
  buildResultPageData,
  buildSessionProgressSnapshot,
  buildWrongBookPageData,
  createRuntimeSessionState,
  finalizeRuntimeSession,
  judgeRuntimeQuestionSubmission,
  markQuestionReviewOpened,
  startRuntimeQuestion,
  updateRuntimeSessionTimer,
} from './h5-runtime-judge.engine';
import type {
  CreateSessionOptions,
  RuntimeSessionStateSchema,
  RuntimeSubmissionAnswer,
  RuntimeSubmissionPayload,
} from './h5-runtime-judge.schema';
import type {
  RuntimeAnswerDraft,
  RuntimeFeedbackBanner,
  RuntimeMachineEvent,
  RuntimeMachineState,
  RuntimeReducerOptions,
  RuntimeViewPhase,
} from './h5-runtime-events.schema';

export const RUNTIME_STATE_MACHINE_VERSION = '1.0.0' as const;

const DEFAULT_REDUCER_OPTIONS: Required<RuntimeReducerOptions> = {
  autoOpenFirstQuestion: true,
  autoStartOnBootstrap: false,
  autoAdvanceAfterSubmit: false,
  autoFinalizeWhenComplete: true,
};

export interface CreateRuntimeMachineInput {
  machineId?: string;
  mode?: RuntimeMachineState['mode'];
  questions: RuntimeQuestionPageViewModel[] | Record<string, RuntimeQuestionPageViewModel>;
  sessionOptions?: CreateSessionOptions;
  reducerOptions?: RuntimeReducerOptions;
}

export function createRuntimeMachineState(input: CreateRuntimeMachineInput): RuntimeMachineState {
  const questionMap = Array.isArray(input.questions)
    ? Object.fromEntries(input.questions.map((q) => [q.questionId, q]))
    : input.questions;
  const questionIds = Object.keys(questionMap);
  const session = createRuntimeSessionState(questionIds, {
    ...(input.sessionOptions ?? {}),
    mode: input.mode ?? input.sessionOptions?.mode ?? 'mixed_challenge',
  });
  const options = { ...DEFAULT_REDUCER_OPTIONS, ...(input.reducerOptions ?? {}) };
  const currentQuestionId = options.autoOpenFirstQuestion ? session.currentQuestionId : undefined;
  const state = buildMachineState({
    machineId: input.machineId ?? `machine-${session.sessionId}`,
    mode: session.mode,
    session,
    questions: questionMap,
    currentQuestionId,
    phase: currentQuestionId ? 'ready' : 'booting',
    draftByQuestionId: {},
    reviewVisible: false,
    lastSubmission: undefined,
    lastJudgeResult: undefined,
    feedbackBanner: currentQuestionId
      ? { tone: 'info', title: '准备开始', text: '题目已加载，可以开始作答。', visible: true }
      : undefined,
    error: undefined,
    eventLog: [],
  });
  return options.autoStartOnBootstrap && currentQuestionId
    ? runtimeReducer(state, createEvent('START_SESSION', { questionId: currentQuestionId }), input.reducerOptions)
    : state;
}

export function runtimeReducer(
  state: RuntimeMachineState,
  event: RuntimeMachineEvent,
  reducerOptions: RuntimeReducerOptions = {},
): RuntimeMachineState {
  const options = { ...DEFAULT_REDUCER_OPTIONS, ...reducerOptions };
  const phaseBefore = state.phase;
  let next = state;

  switch (event.type) {
    case 'BOOTSTRAP_SESSION': {
      next = buildMachineState({
        machineId: event.payload.machineId,
        mode: event.payload.mode,
        session: event.payload.session,
        questions: event.payload.questions,
        currentQuestionId: event.payload.startQuestionId ?? event.payload.session.currentQuestionId,
        phase: options.autoOpenFirstQuestion ? 'ready' : 'booting',
        draftByQuestionId: {},
        reviewVisible: false,
        lastSubmission: undefined,
        lastJudgeResult: undefined,
        feedbackBanner: { tone: 'info', title: '会话已载入', text: '可以开始挑战。', visible: true },
        error: undefined,
        eventLog: state.eventLog,
      });
      if (options.autoStartOnBootstrap && next.currentQuestionId) {
        next = startQuestionFlow(next, next.currentQuestionId, event.atMs);
      }
      break;
    }
    case 'HYDRATE_SESSION': {
      next = buildMachineState({
        machineId: event.payload.machineId,
        mode: event.payload.mode,
        session: event.payload.session,
        questions: event.payload.questions,
        currentQuestionId: event.payload.session.currentQuestionId,
        phase: event.payload.session.status === 'completed' ? 'completed' : 'ready',
        draftByQuestionId: event.payload.draftByQuestionId ?? {},
        reviewVisible: false,
        lastSubmission: undefined,
        lastJudgeResult: undefined,
        feedbackBanner: undefined,
        error: undefined,
        eventLog: state.eventLog,
      });
      break;
    }
    case 'START_SESSION': {
      const questionId = event.payload.questionId ?? state.currentQuestionId ?? firstQuestionId(state.questions);
      if (!questionId) break;
      next = startQuestionFlow(state, questionId, event.atMs);
      break;
    }
    case 'PAUSE_SESSION': {
      next = {
        ...state,
        phase: 'paused',
        session: {
          ...state.session,
          status: 'paused',
          timer: {
            ...state.session.timer,
            paused: true,
            lastTickAtMs: event.atMs,
          },
        },
        feedbackBanner: makeBanner('warning', '已暂停', '当前挑战已暂停。'),
      };
      break;
    }
    case 'RESUME_SESSION': {
      next = {
        ...state,
        phase: state.lastJudgeResult ? 'judged' : 'answering',
        session: {
          ...state.session,
          status: 'running',
          timer: {
            ...state.session.timer,
            paused: false,
            lastTickAtMs: event.atMs,
          },
        },
        feedbackBanner: makeBanner('info', '继续作答', '继续当前题目。'),
      };
      break;
    }
    case 'OPEN_QUESTION': {
      next = openQuestion(state, event.payload.questionId, event.atMs, event.payload.reason === 'restart');
      break;
    }
    case 'TIMER_TICK': {
      if (state.phase === 'paused' || state.phase === 'completed' || state.session.status === 'paused') {
        next = state;
        break;
      }
      const nowMs = event.payload.nowMs ?? event.atMs;
      const session = updateRuntimeSessionTimer(state.session, { nowMs });
      next = buildMachineState({
        ...state,
        session,
        phase: derivePhaseAfterTick(state.phase, session, state.currentQuestionId),
        feedbackBanner: session.currentQuestionId && session.questionStates[session.currentQuestionId]?.timer.expired
          ? makeBanner('warning', '时间到', '本题计时结束，可以查看解析或进入下一题。')
          : state.feedbackBanner,
      });
      break;
    }
    case 'CHANGE_DRAFT': {
      next = {
        ...state,
        phase: state.phase === 'ready' ? 'answering' : state.phase,
        draftByQuestionId: {
          ...state.draftByQuestionId,
          [event.payload.questionId]: buildDraft(event.payload.questionId, event.payload.answer, event.payload.meta, event.atMs),
        },
        reviewVisible: false,
        feedbackBanner: undefined,
        ui: {
          ...state.ui,
          submitDisabled: isDraftEmpty(event.payload.answer),
          lastEventType: event.type,
        },
      };
      break;
    }
    case 'CLEAR_DRAFT': {
      next = {
        ...state,
        draftByQuestionId: {
          ...state.draftByQuestionId,
          [event.payload.questionId]: buildDraft(event.payload.questionId, undefined, { dirty: false, touched: false }, event.atMs),
        },
        ui: {
          ...state.ui,
          submitDisabled: true,
          lastEventType: event.type,
        },
      };
      break;
    }
    case 'SUBMIT_CURRENT_QUESTION': {
      const questionId = event.payload.questionId ?? state.currentQuestionId;
      if (!questionId) break;
      const draft = state.draftByQuestionId[questionId];
      const answer = event.payload.answer ?? draft?.answer;
      if (!answer) {
        next = {
          ...state,
          feedbackBanner: makeBanner('error', '还没有答案', '请先输入或选择答案。'),
          ui: { ...state.ui, lastEventType: event.type, submitDisabled: true },
        };
        break;
      }

      const vm = state.questions[questionId];
      if (!vm?.judge.answer) {
        next = {
          ...state,
          phase: 'error',
          error: `Judge answer not exposed for question ${questionId}`,
          ui: { ...state.ui, lastEventType: event.type },
        };
        break;
      }

      const submission: RuntimeSubmissionPayload = {
        questionId,
        submittedAtMs: event.atMs,
        answer,
        meta: event.payload.meta,
      };
      const judgeResult = judgeRuntimeQuestionSubmission(vm, state.session, submission, {}, {
        nowMs: event.atMs,
        allowLateSubmit: event.payload.allowLateSubmit,
      });
      let session = judgeResult.session;
      let phase: RuntimeViewPhase = 'judged';
      let reviewVisible = false;
      let feedbackBanner = judgeResult.result.correct
        ? makeBanner('success', '回答正确', `获得 ${judgeResult.result.starsAwarded} 星，连击 ${judgeResult.result.comboAfter}。`)
        : makeBanner('warning', '回答错误', judgeResult.result.feedback[0]?.text ?? '可以再看看解析。');

      next = buildMachineState({
        ...state,
        session,
        currentQuestionId: questionId,
        lastSubmission: submission,
        lastJudgeResult: judgeResult.result,
        phase,
        reviewVisible,
        feedbackBanner,
        draftByQuestionId: {
          ...state.draftByQuestionId,
          [questionId]: buildDraft(questionId, answer, { dirty: false, touched: true, source: 'system' }, event.atMs),
        },
      });

      if (options.autoAdvanceAfterSubmit && hasNextQuestion(next)) {
        next = runtimeReducer(next, createEvent('GO_TO_NEXT_QUESTION', { autoStart: true }, event.atMs), reducerOptions);
      } else if (options.autoFinalizeWhenComplete && isSessionComplete(next.session)) {
        next = runtimeReducer(next, createEvent('FINALIZE_SESSION', {}, event.atMs), reducerOptions);
      }
      break;
    }
    case 'OPEN_REVIEW': {
      const questionId = event.payload.questionId ?? state.currentQuestionId;
      if (!questionId) break;
      const session = markQuestionReviewOpened(state.session, questionId);
      next = buildMachineState({
        ...state,
        session,
        phase: 'reviewing',
        reviewVisible: true,
        feedbackBanner: makeBanner('info', '解析已展开', '可以查看步骤拆解和错因提示。'),
      });
      break;
    }
    case 'GO_TO_NEXT_QUESTION': {
      const nextQuestionId = findAdjacentQuestionId(state.navigation.questionIds, state.currentQuestionId, 1);
      if (!nextQuestionId) {
        next = options.autoFinalizeWhenComplete
          ? runtimeReducer(state, createEvent('FINALIZE_SESSION', {}, event.atMs), reducerOptions)
          : state;
        break;
      }
      next = openQuestion(state, nextQuestionId, event.atMs, !!event.payload.autoStart);
      break;
    }
    case 'GO_TO_PREVIOUS_QUESTION': {
      const prevQuestionId = findAdjacentQuestionId(state.navigation.questionIds, state.currentQuestionId, -1);
      if (!prevQuestionId) break;
      next = openQuestion(state, prevQuestionId, event.atMs, !!event.payload.autoStart);
      break;
    }
    case 'SKIP_CURRENT_QUESTION': {
      const questionId = state.currentQuestionId;
      if (!questionId) break;
      const current = state.session.questionStates[questionId];
      const updatedQuestionState = {
        ...current,
        status: 'skipped' as const,
      };
      const session = {
        ...state.session,
        questionStates: {
          ...state.session.questionStates,
          [questionId]: updatedQuestionState,
        },
        totals: recomputeTotals({
          ...state.session,
          questionStates: {
            ...state.session.questionStates,
            [questionId]: updatedQuestionState,
          },
        }),
      };
      next = buildMachineState({
        ...state,
        session,
        phase: 'transitioning',
        feedbackBanner: makeBanner('warning', '已跳过', event.payload.reason ?? '这题先跳过，稍后再回看。'),
      });
      if (event.payload.autoAdvance !== false) {
        next = runtimeReducer(next, createEvent('GO_TO_NEXT_QUESTION', { autoStart: true }, event.atMs), reducerOptions);
      }
      break;
    }
    case 'FINALIZE_SESSION': {
      const finalizedSession = finalizeRuntimeSession(
        state.session,
        {
          session: state.session,
          questionMetaMap: buildResultMetaMap(state.questions),
        },
        {
          session: state.session,
          questionMetaMap: buildWrongBookMetaMap(state.questions),
          generatedAtIso: new Date(event.atMs).toISOString(),
        },
      );
      next = buildMachineState({
        ...state,
        session: finalizedSession,
        phase: 'completed',
        reviewVisible: false,
        feedbackBanner: makeBanner('success', '挑战完成', '可以查看结算页和错题本。'),
      });
      break;
    }
    case 'RESTART_SESSION': {
      const recreated = createRuntimeSessionState(state.navigation.questionIds, {
        sessionId: state.session.sessionId,
        mode: state.mode,
        createdAtMs: event.payload.nowMs ?? event.atMs,
        questionTimersMs: Object.fromEntries(
          Object.entries(state.session.questionStates)
            .filter(([, item]) => typeof item.timer.limitMs === 'number')
            .map(([questionId, item]) => [questionId, item.timer.limitMs as number]),
        ),
        memoryTags: Object.fromEntries(
          Object.entries(state.session.questionStates)
            .filter(([, item]) => !!item.memoryTag)
            .map(([questionId, item]) => [questionId, item.memoryTag as string]),
        ),
      });
      next = buildMachineState({
        ...state,
        session: recreated,
        draftByQuestionId: {},
        lastJudgeResult: undefined,
        lastSubmission: undefined,
        phase: 'ready',
        reviewVisible: false,
        feedbackBanner: makeBanner('info', '重新开始', '本轮进度已重置。'),
      });
      if (options.autoOpenFirstQuestion && recreated.currentQuestionId) {
        next = openQuestion(next, recreated.currentQuestionId, event.atMs, options.autoStartOnBootstrap);
      }
      break;
    }
    case 'SET_ERROR': {
      next = {
        ...state,
        phase: 'error',
        error: event.payload.message,
        feedbackBanner: makeBanner('error', '出现问题', event.payload.message),
      };
      break;
    }
    case 'CLEAR_ERROR': {
      next = {
        ...state,
        phase: state.session.status === 'completed' ? 'completed' : 'ready',
        error: undefined,
        feedbackBanner: undefined,
      };
      break;
    }
    default: {
      const exhaustive: never = event;
      next = state;
      return exhaustive;
    }
  }

  return appendEventLog(next, event, phaseBefore);
}

export function createEvent<T extends RuntimeMachineEvent['type']>(
  type: T,
  payload: Extract<RuntimeMachineEvent, { type: T }>['payload'],
  atMs = Date.now(),
): Extract<RuntimeMachineEvent, { type: T }> {
  return { type, payload, atMs } as Extract<RuntimeMachineEvent, { type: T }>;
}

export function dispatchRuntimeEvents(
  initialState: RuntimeMachineState,
  events: RuntimeMachineEvent[],
  reducerOptions: RuntimeReducerOptions = {},
): RuntimeMachineState {
  return events.reduce((state, event) => runtimeReducer(state, event, reducerOptions), initialState);
}

export function mapSessionToPlayPageProgress(state: RuntimeMachineState) {
  return buildSessionProgressSnapshot(state.session);
}

function startQuestionFlow(state: RuntimeMachineState, questionId: string, startedAtMs: number): RuntimeMachineState {
  const session = startRuntimeQuestion(state.session, questionId, { startedAtMs, replaceIfActive: true });
  return buildMachineState({
    ...state,
    session,
    currentQuestionId: questionId,
    phase: 'answering',
    reviewVisible: false,
    feedbackBanner: makeBanner('info', '开始作答', '请完成当前题目。'),
  });
}

function openQuestion(state: RuntimeMachineState, questionId: string, atMs: number, autoStart: boolean): RuntimeMachineState {
  const phase = autoStart ? 'answering' : 'ready';
  const next = buildMachineState({
    ...state,
    currentQuestionId: questionId,
    phase,
    reviewVisible: false,
    feedbackBanner: undefined,
  });
  return autoStart ? startQuestionFlow(next, questionId, atMs) : next;
}

function buildMachineState(input: {
  machineId: string;
  mode: RuntimeMachineState['mode'];
  session: RuntimeSessionStateSchema;
  questions: Record<string, RuntimeQuestionPageViewModel>;
  currentQuestionId?: string;
  phase: RuntimeViewPhase;
  draftByQuestionId: Record<string, RuntimeAnswerDraft>;
  lastSubmission?: RuntimeSubmissionPayload;
  lastJudgeResult?: RuntimeMachineState['lastJudgeResult'];
  reviewVisible: boolean;
  feedbackBanner?: RuntimeFeedbackBanner;
  error?: string;
  eventLog: RuntimeMachineState['eventLog'];
  ui?: Partial<RuntimeMachineState['ui']>;
}): RuntimeMachineState {
  const questionIds = Object.keys(input.questions);
  const currentQuestionId = input.currentQuestionId ?? input.session.currentQuestionId ?? questionIds[0];
  const currentQuestion = currentQuestionId ? input.questions[currentQuestionId] : undefined;
  const currentQuestionState = currentQuestionId ? input.session.questionStates[currentQuestionId] : undefined;
  const navIndex = currentQuestionId ? Math.max(0, questionIds.indexOf(currentQuestionId)) : 0;
  const timerRemaining = currentQuestionState?.timer.remainingMs;
  return {
    schemaVersion: '1.0.0',
    machineId: input.machineId,
    mode: input.mode,
    phase: input.phase,
    session: input.session,
    questions: input.questions,
    navigation: {
      currentIndex: navIndex + 1,
      total: questionIds.length,
      questionIds,
    },
    currentQuestionId,
    currentQuestion,
    currentQuestionState,
    draftByQuestionId: input.draftByQuestionId,
    lastSubmission: input.lastSubmission,
    lastJudgeResult: input.lastJudgeResult,
    reviewVisible: input.reviewVisible,
    feedbackBanner: input.feedbackBanner,
    ui: {
      submitting: false,
      submitDisabled: isDraftEmpty(input.draftByQuestionId[currentQuestionId ?? '']?.answer),
      canGoPrev: navIndex > 0,
      canGoNext: navIndex < questionIds.length - 1,
      timerWarning: typeof timerRemaining === 'number' ? timerRemaining <= 5000 : false,
      lastEventType: input.ui?.lastEventType,
      ...input.ui,
    },
    eventLog: input.eventLog,
    error: input.error,
  };
}

function derivePhaseAfterTick(currentPhase: RuntimeViewPhase, session: RuntimeSessionStateSchema, currentQuestionId?: string): RuntimeViewPhase {
  if (!currentQuestionId) return currentPhase;
  const question = session.questionStates[currentQuestionId];
  if (!question) return currentPhase;
  if (question.timer.expired && question.status === 'active') return 'judged';
  if (session.status === 'completed') return 'completed';
  return currentPhase;
}

function buildDraft(
  questionId: string,
  answer: RuntimeSubmissionAnswer | undefined,
  meta: RuntimeAnswerDraft['meta'],
  atMs: number,
): RuntimeAnswerDraft {
  return {
    questionId,
    answer,
    isEmpty: isDraftEmpty(answer),
    completeness: estimateDraftCompleteness(answer),
    meta: {
      ...(meta ?? {}),
      lastChangedAtMs: atMs,
    },
  };
}

function estimateDraftCompleteness(answer: RuntimeSubmissionAnswer | undefined): number {
  if (!answer) return 0;
  switch (answer.kind) {
    case 'numeric':
      return String(answer.value ?? '').trim() ? 1 : 0;
    case 'choice':
      return answer.optionIds.length > 0 ? 1 : 0;
    case 'slot_mapping': {
      const entries = Object.values(answer.mapping);
      if (entries.length === 0) return 0;
      const filled = entries.filter((item) => (Array.isArray(item) ? item.length > 0 : !!item)).length;
      return filled / entries.length;
    }
    case 'grid_fill': {
      const values = Object.values(answer.cells);
      if (values.length === 0) return 0;
      return values.filter((v) => String(v).trim() !== '').length / values.length;
    }
    case 'hotspot_selection':
      return answer.hotspotIds.length > 0 ? 1 : 0;
    case 'sequence':
      return answer.values.length > 0 ? 1 : 0;
    case 'free_text':
      return answer.text.trim() ? 1 : 0;
    case 'custom':
      return Object.keys(answer.payload).length > 0 ? 1 : 0;
    default: {
      const exhaustive: never = answer;
      return exhaustive;
    }
  }
}

function isDraftEmpty(answer: RuntimeSubmissionAnswer | undefined): boolean {
  return estimateDraftCompleteness(answer) === 0;
}

function firstQuestionId(questions: Record<string, RuntimeQuestionPageViewModel>): string | undefined {
  return Object.keys(questions)[0];
}

function hasNextQuestion(state: RuntimeMachineState): boolean {
  return !!findAdjacentQuestionId(state.navigation.questionIds, state.currentQuestionId, 1);
}

function findAdjacentQuestionId(questionIds: string[], currentQuestionId: string | undefined, delta: -1 | 1): string | undefined {
  if (!currentQuestionId) return delta === 1 ? questionIds[0] : undefined;
  const index = questionIds.indexOf(currentQuestionId);
  if (index < 0) return undefined;
  return questionIds[index + delta];
}

function isSessionComplete(session: RuntimeSessionStateSchema): boolean {
  return Object.values(session.questionStates).every((item) => item.status !== 'pending' && item.status !== 'active');
}

function recomputeTotals(session: RuntimeSessionStateSchema): RuntimeSessionStateSchema['totals'] {
  const states = Object.values(session.questionStates);
  return {
    questionCount: states.length,
    answeredCount: states.filter((item) => item.status !== 'pending').length,
    correctCount: states.filter((item) => item.answeredCorrectly).length,
    wrongCount: states.filter((item) => item.status === 'wrong' || item.status === 'timed_out').length,
    skippedCount: states.filter((item) => item.status === 'skipped').length,
    totalStars: states.reduce((sum, item) => sum + item.starsAwarded, 0),
    bestCombo: states.reduce((best, item) => Math.max(best, item.comboAfter), 0),
    currentCombo: states.length ? states[states.length - 1]?.comboAfter ?? 0 : 0,
    totalScore: states.reduce((sum, item) => sum + item.scoreAwarded, 0),
    totalElapsedMs: session.totals.totalElapsedMs,
  };
}

function buildResultMetaMap(questions: Record<string, RuntimeQuestionPageViewModel>) {
  return Object.fromEntries(
    Object.entries(questions).map(([questionId, vm]) => [
      questionId,
      {
        title: vm.question.title,
        moduleId: resolveModuleId(vm.question.roomName),
        difficulty: vm.question.difficulty,
      },
    ]),
  );
}

function buildWrongBookMetaMap(questions: Record<string, RuntimeQuestionPageViewModel>) {
  return Object.fromEntries(
    Object.entries(questions).map(([questionId, vm]) => [
      questionId,
      {
        title: vm.question.title,
        moduleId: resolveModuleId(vm.question.roomName),
        moduleName: vm.question.moduleName,
        subtypeKey: `${vm.question.primaryInteraction}:${questionId}`,
      },
    ]),
  );
}

function resolveModuleId(roomName: string): ModuleId {
  const roomMap: Record<string, ModuleId> = {
    快算王: 'A',
    找规律: 'B',
    排列组合屋: 'C',
    配平高手: 'D',
    图形工程师: 'E',
    空间大师: 'F',
    逻辑神探: 'G',
  };
  return roomMap[roomName] ?? 'A';
}

function appendEventLog(state: RuntimeMachineState, event: RuntimeMachineEvent, phaseBefore: RuntimeViewPhase): RuntimeMachineState {
  const entry = {
    seq: state.eventLog.length + 1,
    type: event.type,
    atMs: event.atMs,
    questionId: resolveQuestionIdForEvent(state, event),
    phaseBefore,
    phaseAfter: state.phase,
    summary: buildEventSummary(state, event),
  };
  return {
    ...state,
    eventLog: [...state.eventLog, entry],
    ui: {
      ...state.ui,
      lastEventType: event.type,
    },
  };
}

function resolveQuestionIdForEvent(state: RuntimeMachineState, event: RuntimeMachineEvent): string | undefined {
  switch (event.type) {
    case 'OPEN_QUESTION':
    case 'CHANGE_DRAFT':
    case 'CLEAR_DRAFT':
      return event.payload.questionId;
    case 'SUBMIT_CURRENT_QUESTION':
    case 'OPEN_REVIEW':
      return event.payload.questionId ?? state.currentQuestionId;
    default:
      return state.currentQuestionId;
  }
}

function buildEventSummary(state: RuntimeMachineState, event: RuntimeMachineEvent): string {
  switch (event.type) {
    case 'START_SESSION':
      return '开始会话';
    case 'OPEN_QUESTION':
      return `打开题目 ${event.payload.questionId}`;
    case 'CHANGE_DRAFT':
      return `更新草稿 ${event.payload.questionId}`;
    case 'SUBMIT_CURRENT_QUESTION':
      return state.lastJudgeResult?.correct ? '提交并判对' : '提交并判题';
    case 'OPEN_REVIEW':
      return '打开解析';
    case 'GO_TO_NEXT_QUESTION':
      return '进入下一题';
    case 'GO_TO_PREVIOUS_QUESTION':
      return '返回上一题';
    case 'FINALIZE_SESSION':
      return '完成整轮挑战';
    case 'RESTART_SESSION':
      return '重新开始会话';
    case 'TIMER_TICK':
      return '刷新计时器';
    case 'PAUSE_SESSION':
      return '暂停';
    case 'RESUME_SESSION':
      return '恢复';
    case 'SKIP_CURRENT_QUESTION':
      return '跳过当前题';
    case 'SET_ERROR':
      return '写入错误';
    case 'CLEAR_ERROR':
      return '清理错误';
    case 'HYDRATE_SESSION':
      return '恢复会话快照';
    case 'BOOTSTRAP_SESSION':
      return '初始化状态机';
    case 'CLEAR_DRAFT':
      return `清空草稿 ${event.payload.questionId}`;
    default: {
      const exhaustive: never = event;
      return exhaustive;
    }
  }
}

function makeBanner(tone: RuntimeFeedbackBanner['tone'], title: string, text: string): RuntimeFeedbackBanner {
  return { tone, title, text, visible: true };
}
