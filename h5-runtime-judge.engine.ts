import type { ResultPageData, ResultQuestionSummary, WrongBookPageData } from './h5-question-bank.types';
import type { QuestionAnswer, WrongReason } from './h5-question-content.schema';
import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';
import {
  DEFAULT_RUNTIME_JUDGE_POLICY,
  type BuildResultPageInput,
  type BuildWrongBookInput,
  type CreateSessionOptions,
  type JudgeFeedbackItem,
  type JudgeSubmissionOptions,
  type QuestionJudgeSnapshot,
  type RuntimeJudgeEngineDeps,
  type RuntimeJudgePolicy,
  type RuntimeJudgeResult,
  type RuntimeQuestionSessionState,
  type RuntimeQuestionSessionStatus,
  type RuntimeSessionStateSchema,
  type RuntimeSubmissionAnswer,
  type RuntimeSubmissionPayload,
  type SessionProgressSnapshot,
  type StartQuestionOptions,
  type UpdateTimerOptions,
} from './h5-runtime-judge.schema';

export const RUNTIME_JUDGE_ENGINE_VERSION = '1.0.0' as const;

function mergePolicy(policy?: Partial<RuntimeJudgePolicy>): RuntimeJudgePolicy {
  return {
    ...DEFAULT_RUNTIME_JUDGE_POLICY,
    ...policy,
    starThresholds: {
      ...DEFAULT_RUNTIME_JUDGE_POLICY.starThresholds,
      ...(policy?.starThresholds ?? {}),
    },
    combo: {
      ...DEFAULT_RUNTIME_JUDGE_POLICY.combo,
      ...(policy?.combo ?? {}),
    },
  };
}

function getNow(deps?: RuntimeJudgeEngineDeps, explicitNowMs?: number): number {
  if (typeof explicitNowMs === 'number') {
    return explicitNowMs;
  }
  return deps?.nowMs?.() ?? Date.now();
}

function cloneQuestionState(state: RuntimeQuestionSessionState): RuntimeQuestionSessionState {
  return {
    ...state,
    timer: { ...state.timer },
    latestSubmission: state.latestSubmission ? { ...state.latestSubmission, meta: state.latestSubmission.meta ? { ...state.latestSubmission.meta } : undefined, answer: cloneSubmissionAnswer(state.latestSubmission.answer) } : undefined,
    latestJudgeResult: state.latestJudgeResult ? { ...state.latestJudgeResult, feedback: [...state.latestJudgeResult.feedback], wrongReasons: [...state.latestJudgeResult.wrongReasons], trace: { ...state.latestJudgeResult.trace }, questionSnapshot: { ...state.latestJudgeResult.questionSnapshot }, submission: { ...state.latestJudgeResult.submission, meta: state.latestJudgeResult.submission.meta ? { ...state.latestJudgeResult.submission.meta } : undefined, answer: cloneSubmissionAnswer(state.latestJudgeResult.submission.answer) } } : undefined,
    submissionHistory: state.submissionHistory.map((item) => ({
      submission: {
        ...item.submission,
        meta: item.submission.meta ? { ...item.submission.meta } : undefined,
        answer: cloneSubmissionAnswer(item.submission.answer),
      },
      result: { ...item.result },
    })),
  };
}

function cloneSubmissionAnswer(answer: RuntimeSubmissionAnswer): RuntimeSubmissionAnswer {
  switch (answer.kind) {
    case 'numeric':
      return { ...answer };
    case 'choice':
      return { ...answer, optionIds: [...answer.optionIds] };
    case 'slot_mapping':
      return { ...answer, mapping: Object.fromEntries(Object.entries(answer.mapping).map(([k, v]) => [k, Array.isArray(v) ? [...v] : v])) };
    case 'grid_fill':
      return { ...answer, cells: { ...answer.cells } };
    case 'hotspot_selection':
      return { ...answer, hotspotIds: [...answer.hotspotIds] };
    case 'sequence':
      return { ...answer, values: [...answer.values] };
    case 'free_text':
      return { ...answer };
    case 'custom':
      return { ...answer, payload: { ...answer.payload } };
    default: {
      const exhaustive: never = answer;
      return exhaustive;
    }
  }
}

