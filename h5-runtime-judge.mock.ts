import type { RuntimeSubmissionPayload } from './h5-runtime-judge.schema';
import { mockRuntimeQuestionPageMap } from './h5-runtime-adapter.mock';
import {
  buildResultPageData,
  buildSessionProgressSnapshot,
  buildWrongBookPageData,
  createRuntimeSessionState,
  finalizeRuntimeSession,
  judgeRuntimeQuestionSubmission,
  markQuestionReviewOpened,
  startRuntimeQuestion,
} from './h5-runtime-judge.engine';

const mockQuestionIds = ['36Y-1', '36Y-2', '36Y-10', '36Y-7', '36Y-19', '34W-20', '34Y-18'] as const;

const questionMetaMap = Object.fromEntries(
  mockQuestionIds.map((questionId) => {
    const page = mockRuntimeQuestionPageMap[questionId];
    return [
      questionId,
      {
        title: page.question.title,
        moduleId: page.question.questionId.startsWith('36Y-19') ? 'G' : inferModuleId(page.question.moduleName),
        difficulty: page.question.difficulty,
        moduleName: page.question.moduleName,
        subtypeKey: page.review.memoryTag ?? `${questionId}-subtype`,
      },
    ];
  }),
);

function inferModuleId(moduleName: string) {
  if (moduleName.includes('快算')) return 'A' as const;
  if (moduleName.includes('规律')) return 'B' as const;
  if (moduleName.includes('枚举')) return 'C' as const;
  if (moduleName.includes('等量')) return 'D' as const;
  if (moduleName.includes('平面')) return 'E' as const;
  if (moduleName.includes('立体')) return 'F' as const;
  if (moduleName.includes('逻辑')) return 'G' as const;
  return 'A' as const;
}

export const mockJudgeSubmissionMap: Record<string, { correct: RuntimeSubmissionPayload; wrong?: RuntimeSubmissionPayload }> = {
  '36Y-1': {
    correct: { questionId: '36Y-1', submittedAtMs: 1000, elapsedMs: 3500, answer: { kind: 'numeric', value: '100' } },
    wrong: { questionId: '36Y-1', submittedAtMs: 1000, elapsedMs: 6000, answer: { kind: 'numeric', value: '63' } },
  },
  '36Y-2': {
    correct: { questionId: '36Y-2', submittedAtMs: 1000, elapsedMs: 8000, answer: { kind: 'choice', optionIds: ['o2'] } },
    wrong: { questionId: '36Y-2', submittedAtMs: 1000, elapsedMs: 12000, answer: { kind: 'choice', optionIds: ['o1'] } },
  },
  '36Y-10': {
    correct: { questionId: '36Y-10', submittedAtMs: 1000, elapsedMs: 14000, answer: { kind: 'hotspot_selection', hotspotIds: ['sq-1', 'sq-2', 'sq-3', 'sq-4', 'sq-big'] } },
    wrong: { questionId: '36Y-10', submittedAtMs: 1000, elapsedMs: 18000, answer: { kind: 'hotspot_selection', hotspotIds: ['sq-1', 'sq-2', 'sq-3', 'sq-4'] } },
  },
  '36Y-7': {
    correct: { questionId: '36Y-7', submittedAtMs: 1000, elapsedMs: 11000, answer: { kind: 'choice', optionIds: ['o3'] } },
    wrong: { questionId: '36Y-7', submittedAtMs: 1000, elapsedMs: 20000, answer: { kind: 'choice', optionIds: ['o4'] } },
  },
  '36Y-19': {
    correct: {
      questionId: '36Y-19',
      submittedAtMs: 1000,
      elapsedMs: 42000,
      answer: {
        kind: 'grid_fill',
        cells: { r1c2: 2, r1c3: 3, r1c4: 4, r2c1: 3, r2c4: 1, r3c1: 4, r3c4: 2, r4c1: 2, r4c2: 1, r4c3: 4 },
      },
    },
  },
  '34W-20': {
    correct: { questionId: '34W-20', submittedAtMs: 1000, elapsedMs: 9000, answer: { kind: 'choice', optionIds: ['o2'] } },
  },
  '34Y-18': {
    correct: {
      questionId: '34Y-18',
      submittedAtMs: 1000,
      elapsedMs: 16000,
      answer: { kind: 'slot_mapping', mapping: { 'slot-a': 'token-20', 'slot-b': 'token-21', 'slot-c': 'token-22', 'slot-d': 'token-23', 'slot-e': 'token-24', 'slot-f': 'token-25', 'slot-g': 'token-26' } },
    },
  },
};

let rollingSession = createRuntimeSessionState([...mockQuestionIds], {
  sessionId: 'judge-demo-session',
  mode: 'mixed_challenge',
  createdAtMs: 0,
  questionTimersMs: {
    '36Y-1': 15000,
    '36Y-2': 20000,
    '36Y-10': 30000,
    '36Y-7': 35000,
    '36Y-19': 60000,
    '34W-20': 20000,
    '34Y-18': 30000,
  },
  memoryTags: Object.fromEntries(mockQuestionIds.map((id) => [id, mockRuntimeQuestionPageMap[id].review.memoryTag ?? id])),
});

export const mockJudgeRoundTrip = mockQuestionIds.map((questionId, index) => {
  rollingSession = startRuntimeQuestion(rollingSession, questionId, { startedAtMs: index * 20000 });
  const page = mockRuntimeQuestionPageMap[questionId];
  const submission = index % 3 === 1 && mockJudgeSubmissionMap[questionId].wrong ? mockJudgeSubmissionMap[questionId].wrong! : mockJudgeSubmissionMap[questionId].correct;
  const judged = judgeRuntimeQuestionSubmission(page, rollingSession, submission, {}, { nowMs: submission.submittedAtMs + (submission.elapsedMs ?? 0) });
  rollingSession = markQuestionReviewOpened(judged.session, questionId);
  return {
    questionId,
    submission,
    result: judged.result,
    sessionProgress: buildSessionProgressSnapshot(rollingSession),
  };
});

export const mockJudgeResultPage = buildResultPageData({
  session: rollingSession,
  questionMetaMap,
});

export const mockJudgeWrongBook = buildWrongBookPageData({
  session: rollingSession,
  questionMetaMap,
  generatedAtIso: '2026-03-22T14:45:00+08:00',
});

export const mockFinalizedJudgeSession = finalizeRuntimeSession(
  rollingSession,
  {
    session: rollingSession,
    questionMetaMap,
  },
  {
    session: rollingSession,
    questionMetaMap,
    generatedAtIso: '2026-03-22T14:45:00+08:00',
  },
);

export const mockJudgeEngineSummary = mockJudgeRoundTrip.map((item) => ({
  questionId: item.questionId,
  correct: item.result.correct,
  primaryReasonCode: item.result.primaryReasonCode,
  starsAwarded: item.result.starsAwarded,
  comboAfter: item.result.comboAfter,
  totalScore: item.sessionProgress.totalScore,
  totalStars: item.sessionProgress.stars,
}));
