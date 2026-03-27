import type {
  ChoiceOption,
  DifficultyLabel,
  InteractionType,
  PlayModeKey,
  QuestionBankConfig,
  QuestionPlayCardData,
  QuestionPlayPageData,
  QuestionRecord,
  QuestionWidgetSchema,
  SessionProgress,
} from './h5-question-bank.types';
import type {
  AssetGroup,
  AssetItem,
  AssetRendererBundle,
  ComponentSkin,
  QuestionRendererBinding,
  RendererBehavior,
  RendererLayer,
  RendererPreset,
  ResponsiveLayoutPreset,
  ResponsiveMode,
} from './h5-asset-renderer.schema';
import type {
  ChoiceOptionContent,
  ContentBlock,
  GridBlock,
  InteractionSpec,
  QuestionAnimation,
  QuestionAnswer,
  QuestionContentBundle,
  QuestionContentRecord,
  QuestionExplanation,
  QuestionHotspot,
} from './h5-question-content.schema';

export const RUNTIME_ADAPTER_VERSION = '1.0.0' as const;

export interface RuntimeAdapterDeps {
  bank: QuestionBankConfig;
  contentBundle: QuestionContentBundle;
  rendererBundle: AssetRendererBundle;
}

export interface RuntimeAdapterOptions {
  responsiveMode?: ResponsiveMode;
  playMode?: PlayModeKey | 'mixed_challenge';
  sessionProgress?: SessionProgress;
  exposeJudgeData?: boolean;
}

export interface RuntimeResolvedAsset {
  key: string;
  sourceKey: string;
  kind: AssetItem['kind'];
  path: string;
  preload: boolean;
  cachePolicy?: AssetItem['cachePolicy'];
  tags?: string[];
  width?: number;
  height?: number;
  fitSuggested?: string;
  imageKey?: string;
  dependentAssetKeys?: string[];
  meta?: Record<string, unknown>;
}

export interface RuntimeStemBlockViewModel {
  block: ContentBlock;
  resolvedAsset?: RuntimeResolvedAsset;
}

export interface RuntimeHotspotViewModel extends QuestionHotspot {
  resolvedImage?: RuntimeResolvedAsset;
}

export interface RuntimeAnimationViewModel {
  animation: QuestionAnimation;
  resolvedModel?: RuntimeResolvedAsset;
}

export interface RuntimeInteractionViewModel {
  type: InteractionType;
  submitMode: InteractionSpec['submitMode'];
  timerSeconds?: number;
  widget: QuestionWidgetSchema;
  raw: InteractionSpec;
}

export interface RuntimeJudgeViewModel {
  strategy: 'client_local';
  answer?: QuestionAnswer;
}

export interface RuntimeReviewViewModel {
  explanation: QuestionExplanation;
  recommendedFocus: string[];
  memoryTag?: string;
}

export interface RuntimeRendererLayerViewModel extends RendererLayer {
  resolvedAsset?: RuntimeResolvedAsset;
  resolvedSkin?: ComponentSkin;
  bindingData?: unknown;
}

export interface RuntimeRendererSceneViewModel {
  presetKey: string;
  presetLabel: string;
  responsiveMode: ResponsiveMode;
  layout: ResponsiveLayoutPreset;
  layers: RuntimeRendererLayerViewModel[];
  behaviors: RendererBehavior[];
}

export interface RuntimeDependencyManifest {
  assetKeys: string[];
  preloadAssetKeys: string[];
  groupKeys: string[];
  groups: AssetGroup[];
}

export interface RuntimeQuestionPageViewModel {
  adapterVersion: typeof RUNTIME_ADAPTER_VERSION;
  questionId: string;
  question: QuestionPlayCardData;
  playPage: QuestionPlayPageData;
  stem: RuntimeStemBlockViewModel[];
  hotspots: RuntimeHotspotViewModel[];
  animations: RuntimeAnimationViewModel[];
  interaction: RuntimeInteractionViewModel;
  judge: RuntimeJudgeViewModel;
  review: RuntimeReviewViewModel;
  scene: RuntimeRendererSceneViewModel;
  assets: Record<string, RuntimeResolvedAsset>;
  dependencyManifest: RuntimeDependencyManifest;
}

