import type { InteractionType } from './h5-question-bank.types';

/**
 * Asset Manifest + Renderer Schema
 *
 * 目标：
 * 1. 把图片、sprite、3D 模型、音频、组件皮肤参数统一结构化。
 * 2. 给前端提供“资源注册表 + 渲染预设 + 页面布局”三层配置。
 * 3. 让题目内容层(question-content)只关心题面与答案，渲染层只关心如何展示。
 */

export const ASSET_RENDERER_SCHEMA_VERSION = '1.0.0' as const;
export type AssetRendererSchemaVersion = typeof ASSET_RENDERER_SCHEMA_VERSION;

export const ASSET_KINDS = [
  'image',
  'sprite_sheet',
  'atlas',
  'model_3d',
  'audio',
  'font',
  'video',
] as const;
export type AssetKind = (typeof ASSET_KINDS)[number];

export const IMAGE_FIT_MODES = ['contain', 'cover', 'fill', 'none'] as const;
export type ImageFitMode = (typeof IMAGE_FIT_MODES)[number];

export const MODEL_FORMATS = ['glb', 'gltf', 'fbx', 'obj'] as const;
export type ModelFormat = (typeof MODEL_FORMATS)[number];

export const COMPONENT_SKIN_KEYS = [
  'app_shell',
  'module_room_card',
  'question_card',
  'question_title',
  'hint_chip',
  'choice_button',
  'number_token',
  'drag_slot',
  'grid_board',
  'grid_cell',
  'hotspot_overlay',
  'timer_ring',
  'progress_bar',
  'cube_viewer',
  'gear_viewer',
  'result_panel',
] as const;
export type ComponentSkinKey = (typeof COMPONENT_SKIN_KEYS)[number];

export const RENDERER_PRESET_KEYS = [
  'mental_math_fast_input',
  'pattern_single_choice',
  'geometry_click_highlight',
  'cube_rotate_choice',
  'logic_grid_drag_fill',
  'gear_animation_choice',
  'equal_sum_drag_slots',
] as const;
export type RendererPresetKey = (typeof RENDERER_PRESET_KEYS)[number];

export const PAGE_REGION_KEYS = [
  'background',
  'header',
  'left_panel',
  'center_stage',
  'right_panel',
  'bottom_bar',
  'overlay',
] as const;
export type PageRegionKey = (typeof PAGE_REGION_KEYS)[number];

export const RESPONSIVE_MODES = ['landscape', 'portrait', 'tablet_landscape'] as const;
export type ResponsiveMode = (typeof RESPONSIVE_MODES)[number];

export const LAYER_TYPES = [
  'background_image',
  'background_gradient',
  'image',
  'sprite',
  'model_viewer',
  'text',
  'question_content_mount',
  'interaction_mount',
  'hotspot_mount',
  'animation_mount',
  'hud_mount',
] as const;
export type LayerType = (typeof LAYER_TYPES)[number];

export interface BaseAssetMeta {
  key: string;
  kind: AssetKind;
  path: string;
  version?: string;
  tags?: string[];
  preload?: boolean;
  cachePolicy?: 'eager' | 'lazy' | 'route_based';
}

export interface ImageAsset extends BaseAssetMeta {
  kind: 'image';
  width: number;
  height: number;
  alpha?: boolean;
  fitSuggested?: ImageFitMode;
  background?: 'transparent' | 'solid' | 'photo';
  dpiScale?: 1 | 2 | 3;
}

export interface SpriteFrame {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pivotX?: number;
  pivotY?: number;
  trimmed?: boolean;
}

export interface SpriteSheetAsset extends BaseAssetMeta {
  kind: 'sprite_sheet' | 'atlas';
  imageKey: string;
  sheetWidth: number;
  sheetHeight: number;
  frames: SpriteFrame[];
}

export interface ModelAnimationClip {
  key: string;
  durationMs: number;
  loop?: boolean;
}

export interface ModelCameraPreset {
  presetKey: string;
  orbitYawDeg: number;
  orbitPitchDeg: number;
  distance: number;
  target: [number, number, number];
}

