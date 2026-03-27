import { ASSET_RENDERER_SCHEMA_VERSION } from './h5-asset-renderer.schema';
import type { AssetRendererBundle, ComponentSkin, RendererPreset } from './h5-asset-renderer.schema';

const commonSkins: ComponentSkin[] = [
  {
    key: 'app_shell',
    label: '应用外壳',
    base: {
      background: 'linear-gradient(180deg, #F7FBFF 0%, #EAF4FF 100%)',
      spacing: { paddingX: 24, paddingY: 24, gap: 16 },
    },
    extra: {
      backgroundIllustration: 'bg-cloud-soft',
      musicEnabledByDefault: true,
    },
  },
  {
    key: 'question_card',
    label: '题目卡片',
    base: {
      background: '#FFFFFF',
      border: { width: 2, color: '#D9E8FF', radius: 24 },
      shadow: { x: 0, y: 12, blur: 28, color: '#7FA7D9', opacity: 0.18 },
      spacing: { paddingX: 28, paddingY: 24, gap: 14 },
    },
  },
  {
    key: 'question_title',
    label: '题目标题',
    base: {
      background: 'transparent',
      text: {
        fontFamily: 'HarmonyOS Sans SC',
        fontWeight: 700,
        fontSize: 34,
        lineHeight: 44,
        color: '#1B3A57',
      },
    },
  },
  {
    key: 'hint_chip',
    label: '提示条',
    base: {
      background: '#EEF7FF',
      border: { width: 1, color: '#B7D7FF', radius: 18 },
      spacing: { paddingX: 16, paddingY: 10, gap: 8 },
      text: {
        fontFamily: 'HarmonyOS Sans SC',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 28,
        color: '#34618F',
      },
    },
  },
  {
    key: 'choice_button',
    label: '选项按钮',
    base: {
      background: '#FFFFFF',
      border: { width: 2, color: '#CFE0F7', radius: 22 },
      shadow: { x: 0, y: 8, blur: 18, color: '#7FA7D9', opacity: 0.15 },
      spacing: { paddingX: 18, paddingY: 16, gap: 8 },
      text: {
        fontFamily: 'HarmonyOS Sans SC',
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 36,
        color: '#1B3A57',
      },
    },
    states: {
      hover: { background: '#F5FAFF', borderColor: '#8FC1FF', scale: 1.02 },
      pressed: { background: '#E9F4FF', borderColor: '#6EAEFF', scale: 0.98 },
      correct: { background: '#EAFBF1', borderColor: '#59C48B', textColor: '#1B7D50' },
      wrong: { background: '#FFF1F1', borderColor: '#F08B8B', textColor: '#B84242' },
    },
    extra: { minHeight: 88 },
  },
  {
    key: 'number_token',
    label: '数字拖拽块',
    base: {
      background: '#FFF8E8',
      border: { width: 2, color: '#FFD76A', radius: 20 },
      shadow: { x: 0, y: 6, blur: 14, color: '#CCAA44', opacity: 0.18 },
      spacing: { paddingX: 14, paddingY: 12, gap: 4 },
      text: {
        fontFamily: 'DIN Alternate',
        fontWeight: 700,
        fontSize: 32,
        lineHeight: 36,
        color: '#8A5A00',
      },
    },
  },
  {
    key: 'drag_slot',
    label: '拖拽槽位',
    base: {
      background: '#F7FAFD',
      border: { width: 2, color: '#C8D8EA', radius: 18 },
      spacing: { paddingX: 12, paddingY: 12, gap: 6 },
    },
    states: {
      hover: { background: '#EEF7FF', borderColor: '#8FC1FF' },
      correct: { background: '#EAFBF1', borderColor: '#59C48B' },
      wrong: { background: '#FFF4F4', borderColor: '#F08B8B' },
    },
    extra: {
      emptyIconFrame: 'slot-dashed-star',
      minWidth: 84,
      minHeight: 84,
    },
  },
  {
    key: 'grid_board',
    label: '逻辑网格板',
    base: {
      background: '#FFFFFF',
      border: { width: 3, color: '#7098C7', radius: 20 },
      shadow: { x: 0, y: 10, blur: 22, color: '#5F88B7', opacity: 0.18 },
      spacing: { paddingX: 12, paddingY: 12, gap: 2 },
    },
    extra: {
      cellGap: 2,
      regionLineColor: '#2E5B8A',
      regionLineWidth: 4,
    },
  },
  {
    key: 'grid_cell',
    label: '网格单元格',
    base: {
      background: '#F8FBFF',
      border: { width: 1, color: '#D6E3F2', radius: 8 },
      text: {
        fontFamily: 'DIN Alternate',
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 32,
        color: '#1B3A57',
      },
    },
    states: {
      hover: { background: '#EEF7FF' },
      correct: { background: '#EAFBF1' },
      wrong: { background: '#FFF2F2' },
      disabled: { background: '#EEF2F6', textColor: '#738499' },
    },
    extra: { lockedBackground: '#EAF0F7' },
  },
  {
    key: 'hotspot_overlay',
    label: '热区高亮层',
    base: {
      background: 'rgba(78, 162, 255, 0.18)',
      border: { width: 2, color: '#4EA2FF', radius: 16 },
    },
    states: {
      hover: { opacity: 0.8 },
      correct: { background: 'rgba(76, 201, 112, 0.20)', borderColor: '#4CC970' },
      wrong: { background: 'rgba(240, 107, 107, 0.20)', borderColor: '#F06B6B' },
    },
    extra: { pulseDurationMs: 800 },
  },
  {
    key: 'timer_ring',
    label: '计时圆环',
    base: {
      background: 'transparent',
      text: {
        fontFamily: 'DIN Alternate',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 28,
        color: '#1B3A57',
      },
    },
    extra: {
      ringColor: '#6CAEF8',
      warningColor: '#F5A623',
      dangerColor: '#EB5757',
      trackColor: '#DCEBFB',
      strokeWidth: 10,
    },
  },
  {
    key: 'progress_bar',
    label: '进度条',
    base: {
      background: '#EAF2FB',
      border: { width: 0, color: 'transparent', radius: 999 },
    },
    extra: {
      fillGradient: 'linear-gradient(90deg, #6CAEF8 0%, #78D0B5 100%)',
      height: 16,
    },
  },
  {
    key: 'cube_viewer',
    label: '立方体观察器',
    base: {
      background: 'radial-gradient(circle at 50% 40%, #FFFFFF 0%, #EAF4FF 100%)',
      border: { width: 2, color: '#C7DCF4', radius: 28 },
      shadow: { x: 0, y: 14, blur: 30, color: '#7FA7D9', opacity: 0.18 },
    },
    extra: {
      cameraDamping: 0.08,
      showAxisHelper: false,
      allowZoom: true,
    },
  },
  {
    key: 'gear_viewer',
    label: '齿轮观察器',
    base: {
      background: '#F8FBFF',
      border: { width: 2, color: '#D3E4F7', radius: 24 },
    },
    extra: {
      playSpeed: 1,
      showDirectionBadge: true,
      shadowUnderGears: true,
    },
  },
  {
    key: 'result_panel',
    label: '结算面板',
    base: {
      background: '#FFFFFF',
      border: { width: 2, color: '#D9E8FF', radius: 28 },
      shadow: { x: 0, y: 16, blur: 36, color: '#7FA7D9', opacity: 0.20 },
      spacing: { paddingX: 28, paddingY: 24, gap: 16 },
    },
    extra: {
      starBurstSprite: 'fx-star-burst',
      confettiSprite: 'fx-confetti-6',
    },
  },
  {
    key: 'module_room_card',
    label: '模块房间卡片',
    base: {
      background: '#FFFFFF',
      border: { width: 2, color: '#DCEBFB', radius: 24 },
      shadow: { x: 0, y: 10, blur: 20, color: '#7FA7D9', opacity: 0.16 },
      spacing: { paddingX: 20, paddingY: 20, gap: 12 },
    },
    states: {
      hover: { background: '#F8FBFF', borderColor: '#8FC1FF', scale: 1.02 },
      pressed: { scale: 0.98 },
    },
    extra: {
      ribbonSprite: 'ui-room-ribbon',
      iconFrame: 'ui-room-icon-frame',
    },
  },
];

