import type { RuntimeQuestionPageViewModel } from '../../../h5-runtime-adapter';

export interface HotspotReplayStep {
  id: string;
  title: string;
  text: string;
  relatedHotspotIds: string[];
  focusLayer?: string;
}

export interface HotspotReplayConfig {
  questionId: string;
  intro: string;
  steps: HotspotReplayStep[];
}

const HOTSPOT_REPLAY_CONFIGS: Record<string, HotspotReplayConfig> = {
  '36Y-4': {
    questionId: '36Y-4',
    intro: '按从上到下的层次去数，每点亮一层就能避免重复。',
    steps: [
      {
        id: '36Y-4-r1',
        title: '先点中间 6 个灰点',
        text: '先把中间最明显的一小层圈出来，建立计数起点。',
        relatedHotspotIds: ['36Y-4-hs-1', '36Y-4-hs-2', '36Y-4-hs-3', '36Y-4-hs-4', '36Y-4-hs-5', '36Y-4-hs-6'],
      },
      {
        id: '36Y-4-r2',
        title: '再点第二层 12 个灰点',
        text: '中间两侧对称展开，第二层一共 12 个。',
        relatedHotspotIds: ['36Y-4-hs-7', '36Y-4-hs-8', '36Y-4-hs-9', '36Y-4-hs-10', '36Y-4-hs-11', '36Y-4-hs-12', '36Y-4-hs-13', '36Y-4-hs-14', '36Y-4-hs-15', '36Y-4-hs-16', '36Y-4-hs-17', '36Y-4-hs-18'],
      },
      {
        id: '36Y-4-r3',
        title: '最后点最外层 12 个灰点',
        text: '最外圈继续按左右对称点亮，6 + 12 + 12 = 30。',
        relatedHotspotIds: ['36Y-4-hs-19', '36Y-4-hs-20', '36Y-4-hs-21', '36Y-4-hs-22', '36Y-4-hs-23', '36Y-4-hs-24', '36Y-4-hs-25', '36Y-4-hs-26', '36Y-4-hs-27', '36Y-4-hs-28', '36Y-4-hs-29', '36Y-4-hs-30'],
      },
    ],
  },
  '36Y-10': {
    questionId: '36Y-10',
    intro: '数正方形时先切最小层，再逐层切到更大的正方形。',
    steps: [
      {
        id: '36Y-10-r1',
        title: '先数 1×1 正方形',
        text: '最小方格最容易看清，先把 1×1 这一层全部点完。',
        relatedHotspotIds: Array.from({ length: 20 }, (_, index) => `36Y-10-hs-${index + 1}`),
        focusLayer: '1x1',
      },
      {
        id: '36Y-10-r2',
        title: '再数 2×2 正方形',
        text: '换到 2×2 层，沿着横向和纵向平移去数。',
        relatedHotspotIds: Array.from({ length: 12 }, (_, index) => `36Y-10-hs-${index + 21}`),
        focusLayer: '2x2',
      },
      {
        id: '36Y-10-r3',
        title: '继续数 3×3 正方形',
        text: '大一层的正方形数量更少，要防止漏掉边上的大框。',
        relatedHotspotIds: Array.from({ length: 6 }, (_, index) => `36Y-10-hs-${index + 33}`),
        focusLayer: '3x3',
      },
      {
        id: '36Y-10-r4',
        title: '最后数 4×4 正方形',
        text: '最大的正方形只剩 2 个，全部加起来得到 40。',
        relatedHotspotIds: ['36Y-10-hs-39', '36Y-10-hs-40'],
        focusLayer: '4x4',
      },
    ],
  },
  '34W-19': {
    questionId: '34W-19',
    intro: '补砖题先找所有缺口，再去数每个缺口里该补的砖。',
    steps: [
      {
        id: '34W-19-r1',
        title: '先找顶部缺口',
        text: '顶部有三段缺口，先把最上面一条带状空位全部找出来。',
        relatedHotspotIds: ['34W-19-hs-1', '34W-19-hs-2', '34W-19-hs-3'],
      },
      {
        id: '34W-19-r2',
        title: '再找中部和左下缺口',
        text: '中部横条、中间竖条和左下角也都属于需要补砖的位置。',
        relatedHotspotIds: ['34W-19-hs-4', '34W-19-hs-5', '34W-19-hs-6'],
      },
    ],
  },
  '36Y-16': {
    questionId: '36Y-16',
    intro: '遮挡题先看前排，再推后面被挡住的位置。',
    steps: [
      {
        id: '36Y-16-r1',
        title: '先确认前排支撑关系',
        text: '前排已经露出的方块说明后排一定有支撑，不能悬空。',
        relatedHotspotIds: ['36Y-16-hs-1'],
      },
      {
        id: '36Y-16-r2',
        title: '再补出第二个被挡住的位置',
        text: '继续沿同一层往右推，被挡住的第二块也必须存在。',
        relatedHotspotIds: ['36Y-16-hs-2'],
      },
    ],
  },
};

export function getHotspotReplayConfig(questionId: string): HotspotReplayConfig | null {
  return HOTSPOT_REPLAY_CONFIGS[questionId] ?? null;
}

export function hasHotspotReplay(question: RuntimeQuestionPageViewModel): boolean {
  return !!getHotspotReplayConfig(question.questionId) && question.hotspots.length > 0;
}