export interface RuntimeQuestionIndex {
  questions: Record<string, QuestionRecord>;
  contents: Record<string, QuestionContentRecord>;
  presets: Record<string, RendererPreset>;
  bindings: Record<string, QuestionRendererBinding>;
  assets: Record<string, AssetItem>;
  skins: Record<string, ComponentSkin>;
}

const DEFAULT_SESSION_PROGRESS: SessionProgress = {
  sessionId: 'runtime-preview',
  currentIndex: 1,
  total: 1,
  correct: 0,
  stars: 0,
  combo: 0,
  elapsedSeconds: 0,
};

const DEFAULT_MODE: PlayModeKey | 'mixed_challenge' = 'mixed_challenge';

export function buildRuntimeIndexes(deps: RuntimeAdapterDeps): RuntimeQuestionIndex {
  return {
    questions: Object.fromEntries(deps.bank.questions.map((item) => [item.id, item])),
    contents: Object.fromEntries(deps.contentBundle.records.map((item) => [item.meta.questionId, item])),
    presets: Object.fromEntries(deps.rendererBundle.presets.map((item) => [item.key, item])),
    bindings: Object.fromEntries(deps.rendererBundle.questionBindings.map((item) => [item.questionId, item])),
    assets: Object.fromEntries(deps.rendererBundle.assets.map((item) => [item.key, item])),
    skins: Object.fromEntries(deps.rendererBundle.skins.map((item) => [item.key, item])),
  };
}

export function createRuntimeQuestionPageViewModel(
  questionId: string,
  deps: RuntimeAdapterDeps,
  options: RuntimeAdapterOptions = {},
): RuntimeQuestionPageViewModel {
  const indexes = buildRuntimeIndexes(deps);
  const question = mustGet(indexes.questions, questionId, 'question');
  const content = mustGet(indexes.contents, questionId, 'content');
  const binding = indexes.bindings[questionId];
  const preset = resolveRendererPreset(questionId, content.interaction.type, deps.rendererBundle, binding);
  const responsiveMode = options.responsiveMode ?? preset.defaultResponsiveMode;
  const layout =
    preset.layouts.find((item) => item.mode === responsiveMode) ??
    preset.layouts.find((item) => item.mode === preset.defaultResponsiveMode) ??
    preset.layouts[0];

  const resolvedAssets = resolveQuestionAssets({
    content,
    preset,
    binding,
    assetIndex: indexes.assets,
  });

  const skinMap = resolveSkinMap({
    preset,
    binding,
    skinIndex: indexes.skins,
  });

  const stem = content.stem.blocks.map((block) => mapStemBlock(block, resolvedAssets));
  const hotspots = (content.hotspots ?? []).map((hotspot) => ({
    ...hotspot,
    resolvedImage: resolvedAssets[hotspot.imageKey],
  }));
  const animations = (content.animations ?? []).map((animation) => ({
    animation,
    resolvedModel: 'modelKey' in animation ? resolvedAssets[animation.modelKey] : undefined,
  }));

  const interaction = mapInteractionViewModel(content.interaction, content.answer);
  const questionCard = mapQuestionPlayCard(question, content, interaction.widget);
  const progress = options.sessionProgress ?? DEFAULT_SESSION_PROGRESS;
  const playPage: QuestionPlayPageData = {
    mode: options.playMode ?? DEFAULT_MODE,
    progress,
    question: questionCard,
    previousQuestionIds: [],
    nextQuestionId: undefined,
  };

  const bindingContext = {
    question,
    questionCard,
    playPage,
    stem,
    hotspots,
    animations,
    interaction,
    assets: resolvedAssets,
  };

  const scene: RuntimeRendererSceneViewModel = {
    presetKey: preset.key,
    presetLabel: preset.label,
    responsiveMode,
    layout,
    layers: preset.layers.map((layer) => ({
      ...layer,
      resolvedAsset: layer.assetKey ? resolvedAssets[applyAssetOverride(layer.assetKey, binding)] : undefined,
      resolvedSkin: layer.skinKey ? skinMap[layer.skinKey] : undefined,
      bindingData: layer.dataBinding ? getByPath(bindingContext, layer.dataBinding) : undefined,
    })),
    behaviors: filterBehaviors(preset.behaviors ?? [], binding),
  };

  const dependencyManifest = buildDependencyManifest(resolvedAssets, deps.rendererBundle.groups);

  return {
    adapterVersion: RUNTIME_ADAPTER_VERSION,
    questionId,
    question: questionCard,
    playPage,
    stem,
    hotspots,
    animations,
    interaction,
    judge: {
      strategy: 'client_local',
      answer: options.exposeJudgeData === false ? undefined : content.answer,
    },
    review: {
      explanation: content.explanation,
      recommendedFocus: content.review?.recommendedFocus ?? [],
      memoryTag: content.review?.memoryTag,
    },
    scene,
    assets: resolvedAssets,
    dependencyManifest,
  };
}

