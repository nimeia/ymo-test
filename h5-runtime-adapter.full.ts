import { fullQuestionBankConfig } from './h5-question-bank.full';
import { fullQuestionContentBundle, fullQuestionContentRecords } from './h5-question-content.full';
import { fullAssetRendererBundle } from './h5-asset-renderer.full';
import { createRuntimeQuestionPageViewModel, createRuntimeQuestionPageViewModels, type RuntimeAdapterDeps } from './h5-runtime-adapter';
import { applyRuntimeHotspotOverrides } from './h5-runtime-hotspot-overrides';
import type { ModuleId, QuestionRecord } from './h5-question-bank.types';

export const fullRuntimeAdapterDeps: RuntimeAdapterDeps = {
  bank: fullQuestionBankConfig,
  contentBundle: fullQuestionContentBundle,
  rendererBundle: fullAssetRendererBundle,
};

export const fullRuntimeQuestionPageMap = Object.fromEntries(
  fullQuestionContentRecords.map((content) => [
    content.meta.questionId,
    applyRuntimeHotspotOverrides(
      createRuntimeQuestionPageViewModel(content.meta.questionId, fullRuntimeAdapterDeps, {
        exposeJudgeData: true,
      }),
    ),
  ]),
);

export const fullRuntimeQuestionIds = fullQuestionBankConfig.questions.map((item) => item.id);

export const fullRuntimeQuestionIdsByModule = fullQuestionBankConfig.questions.reduce<Record<ModuleId, string[]>>(
  (acc, item) => {
    acc[item.moduleId].push(item.id);
    return acc;
  },
  { A: [], B: [], C: [], D: [], E: [], F: [], G: [] },
);

export const fullRuntimeQuestionsByPaper = fullQuestionBankConfig.questions.reduce<Record<string, string[]>>((acc, item) => {
  if (!acc[item.paper]) acc[item.paper] = [];
  acc[item.paper].push(item.id);
  return acc;
}, {});

export const featuredFullRuntimeQuestionIds = [
  '36Y-1',
  '36Y-2',
  '36Y-10',
  '36Y-7',
  '36Y-19',
  '34W-20',
  '34Y-18',
  '35Y-14',
  '34W-17',
  '35Y-10',
];

export const fullRuntimeQuestionPageExamples = createRuntimeQuestionPageViewModels(
  featuredFullRuntimeQuestionIds,
  fullRuntimeAdapterDeps,
  {
    exposeJudgeData: true,
    playMode: 'mixed_challenge',
  },
).map((item) => applyRuntimeHotspotOverrides(item));

export function getModuleQuestionRecords(moduleId: ModuleId): QuestionRecord[] {
  return fullQuestionBankConfig.questions.filter((item) => item.moduleId === moduleId);
}

export function pickDailyRecommendedQuestionIds(limit = 12): string[] {
  return fullRuntimeQuestionIds.slice(0, Math.max(1, limit));
}
