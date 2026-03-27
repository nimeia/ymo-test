import type { DifficultyLabel, ModuleInfo, PaperInfo, QuestionBankConfig, QuestionRecord } from './h5-question-bank.types';
import type { QuestionContentRecord } from './h5-question-content.schema';
import { mockQuestionContentBundle, mockQuestionContents } from './h5-question-content.mock';
import { mockAssetRendererBundle } from './h5-asset-renderer.mock';
import { createRuntimeQuestionPageViewModel, createRuntimeQuestionPageViewModels, type RuntimeAdapterDeps } from './h5-runtime-adapter';

const moduleInfoMap = {
  A: { id: 'A', key: 'mental_math', name: '快算巧算 / 逆运算', roomName: '快算王', priority: 1 },
  B: { id: 'B', key: 'patterns', name: '规律 / 递推 / 系统规则', roomName: '找规律', priority: 1 },
  C: { id: 'C', key: 'counting_and_construct', name: '枚举计数 / 组合 / 最值', roomName: '排列组合屋', priority: 1 },
  D: { id: 'D', key: 'equivalence_and_balance', name: '等量代换 / 和差关系 / 平衡', roomName: '配平高手', priority: 1 },
  E: { id: 'E', key: 'plane_geometry_counting', name: '平面图形数数 / 覆盖 / 补图', roomName: '图形工程师', priority: 3 },
  F: { id: 'F', key: 'spatial_reasoning', name: '立体空间 / 遮挡 / 展开图 / 位置', roomName: '空间大师', priority: 2 },
  G: { id: 'G', key: 'logic_puzzles', name: '逻辑填数 / 等和图 / 符号填空 / 综合推理', roomName: '逻辑神探', priority: 2 },
} as const satisfies Record<string, Pick<ModuleInfo, 'id' | 'key' | 'name' | 'roomName' | 'priority'>>;

const paperInfoMap = {
  '34Y': { code: '34Y', name: '34届YMO一年级初赛', org: 'YMO', grade: '一年级', stage: '初赛' },
  '35Y': { code: '35Y', name: '35届YMO一年级初赛', org: 'YMO', grade: '一年级', stage: '初赛' },
  '36Y': { code: '36Y', name: '36届YMO一年级初赛', org: 'YMO', grade: '一年级', stage: '初赛' },
  '34W': { code: '34W', name: '34届WMO一年级初测', org: 'WMO', grade: '一年级', stage: '初测' },
} as const satisfies Record<string, PaperInfo>;

const difficultyLabelMap: Record<1 | 2 | 3 | 4 | 5, DifficultyLabel> = {
  1: '入门',
  2: '基础',
  3: '进阶',
  4: '挑战',
  5: '高阶',
};

const subtypeFallbackMap: Record<string, { name: string; key: string }> = {
  '36Y-1': { name: '凑整消项', key: 'cancel_and_make_100' },
  '36Y-2': { name: '双序列规律', key: 'double_sequence_pattern' },
  '36Y-10': { name: '数正方形', key: 'square_counting' },
  '36Y-7': { name: '正方体对面判断', key: 'cube_opposite_faces' },
  '36Y-19': { name: '逻辑填数', key: 'logic_grid_fill' },
  '34W-20': { name: '齿轮推理', key: 'gear_reasoning' },
  '34Y-18': { name: '等和图填数', key: 'equal_sum_slots' },
};

function createQuestionRecordFromContent(content: QuestionContentRecord): QuestionRecord {
  const moduleInfo = moduleInfoMap[content.meta.moduleId];
  const paperInfo = paperInfoMap[content.meta.paper as keyof typeof paperInfoMap];
  const subtype = subtypeFallbackMap[content.meta.questionId] ?? {
    name: content.stem.title,
    key: content.stem.title,
  };

  return {
    id: content.meta.questionId,
    paper: content.meta.paper,
    paperMeta: {
      name: paperInfo.name,
      org: paperInfo.org,
      grade: paperInfo.grade,
      stage: paperInfo.stage,
    },
    qid: content.meta.qid,
    title: content.stem.title,
    moduleId: moduleInfo.id,
    moduleKey: moduleInfo.key,
    moduleName: moduleInfo.name,
    roomName: moduleInfo.roomName,
    subtype: subtype.name,
    subtypeKey: subtype.key,
    difficulty: content.meta.difficulty,
    difficultyLabel: difficultyLabelMap[content.meta.difficulty],
    interactionLabel: [content.meta.interactionType],
    interaction: [content.meta.interactionType],
    theme: 'H5-demo',
    skills: content.review?.recommendedFocus ?? [content.stem.title],
    tags: [content.meta.paper, moduleInfo.key, content.meta.interactionType],
    asset: {
      promptText: content.stem.blocks.find((item) => 'text' in item)?.text ?? content.stem.title,
      imageKey: content.assets.imageKeys[0] ?? null,
      audioKey: content.assets.audioKeys?.[0] ?? null,
    },
    status: 'ready_for_content_entry',
  };
}