export function createRuntimeQuestionPageViewModels(
  questionIds: string[],
  deps: RuntimeAdapterDeps,
  options: RuntimeAdapterOptions = {},
): RuntimeQuestionPageViewModel[] {
  return questionIds.map((questionId, index) =>
    createRuntimeQuestionPageViewModel(questionId, deps, {
      ...options,
      sessionProgress: {
        ...(options.sessionProgress ?? DEFAULT_SESSION_PROGRESS),
        currentIndex: index + 1,
        total: questionIds.length,
      },
    }),
  );
}

export function resolveRendererPreset(
  questionId: string,
  interactionType: InteractionType,
  bundle: AssetRendererBundle,
  binding?: QuestionRendererBinding,
): RendererPreset {
  if (binding?.presetKey) {
    const matched = bundle.presets.find((item) => item.key === binding.presetKey);
    if (matched) return matched;
  }

  const recommended = bundle.presets.find((item) => item.recommendedForQuestionIds?.includes(questionId));
  if (recommended) return recommended;

  const byInteraction = bundle.presets.find((item) => item.supportedInteractions.includes(interactionType));
  if (byInteraction) return byInteraction;

  throw new Error(`No renderer preset found for question ${questionId} with interaction ${interactionType}`);
}

function mapQuestionPlayCard(
  question: QuestionRecord,
  content: QuestionContentRecord,
  widget: QuestionWidgetSchema,
): QuestionPlayCardData {
  return {
    questionId: question.id,
    roomName: question.roomName,
    moduleName: question.moduleName,
    title: content.stem.title || question.title,
    promptText: buildPromptText(content.stem.blocks),
    difficulty: question.difficulty,
    difficultyLabel: question.difficultyLabel as DifficultyLabel,
    skills: question.skills,
    imageKey: firstImageKey(content),
    primaryInteraction: content.interaction.type,
    secondaryInteractions: question.interaction.filter((item) => item !== content.interaction.type),
    widget,
  };
}

function mapInteractionViewModel(interaction: InteractionSpec, answer: QuestionAnswer): RuntimeInteractionViewModel {
  switch (interaction.type) {
    case 'text_input':
    case 'fill_blank':
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind: 'text_input',
          placeholder: answer.kind === 'free_text' ? '请输入文字答案' : '请输入答案',
          keyboard: interaction.keyboard ?? (answer.kind === 'free_text' ? 'text' : 'number'),
          answerFormat: answer.kind === 'free_text' ? 'text' : 'integer',
        },
      };
    case 'single_choice':
    case 'multi_choice':
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind: interaction.type,
          options: (interaction.options ?? []).map(mapChoiceOption),
        },
      };
    case 'drag_number_slots':
    case 'drag_blank':
    case 'drag_symbol':
    case 'drag_drop':
    case 'drag_number_regions':
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind:
            interaction.type === 'drag_number_regions'
              ? 'drag_number_slots'
              : interaction.type,
          tokens: (interaction.dragTokens ?? []).map((item) => ({ id: item.id, label: item.label, value: item.value })),
          slots: (interaction.slots ?? []).map((item) => ({
            id: item.id,
            accepts: item.accepts,
            placeholder: item.placeholder,
          })),
        },
      };
    case 'drag_number_grid': {
      const cells = (interaction.gridCells ?? []).map((cell) => ({
        id: cell.cellId,
        row: cell.row,
        col: cell.col,
        presetValue: cell.presetValue,
        locked: cell.locked,
      }));
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind: 'drag_number_grid',
          tokens: (interaction.dragTokens ?? []).map((item) => ({ id: item.id, label: item.label, value: item.value })),
          cells,
        },
      };
    }
    case 'click_highlight':
    case 'click_count': {
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind: interaction.type,
          targetHint: buildTargetHintFromAnswer(answer),
          minSelectable: interaction.minSelections,
          maxSelectable: interaction.maxSelections,
        },
      };
    }
    case 'rotate_cube':
    case 'observe_3d':
    case 'animation_demo':
    case 'step_animation':
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind: interaction.type,
          targetHint: '先观察，再选择答案。',
          options: (interaction.options ?? []).map(mapChoiceOption),
        },
      };
    default:
      return {
        type: interaction.type,
        submitMode: interaction.submitMode,
        timerSeconds: interaction.timerSeconds,
        raw: interaction,
        widget: {
          kind: 'custom',
          rendererKey: interaction.type,
          payload: {
            interaction,
          },
        },
      };
  }
}