const rendererPresets: RendererPreset[] = [
  {
    key: 'mental_math_fast_input',
    label: '快算输入页',
    supportedInteractions: ['text_input'],
    recommendedForQuestionIds: ['36Y-1'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'header', box: { x: 72, y: 40, width: 1776, height: 96 }, zIndex: 5 },
          { key: 'center_stage', box: { x: 300, y: 170, width: 1320, height: 480 }, zIndex: 10 },
          { key: 'bottom_bar', box: { x: 320, y: 730, width: 1280, height: 240 }, zIndex: 8 },
          { key: 'overlay', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 100 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'hud', type: 'hud_mount', region: 'header', skinKey: 'progress_bar' },
      { id: 'question-card', type: 'question_content_mount', region: 'center_stage', skinKey: 'question_card' },
      { id: 'answer-input', type: 'interaction_mount', region: 'bottom_bar', skinKey: 'drag_slot', dataBinding: 'interaction' },
    ],
    behaviors: [
      { key: 'enter-focus-input', when: 'on_enter', action: 'pulse_skin', targetId: 'answer-input', payload: { repeat: 1 } },
      { key: 'correct-burst', when: 'on_correct', action: 'play_audio', targetId: 'sfx-correct' },
      { key: 'wrong-shake', when: 'on_wrong', action: 'shake_layer', targetId: 'answer-input' },
    ],
  },
  {
    key: 'pattern_single_choice',
    label: '规律单选页',
    supportedInteractions: ['single_choice'],
    recommendedForQuestionIds: ['36Y-2'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'header', box: { x: 72, y: 40, width: 1776, height: 90 }, zIndex: 5 },
          { key: 'left_panel', box: { x: 100, y: 180, width: 980, height: 620 }, zIndex: 10 },
          { key: 'right_panel', box: { x: 1140, y: 180, width: 680, height: 620 }, zIndex: 10 },
          { key: 'bottom_bar', box: { x: 100, y: 840, width: 1720, height: 180 }, zIndex: 8 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'question', type: 'question_content_mount', region: 'left_panel', skinKey: 'question_card' },
      { id: 'choices', type: 'interaction_mount', region: 'right_panel', skinKey: 'choice_button', dataBinding: 'interaction.options' },
      { id: 'hud', type: 'hud_mount', region: 'header', skinKey: 'timer_ring' },
    ],
  },
  {
    key: 'geometry_click_highlight',
    label: '数图热区页',
    supportedInteractions: ['click_highlight'],
    recommendedForQuestionIds: ['36Y-10'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'left_panel', box: { x: 84, y: 150, width: 620, height: 780 }, zIndex: 10 },
          { key: 'center_stage', box: { x: 760, y: 120, width: 880, height: 820 }, zIndex: 10 },
          { key: 'right_panel', box: { x: 1660, y: 170, width: 180, height: 700 }, zIndex: 10 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'question', type: 'question_content_mount', region: 'left_panel', skinKey: 'question_card' },
      { id: 'figure', type: 'image', region: 'center_stage', assetKey: '36Y-10.png', fit: 'contain' },
      { id: 'hotspots', type: 'hotspot_mount', region: 'center_stage', skinKey: 'hotspot_overlay', dataBinding: 'hotspots' },
      { id: 'hint', type: 'animation_mount', region: 'right_panel', dataBinding: 'animations' },
    ],
    behaviors: [
      { key: 'wrong-flash', when: 'on_wrong', action: 'highlight_hotspots', targetId: 'hotspots', payload: { mode: 'missed_targets' } },
    ],
  },
  {
    key: 'cube_rotate_choice',
    label: '立方体旋转单选页',
    supportedInteractions: ['rotate_cube', 'single_choice'],
    recommendedForQuestionIds: ['36Y-7'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'left_panel', box: { x: 100, y: 150, width: 600, height: 760 }, zIndex: 10 },
          { key: 'center_stage', box: { x: 740, y: 110, width: 700, height: 760 }, zIndex: 10 },
          { key: 'right_panel', box: { x: 1490, y: 170, width: 330, height: 640 }, zIndex: 10 },
          { key: 'bottom_bar', box: { x: 740, y: 900, width: 1080, height: 110 }, zIndex: 8 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'question', type: 'question_content_mount', region: 'left_panel', skinKey: 'question_card' },
      { id: 'cube-model', type: 'model_viewer', region: 'center_stage', assetKey: 'cube-colored-basic.glb', skinKey: 'cube_viewer' },
      { id: 'choices', type: 'interaction_mount', region: 'right_panel', skinKey: 'choice_button', dataBinding: 'interaction.options' },
      { id: 'hud', type: 'hud_mount', region: 'bottom_bar', skinKey: 'timer_ring' },
    ],
    behaviors: [
      { key: 'enter-camera', when: 'on_enter', action: 'switch_camera_preset', targetId: 'cube-model', payload: { presetKey: 'question-default' } },
    ],
  },
  {
    key: 'logic_grid_drag_fill',
    label: '逻辑网格拖拽页',
    supportedInteractions: ['drag_number_grid'],
    recommendedForQuestionIds: ['36Y-19'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'left_panel', box: { x: 84, y: 140, width: 600, height: 820 }, zIndex: 10 },
          { key: 'center_stage', box: { x: 760, y: 160, width: 660, height: 660 }, zIndex: 10 },
          { key: 'right_panel', box: { x: 1490, y: 180, width: 300, height: 620 }, zIndex: 10 },
          { key: 'bottom_bar', box: { x: 760, y: 860, width: 1030, height: 130 }, zIndex: 8 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'question', type: 'question_content_mount', region: 'left_panel', skinKey: 'question_card' },
      { id: 'grid-board', type: 'interaction_mount', region: 'center_stage', skinKey: 'grid_board', dataBinding: 'stem.blocks.grid' },
      { id: 'tokens', type: 'interaction_mount', region: 'bottom_bar', skinKey: 'number_token', dataBinding: 'interaction.dragTokens' },
      { id: 'help', type: 'animation_mount', region: 'right_panel', skinKey: 'hint_chip', dataBinding: 'explanation.steps' },
    ],
  },
  {
    key: 'gear_animation_choice',
    label: '齿轮动画推理页',
    supportedInteractions: ['animation_demo', 'single_choice'],
    recommendedForQuestionIds: ['34W-20'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'left_panel', box: { x: 90, y: 150, width: 560, height: 760 }, zIndex: 10 },
          { key: 'center_stage', box: { x: 710, y: 130, width: 780, height: 760 }, zIndex: 10 },
          { key: 'right_panel', box: { x: 1540, y: 220, width: 260, height: 520 }, zIndex: 10 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'question', type: 'question_content_mount', region: 'left_panel', skinKey: 'question_card' },
      { id: 'gear-stage', type: 'animation_mount', region: 'center_stage', skinKey: 'gear_viewer', dataBinding: 'animations' },
      { id: 'choices', type: 'interaction_mount', region: 'right_panel', skinKey: 'choice_button', dataBinding: 'interaction.options' },
    ],
  },
  {
    key: 'equal_sum_drag_slots',
    label: '等和图拖拽页',
    supportedInteractions: ['drag_number_slots'],
    recommendedForQuestionIds: ['34Y-18'],
    defaultResponsiveMode: 'landscape',
    layouts: [
      {
        mode: 'landscape',
        canvas: { width: 1920, height: 1080 },
        safeArea: { x: 48, y: 36, width: 1824, height: 1008 },
        regions: [
          { key: 'background', box: { x: 0, y: 0, width: 1920, height: 1080 }, zIndex: 0 },
          { key: 'left_panel', box: { x: 84, y: 150, width: 560, height: 760 }, zIndex: 10 },
          { key: 'center_stage', box: { x: 690, y: 140, width: 840, height: 780 }, zIndex: 10 },
          { key: 'right_panel', box: { x: 1570, y: 180, width: 220, height: 620 }, zIndex: 10 },
        ],
      },
    ],
    layers: [
      { id: 'bg', type: 'background_gradient', region: 'background', skinKey: 'app_shell' },
      { id: 'question', type: 'question_content_mount', region: 'left_panel', skinKey: 'question_card' },
      { id: 'figure', type: 'image', region: 'center_stage', assetKey: '34Y-18.png', fit: 'contain' },
      { id: 'hotspots', type: 'hotspot_mount', region: 'center_stage', skinKey: 'drag_slot', dataBinding: 'hotspots' },
      { id: 'tokens', type: 'interaction_mount', region: 'right_panel', skinKey: 'number_token', dataBinding: 'interaction.dragTokens' },
    ],
  },
];

