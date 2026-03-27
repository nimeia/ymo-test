import type { InteractionType, QuestionWidgetSchema } from './h5-question-bank.types';
import type { InteractionSpec, QuestionAnswer, QuestionHotspot } from './h5-question-content.schema';
import type { RuntimeQuestionPageViewModel } from './h5-runtime-adapter';

interface RuntimeHotspotOverride {
  interactionType: InteractionType;
  widget: Extract<QuestionWidgetSchema, { kind: 'click_highlight' | 'click_count' }>;
  answer: QuestionAnswer;
  hotspots: QuestionHotspot[];
  patchSummary?: string;
  patchFocus?: string[];
}

function circleHotspot(
  id: string,
  imageKey: string,
  label: string,
  cx: number,
  cy: number,
  r: number,
  meta: Record<string, string | number | boolean> = {},
): QuestionHotspot {
  return {
    id,
    imageKey,
    role: 'answer_target',
    label,
    geometry: { shape: 'circle', cx, cy, r },
    meta,
  };
}

function rectHotspot(
  id: string,
  imageKey: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  meta: Record<string, string | number | boolean> = {},
): QuestionHotspot {
  return {
    id,
    imageKey,
    role: 'answer_target',
    label,
    geometry: { shape: 'rect', x, y, width, height },
    meta,
  };
}

function makeSquareGridHotspots(): QuestionHotspot[] {
  const imageKey = '36Y-10.png';
  const xLines = [52, 109, 166, 223, 280, 338].map((value) => value / 370);
  const yLines = [121, 179, 237, 295, 353].map((value) => value / 400);
  const hotspots: QuestionHotspot[] = [];
  let index = 1;

  for (let size = 1; size <= 4; size += 1) {
    for (let row = 0; row <= 4 - size; row += 1) {
      for (let col = 0; col <= 5 - size; col += 1) {
        hotspots.push(
          rectHotspot(
            `36Y-10-hs-${index}`,
            imageKey,
            `${size}×${size} 正方形 ${index}`,
            xLines[col],
            yLines[row],
            xLines[col + size] - xLines[col],
            yLines[row + size] - yLines[row],
            {
              layer: `${size}x${size}`,
              layerLabel: `${size}×${size}`,
              displayStyle: 'square-outline',
              order: index,
            },
          ),
        );
        index += 1;
      }
    }
  }

  return hotspots;
}