export const mockRuntimeQuestionBankConfig: QuestionBankConfig = {
  meta: {
    title: '一年级思维训练题库（runtime adapter sample）',
    locale: 'zh-CN',
    version: '1.0.0',
    generatedAt: '2026-03-22T00:00:00+08:00',
    generatedFrom: ['mockQuestionContents', 'mockAssetRendererBundle'],
    questionCount: mockQuestionContents.length,
    storyPackCount: 0,
    paperCount: 4,
    notes: ['这是一份给 runtime adapter 使用的最小可运行示例题库。'],
  },
  papers: Object.values(paperInfoMap),
  modules: Object.values(moduleInfoMap).map((item) => ({
    ...item,
    questionCount: mockQuestionContents.filter((content) => content.meta.moduleId === item.id).length,
    subtypes: [],
    interactionTypes: [],
  })),
  subtypes: Object.values(subtypeFallbackMap).map((item, index) => ({
    key: item.key,
    name: item.name,
    questionCount: 1,
    skills: ['样例题'],
    moduleId: (mockQuestionContents[index]?.meta.moduleId ?? 'A') as QuestionRecord['moduleId'],
    moduleKey: (mockQuestionContents[index]?.meta.moduleKey ?? 'mental_math') as QuestionRecord['moduleKey'],
  })),
  developmentPriority: {
    phase1ModuleIds: ['A', 'B', 'C', 'D'],
    phase2ModuleIds: ['F', 'G'],
    phase3ModuleIds: ['E'],
    highFrequencySubtypes: Object.values(subtypeFallbackMap).map((item) => item.key),
    levelRoadmap: [
      { range: 'L1-L2', focus: ['快算', '找规律'] },
      { range: 'L3-L4', focus: ['数图', '空间'] },
      { range: 'L5', focus: ['逻辑填数'] },
    ],
    top20PlayableQuestionIds: mockQuestionContents.map((item) => item.meta.questionId),
  },
  uiPresets: {
    roomNames: Object.values(moduleInfoMap).map((item) => item.roomName),
    storyChannelName: '样例频道',
    defaultTheme: '闯关',
    suggestedPlayModes: [
      { key: 'topic_campaign', name: '专题闯关' },
      { key: 'speed_run', name: '10秒快答' },
      { key: 'drag_and_drop', name: '拖拽训练' },
      { key: 'click_count', name: '数图计数' },
      { key: 'spatial_observer', name: '空间观察' },
    ],
  },
  storyChannels: [],
  questions: mockQuestionContents.map(createQuestionRecordFromContent),
};

export const mockRuntimeAdapterDeps: RuntimeAdapterDeps = {
  bank: mockRuntimeQuestionBankConfig,
  contentBundle: mockQuestionContentBundle,
  rendererBundle: mockAssetRendererBundle,
};

export const mockRuntimeQuestionPageMap = Object.fromEntries(
  mockQuestionContents.map((content) => [
    content.meta.questionId,
    createRuntimeQuestionPageViewModel(content.meta.questionId, mockRuntimeAdapterDeps, {
      exposeJudgeData: true,
    }),
  ]),
);

export const mockRuntimeQuestionPageExamples = createRuntimeQuestionPageViewModels(
  ['36Y-1', '36Y-2', '36Y-10', '36Y-7', '36Y-19', '34W-20', '34Y-18'],
  mockRuntimeAdapterDeps,
  {
    exposeJudgeData: true,
    playMode: 'mixed_challenge',
  },
);

export const mockRuntimePreviewSummary = mockRuntimeQuestionPageExamples.map((item) => ({
  questionId: item.questionId,
  presetKey: item.scene.presetKey,
  roomName: item.question.roomName,
  title: item.question.title,
  primaryInteraction: item.question.primaryInteraction,
  layerCount: item.scene.layers.length,
  hotspotCount: item.hotspots.length,
  animationCount: item.animations.length,
  preloadAssetKeys: item.dependencyManifest.preloadAssetKeys,
}));