export interface Model3DAsset extends BaseAssetMeta {
  kind: 'model_3d';
  format: ModelFormat;
  unitScale: number;
  boundingBox: {
    width: number;
    height: number;
    depth: number;
  };
  clips?: ModelAnimationClip[];
  cameraPresets?: ModelCameraPreset[];
}

export interface AudioAsset extends BaseAssetMeta {
  kind: 'audio';
  durationMs?: number;
  channel?: 'sfx' | 'bgm' | 'voice';
}

export interface FontAsset extends BaseAssetMeta {
  kind: 'font';
  family: string;
  weights: number[];
}

export interface VideoAsset extends BaseAssetMeta {
  kind: 'video';
  width: number;
  height: number;
  durationMs?: number;
  muted?: boolean;
}

export type AssetItem =
  | ImageAsset
  | SpriteSheetAsset
  | Model3DAsset
  | AudioAsset
  | FontAsset
  | VideoAsset;

export interface ShadowStyle {
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
}

export interface BorderStyle {
  width: number;
  color: string;
  radius: number;
}

export interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  color: string;
  letterSpacing?: number;
}

export interface SkinSpacing {
  paddingX: number;
  paddingY: number;
  gap: number;
}

export interface SkinStateToken {
  background?: string;
  textColor?: string;
  borderColor?: string;
  shadow?: ShadowStyle;
  opacity?: number;
  scale?: number;
}

export interface ComponentSkin {
  key: ComponentSkinKey;
  label: string;
  base: {
    background: string;
    border?: BorderStyle;
    shadow?: ShadowStyle;
    spacing?: SkinSpacing;
    text?: TypographyStyle;
  };
  states?: Partial<Record<'default' | 'hover' | 'pressed' | 'correct' | 'wrong' | 'disabled', SkinStateToken>>;
  extra?: Record<string, string | number | boolean | string[]>;
}

export interface RegionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PageRegion {
  key: PageRegionKey;
  box: RegionBox;
  zIndex: number;
}

export interface RendererLayer {
  id: string;
  type: LayerType;
  region: PageRegionKey;
  zIndex?: number;
  visible?: boolean;
  assetKey?: string;
  skinKey?: ComponentSkinKey;
  textBinding?: string;
  dataBinding?: string;
  fit?: ImageFitMode;
  opacity?: number;
  anchor?: 'center' | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';
  offset?: { x: number; y: number };
  size?: { width: number; height: number };
  extra?: Record<string, string | number | boolean>;
}

export interface RendererBehavior {
  key: string;
  when: 'on_enter' | 'on_correct' | 'on_wrong' | 'on_timeout' | 'on_idle';
  action:
    | 'play_animation'
    | 'play_audio'
    | 'pulse_skin'
    | 'shake_layer'
    | 'highlight_hotspots'
    | 'switch_camera_preset';
  targetId?: string;
  payload?: Record<string, string | number | boolean>;
}

export interface ResponsiveLayoutPreset {
  mode: ResponsiveMode;
  canvas: { width: number; height: number };
  safeArea: RegionBox;
  regions: PageRegion[];
}

export interface RendererPreset {
  key: RendererPresetKey;
  label: string;
  supportedInteractions: InteractionType[];
  recommendedForQuestionIds?: string[];
  defaultResponsiveMode: ResponsiveMode;
  layouts: ResponsiveLayoutPreset[];
  layers: RendererLayer[];
  behaviors?: RendererBehavior[];
}

export interface QuestionRendererBinding {
  questionId: string;
  presetKey: RendererPresetKey;
  skinOverrides?: Partial<Record<ComponentSkinKey, Partial<ComponentSkin>>>;
  assetOverrides?: Record<string, string>;
  behaviorToggles?: Record<string, boolean>;
}

export interface AssetGroup {
  key: string;
  label: string;
  assetKeys: string[];
}

export interface AssetManifestMeta {
  title: string;
  locale: 'zh-CN';
  version: AssetRendererSchemaVersion;
  generatedAt: string;
  notes?: string[];
}

export interface AssetRendererBundle {
  meta: AssetManifestMeta;
  assets: AssetItem[];
  groups: AssetGroup[];
  skins: ComponentSkin[];
  presets: RendererPreset[];
  questionBindings: QuestionRendererBinding[];
}
