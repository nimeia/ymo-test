/**
 * H5 一年级思维训练题库类型定义
 *
 * 说明：
 * 1. 这份类型定义对应“题库配置_v1_YMO_WMO一年级_H5.json”的当前结构。
 * 2. 同时补充了示例页面层所需的 ViewModel 类型，方便前端直接接页面组件。
 * 3. 题目正文、选项、答案资源等更细的内容层，当前只在 mock 中演示了建议结构。
 */

export const MODULE_IDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type ModuleId = (typeof MODULE_IDS)[number];

export const MODULE_KEYS = [
  'mental_math',
  'patterns',
  'counting_and_construct',
  'equivalence_and_balance',
  'plane_geometry_counting',
  'spatial_reasoning',
  'logic_puzzles',
] as const;
export type ModuleKey = (typeof MODULE_KEYS)[number];

export const DIFFICULTY_LABELS = ['入门', '基础', '进阶', '挑战', '高阶'] as const;
export type DifficultyLabel = (typeof DIFFICULTY_LABELS)[number];
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export const QUESTION_STATUSES = ['ready_for_content_entry'] as const;
export type QuestionStatus = (typeof QUESTION_STATUSES)[number];

export const INTERACTION_TYPES = [
  'animation_demo',
  'balance_animation',
  'click_count',
  'click_highlight',
  'custom',
  'double_fill',
  'drag_blank',
  'drag_cards',
  'drag_drop',
  'drag_number_grid',
  'drag_number_regions',
  'drag_number_slots',
  'drag_shape',
  'drag_symbol',
  'drag_tiles',
  'fill_blank',
  'formula_substitute',
  'multi_choice',
  'number_line_tap',
  'observe_3d',
  'rotate_cube',
  'single_choice',
  'step_animation',
  'tap_connect',
  'text_input',
] as const;
export type InteractionType = (typeof INTERACTION_TYPES)[number];

export const PLAY_MODE_KEYS = [
  'topic_campaign',
  'speed_run',
  'drag_and_drop',
  'click_count',
  'spatial_observer',
] as const;
export type PlayModeKey = (typeof PLAY_MODE_KEYS)[number];

export interface QuestionBankMeta {
  title: string;
  locale: string;
  version: string;
  generatedAt: string;
  generatedFrom: string[];
  questionCount: number;
  storyPackCount: number;
  paperCount: number;
  notes: string[];
}

export interface PaperInfo {
  code: string;
  name: string;
  org: string;
  grade: string;
  stage: string;
}

export interface ModuleSubtypeCount {
  name: string;
  key: string;
  count: number;
}

export interface ModuleInfo {
  id: ModuleId;
  key: ModuleKey;
  name: string;
  roomName: string;
  priority: number;
  questionCount: number;
  subtypes: ModuleSubtypeCount[];
  interactionTypes: InteractionType[];
}

export interface SubtypeInfo {
  key: string;
  name: string;
  questionCount: number;
  skills: string[];
  moduleId: ModuleId;
  moduleKey: ModuleKey;
}

export interface LevelRoadmapItem {
  range: string;
  focus: string[];
}

export interface DevelopmentPriority {
  phase1ModuleIds: ModuleId[];
  phase2ModuleIds: ModuleId[];
  phase3ModuleIds: ModuleId[];
  highFrequencySubtypes: string[];
  levelRoadmap: LevelRoadmapItem[];
  top20PlayableQuestionIds: string[];
}

export interface PlayModeInfo {
  key: PlayModeKey;
  name: string;
}

export interface UiPresets {
  roomNames: string[];
  storyChannelName: string;
  defaultTheme: string;
  suggestedPlayModes: PlayModeInfo[];
}

export interface StoryChannelItem {
  questionId: string;
  storyTheme: string;
  title: string;
}

export interface QuestionPaperMeta {
  name: string;
  org: string;
  grade: string;
  stage: string;
}

export interface QuestionAsset {
  promptText: string;
  imageKey: string | null;
  audioKey: string | null;
}

export interface QuestionRecord {
  id: string;
  paper: string;
  paperMeta: QuestionPaperMeta;
  qid: number;
  title: string;
  moduleId: ModuleId;
  moduleKey: ModuleKey;
  moduleName: string;
  roomName: string;
  subtype: string;
  subtypeKey: string;
  difficulty: Difficulty;
  difficultyLabel: DifficultyLabel;
  interactionLabel: string[];
  interaction: InteractionType[];
  theme: string;
  skills: string[];
  tags: string[];
  asset: QuestionAsset;
  status: QuestionStatus;
}

export interface QuestionBankConfig {
  meta: QuestionBankMeta;
  papers: PaperInfo[];
  modules: ModuleInfo[];
  subtypes: SubtypeInfo[];
  developmentPriority: DevelopmentPriority;
  uiPresets: UiPresets;
  storyChannels: StoryChannelItem[];
  questions: QuestionRecord[];
}