function buildTargetHintFromAnswer(answer: QuestionAnswer): string {
  if (answer.kind === 'hotspot_selection') {
    return answer.selectionMode === 'exact' ? '请准确点出所有目标区域。' : '请至少点出需要的目标区域。';
  }
  return '请在图上点选目标。';
}

function mapChoiceOption(option: ChoiceOptionContent): ChoiceOption {
  return {
    id: option.id,
    label: option.label,
    value: option.value,
  };
}

function mapStemBlock(
  block: ContentBlock,
  resolvedAssets: Record<string, RuntimeResolvedAsset>,
): RuntimeStemBlockViewModel {
  if (block.type === 'image') {
    return {
      block,
      resolvedAsset: resolvedAssets[block.imageKey],
    };
  }
  return { block };
}

function resolveQuestionAssets(params: {
  content: QuestionContentRecord;
  preset: RendererPreset;
  binding?: QuestionRendererBinding;
  assetIndex: Record<string, AssetItem>;
}): Record<string, RuntimeResolvedAsset> {
  const assetKeys = collectAssetKeys(params.content, params.preset).map((key) => applyAssetOverride(key, params.binding));
  const uniqueKeys = Array.from(new Set(assetKeys));
  const resolved: Record<string, RuntimeResolvedAsset> = {};

  uniqueKeys.forEach((key) => {
    const asset = params.assetIndex[key];
    if (!asset) return;
    resolved[key] = mapResolvedAsset(asset);

    if ((asset.kind === 'sprite_sheet' || asset.kind === 'atlas') && asset.imageKey) {
      const dependent = params.assetIndex[asset.imageKey];
      if (dependent) {
        resolved[asset.imageKey] = mapResolvedAsset(dependent);
        resolved[key].dependentAssetKeys = [asset.imageKey];
      }
    }
  });

  return resolved;
}

function collectAssetKeys(content: QuestionContentRecord, preset: RendererPreset): string[] {
  const keys = new Set<string>();

  content.assets.imageKeys.forEach((key) => keys.add(key));
  content.assets.audioKeys?.forEach((key) => keys.add(key));
  content.assets.modelKeys?.forEach((key) => keys.add(key));

  content.stem.blocks.forEach((block) => {
    if (block.type === 'image') keys.add(block.imageKey);
  });

  content.hotspots?.forEach((hotspot) => keys.add(hotspot.imageKey));
  content.animations?.forEach((animation) => {
    if ('modelKey' in animation) keys.add(animation.modelKey);
    if ('frameImageKeys' in animation) animation.frameImageKeys.forEach((key) => keys.add(key));
  });

  preset.layers.forEach((layer) => {
    if (layer.assetKey) keys.add(layer.assetKey);
  });

  return Array.from(keys);
}

function mapResolvedAsset(asset: AssetItem): RuntimeResolvedAsset {
  const base: RuntimeResolvedAsset = {
    key: asset.key,
    sourceKey: asset.key,
    kind: asset.kind,
    path: asset.path,
    preload: asset.preload ?? false,
    cachePolicy: asset.cachePolicy,
    tags: asset.tags,
  };

  switch (asset.kind) {
    case 'image':
      return {
        ...base,
        width: asset.width,
        height: asset.height,
        fitSuggested: asset.fitSuggested,
      };
    case 'sprite_sheet':
    case 'atlas':
      return {
        ...base,
        width: asset.sheetWidth,
        height: asset.sheetHeight,
        imageKey: asset.imageKey,
        meta: { frameCount: asset.frames.length },
      };
    case 'model_3d':
      return {
        ...base,
        meta: {
          format: asset.format,
          unitScale: asset.unitScale,
          clips: asset.clips?.map((item) => item.key) ?? [],
          cameraPresets: asset.cameraPresets?.map((item) => item.presetKey) ?? [],
        },
      };
    case 'audio':
      return {
        ...base,
        meta: { durationMs: asset.durationMs, channel: asset.channel },
      };
    case 'font':
      return {
        ...base,
        meta: { family: asset.family, weights: asset.weights },
      };
    case 'video':
      return {
        ...base,
        width: asset.width,
        height: asset.height,
        meta: { durationMs: asset.durationMs, muted: asset.muted },
      };
  }
}

