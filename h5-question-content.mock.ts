import { CONTENT_SCHEMA_VERSION } from './h5-question-content.schema';
import type { QuestionContentBundle, QuestionContentRecord } from './h5-question-content.schema';

export const mockQuestionContents: QuestionContentRecord[] = [
  {
    meta: {
      questionId: '36Y-1',
      paper: '36Y',
      qid: 1,
      moduleId: 'A',
      moduleKey: 'mental_math',
      interactionType: 'text_input',
      difficulty: 1,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '快算：同项抵消',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '计算：37 + 18 - 37 + 82 = ?' },
        { id: 'b2', type: 'hint', text: '先观察有没有可以直接抵消的数。', tone: 'info' },
      ],
    },
    interaction: {
      type: 'text_input',
      submitMode: 'manual',
      keyboard: 'number',
      timerSeconds: 15,
    },
    answer: {
      kind: 'numeric',
      acceptedValues: [100],
      ignoreLeadingZeros: true,
      trimWhitespace: true,
    },
    explanation: {
      summary: '37 和 -37 先抵消，剩下 18 + 82 = 100。',
      steps: [
        { id: 's1', kind: 'observation', title: '先看结构', text: '37 和 -37 是一对相反数，可以先抵消。' },
        { id: 's2', kind: 'calculation', title: '再算剩下的', text: '剩下 18 + 82，正好凑成 100。' },
        { id: 's3', kind: 'summary', title: '得到答案', text: '所以答案是 100。' },
      ],
      wrongReasons: [
        { code: 'left_to_right_only', title: '从左到右硬算', text: '这题更快的方法是先找能抵消的项。' },
      ],
    },
    assets: { imageKeys: [] },
    review: {
      recommendedFocus: ['同项抵消', '凑整'],
      memoryTag: 'mental-cancel-100',
    },
  },
  {
    meta: {
      questionId: '36Y-2',
      paper: '36Y',
      qid: 2,
      moduleId: 'B',
      moduleKey: 'patterns',
      interactionType: 'single_choice',
      difficulty: 3,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '规律：双序列交错',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '按规律填数：3，20，6，18，9，16，12，14，（ ? ），12' },
        { id: 'b2', type: 'hint', text: '可以把奇数位和偶数位分开看。', tone: 'info' },
      ],
    },
    interaction: {
      type: 'single_choice',
      submitMode: 'manual',
      options: [
        { id: 'o1', label: '13', value: 13 },
        { id: 'o2', label: '15', value: 15 },
        { id: 'o3', label: '16', value: 16 },
        { id: 'o4', label: '18', value: 18 },
      ],
    },
    answer: {
      kind: 'single_choice',
      correctOptionIds: ['o2'],
    },
    explanation: {
      summary: '奇数位是 3、6、9、12、15，每次加 3；偶数位是 20、18、16、14、12，每次减 2。',
      steps: [
        { id: 's1', kind: 'observation', title: '拆成两列', text: '奇数位：3、6、9、12、?；偶数位：20、18、16、14、12。' },
        { id: 's2', kind: 'rule', title: '看奇数位规律', text: '3、6、9、12 每次加 3，所以后面是 15。' },
        { id: 's3', kind: 'verification', title: '再看偶数位', text: '20、18、16、14、12 每次减 2，说明拆分是对的。' },
      ],
    },
    assets: { imageKeys: [] },
    review: {
      recommendedFocus: ['双序列规律', '奇偶位分组'],
      memoryTag: 'pattern-double-sequence',
    },
  },
  {
    meta: {
      questionId: '36Y-10',
      paper: '36Y',
      qid: 10,
      moduleId: 'E',
      moduleKey: 'plane_geometry_counting',
      interactionType: 'click_highlight',
      difficulty: 4,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '数正方形',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '请在图上点击所有正方形，然后提交。' },
        {
          id: 'b2',
          type: 'image',
          imageKey: '36Y-10.png',
          alt: '正方形计数图',
          hotspotIds: ['sq-1', 'sq-2', 'sq-3', 'sq-4', 'sq-big'],
          zoomable: true,
        },
      ],
    },
    interaction: {
      type: 'click_highlight',
      submitMode: 'manual',
      minSelections: 5,
      maxSelections: 5,
      timerSeconds: 30,
    },
    answer: {
      kind: 'hotspot_selection',
      hotspotIds: ['sq-1', 'sq-2', 'sq-3', 'sq-4', 'sq-big'],
      selectionMode: 'exact',
    },
    explanation: {
      summary: '这类题要按“小正方形 → 大正方形”的顺序数，才能不漏。',
      steps: [
        { id: 's1', kind: 'observation', title: '先数最小的', text: '先把 4 个最小正方形找全。', relatedHotspotIds: ['sq-1', 'sq-2', 'sq-3', 'sq-4'] },
        { id: 's2', kind: 'observation', title: '再数更大的', text: '最后再数由 4 个小正方形组成的大正方形。', relatedHotspotIds: ['sq-big'] },
        { id: 's3', kind: 'summary', title: '得到总数', text: '一共 5 个正方形。' },
      ],
      wrongReasons: [
        { code: 'forget_big_square', title: '漏掉大正方形', text: '很多同学只数最小的 4 个，没有继续找更大的。' },
      ],
    },
    hotspots: [
      {
        id: 'sq-1',
        imageKey: '36Y-10.png',
        role: 'countable',
        label: '左上小正方形',
        geometry: { shape: 'rect', x: 0.10, y: 0.12, width: 0.28, height: 0.28 },
        countValue: 1,
      },
      {
        id: 'sq-2',
        imageKey: '36Y-10.png',
        role: 'countable',
        label: '右上小正方形',
        geometry: { shape: 'rect', x: 0.39, y: 0.12, width: 0.28, height: 0.28 },
        countValue: 1,
      },
      {
        id: 'sq-3',
        imageKey: '36Y-10.png',
        role: 'countable',
        label: '左下小正方形',
        geometry: { shape: 'rect', x: 0.10, y: 0.41, width: 0.28, height: 0.28 },
        countValue: 1,
      },
      {
        id: 'sq-4',
        imageKey: '36Y-10.png',
        role: 'countable',
        label: '右下小正方形',
        geometry: { shape: 'rect', x: 0.39, y: 0.41, width: 0.28, height: 0.28 },
        countValue: 1,
      },
      {
        id: 'sq-big',
        imageKey: '36Y-10.png',
        role: 'answer_target',
        label: '整体大正方形',
        geometry: { shape: 'rect', x: 0.10, y: 0.12, width: 0.57, height: 0.57 },
        countValue: 1,
      },
    ],
    animations: [
      {
        id: 'ani-reveal-square-order',
        kind: 'step_reveal_animation',
        steps: [
          { stepId: 'step1', label: '先看左上', highlightHotspotIds: ['sq-1'] },
          { stepId: 'step2', label: '再看另外三个', highlightHotspotIds: ['sq-2', 'sq-3', 'sq-4'] },
          { stepId: 'step3', label: '最后看大正方形', highlightHotspotIds: ['sq-big'] },
        ],
      },
    ],
    assets: { imageKeys: ['36Y-10.png'] },
    review: {
      recommendedFocus: ['从小到大数图', '防漏数'],
      memoryTag: 'square-counting-basic',
    },
  },
  {
    meta: {
      questionId: '36Y-7',
      paper: '36Y',
      qid: 7,
      moduleId: 'F',
      moduleKey: 'spatial_reasoning',
      interactionType: 'rotate_cube',
      difficulty: 4,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '正方体对面判断',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '观察三个小正方体拼成的图形，判断蓝色面的对面是什么颜色。' },
        { id: 'b2', type: 'image', imageKey: '36Y-7.png', alt: '彩色小正方体图', zoomable: true },
      ],
    },
    interaction: {
      type: 'rotate_cube',
      submitMode: 'manual',
      options: [
        { id: 'o1', label: '红色', value: 'red' },
        { id: 'o2', label: '黄色', value: 'yellow' },
        { id: 'o3', label: '绿色', value: 'green' },
        { id: 'o4', label: '白色', value: 'white' },
      ],
      timerSeconds: 35,
    },
    answer: {
      kind: 'single_choice',
      correctOptionIds: ['o3'],
    },
    explanation: {
      summary: '观察同一小正方体露出的三个面，再在脑中转动，就能找到蓝色面的对面。',
      steps: [
        { id: 's1', kind: 'observation', title: '先锁定蓝色所在的小正方体', text: '不要看整堆方块，先只看带蓝色的那一个。' },
        { id: 's2', kind: 'rule', title: '对面不会和相邻面重复', text: '露出的相邻面不是对面，要脑中翻转正方体。', relatedAnimationId: 'ani-cube-rotate' },
        { id: 's3', kind: 'summary', title: '得到答案', text: '蓝色的对面是绿色。' },
      ],
    },
    animations: [
      {
        id: 'ani-cube-rotate',
        kind: 'cube_rotation_animation',
        modelKey: 'cube-colored-basic.glb',
        faces: [
          { faceId: 'front', label: '蓝色', colorHex: '#2F80ED' },
          { faceId: 'back', label: '绿色', colorHex: '#27AE60' },
          { faceId: 'left', label: '红色', colorHex: '#EB5757' },
          { faceId: 'right', label: '黄色', colorHex: '#F2C94C' },
          { faceId: 'top', label: '白色', colorHex: '#FFFFFF' },
          { faceId: 'bottom', label: '橙色', colorHex: '#F2994A' },
        ],
        initialView: 'front',
        targetQuestion: '蓝色面的对面是什么颜色？',
      },
    ],
    assets: {
      imageKeys: ['36Y-7.png'],
      modelKeys: ['cube-colored-basic.glb'],
    },
    review: {
      recommendedFocus: ['相邻面与对面', '脑中旋转'],
      memoryTag: 'cube-opposite-face',
    },
  },
  {
    meta: {
      questionId: '36Y-19',
      paper: '36Y',
      qid: 19,
      moduleId: 'G',
      moduleKey: 'logic_puzzles',
      interactionType: 'drag_number_grid',
      difficulty: 5,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '4×4 逻辑填数',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '把 1、2、3、4 填入空格，使每行每列都不重复，并满足粗框区域的和。' },
        {
          id: 'b2',
          type: 'grid',
          rows: 4,
          cols: 4,
          cells: [
            { cellId: 'r1c1', row: 1, col: 1, presetValue: 1, locked: true, regionId: 'a' },
            { cellId: 'r1c2', row: 1, col: 2, regionId: 'a' },
            { cellId: 'r1c3', row: 1, col: 3, regionId: 'b' },
            { cellId: 'r1c4', row: 1, col: 4, presetValue: 4, locked: true, regionId: 'b' },
            { cellId: 'r2c1', row: 2, col: 1, regionId: 'a' },
            { cellId: 'r2c2', row: 2, col: 2, presetValue: 4, locked: true, regionId: 'a' },
            { cellId: 'r2c3', row: 2, col: 3, regionId: 'b' },
            { cellId: 'r2c4', row: 2, col: 4, regionId: 'b' },
            { cellId: 'r3c1', row: 3, col: 1, regionId: 'c' },
            { cellId: 'r3c2', row: 3, col: 2, regionId: 'c' },
            { cellId: 'r3c3', row: 3, col: 3, presetValue: 4, locked: true, regionId: 'd' },
            { cellId: 'r3c4', row: 3, col: 4, regionId: 'd' },
            { cellId: 'r4c1', row: 4, col: 1, presetValue: 4, locked: true, regionId: 'c' },
            { cellId: 'r4c2', row: 4, col: 2, regionId: 'c' },
            { cellId: 'r4c3', row: 4, col: 3, regionId: 'd' },
            { cellId: 'r4c4', row: 4, col: 4, presetValue: 1, locked: true, regionId: 'd' },
          ],
        },
        { id: 'b3', type: 'callout', text: '区域和示例：a 区和为 10，b 区和为 10，c 区和为 10，d 区和为 10。', tone: 'info' },
      ],
    },
    interaction: {
      type: 'drag_number_grid',
      submitMode: 'manual',
      dragTokens: [
        { id: 't1', label: '1', value: 1 },
        { id: 't2', label: '2', value: 2 },
        { id: 't3', label: '3', value: 3 },
        { id: 't4', label: '4', value: 4 },
      ],
      gridCells: [
        { cellId: 'r1c2', row: 1, col: 2, regionId: 'a' },
        { cellId: 'r1c3', row: 1, col: 3, regionId: 'b' },
        { cellId: 'r2c1', row: 2, col: 1, regionId: 'a' },
        { cellId: 'r2c3', row: 2, col: 3, regionId: 'b' },
        { cellId: 'r2c4', row: 2, col: 4, regionId: 'b' },
        { cellId: 'r3c1', row: 3, col: 1, regionId: 'c' },
        { cellId: 'r3c2', row: 3, col: 2, regionId: 'c' },
        { cellId: 'r3c4', row: 3, col: 4, regionId: 'd' },
        { cellId: 'r4c2', row: 4, col: 2, regionId: 'c' },
        { cellId: 'r4c3', row: 4, col: 3, regionId: 'd' },
      ],
    },
    answer: {
      kind: 'grid_fill',
      cells: [
        { cellId: 'r1c2', value: 2 },
        { cellId: 'r1c3', value: 3 },
        { cellId: 'r2c1', value: 3 },
        { cellId: 'r2c3', value: 1 },
        { cellId: 'r2c4', value: 2 },
        { cellId: 'r3c1', value: 2 },
        { cellId: 'r3c2', value: 1 },
        { cellId: 'r3c4', value: 3 },
        { cellId: 'r4c2', value: 3 },
        { cellId: 'r4c3', value: 2 },
      ],
    },
    explanation: {
      summary: '这类题要同时看行、列、区域三个条件，先找唯一能放的数。',
      steps: [
        { id: 's1', kind: 'elimination', title: '先看第 1 行', text: '第 1 行已有 1 和 4，还缺 2 和 3。' },
        { id: 's2', kind: 'elimination', title: '结合第 2 列', text: '第 2 列已有 4，所以 r1c2 只能放 2。' },
        { id: 's3', kind: 'verification', title: '继续联动推', text: '剩余空格再同时检查行、列、区域和，很快能全部填完。' },
      ],
      wrongReasons: [
        { code: 'single_constraint_only', title: '只看一条条件', text: '必须同时看行、列、区域，不能只盯着一行。' },
      ],
    },
    assets: { imageKeys: [] },
    review: {
      recommendedFocus: ['排除法', '唯一候选', '多条件联动'],
      memoryTag: 'logic-grid-4x4',
    },
  },
  {
    meta: {
      questionId: '34W-20',
      paper: '34W',
      qid: 20,
      moduleId: 'G',
      moduleKey: 'logic_puzzles',
      interactionType: 'animation_demo',
      difficulty: 4,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '齿轮转动推理',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '观察齿轮的转动方向，判断指针接下来会先碰到哪一块区域。' },
        { id: 'b2', type: 'image', imageKey: '34W-20.png', alt: '齿轮和指针示意图', zoomable: true },
      ],
    },
    interaction: {
      type: 'single_choice',
      submitMode: 'manual',
      options: [
        { id: 'o1', label: 'A 区', value: 'A' },
        { id: 'o2', label: 'B 区', value: 'B' },
        { id: 'o3', label: 'C 区', value: 'C' },
        { id: 'o4', label: 'D 区', value: 'D' },
      ],
    },
    answer: {
      kind: 'single_choice',
      correctOptionIds: ['o2'],
    },
    explanation: {
      summary: '相邻齿轮转动方向相反，顺着传动链一路判断，就能知道最后指针方向。',
      steps: [
        { id: 's1', kind: 'rule', title: '先记住一个规则', text: '两个互相咬合的齿轮，转动方向一定相反。', relatedAnimationId: 'ani-gears' },
        { id: 's2', kind: 'calculation', title: '沿着链条推', text: '第 1 个顺时针，第 2 个逆时针，第 3 个又顺时针……' },
        { id: 's3', kind: 'summary', title: '判断终点', text: '最后指针会先碰到 B 区。' },
      ],
    },
    animations: [
      {
        id: 'ani-gears',
        kind: 'gear_spin_animation',
        gears: [
          { id: 'g1', teeth: 12, direction: 'cw' },
          { id: 'g2', teeth: 10, direction: 'ccw' },
          { id: 'g3', teeth: 12, direction: 'cw' },
        ],
        driverGearId: 'g1',
        driverTurns: 1,
        resultHint: '顺着传动方向逐个判断。',
      },
    ],
    assets: { imageKeys: ['34W-20.png'] },
    review: {
      recommendedFocus: ['机械传动', '规则链推理'],
      memoryTag: 'gear-direction-chain',
    },
  },
  {
    meta: {
      questionId: '34Y-18',
      paper: '34Y',
      qid: 18,
      moduleId: 'G',
      moduleKey: 'logic_puzzles',
      interactionType: 'drag_number_slots',
      difficulty: 4,
      schemaVersion: CONTENT_SCHEMA_VERSION,
      locale: 'zh-CN',
    },
    stem: {
      title: '等和图填数',
      blocks: [
        { id: 'b1', type: 'paragraph', text: '把 20 到 26 填入图中的圆圈，使每条线上的和相等。' },
        { id: 'b2', type: 'image', imageKey: '34Y-18.png', alt: '等和图', hotspotIds: ['slot-a', 'slot-b', 'slot-c', 'slot-d', 'slot-e', 'slot-f', 'slot-g'] },
      ],
    },
    interaction: {
      type: 'drag_number_slots',
      submitMode: 'manual',
      dragTokens: [
        { id: 'n20', label: '20', value: 20 },
        { id: 'n21', label: '21', value: 21 },
        { id: 'n22', label: '22', value: 22 },
        { id: 'n23', label: '23', value: 23 },
        { id: 'n24', label: '24', value: 24 },
        { id: 'n25', label: '25', value: 25 },
        { id: 'n26', label: '26', value: 26 },
      ],
      slots: [
        { id: 'slot-a', placeholder: '圆圈 A' },
        { id: 'slot-b', placeholder: '圆圈 B' },
        { id: 'slot-c', placeholder: '圆圈 C' },
        { id: 'slot-d', placeholder: '圆圈 D' },
        { id: 'slot-e', placeholder: '圆圈 E' },
        { id: 'slot-f', placeholder: '圆圈 F' },
        { id: 'slot-g', placeholder: '中间圆' },
      ],
    },
    answer: {
      kind: 'slot_mapping',
      mapping: {
        'slot-a': 'n20',
        'slot-b': 'n26',
        'slot-c': 'n21',
        'slot-d': 'n25',
        'slot-e': 'n22',
        'slot-f': 'n24',
        'slot-g': 'n23',
      },
      orderSensitive: false,
    },
    explanation: {
      summary: '这类题一般先看中间数，再让对称位置配对。',
      steps: [
        { id: 's1', kind: 'observation', title: '先看总平均', text: '20 到 26 一共 7 个数，中间值是 23。' },
        { id: 's2', kind: 'rule', title: '让两边配对', text: '20 和 26、21 和 25、22 和 24 都是和为 46 的配对。' },
        { id: 's3', kind: 'verification', title: '放入中心', text: '把 23 放中间，再让每条线都由一对 46 加上 23 组成。' },
      ],
    },
    hotspots: [
      { id: 'slot-a', imageKey: '34Y-18.png', role: 'drop_slot', label: '圆圈 A', geometry: { shape: 'circle', cx: 0.20, cy: 0.20, r: 0.06 } },
      { id: 'slot-b', imageKey: '34Y-18.png', role: 'drop_slot', label: '圆圈 B', geometry: { shape: 'circle', cx: 0.80, cy: 0.20, r: 0.06 } },
      { id: 'slot-c', imageKey: '34Y-18.png', role: 'drop_slot', label: '圆圈 C', geometry: { shape: 'circle', cx: 0.16, cy: 0.50, r: 0.06 } },
      { id: 'slot-d', imageKey: '34Y-18.png', role: 'drop_slot', label: '圆圈 D', geometry: { shape: 'circle', cx: 0.84, cy: 0.50, r: 0.06 } },
      { id: 'slot-e', imageKey: '34Y-18.png', role: 'drop_slot', label: '圆圈 E', geometry: { shape: 'circle', cx: 0.20, cy: 0.80, r: 0.06 } },
      { id: 'slot-f', imageKey: '34Y-18.png', role: 'drop_slot', label: '圆圈 F', geometry: { shape: 'circle', cx: 0.80, cy: 0.80, r: 0.06 } },
      { id: 'slot-g', imageKey: '34Y-18.png', role: 'drop_slot', label: '中心圆', geometry: { shape: 'circle', cx: 0.50, cy: 0.50, r: 0.06 } },
    ],
    assets: { imageKeys: ['34Y-18.png'] },
    review: {
      recommendedFocus: ['配对和', '等和图'],
      memoryTag: 'equal-sum-pairing',
    },
  },
];

export const mockQuestionContentBundle: QuestionContentBundle = {
  version: CONTENT_SCHEMA_VERSION,
  locale: 'zh-CN',
  records: mockQuestionContents,
};
