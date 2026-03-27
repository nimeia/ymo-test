import type { Difficulty, InteractionType, ModuleId, ModuleKey } from './h5-question-bank.types';

/**
 * 题目内容层 schema
 *
 * 目标：
 * 1. 在题库母表之外，再补一层“可直接渲染题目”的正式内容结构。
 * 2. 统一管理题面、选项、答案、解析、热区、动画参数。
 * 3. 支持 H5 前端做纯配置驱动的做题页渲染。
 */

export const CONTENT_SCHEMA_VERSION = '1.0.0' as const;
export type ContentSchemaVersion = typeof CONTENT_SCHEMA_VERSION;

export const BLOCK_TYPES = [
  'title',
  'subtitle',
  'paragraph',
  'hint',
  'equation',
  'image',
  'number_line',
  'grid',
  'callout',
] as const;
export type ContentBlockType = (typeof BLOCK_TYPES)[number];

export const HOTSPOT_SHAPES = ['rect', 'circle', 'polygon'] as const;
export type HotspotShape = (typeof HOTSPOT_SHAPES)[number];

export const HOTSPOT_ROLES = [
  'countable',
  'answer_target',
  'drop_slot',
  'highlight_hint',
  'forbidden',
] as const;
export type HotspotRole = (typeof HOTSPOT_ROLES)[number];

export const ANSWER_KINDS = [
  'numeric',
  'single_choice',
  'multi_choice',
  'slot_mapping',
  'grid_fill',
  'hotspot_selection',
  'sequence',
  'free_text',
] as const;
export type AnswerKind = (typeof ANSWER_KINDS)[number];

export const EXPLANATION_STEP_KINDS = [
  'observation',
  'rule',
  'calculation',
  'elimination',
  'verification',
  'summary',
] as const;
export type ExplanationStepKind = (typeof EXPLANATION_STEP_KINDS)[number];

export const ANIMATION_KINDS = [
  'frame_animation',
  'step_reveal_animation',
  'cube_rotation_animation',
  'gear_spin_animation',
  'balance_animation',
  'number_line_jump_animation',
] as const;
export type AnimationKind = (typeof ANIMATION_KINDS)[number];

export interface QuestionContentMeta {
  questionId: string;
  paper: string;
  qid: number;
  moduleId: ModuleId;
  moduleKey: ModuleKey;
  interactionType: InteractionType;
  difficulty: Difficulty;
  schemaVersion: ContentSchemaVersion;
  locale: 'zh-CN';
}

export interface ContentTextToken {
  text: string;
  emphasis?: 'normal' | 'strong' | 'highlight';
}

export interface BaseContentBlock {
  id: string;
  type: ContentBlockType;
}

export interface TitleBlock extends BaseContentBlock {
  type: 'title' | 'subtitle' | 'paragraph' | 'hint' | 'equation' | 'callout';
  text: string;
  tokens?: ContentTextToken[];
  tone?: 'default' | 'info' | 'warning' | 'success';
}

export interface ImageBlock extends BaseContentBlock {
  type: 'image';
  imageKey: string;
  alt: string;
  aspectRatio?: number;
  hotspotIds?: string[];
  zoomable?: boolean;
}

export interface NumberLineBlock extends BaseContentBlock {
  type: 'number_line';
  min: number;
  max: number;
  marks?: number[];
  showArrows?: boolean;
}

export interface GridTemplateCell {
  cellId: string;
  row: number;
  col: number;
  presetValue?: string | number;
  locked?: boolean;
  regionId?: string;
}

export interface GridBlock extends BaseContentBlock {
  type: 'grid';
  rows: number;
  cols: number;
  cells: GridTemplateCell[];
}

export type ContentBlock =
  | TitleBlock
  | ImageBlock
  | NumberLineBlock
  | GridBlock;

export interface ChoiceOptionContent {
  id: string;
  label: string;
  value: string | number;
  imageKey?: string | null;
  audioKey?: string | null;
  explanation?: string;
}

export interface DragTokenContent {
  id: string;
  label: string;
  value: string | number;
  color?: string;
}

export interface SlotContent {
  id: string;
  label?: string;
  placeholder?: string;
  accepts?: string[];
}

export interface GridAnswerCell {
  cellId: string;
  value: string | number;
}

export interface NumericAnswer {
  kind: 'numeric';
  acceptedValues: Array<string | number>;
  trimWhitespace?: boolean;
  ignoreLeadingZeros?: boolean;
  units?: string[];
}

export interface SingleChoiceAnswer {
  kind: 'single_choice';
  correctOptionIds: string[];
}

export interface MultiChoiceAnswer {
  kind: 'multi_choice';
  correctOptionIds: string[];
  minSelect?: number;
  maxSelect?: number;
}

export interface SlotMappingAnswer {
  kind: 'slot_mapping';
  mapping: Record<string, string | string[]>;
  orderSensitive?: boolean;
}