export function createRuntimeSessionState(questionOrder: string[], options: CreateSessionOptions = {}): RuntimeSessionStateSchema {
  const createdAtMs = options.createdAtMs ?? Date.now();
  const questionStates = Object.fromEntries(
    questionOrder.map((questionId, index) => [
      questionId,
      {
        questionId,
        orderIndex: index,
        status: 'pending' as const,
        attemptsUsed: 0,
        answeredCorrectly: false,
        starsAwarded: 0,
        scoreAwarded: 0,
        comboAfter: 0,
        timer: {
          limitMs: options.questionTimersMs?.[questionId],
          elapsedMs: 0,
          remainingMs: options.questionTimersMs?.[questionId],
          expired: false,
        },
        submissionHistory: [],
        reviewOpened: false,
        memoryTag: options.memoryTags?.[questionId],
      } satisfies RuntimeQuestionSessionState,
    ]),
  );

  return {
    schemaVersion: '1.0.0',
    sessionId: options.sessionId ?? `runtime-session-${createdAtMs}`,
    mode: options.mode ?? 'mixed_challenge',
    status: 'idle',
    createdAtMs,
    currentQuestionId: questionOrder[0],
    questionOrder: [...questionOrder],
    timer: {
      startedAtMs: createdAtMs,
      lastTickAtMs: createdAtMs,
      elapsedMs: 0,
      paused: false,
      pausedAccumulatedMs: 0,
    },
    questionStates,
    totals: {
      questionCount: questionOrder.length,
      answeredCount: 0,
      correctCount: 0,
      wrongCount: 0,
      skippedCount: 0,
      totalStars: 0,
      bestCombo: 0,
      currentCombo: 0,
      totalScore: 0,
      totalElapsedMs: 0,
    },
  };
}

export function startRuntimeQuestion(
  session: RuntimeSessionStateSchema,
  questionId: string,
  options: StartQuestionOptions = {},
): RuntimeSessionStateSchema {
  const state = session.questionStates[questionId];
  if (!state) {
    throw new Error(`Question state not found: ${questionId}`);
  }
  if (state.status === 'active' && !options.replaceIfActive) {
    return session;
  }

  const startedAtMs = options.startedAtMs ?? Date.now();
  const clonedState = cloneQuestionState(state);
  const limitMs = clonedState.timer.limitMs;
  clonedState.status = 'active';
  clonedState.timer.startedAtMs = startedAtMs;
  clonedState.timer.lastTickAtMs = startedAtMs;
  clonedState.timer.elapsedMs = 0;
  clonedState.timer.remainingMs = typeof limitMs === 'number' ? limitMs : undefined;
  clonedState.timer.expired = false;

  return {
    ...session,
    status: 'running',
    currentQuestionId: questionId,
    timer: {
      ...session.timer,
      startedAtMs: session.timer.startedAtMs || startedAtMs,
      lastTickAtMs: startedAtMs,
      paused: false,
    },
    questionStates: {
      ...session.questionStates,
      [questionId]: clonedState,
    },
  };
}

export function updateRuntimeSessionTimer(
  session: RuntimeSessionStateSchema,
  options: UpdateTimerOptions = {},
): RuntimeSessionStateSchema {
  const nowMs = options.nowMs ?? Date.now();
  const deltaMs = Math.max(0, nowMs - session.timer.lastTickAtMs);
  const nextSession: RuntimeSessionStateSchema = {
    ...session,
    timer: {
      ...session.timer,
      lastTickAtMs: nowMs,
      elapsedMs: session.timer.elapsedMs + deltaMs,
    },
    totals: {
      ...session.totals,
      totalElapsedMs: session.timer.elapsedMs + deltaMs,
    },
    questionStates: { ...session.questionStates },
  };

  const currentQuestionId = session.currentQuestionId;
  if (!currentQuestionId) {
    return nextSession;
  }

  const currentState = session.questionStates[currentQuestionId];
  if (!currentState || currentState.status !== 'active') {
    return nextSession;
  }

  const nextQuestionState = cloneQuestionState(currentState);
  nextQuestionState.timer.lastTickAtMs = nowMs;
  nextQuestionState.timer.elapsedMs += deltaMs;
  if (typeof nextQuestionState.timer.limitMs === 'number') {
    nextQuestionState.timer.remainingMs = Math.max(0, nextQuestionState.timer.limitMs - nextQuestionState.timer.elapsedMs);
    if (nextQuestionState.timer.remainingMs === 0) {
      nextQuestionState.timer.expired = true;
      nextQuestionState.status = 'timed_out';
    }
  }

  nextSession.questionStates[currentQuestionId] = nextQuestionState;
  return nextSession;
}