const HOTSPOT_OVERRIDES: Record<string, RuntimeHotspotOverride> = {
  '36Y-4': {
    interactionType: 'click_highlight',
    widget: {
      kind: 'click_highlight',
      targetHint: '把所有灰色圆点都点亮。可以按从上到下、从左到右的顺序数。',
      minSelectable: 30,
      maxSelectable: 30,
    },
    answer: {
      kind: 'hotspot_selection',
      hotspotIds: Array.from({ length: 30 }, (_, index) => `36Y-4-hs-${index + 1}`),
      selectionMode: 'exact',
    },
    hotspots: [
      circleHotspot('36Y-4-hs-1', '36Y-4.png', '灰点1', 0.5933, 0.582, 0.0344, { order: 1, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-2', '36Y-4.png', '灰点2', 0.492, 0.5821, 0.0359, { order: 2, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-3', '36Y-4.png', '灰点3', 0.6438, 0.6384, 0.0344, { order: 3, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-4', '36Y-4.png', '灰点4', 0.4411, 0.6385, 0.0344, { order: 4, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-5', '36Y-4.png', '灰点5', 0.5932, 0.6948, 0.0359, { order: 5, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-6', '36Y-4.png', '灰点6', 0.4921, 0.6949, 0.0344, { order: 6, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-7', '36Y-4.png', '灰点7', 0.7359, 0.7409, 0.0359, { order: 7, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-8', '36Y-4.png', '灰点8', 0.6344, 0.741, 0.0359, { order: 8, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-9', '36Y-4.png', '灰点9', 0.3476, 0.7429, 0.0359, { order: 9, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-10', '36Y-4.png', '灰点10', 0.4491, 0.7429, 0.0359, { order: 10, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-11', '36Y-4.png', '灰点11', 0.7858, 0.7975, 0.0344, { order: 11, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-12', '36Y-4.png', '灰点12', 0.5842, 0.7975, 0.0344, { order: 12, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-13', '36Y-4.png', '灰点13', 0.4994, 0.7994, 0.0344, { order: 13, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-14', '36Y-4.png', '灰点14', 0.2968, 0.7995, 0.0344, { order: 14, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-15', '36Y-4.png', '灰点15', 0.7363, 0.8542, 0.0344, { order: 15, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-16', '36Y-4.png', '灰点16', 0.6344, 0.8542, 0.0344, { order: 16, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-17', '36Y-4.png', '灰点17', 0.4491, 0.8559, 0.0344, { order: 17, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-18', '36Y-4.png', '灰点18', 0.3475, 0.8559, 0.0344, { order: 18, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-19', '36Y-4.png', '灰点19', 0.8845, 0.9047, 0.0344, { order: 19, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-20', '36Y-4.png', '灰点20', 0.7832, 0.9047, 0.0344, { order: 20, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-21', '36Y-4.png', '灰点21', 0.3058, 0.9062, 0.0344, { order: 21, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-22', '36Y-4.png', '灰点22', 0.2046, 0.9062, 0.0344, { order: 22, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-23', '36Y-4.png', '灰点23', 0.4943, 0.9065, 0.0344, { order: 23, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-24', '36Y-4.png', '灰点24', 0.5956, 0.9065, 0.0344, { order: 24, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-25', '36Y-4.png', '灰点25', 0.9346, 0.9612, 0.0359, { order: 25, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-26', '36Y-4.png', '灰点26', 0.7326, 0.9613, 0.0359, { order: 26, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-27', '36Y-4.png', '灰点27', 0.1541, 0.9626, 0.0359, { order: 27, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-28', '36Y-4.png', '灰点28', 0.3565, 0.9627, 0.0344, { order: 28, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-29', '36Y-4.png', '灰点29', 0.4438, 0.9634, 0.0344, { order: 29, displayStyle: 'dot' }),
      circleHotspot('36Y-4-hs-30', '36Y-4.png', '灰点30', 0.6468, 0.9634, 0.0344, { order: 30, displayStyle: 'dot' }),
    ],
    patchSummary: '把所有灰点依次点亮，比直接输入数量更适合做大屏练习。',
    patchFocus: ['按顺序计数', '一边点一边数', '避免重复'],
  },
  '36Y-10': {
    interactionType: 'click_highlight',
    widget: {
      kind: 'click_highlight',
      targetHint: '按 1×1、2×2、3×3、4×4 分层切换，把每个正方形都点出来。',
      minSelectable: 40,
      maxSelectable: 40,
    },
    answer: {
      kind: 'hotspot_selection',
      hotspotIds: Array.from({ length: 40 }, (_, index) => `36Y-10-hs-${index + 1}`),
      selectionMode: 'exact',
    },
    hotspots: makeSquareGridHotspots(),
    patchSummary: '改成图上分层点选，先切小方格，再切大方格。',
    patchFocus: ['按大小分层', '切换层级后再点', '防止漏大正方形'],
  },
  '34W-19': {
    interactionType: 'click_highlight',
    widget: {
      kind: 'click_highlight',
      targetHint: '把所有需要补砖的空缺区域都点出来。',
      minSelectable: 6,
      maxSelectable: 6,
    },
    answer: {
      kind: 'hotspot_selection',
      hotspotIds: ['34W-19-hs-1', '34W-19-hs-2', '34W-19-hs-3', '34W-19-hs-4', '34W-19-hs-5', '34W-19-hs-6'],
      selectionMode: 'exact',
    },
    hotspots: [
      rectHotspot('34W-19-hs-1', '34W-19.png', '缺口左上', 0.455, 0.03, 0.09, 0.24, { displayStyle: 'tile-gap', zone: 'top-left' }),
      rectHotspot('34W-19-hs-2', '34W-19.png', '缺口上横条', 0.545, 0.03, 0.215, 0.14, { displayStyle: 'tile-gap', zone: 'top-bar' }),
      rectHotspot('34W-19-hs-3', '34W-19.png', '缺口右拐角', 0.72, 0.17, 0.12, 0.19, { displayStyle: 'tile-gap', zone: 'top-right' }),
      rectHotspot('34W-19-hs-4', '34W-19.png', '缺口中横条', 0.54, 0.36, 0.23, 0.16, { displayStyle: 'tile-gap', zone: 'middle-bar' }),
      rectHotspot('34W-19-hs-5', '34W-19.png', '缺口中竖条', 0.455, 0.41, 0.10, 0.27, { displayStyle: 'tile-gap', zone: 'center-stem' }),
      rectHotspot('34W-19-hs-6', '34W-19.png', '缺口左下', 0.39, 0.50, 0.17, 0.18, { displayStyle: 'tile-gap', zone: 'lower-left' }),
    ],
    patchSummary: '从“填黑白数量”先训练成“找出所有要补的空缺区域”。',
    patchFocus: ['先找空缺', '看拐角', '别漏掉细长通道'],
  },
  '36Y-16': {
    interactionType: 'click_highlight',
    widget: {
      kind: 'click_highlight',
      targetHint: '把图中被挡住、但应该存在的小正方体位置点出来。虚线框提示了可能位置。',
      minSelectable: 2,
      maxSelectable: 2,
    },
    answer: {
      kind: 'hotspot_selection',
      hotspotIds: ['36Y-16-hs-1', '36Y-16-hs-2'],
      selectionMode: 'exact',
    },
    hotspots: [
      rectHotspot('36Y-16-hs-1', '36Y-16.png', '被挡住的方块1', 0.625, 0.58, 0.08, 0.11, { displayStyle: 'ghost-cube', zone: 'hidden-left' }),
      rectHotspot('36Y-16-hs-2', '36Y-16.png', '被挡住的方块2', 0.704, 0.58, 0.08, 0.11, { displayStyle: 'ghost-cube', zone: 'hidden-right' }),
    ],
    patchSummary: '把堆方块题拆成“先找被挡住的位置”，更适合训练遮挡判断。',
    patchFocus: ['先看前排', '再想后排', '虚线框就是要确认的位置'],
  },
};

export function applyRuntimeHotspotOverrides(vm: RuntimeQuestionPageViewModel): RuntimeQuestionPageViewModel {
  const override = HOTSPOT_OVERRIDES[vm.questionId];
  if (!override) return vm;

  const nextRaw: InteractionSpec = {
    ...vm.interaction.raw,
    type: override.interactionType,
    submitMode: 'manual',
  };

  const nextInteraction = {
    ...vm.interaction,
    type: override.interactionType,
    widget: override.widget,
    raw: nextRaw,
  };

  const nextQuestion = {
    ...vm.question,
    primaryInteraction: override.interactionType,
    widget: override.widget,
  };

  const nextReview = override.patchSummary
    ? {
        ...vm.review,
        explanation: {
          ...vm.review.explanation,
          summary: override.patchSummary,
        },
        recommendedFocus: override.patchFocus ?? vm.review.recommendedFocus,
      }
    : vm.review;

  return {
    ...vm,
    hotspots: override.hotspots,
    interaction: nextInteraction,
    judge: {
      ...vm.judge,
      answer: override.answer,
    },
    question: nextQuestion,
    playPage: {
      ...vm.playPage,
      question: nextQuestion,
    },
    review: nextReview,
  };
}