export type QuestionRecordIndex = Record<string, QuestionRecord>;
export type QuestionsByModule = Record<ModuleId, QuestionRecord[]>;
export type QuestionsBySubtype = Record<string, QuestionRecord[]>;

/** 页面层：首页 */
export interface RoomCardViewModel {
  moduleId: ModuleId;
  moduleKey: ModuleKey;
  roomName: string;
  title: string;
  subtitle: string;
  priority: number;
  questionCount: number;
  difficultySpan: [Difficulty, Difficulty];
  dominantInteractions: InteractionType[];
  featuredQuestionIds: string[];
  featuredSkills: string[];
}

export interface QuickStartSetViewModel {
  key: string;
  title: string;
  description: string;
  questionIds: string[];
  moduleIds: ModuleId[];
}

export interface HomePageData {
  appTitle: string;
  version: string;
  heroTitle: string;
  heroSubtitle: string;
  defaultTheme: string;
  roomCards: RoomCardViewModel[];
  playModes: PlayModeInfo[];
  quickStartSets: QuickStartSetViewModel[];
  dailyRecommendedQuestionIds: string[];
}

/** 页面层：模块大厅 */
export interface SubtypeBadgeViewModel {
  key: string;
  name: string;
  count: number;
  skills: string[];
}

export interface ModuleLobbyData {
  moduleId: ModuleId;
  moduleKey: ModuleKey;
  roomName: string;
  moduleName: string;
  questionCount: number;
  recommendedQuestionIds: string[];
  subtypeBadges: SubtypeBadgeViewModel[];
  allowedInteractions: InteractionType[];
  recommendedModes: PlayModeKey[];
}

/** 页面层：做题页 */
export interface SessionProgress {
  sessionId: string;
  currentIndex: number;
  total: number;
  correct: number;
  stars: number;
  combo: number;
  elapsedSeconds: number;
}

export interface ChoiceOption {
  id: string;
  label: string;
  value: string | number;
  isCorrect?: boolean;
}

export interface DragToken {
  id: string;
  label: string;
  value: string | number;
}

export interface DropSlot {
  id: string;
  accepts?: string[];
  placeholder?: string;
}

export interface GridCell {
  id: string;
  row: number;
  col: number;
  presetValue?: string | number;
  locked?: boolean;
}

export type QuestionWidgetSchema =
  | {
      kind: 'text_input';
      placeholder: string;
      keyboard: 'number' | 'text';
      answerFormat: 'integer' | 'text';
    }
  | {
      kind: 'single_choice' | 'multi_choice';
      options: ChoiceOption[];
    }
  | {
      kind: 'drag_number_slots' | 'drag_blank' | 'drag_symbol' | 'drag_drop';
      tokens: DragToken[];
      slots: DropSlot[];
    }
  | {
      kind: 'drag_number_grid';
      tokens: DragToken[];
      cells: GridCell[];
    }
  | {
      kind: 'click_highlight' | 'click_count';
      targetHint: string;
      minSelectable?: number;
      maxSelectable?: number;
    }
  | {
      kind: 'rotate_cube' | 'observe_3d' | 'animation_demo' | 'step_animation';
      targetHint: string;
      options?: ChoiceOption[];
    }
  | {
      kind: 'custom';
      rendererKey: string;
      payload?: Record<string, unknown>;
    };

export interface QuestionPlayCardData {
  questionId: string;
  roomName: string;
  moduleName: string;
  title: string;
  promptText: string;
  difficulty: Difficulty;
  difficultyLabel: DifficultyLabel;
  skills: string[];
  imageKey: string | null;
  primaryInteraction: InteractionType;
  secondaryInteractions: InteractionType[];
  widget: QuestionWidgetSchema;
}

export interface QuestionPlayPageData {
  mode: PlayModeKey | 'mixed_challenge';
  progress: SessionProgress;
  question: QuestionPlayCardData;
  previousQuestionIds: string[];
  nextQuestionId?: string;
}

/** 页面层：结算页 / 错题本 */
export interface ResultQuestionSummary {
  questionId: string;
  title: string;
  moduleId: ModuleId;
  difficulty: Difficulty;
  correct: boolean;
  timeSpentSeconds: number;
}

export interface ResultPageData {
  sessionId: string;
  mode: PlayModeKey | 'mixed_challenge';
  total: number;
  correct: number;
  accuracy: number;
  totalStars: number;
  totalSeconds: number;
  newlyUnlockedBadge?: string;
  questionSummaries: ResultQuestionSummary[];
  recommendedRetryQuestionIds: string[];
}

export interface WrongBookEntry {
  questionId: string;
  title: string;
  moduleId: ModuleId;
  moduleName: string;
  subtypeKey: string;
  wrongCount: number;
  lastSeenAt: string;
  recommendedMode: PlayModeKey;
}

export interface WrongBookPageData {
  totalWrongQuestions: number;
  groupedByModule: Record<ModuleId, WrongBookEntry[]>;
  dailyRetryQuestionIds: string[];
}