export function buildSessionProgressSnapshot(session: RuntimeSessionStateSchema): SessionProgressSnapshot {
  return {
    sessionId: session.sessionId,
    currentIndex: Math.min(session.totals.answeredCount + 1, Math.max(session.totals.questionCount, 1)),
    total: session.totals.questionCount,
    correct: session.totals.correctCount,
    stars: session.totals.totalStars,
    combo: session.totals.currentCombo,
    elapsedSeconds: Math.floor(session.totals.totalElapsedMs / 1000),
    accuracy: session.totals.answeredCount > 0 ? Number((session.totals.correctCount / session.totals.answeredCount).toFixed(4)) : 0,
    totalScore: session.totals.totalScore,
    bestCombo: session.totals.bestCombo,
  };
}

export function judgeRuntimeQuestionSubmission(
  page: RuntimeQuestionPageViewModel,
  session: RuntimeSessionStateSchema,
  submission: RuntimeSubmissionPayload,
  deps: RuntimeJudgeEngineDeps = {},
  options: JudgeSubmissionOptions = {},
): { session: RuntimeSessionStateSchema; result: RuntimeJudgeResult } {
  const policy = mergePolicy(deps.policy);
  const nowMs = getNow(deps, options.nowMs);
  const sessionAfterTick = updateRuntimeSessionTimer(session, { nowMs });
  const state = sessionAfterTick.questionStates[submission.questionId];
  if (!state) {
    throw new Error(`Question state not found: ${submission.questionId}`);
  }
  const limitMs = state.timer.limitMs;
  const timeSpentMs = submission.elapsedMs ?? state.timer.elapsedMs;
  const timedOut = Boolean(state.timer.expired || (typeof limitMs === 'number' && timeSpentMs >= limitMs));
  const allowLateSubmit = options.allowLateSubmit ?? false;
  const answer = page.judge.answer;

  const compare = answer
    ? evaluateSubmission(answer, submission.answer)
    : {
        matched: false,
        primaryReasonCode: 'unsupported_answer_kind' as const,
        feedback: [makeEngineFeedback('unsupported_answer_kind', '暂不支持的判题类型', '当前题目没有可用的本地判题数据。')],
        trace: {
          expectedKind: 'free_text' as QuestionAnswer['kind'],
          submissionKind: submission.answer.kind,
          matched: false,
        },
      };

  const isCorrect = timedOut && !allowLateSubmit ? false : compare.matched;
  const starsAwarded = computeStars({
    correct: isCorrect,
    limitMs,
    timeSpentMs,
    attemptsUsed: state.attemptsUsed + 1,
    policy,
  });
  const comboBefore = sessionAfterTick.totals.currentCombo;
  const comboAfter = isCorrect
    ? comboBefore + policy.combo.correctBaseIncrement
    : policy.combo.resetOnWrong
      ? 0
      : Math.max(0, comboBefore - policy.combo.wrongPenalty);
  const scoreAwarded = isCorrect ? policy.baseScorePerCorrect + comboAfter * policy.comboBonusMultiplier : 0;

  const feedback = [...compare.feedback];
  if (timedOut && !allowLateSubmit) {
    feedback.unshift(makeEngineFeedback('time_expired', '超时提交', '本题已超出倒计时，按错误处理。'));
  }
  if (isCorrect) {
    feedback.unshift(makeEngineFeedback('correct', '回答正确', `本题答对，获得 ${starsAwarded} 星。`, 'info'));
  }

  const wrongReasons = isCorrect ? [] : resolveWrongReasons(page.review.explanation.wrongReasons ?? [], compare.primaryReasonCode);

  const snapshot: QuestionJudgeSnapshot = {
    questionId: submission.questionId,
    status: isCorrect ? 'correct' : timedOut && !allowLateSubmit ? 'timed_out' : 'wrong',
    attemptsUsed: state.attemptsUsed + 1,
    answeredCorrectly: isCorrect,
    starsAwarded,
    comboAfter,
    scoreAwarded,
    timeSpentMs,
  };

  const result: RuntimeJudgeResult = {
    questionId: submission.questionId,
    submission,
    correct: isCorrect,
    scoreAwarded,
    starsAwarded,
    comboBefore,
    comboAfter,
    timeSpentMs,
    timedOut: timedOut && !allowLateSubmit,
    primaryReasonCode: isCorrect ? 'correct' : timedOut && !allowLateSubmit ? 'time_expired' : compare.primaryReasonCode,
    feedback,
    wrongReasons,
    trace: compare.trace,
    questionSnapshot: snapshot,
  };

  return {
    session: applyJudgeResultToSession(sessionAfterTick, result),
    result,
  };
}