export interface GridFillAnswer {
  kind: 'grid_fill';
  cells: GridAnswerCell[];
}

export interface HotspotSelectionAnswer {
  kind: 'hotspot_selection';
  hotspotIds: string[];
  selectionMode: 'exact' | 'at_least';
}

export interface SequenceAnswer {
  kind: 'sequence';
  values: Array<string | number>;
}

export interface FreeTextAnswer {
  kind: 'free_text';
  acceptedTexts: string[];
  ignoreCase?: boolean;
  trimWhitespace?: boolean;
}

export type QuestionAnswer =
  | NumericAnswer
  | SingleChoiceAnswer
  | MultiChoiceAnswer
  | SlotMappingAnswer
  | GridFillAnswer
  | HotspotSelectionAnswer
  | SequenceAnswer
  | FreeTextAnswer;

export interface ExplanationStep {
  id: string;
  kind: ExplanationStepKind;
  title: string;
  text: string;
  relatedHotspotIds?: string[];
  relatedAnimationId?: string;
}

export interface WrongReason {
  code: string;
  title: string;
  text: string;
}

export interface QuestionExplanation {
  summary: string;
  steps: ExplanationStep[];
  wrongReasons?: WrongReason[];
}

export interface RectGeometry {
  shape: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CircleGeometry {
  shape: 'circle';
  cx: number;
  cy: number;
  r: number;
}

export interface PolygonGeometry {
  shape: 'polygon';
  points: Array<{ x: number; y: number }>;
}

export type HotspotGeometry = RectGeometry | CircleGeometry | PolygonGeometry;

export interface QuestionHotspot {
  id: string;
  imageKey: string;
  role: HotspotRole;
  label: string;
  geometry: HotspotGeometry;
  countValue?: number;
  meta?: Record<string, string | number | boolean>;
}

export interface FrameAnimation {
  id: string;
  kind: 'frame_animation';
  autoplay?: boolean;
  loop?: boolean;
  fps: number;
  frameImageKeys: string[];
}

export interface StepRevealItem {
  stepId: string;
  label: string;
  highlightHotspotIds?: string[];
  narratorText?: string;
}

export interface StepRevealAnimation {
  id: string;
  kind: 'step_reveal_animation';
  autoplay?: boolean;
  loop?: boolean;
  steps: StepRevealItem[];
}

export interface CubeFaceConfig {
  faceId: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
  label: string;
  colorHex?: string;
}

export interface CubeRotationAnimation {
  id: string;
  kind: 'cube_rotation_animation';
  autoplay?: boolean;
  loop?: boolean;
  modelKey: string;
  faces: CubeFaceConfig[];
  initialView: 'front' | 'left' | 'right' | 'top';
  targetQuestion?: string;
}

export interface GearItemConfig {
  id: string;
  teeth: number;
  direction: 'cw' | 'ccw';
}

export interface GearSpinAnimation {
  id: string;
  kind: 'gear_spin_animation';
  autoplay?: boolean;
  loop?: boolean;
  gears: GearItemConfig[];
  driverGearId: string;
  driverTurns: number;
  resultHint?: string;
}

export interface BalanceAnimation {
  id: string;
  kind: 'balance_animation';
  autoplay?: boolean;
  loop?: boolean;
  leftLabels: string[];
  rightLabels: string[];
  equationHint?: string;
}

export interface NumberLineJumpAnimation {
  id: string;
  kind: 'number_line_jump_animation';
  autoplay?: boolean;
  loop?: boolean;
  start: number;
  jumps: number[];
  min: number;
  max: number;
}

export type QuestionAnimation =
  | FrameAnimation
  | StepRevealAnimation
  | CubeRotationAnimation
  | GearSpinAnimation
  | BalanceAnimation
  | NumberLineJumpAnimation;

export interface QuestionContentAssets {
  imageKeys: string[];
  audioKeys?: string[];
  modelKeys?: string[];
  animationPreviewKeys?: string[];
}

export interface InteractionSpec {
  type: InteractionType;
  submitMode: 'manual' | 'auto';
  keyboard?: 'number' | 'text';
  minSelections?: number;
  maxSelections?: number;
  dragTokens?: DragTokenContent[];
  slots?: SlotContent[];
  options?: ChoiceOptionContent[];
  gridCells?: GridTemplateCell[];
  timerSeconds?: number;
}

export interface QuestionContentRecord {
  meta: QuestionContentMeta;
  stem: {
    title: string;
    blocks: ContentBlock[];
  };
  interaction: InteractionSpec;
  answer: QuestionAnswer;
  explanation: QuestionExplanation;
  hotspots?: QuestionHotspot[];
  animations?: QuestionAnimation[];
  assets: QuestionContentAssets;
  review?: {
    recommendedFocus: string[];
    memoryTag?: string;
  };
}

export interface QuestionContentBundle {
  version: ContentSchemaVersion;
  locale: 'zh-CN';
  records: QuestionContentRecord[];
}