function resolveSkinMap(params: {
  preset: RendererPreset;
  binding?: QuestionRendererBinding;
  skinIndex: Record<string, ComponentSkin>;
}): Record<string, ComponentSkin> {
  const map: Record<string, ComponentSkin> = {};
  const skinKeys = Array.from(new Set(params.preset.layers.map((item) => item.skinKey).filter(Boolean))) as string[];

  skinKeys.forEach((skinKey) => {
    const source = params.skinIndex[skinKey];
    if (!source) return;
    const override = params.binding?.skinOverrides?.[skinKey as keyof typeof params.binding.skinOverrides];
    map[skinKey] = mergeSkin(source, override);
  });

  return map;
}

function mergeSkin(source: ComponentSkin, override?: Partial<ComponentSkin>): ComponentSkin {
  if (!override) return source;
  return {
    ...source,
    ...override,
    base: {
      ...source.base,
      ...override.base,
      border: override.base?.border ? { ...source.base.border, ...override.base.border } : source.base.border,
      shadow: override.base?.shadow ? { ...source.base.shadow, ...override.base.shadow } : source.base.shadow,
      spacing: override.base?.spacing ? { ...source.base.spacing, ...override.base.spacing } : source.base.spacing,
      text: override.base?.text ? { ...source.base.text, ...override.base.text } : source.base.text,
    },
    states: {
      ...source.states,
      ...override.states,
    },
    extra: {
      ...source.extra,
      ...override.extra,
    },
  };
}

function buildDependencyManifest(
  resolvedAssets: Record<string, RuntimeResolvedAsset>,
  groups: AssetGroup[],
): RuntimeDependencyManifest {
  const assetKeys = Object.keys(resolvedAssets);
  const preloadAssetKeys = assetKeys.filter((key) => resolvedAssets[key]?.preload);
  const groupKeys = groups
    .filter((group) => group.assetKeys.some((assetKey) => assetKeys.includes(assetKey)))
    .map((group) => group.key);

  return {
    assetKeys,
    preloadAssetKeys,
    groupKeys,
    groups: groups.filter((group) => groupKeys.includes(group.key)),
  };
}

function filterBehaviors(
  behaviors: RendererBehavior[],
  binding?: QuestionRendererBinding,
): RendererBehavior[] {
  if (!binding?.behaviorToggles) return behaviors;
  return behaviors.filter((behavior) => binding.behaviorToggles?.[behavior.key] !== false);
}

function applyAssetOverride(assetKey: string, binding?: QuestionRendererBinding): string {
  return binding?.assetOverrides?.[assetKey] ?? assetKey;
}

function buildPromptText(blocks: ContentBlock[]): string {
  return blocks
    .filter((block) => block.type === 'paragraph' || block.type === 'equation' || block.type === 'hint')
    .map((block) => ('text' in block ? block.text : ''))
    .filter(Boolean)
    .join('\n');
}

function firstImageKey(content: QuestionContentRecord): string | null {
  const imageBlock = content.stem.blocks.find((block) => block.type === 'image');
  if (imageBlock && imageBlock.type === 'image') return imageBlock.imageKey;
  return content.assets.imageKeys[0] ?? null;
}

function mustGet<T>(index: Record<string, T>, key: string, label: string): T {
  const value = index[key];
  if (!value) {
    throw new Error(`Missing ${label} for key ${key}`);
  }
  return value;
}

function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

export function deriveGridCellsFromStem(blocks: ContentBlock[]): GridBlock | undefined {
  return blocks.find((block): block is GridBlock => block.type === 'grid');
}