export function applyJudgeResultToSession(
  session: RuntimeSessionStateSchema,
  result: RuntimeJudgeResult,
): RuntimeSessionStateSchema {
  const questionState = session.questionStates[result.questionId];
  if (!questionState) {
    throw new Error(`Question state not found: ${result.questionId}`);
  }

  const nextQuestionState = cloneQuestionState(questionState);
  nextQuestionState.attemptsUsed += 1;
  nextQuestionState.answeredCorrectly = result.correct;
  nextQuestionState.starsAwarded = Math.max(nextQuestionState.starsAwarded, result.starsAwarded);
  nextQuestionState.scoreAwarded += result.scoreAwarded;
  nextQuestionState.comboAfter = result.comboAfter;
  nextQuestionState.latestSubmission = {
    ...result.submission,
    answer: cloneSubmissionAnswer(result.submission.answer),
    meta: result.submission.meta ? { ...result.submission.meta } : undefined,
  };
  nextQuestionState.latestJudgeResult = {
    ...result,
    feedback: result.feedback.map((item) => ({ ...item })),
    wrongReasons: result.wrongReasons.map((item) => ({ ...item })),
    trace: { ...result.trace },
    questionSnapshot: { ...result.questionSnapshot },
    submission: {
      ...result.submission,
      answer: cloneSubmissionAnswer(result.submission.answer),
      meta: result.submission.meta ? { ...result.submission.meta } : undefined,
    },
  };
  nextQuestionState.submissionHistory.push({
    submission: {
      ...result.submission,
      answer: cloneSubmissionAnswer(result.submission.answer),
      meta: result.submission.meta ? { ...result.submission.meta } : undefined,
    },
    result: {
      correct: result.correct,
      scoreAwarded: result.scoreAwarded,
      starsAwarded: result.starsAwarded,
      timeSpentMs: result.timeSpentMs,
      primaryReasonCode: result.primaryReasonCode,
    },
  });
  nextQuestionState.status = result.questionSnapshot.status;
  nextQuestionState.timer.elapsedMs = result.timeSpentMs;
  nextQuestionState.timer.remainingMs = typeof nextQuestionState.timer.limitMs === 'number'
    ? Math.max(0, nextQuestionState.timer.limitMs - result.timeSpentMs)
    : undefined;
  nextQuestionState.timer.expired = result.timedOut;

  const nextQuestionStates = {
    ...session.questionStates,
    [result.questionId]: nextQuestionState,
  };

  const answeredStates = Object.values(nextQuestionStates).filter((item) => ['correct', 'wrong', 'timed_out', 'skipped', 'reviewed', 'submitted'].includes(item.status));
  const correctCount = Object.values(nextQuestionStates).filter((item) => item.answeredCorrectly).length;
  const wrongCount = answeredStates.length - correctCount;
  const totalStars = Object.values(nextQuestionStates).reduce((sum, item) => sum + item.starsAwarded, 0);
  const totalScore = Object.values(nextQuestionStates).reduce((sum, item) => sum + item.scoreAwarded, 0);
  const bestCombo = Math.max(session.totals.bestCombo, result.comboAfter);
  const nextQuestionId = findNextPendingQuestion(session.questionOrder, nextQuestionStates, result.questionId);
  const completed = answeredStates.length >= session.questionOrder.length;

  return {
    ...session,
    status: completed ? 'completed' : 'running',
    currentQuestionId: nextQuestionId,
    questionStates: nextQuestionStates,
    totals: {
      ...session.totals,
      answeredCount: answeredStates.length,
      correctCount,
      wrongCount,
      totalStars,
      bestCombo,
      currentCombo: result.comboAfter,
      totalScore,
    },
  };
}

