import type { RuntimeQuestionPageViewModel } from '../../../h5-runtime-adapter';

export type QuestionVisualFamily =
  | 'counting'
  | 'pattern'
  | 'spatial'
  | 'logic'
  | 'dynamic'
  | 'observation'
  | 'teaching';

export interface QuestionVisualMeta {
  family: QuestionVisualFamily;
  label: string;
  hints: string[];
  accent: string;
  preferredAspect?: 'wide' | 'square' | 'tall';
}

const QUESTION_VISUAL_META: Record<string, QuestionVisualMeta> = {
  '36Y-4': { family: 'counting', label: '数图观察', hints: ['按层数', '按行数', '从上到下'], accent: '#3777ff', preferredAspect: 'square' },
  '36Y-5': { family: 'pattern', label: '图示规则', hints: ['先看前两组', '找固定关系', '再代入第三组'], accent: '#7c4dff', preferredAspect: 'wide' },
  '36Y-6': { family: 'pattern', label: '楼梯递推', hints: ['逐层往上算', '不要跳步', '结果可回代检查'], accent: '#7c4dff', preferredAspect: 'wide' },
  '36Y-7': { family: 'spatial', label: '立体观察', hints: ['分清相邻面', '再想对面', '注意遮挡'], accent: '#14a44d', preferredAspect: 'square' },
  '36Y-9': { family: 'logic', label: '图形代换', hints: ['同图同数', '竖式对齐', '先看个位'], accent: '#f08b2d', preferredAspect: 'square' },
  '36Y-10': { family: 'counting', label: '数正方形', hints: ['先数小正方形', '再数大正方形', '防重复'], accent: '#3777ff', preferredAspect: 'square' },
  '36Y-11': { family: 'observation', label: '比较平分', hints: ['先算两行差', '再取一半', '别忘移的是星数'], accent: '#20a4f3', preferredAspect: 'wide' },
  '36Y-16': { family: 'spatial', label: '堆方块', hints: ['先数看见的', '再想被挡住的', '分层统计'], accent: '#14a44d', preferredAspect: 'wide' },
  '36Y-19': { family: 'logic', label: '逻辑填数', hints: ['看行列限制', '再看粗框和', '优先填唯一位置'], accent: '#f08b2d', preferredAspect: 'square' },
  '36Y-20': { family: 'logic', label: '等和图', hints: ['先看三条边', '比较公共点', '试填后回验'], accent: '#f08b2d', preferredAspect: 'square' },

  '35Y-5': { family: 'pattern', label: '数轴跳跃', hints: ['每次都跳 4 格', '从 0 开始', '数第 3 次'], accent: '#7c4dff', preferredAspect: 'wide' },
  '35Y-7': { family: 'teaching', label: '折叠示意', hints: ['对折两次', '一共 4 段', '最长段再比较'], accent: '#20a4f3', preferredAspect: 'wide' },
  '35Y-8': { family: 'pattern', label: '三角数', hints: ['1,3,6,10...', '每次多 1 个', '先看层数'], accent: '#7c4dff', preferredAspect: 'wide' },
  '35Y-13': { family: 'spatial', label: '展开图', hints: ['找对面', '防重叠', '想象折成立方体'], accent: '#14a44d', preferredAspect: 'wide' },
  '35Y-17': { family: 'counting', label: '数线段', hints: ['按长度分组', '水平竖直分开数', '避免漏掉内部线段'], accent: '#3777ff', preferredAspect: 'square' },
  '35Y-18': { family: 'spatial', label: '同体换位', hints: ['先锁定公共面', '再推 2 的对面', '保持同一立方体'], accent: '#14a44d', preferredAspect: 'wide' },

  '34Y-10': { family: 'pattern', label: '火柴图递推', hints: ['先看每多一个图形多几根', '用前几项推第 10 项'], accent: '#7c4dff', preferredAspect: 'wide' },
  '34Y-12': { family: 'counting', label: '数点阵', hints: ['按每个数字分别数', '再求总和'], accent: '#3777ff', preferredAspect: 'wide' },
  '34Y-14': { family: 'counting', label: '补图计数', hints: ['先数外圈', '再估空洞区域', '对照小六边形'], accent: '#3777ff', preferredAspect: 'wide' },
  '34Y-15': { family: 'spatial', label: '隐藏方块', hints: ['前后层分开看', '被挡住的不一定没有', '先想底层'], accent: '#14a44d', preferredAspect: 'square' },
  '34Y-18': { family: 'logic', label: 'Y 形等和图', hints: ['每条线都过中心', '先判断中心角色', '试填再比对'], accent: '#f08b2d', preferredAspect: 'square' },
  '34Y-20': { family: 'logic', label: '三圆填数', hints: ['看交集区域', '每个圆总和相等', '从已知数倒推'], accent: '#f08b2d', preferredAspect: 'square' },

  '34W-1': { family: 'observation', label: '位置关系', hints: ['先找正下方', '按抽屉列观察'], accent: '#20a4f3', preferredAspect: 'wide' },
  '34W-3': { family: 'counting', label: '补砖块', hints: ['先看缺口形状', '按单位块统计'], accent: '#3777ff', preferredAspect: 'wide' },
  '34W-5': { family: 'logic', label: '对话推理', hints: ['谁说自己拔得更多', '用差量倒推'], accent: '#f08b2d', preferredAspect: 'wide' },
  '34W-6': { family: 'dynamic', label: '数码管规律', hints: ['先看坏掉的是哪一侧', '再枚举能显示的楼层'], accent: '#ff5d5d', preferredAspect: 'wide' },
  '34W-7': { family: 'observation', label: '脸谱站位', hints: ['月亮和脸谱会成影', '只站左右两侧'], accent: '#20a4f3', preferredAspect: 'wide' },
  '34W-8': { family: 'pattern', label: '图形规律', hints: ['观察笔画变化', '比较左右开口方向'], accent: '#7c4dff', preferredAspect: 'wide' },
  '34W-11': { family: 'logic', label: '遮挡推理', hints: ['两张卡叠加', '看见的格子优先锁定'], accent: '#f08b2d', preferredAspect: 'wide' },
  '34W-12': { family: 'logic', label: '洛书', hints: ['横竖斜都等于 15', '先用已知数定位'], accent: '#f08b2d', preferredAspect: 'wide' },
  '34W-15': { family: 'dynamic', label: '绳结计数', hints: ['满七进一', '从右往左看', '把结数转回数量'], accent: '#ff5d5d', preferredAspect: 'wide' },
  '34W-16': { family: 'observation', label: '菜单选法', hints: ['一荤一素', '分别统计再相乘'], accent: '#20a4f3', preferredAspect: 'square' },
  '34W-18': { family: 'spatial', label: '堆立方体', hints: ['侧面也算', '每加一个方块都会挡住一些面'], accent: '#14a44d', preferredAspect: 'wide' },
  '34W-19': { family: 'counting', label: '铺砖补洞', hints: ['先判颜色', '再补数量'], accent: '#3777ff', preferredAspect: 'wide' },
  '34W-20': { family: 'dynamic', label: '齿轮联动', hints: ['相邻齿轮方向相反', '指针先碰哪一块'], accent: '#ff5d5d', preferredAspect: 'wide' },
};

export function resolveQuestionImagePath(imageKey: string): string {
  const paper = imageKey.split('-')[0];
  return `/assets/questions/${paper}/${imageKey}`;
}

export function getQuestionVisualMeta(question: Pick<RuntimeQuestionPageViewModel, 'questionId' | 'question' | 'scene'>): QuestionVisualMeta {
  const fromMap = QUESTION_VISUAL_META[question.questionId];
  if (fromMap) return fromMap;

  switch (question.question.moduleName) {
    case '图形计数':
      return { family: 'counting', label: '图形计数', hints: ['先分层', '再分类', '防漏数'], accent: '#3777ff' };
    case '空间推理':
      return { family: 'spatial', label: '空间观察', hints: ['看相邻', '想对面', '注意遮挡'], accent: '#14a44d' };
    case '逻辑推理':
      return { family: 'logic', label: '逻辑推理', hints: ['先列条件', '再排除', '最后回验'], accent: '#f08b2d' };
    case '规律递推':
      return { family: 'pattern', label: '规律观察', hints: ['先找变化', '再看重复', '最后预测'], accent: '#7c4dff' };
    default:
      return { family: 'observation', label: question.scene.presetLabel, hints: ['先观察', '后作答'], accent: '#20a4f3' };
  }
}