export const mockAssetRendererBundle: AssetRendererBundle = {
  meta: {
    title: 'H5 一年级思维训练资源与渲染配置',
    locale: 'zh-CN',
    version: ASSET_RENDERER_SCHEMA_VERSION,
    generatedAt: '2026-03-22T13:30:00Z',
    notes: [
      '示例资源 key 与 question-content mock 中的 imageKey / modelKey 对齐。',
      '正式接图后，只需要把 path、尺寸、帧信息替换成真实值。',
    ],
  },
  assets: [
    { key: '36Y-10.png', kind: 'image', path: '/assets/questions/36Y/36Y-10.png', width: 1024, height: 1024, alpha: true, fitSuggested: 'contain', background: 'transparent', preload: true },
    { key: '36Y-7.png', kind: 'image', path: '/assets/questions/36Y/36Y-7.png', width: 1200, height: 900, alpha: true, fitSuggested: 'contain', background: 'transparent' },
    { key: '34Y-18.png', kind: 'image', path: '/assets/questions/34Y/34Y-18.png', width: 1200, height: 1200, alpha: true, fitSuggested: 'contain', background: 'transparent' },
    { key: '34W-20.png', kind: 'image', path: '/assets/questions/34W/34W-20.png', width: 1280, height: 960, alpha: true, fitSuggested: 'contain', background: 'transparent' },
    {
      key: 'ui-common-sprites',
      kind: 'sprite_sheet',
      path: '/assets/ui/ui-common-sprites.png',
      imageKey: 'ui-common-sprites-image',
      sheetWidth: 1024,
      sheetHeight: 1024,
      frames: [
        { key: 'fx-star-burst', x: 0, y: 0, width: 256, height: 256 },
        { key: 'fx-confetti-6', x: 256, y: 0, width: 256, height: 256 },
        { key: 'slot-dashed-star', x: 512, y: 0, width: 128, height: 128 },
        { key: 'ui-room-ribbon', x: 640, y: 0, width: 192, height: 96 },
        { key: 'ui-room-icon-frame', x: 832, y: 0, width: 128, height: 128 },
      ],
    },
    { key: 'ui-common-sprites-image', kind: 'image', path: '/assets/ui/ui-common-sprites.png', width: 1024, height: 1024, alpha: true, fitSuggested: 'none', background: 'transparent', preload: true },
    {
      key: 'cube-colored-basic.glb',
      kind: 'model_3d',
      path: '/assets/models/cube-colored-basic.glb',
      format: 'glb',
      unitScale: 1,
      boundingBox: { width: 1, height: 1, depth: 1 },
      clips: [
        { key: 'idle', durationMs: 2000, loop: true },
        { key: 'flip_y_180', durationMs: 900 },
      ],
      cameraPresets: [
        { presetKey: 'question-default', orbitYawDeg: 30, orbitPitchDeg: 22, distance: 4.4, target: [0, 0, 0] },
        { presetKey: 'top-view', orbitYawDeg: 0, orbitPitchDeg: 85, distance: 4.8, target: [0, 0, 0] },
      ],
    },
    { key: 'sfx-correct', kind: 'audio', path: '/assets/audio/sfx/correct.mp3', durationMs: 900, channel: 'sfx', preload: true },
    { key: 'sfx-wrong', kind: 'audio', path: '/assets/audio/sfx/wrong.mp3', durationMs: 820, channel: 'sfx' },
    { key: 'bg-cloud-soft', kind: 'image', path: '/assets/backgrounds/bg-cloud-soft.png', width: 1920, height: 1080, alpha: true, fitSuggested: 'cover', background: 'transparent' },
    { key: 'HarmonyOSSansSC', kind: 'font', path: '/assets/fonts/HarmonyOSSansSC.woff2', family: 'HarmonyOS Sans SC', weights: [400, 500, 700] },
    { key: 'DINAlternate', kind: 'font', path: '/assets/fonts/DINAlternate.woff2', family: 'DIN Alternate', weights: [700] },
  ],
  groups: [
    { key: 'question_images_core', label: '核心题图', assetKeys: ['36Y-10.png', '36Y-7.png', '34Y-18.png', '34W-20.png'] },
    { key: 'ui_core', label: '核心 UI 资源', assetKeys: ['ui-common-sprites', 'ui-common-sprites-image', 'bg-cloud-soft', 'HarmonyOSSansSC', 'DINAlternate'] },
    { key: 'spatial_models', label: '空间模型', assetKeys: ['cube-colored-basic.glb'] },
    { key: 'common_sfx', label: '通用音效', assetKeys: ['sfx-correct', 'sfx-wrong'] },
  ],
  skins: commonSkins,
  presets: rendererPresets,
  questionBindings: [
    { questionId: '36Y-1', presetKey: 'mental_math_fast_input' },
    { questionId: '36Y-2', presetKey: 'pattern_single_choice' },
    { questionId: '36Y-10', presetKey: 'geometry_click_highlight' },
    { questionId: '36Y-7', presetKey: 'cube_rotate_choice' },
    { questionId: '36Y-19', presetKey: 'logic_grid_drag_fill' },
    { questionId: '34W-20', presetKey: 'gear_animation_choice' },
    {
      questionId: '34Y-18',
      presetKey: 'equal_sum_drag_slots',
      skinOverrides: {
        drag_slot: {
          extra: {
            minWidth: 92,
            minHeight: 92,
            emptyIconFrame: 'slot-dashed-star',
          },
        },
      },
    },
  ],
};