export function markQuestionReviewOpened(
  session: RuntimeSessionStateSchema,
  questionId: string,
): RuntimeSessionStateSchema {
  const state = session.questionStates[questionId];
  if (!state) {
    throw new Error(`Question state not found: ${questionId}`);
  }
  const nextState = cloneQuestionState(state);
  nextState.reviewOpened = true;
  if (nextState.status === 'wrong' || nextState.status === 'correct' || nextState.status === 'timed_out') {
    nextState.status = 'reviewed';
  }
  return {
    ...session,
    questionStates: {
      ...session.questionStates,
      [questionId]: nextState,
    },
  };
}

export function buildResultPageData(input: BuildResultPageInput): ResultPageData {
  const { session, questionMetaMap } = input;
  const questionSummaries: ResultQuestionSummary[] = session.questionOrder.map((questionId) => {
    const state = session.questionStates[questionId];
    const meta = questionMetaMap[questionId];
    return {
      questionId,
      title: meta?.title ?? questionId,
      moduleId: meta?.moduleId ?? 'A',
      difficulty: meta?.difficulty ?? 1,
      correct: state?.answeredCorrectly ?? false,
      timeSpentSeconds: Math.round((state?.timer.elapsedMs ?? 0) / 1000),
    };
  });
  const accuracy = session.totals.answeredCount > 0 ? session.totals.correctCount / session.totals.answeredCount : 0;
  return {
    sessionId: session.sessionId,
    mode: session.mode,
    total: session.totals.questionCount,
    correct: session.totals.correctCount,
    accuracy,
    totalStars: session.totals.totalStars,
    totalSeconds: Math.round(session.totals.totalElapsedMs / 1000),
    newlyUnlockedBadge: session.totals.bestCombo >= 5 ? '连击高手' : undefined,
    questionSummaries,
    recommendedRetryQuestionIds: questionSummaries.filter((item) => !item.correct).map((item) => item.questionId),
  };
}

export function buildWrongBookPageData(input: BuildWrongBookInput): WrongBookPageData {
  const groupedByModule: WrongBookPageData['groupedByModule'] = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
  };
  for (const questionId of input.session.questionOrder) {
    const state = input.session.questionStates[questionId];
    if (!state || state.answeredCorrectly || state.attemptsUsed === 0) {
      continue;
    }
    const meta = input.questionMetaMap[questionId];
    const entry = {
      questionId,
      title: meta?.title ?? questionId,
      moduleId: meta?.moduleId ?? 'A',
      moduleName: meta?.moduleName ?? '未分组模块',
      subtypeKey: meta?.subtypeKey ?? 'unknown',
      wrongCount: state.submissionHistory.filter((item) => !item.result.correct).length,
      lastSeenAt: input.generatedAtIso,
      recommendedMode: recommendModeByModule(meta?.moduleId ?? 'A'),
    };
    groupedByModule[entry.moduleId].push(entry);
  }

  const dailyRetryQuestionIds = Object.values(groupedByModule)
    .flat()
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .slice(0, 10)
    .map((item) => item.questionId);

  return {
    totalWrongQuestions: Object.values(groupedByModule).flat().length,
    groupedByModule,
    dailyRetryQuestionIds,
  };
}

export function finalizeRuntimeSession(
  session: RuntimeSessionStateSchema,
  resultInput: BuildResultPageInput,
  wrongBookInput: BuildWrongBookInput,
): RuntimeSessionStateSchema {
  const resultPage = buildResultPageData(resultInput);
  const wrongBook = buildWrongBookPageData(wrongBookInput);
  return {
    ...session,
    status: 'completed',
    resultPage,
    wrongBook,
  };
}

function computeStars(input: {
  correct: boolean;
  limitMs?: number;
  timeSpentMs: number;
  attemptsUsed: number;
  policy: RuntimeJudgePolicy;
}): number {
  if (!input.correct) {
    return 0;
  }
  if (!input.limitMs || input.limitMs <= 0) {
    if (input.attemptsUsed === 1) {
      return 3;
    }
    if (input.attemptsUsed === 2) {
      return 2;
    }
    return 1;
  }
  const remainingRatio = Math.max(0, input.limitMs - input.timeSpentMs) / input.limitMs;
  const attemptsGate = !input.policy.starThresholds.firstAttemptBonusOnly || input.attemptsUsed === 1;
  if (attemptsGate && remainingRatio >= input.policy.starThresholds.threeStarMinRemainingRatio) {
    return 3;
  }
  if (remainingRatio >= input.policy.starThresholds.twoStarMinRemainingRatio) {
    return 2;
  }
  return 1;
}

function evaluateSubmission(
  expected: QuestionAnswer,
  submission: RuntimeSubmissionAnswer,
): {
  matched: boolean;
  primaryReasonCode: string;
  feedback: JudgeFeedbackItem[];
  trace: RuntimeJudgeResult['trace'];
} {
  switch (expected.kind) {
    case 'numeric': {
      if (submission.kind !== 'numeric') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = expected.acceptedValues.map((item) => normalizeScalar(item, { trimWhitespace: expected.trimWhitespace, ignoreCase: false, ignoreLeadingZeros: expected.ignoreLeadingZeros }));
      const normalizedSubmission = normalizeScalar(submission.value, { trimWhitespace: expected.trimWhitespace, ignoreCase: false, ignoreLeadingZeros: expected.ignoreLeadingZeros });
      const matched = normalizedExpected.includes(normalizedSubmission);
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : isEmptyValue(submission.value) ? 'empty_submission' : 'incorrect_value',
        feedback: matched ? [] : [makeEngineFeedback(isEmptyValue(submission.value) ? 'empty_submission' : 'incorrect_value', isEmptyValue(submission.value) ? '未填写答案' : '数值不正确', isEmptyValue(submission.value) ? '请先输入答案再提交。' : '这题的结果和标准答案不一致。')],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'single_choice': {
      if (submission.kind !== 'choice') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = [...expected.correctOptionIds].sort();
      const normalizedSubmission = [...submission.optionIds].sort();
      const matched = arraysEqual(normalizedExpected, normalizedSubmission);
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : normalizedSubmission.length === 0 ? 'empty_submission' : 'incorrect_option',
        feedback: matched ? [] : [makeEngineFeedback(normalizedSubmission.length === 0 ? 'empty_submission' : 'incorrect_option', normalizedSubmission.length === 0 ? '还没有选择' : '选项不正确', normalizedSubmission.length === 0 ? '请选择一个答案。' : '你选择的选项和标准答案不一致。', 'warning', normalizedSubmission)],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'multi_choice': {
      if (submission.kind !== 'choice') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = [...expected.correctOptionIds].sort();
      const normalizedSubmission = uniqueSorted(submission.optionIds);
      const matched = arraysEqual(normalizedExpected, normalizedSubmission);
      const hasExtra = normalizedSubmission.some((item) => !normalizedExpected.includes(item));
      const reason = normalizedSubmission.length === 0 ? 'empty_submission' : hasExtra ? 'extra_selection' : 'incorrect_selection';
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : reason,
        feedback: matched ? [] : [makeEngineFeedback(reason, reason === 'extra_selection' ? '多选了区域' : normalizedSubmission.length === 0 ? '还没有选择' : '选择不完整', reason === 'extra_selection' ? '你选到了不属于答案的项目。' : normalizedSubmission.length === 0 ? '请选择至少一个答案。' : '你有漏选或错选。', 'warning', normalizedSubmission)],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'slot_mapping': {
      if (submission.kind !== 'slot_mapping') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = normalizeSlotMapping(expected.mapping, expected.orderSensitive ?? false);
      const normalizedSubmission = normalizeSlotMapping(submission.mapping, expected.orderSensitive ?? false);
      const missingKeys = Object.keys(normalizedExpected).filter((key) => !(key in normalizedSubmission));
      const matched = arraysEqual(JSON.stringify(normalizedExpected), JSON.stringify(normalizedSubmission));
      const reason = missingKeys.length > 0 ? 'missing_slot' : 'incorrect_mapping';
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : reason,
        feedback: matched ? [] : [makeEngineFeedback(reason, reason === 'missing_slot' ? '还有空槽未填' : '拖拽位置不对', reason === 'missing_slot' ? '请检查是不是还有槽位没放内容。' : '有些数字或符号没有拖到正确的位置。', 'warning', missingKeys)],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'grid_fill': {
      if (submission.kind !== 'grid_fill') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = Object.fromEntries(expected.cells.map((item) => [item.cellId, normalizeScalar(item.value, { trimWhitespace: true, ignoreCase: false })]));
      const normalizedSubmission = Object.fromEntries(Object.entries(submission.cells).map(([key, value]) => [key, normalizeScalar(value, { trimWhitespace: true, ignoreCase: false })]));
      const matched = arraysEqual(JSON.stringify(normalizedExpected), JSON.stringify(normalizedSubmission));
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : 'incorrect_grid',
        feedback: matched ? [] : [makeEngineFeedback('incorrect_grid', '网格填数不正确', '请检查每个格子的数字和条件是否一致。')],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'hotspot_selection': {
      if (submission.kind !== 'hotspot_selection') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = uniqueSorted(expected.hotspotIds);
      const normalizedSubmission = uniqueSorted(submission.hotspotIds);
      const matched = expected.selectionMode === 'exact'
        ? arraysEqual(normalizedExpected, normalizedSubmission)
        : normalizedExpected.every((item) => normalizedSubmission.includes(item));
      const reason = normalizedSubmission.some((item) => !normalizedExpected.includes(item)) ? 'extra_selection' : 'incorrect_selection';
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : normalizedSubmission.length === 0 ? 'empty_submission' : reason,
        feedback: matched ? [] : [makeEngineFeedback(normalizedSubmission.length === 0 ? 'empty_submission' : reason, normalizedSubmission.length === 0 ? '还没有点击区域' : reason === 'extra_selection' ? '多点了区域' : '区域选择不完整', normalizedSubmission.length === 0 ? '请点击图上的答案区域。' : reason === 'extra_selection' ? '你点到了不属于答案的区域。' : '还差一些应该选中的区域。', 'warning', normalizedSubmission)],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'sequence': {
      if (submission.kind !== 'sequence') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = expected.values.map((item) => normalizeScalar(item, { trimWhitespace: true, ignoreCase: false }));
      const normalizedSubmission = submission.values.map((item) => normalizeScalar(item, { trimWhitespace: true, ignoreCase: false }));
      const matched = arraysEqual(normalizedExpected, normalizedSubmission);
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : 'incorrect_sequence',
        feedback: matched ? [] : [makeEngineFeedback('incorrect_sequence', '顺序不正确', '请检查填写的顺序是否和题目要求一致。')],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    case 'free_text': {
      if (submission.kind !== 'free_text') {
        return mismatchByKind(expected.kind, submission.kind);
      }
      const normalizedExpected = expected.acceptedTexts.map((item) => normalizeScalar(item, { trimWhitespace: expected.trimWhitespace, ignoreCase: expected.ignoreCase }));
      const normalizedSubmission = normalizeScalar(submission.text, { trimWhitespace: expected.trimWhitespace, ignoreCase: expected.ignoreCase });
      const matched = normalizedExpected.includes(normalizedSubmission);
      return {
        matched,
        primaryReasonCode: matched ? 'correct' : isEmptyValue(submission.text) ? 'empty_submission' : 'incorrect_text',
        feedback: matched ? [] : [makeEngineFeedback(isEmptyValue(submission.text) ? 'empty_submission' : 'incorrect_text', isEmptyValue(submission.text) ? '未填写答案' : '文字答案不正确', isEmptyValue(submission.text) ? '请输入答案再提交。' : '输入的文字和标准答案不一致。')],
        trace: {
          expectedKind: expected.kind,
          submissionKind: submission.kind,
          normalizedExpected,
          normalizedSubmission,
          matched,
        },
      };
    }
    default: {
      const unreachableExpected: never = expected;
      void unreachableExpected;
      return mismatchByKind('free_text', submission.kind);
    }
  }
}

function mismatchByKind(expectedKind: QuestionAnswer['kind'], submissionKind: RuntimeSubmissionAnswer['kind']) {
  return {
    matched: false,
    primaryReasonCode: 'unsupported_answer_kind',
    feedback: [makeEngineFeedback('unsupported_answer_kind', '提交格式不匹配', `当前题目需要 ${expectedKind} 类型答案，但收到的是 ${submissionKind}。`)],
    trace: {
      expectedKind,
      submissionKind,
      matched: false,
    },
  };
}

function makeEngineFeedback(
  code: string,
  title: string,
  text: string,
  severity: 'info' | 'warning' | 'error' = 'error',
  relatedIds?: string[],
): JudgeFeedbackItem {
  return {
    code,
    title,
    text,
    severity,
    source: 'engine',
    relatedIds,
  };
}

function resolveWrongReasons(contentWrongReasons: WrongReason[], primaryReasonCode: string): WrongReason[] {
  if (contentWrongReasons.length === 0) {
    return [];
  }
  const exact = contentWrongReasons.filter((item) => item.code === primaryReasonCode);
  if (exact.length > 0) {
    return exact;
  }
  return [contentWrongReasons[0]];
}

function normalizeScalar(
  value: string | number,
  options: { trimWhitespace?: boolean; ignoreCase?: boolean; ignoreLeadingZeros?: boolean },
): string {
  let result = String(value);
  if (options.trimWhitespace) {
    result = result.trim();
  }
  if (options.ignoreLeadingZeros) {
    result = result.replace(/^0+(?=\d)/, '');
    if (result === '') {
      result = '0';
    }
  }
  if (options.ignoreCase) {
    result = result.toLowerCase();
  }
  return result;
}

function normalizeSlotMapping(mapping: Record<string, string | string[]>, orderSensitive: boolean): Record<string, string | string[]> {
  return Object.fromEntries(
    Object.entries(mapping)
      .sort(([a], [b]) => a.localeCompare(b, 'zh-CN'))
      .map(([slotId, value]) => [slotId, Array.isArray(value) ? (orderSensitive ? [...value] : [...value].sort()) : value]),
  );
}

function arraysEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function isEmptyValue(value: string | number): boolean {
  return String(value).trim().length === 0;
}

function findNextPendingQuestion(
  questionOrder: string[],
  states: Record<string, RuntimeQuestionSessionState>,
  currentQuestionId: string,
): string | undefined {
  const currentIndex = questionOrder.indexOf(currentQuestionId);
  const ordered = [...questionOrder.slice(currentIndex + 1), ...questionOrder.slice(0, currentIndex + 1)];
  return ordered.find((questionId) => states[questionId]?.attemptsUsed === 0);
}

function recommendModeByModule(moduleId: WrongBookPageData['groupedByModule'][keyof WrongBookPageData['groupedByModule']][number]['moduleId']) {
  switch (moduleId) {
    case 'A':
      return 'speed_run' as const;
    case 'B':
      return 'topic_campaign' as const;
    case 'C':
      return 'drag_and_drop' as const;
    case 'D':
      return 'drag_and_drop' as const;
    case 'E':
      return 'click_count' as const;
    case 'F':
      return 'spatial_observer' as const;
    case 'G':
      return 'topic_campaign' as const;
    default:
      return 'topic_campaign' as const;
  }
}
