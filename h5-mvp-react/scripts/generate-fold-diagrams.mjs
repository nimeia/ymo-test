import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const questionAssetDir = path.join(appDir, 'public', 'assets', 'questions');
const foldTargetDir = path.join(questionAssetDir, '35Y');
const spatialTargetDir = path.join(questionAssetDir, '34Y');

const FACE_LABELS = new Map([
  ['0,0,1', '前'],
  ['0,0,-1', '后'],
  ['-1,0,0', '左'],
  ['1,0,0', '右'],
  ['0,-1,0', '上'],
  ['0,1,0', '下'],
]);

const figureSpecs = [
  {
    index: 1,
    verdict: '保留',
    title: '图1：6个面分到6个方向',
    subtitle: '以中间方格为核心，左右、上下和最右端分别去到不同方向。',
    coords: [
      { id: 1, x: -1, y: -1 },
      { id: 2, x: 0, y: -1 },
      { id: 3, x: 0, y: 0, center: true },
      { id: 4, x: 1, y: 0 },
      { id: 5, x: 2, y: 0 },
      { id: 6, x: 0, y: 1 },
    ],
    resultMode: 'valid',
    emphasis: '最后一格并没有回压到已有方向，而是刚好成为“后面”。',
  },
  {
    index: 2,
    verdict: '保留',
    title: '图2：尾巴格折起后仍是独立面',
    subtitle: '这类“中间横排 + 右下尾巴”的结构，关键看尾巴是不是占到最后一个空方向。',
    coords: [
      { id: 1, x: -1, y: -1 },
      { id: 2, x: 0, y: -1 },
      { id: 3, x: 0, y: 0, center: true },
      { id: 4, x: 1, y: 0 },
      { id: 5, x: 2, y: 0 },
      { id: 6, x: 1, y: 1 },
    ],
    resultMode: 'valid',
    emphasis: '右下角这一格并不会“撞回来”，而是正好补齐最后一个面。',
  },
  {
    index: 3,
    verdict: '排除',
    title: '图3：末端回折，撞到已占方向',
    subtitle: '这题页面按终审口径，把最右下这一格视为“回折后撞面”的典型示意。',
    coords: [
      { id: 1, x: -1, y: -1 },
      { id: 2, x: 0, y: -1 },
      { id: 3, x: 0, y: 0, center: true },
      { id: 4, x: 1, y: 0 },
      { id: 5, x: 2, y: 0 },
      { id: 6, x: 2, y: 1, final: true },
    ],
    resultMode: 'collision',
    collision: {
      faceLabel: '后',
      existingIds: [1],
      incomingIds: [6],
      message: '第6格继续往下折时，会回到已经被别的面占掉的方向。',
    },
    emphasis: '判断这种图时，优先盯住“最末端那格”会不会绕回到已经占位的方向。',
  },
  {
    index: 4,
    verdict: '保留',
    title: '图4：长一点不等于会撞面',
    subtitle: '上排3格和下排3格虽然拉长，但因为连接位置错开，折起后方向仍然各不相同。',
    coords: [
      { id: 1, x: -2, y: 0 },
      { id: 2, x: -1, y: 0 },
      { id: 3, x: 0, y: 0, center: true },
      { id: 4, x: 0, y: 1 },
      { id: 5, x: 1, y: 1 },
      { id: 6, x: 2, y: 1 },
    ],
    resultMode: 'valid',
    emphasis: '这题真正要看的是连接点，而不是看起来“像不像一条长蛇”。',
  },
  {
    index: 5,
    verdict: '排除',
    title: '图5：原图裁切，页面用终审示意收口',
    subtitle: '站内原题图在最右侧有裁切，因此这里用“方向重合”的示意图说明为什么不能保留。',
    coords: [
      { id: 1, x: -1, y: -1 },
      { id: 2, x: 0, y: -1 },
      { id: 3, x: 0, y: 0, center: true },
      { id: 4, x: 1, y: 0 },
      { id: 5, x: 2, y: 0, hidden: true },
      { id: 6, x: 1, y: 1, hidden: true, final: true },
    ],
    resultMode: 'croppedCollision',
    collision: {
      faceLabel: '右',
      existingIds: ['已占'],
      incomingIds: ['末端'],
      message: '终审结论是：末端继续折起后，会和已有侧面方向重合。',
    },
    emphasis: '这张图复盘时不要硬记边缘残图，而是记住“末端继续折会和已有侧面重合”。',
  },
];

const spatialWalkthroughSpecs = [
  {
    index: 1,
    title: '第1步：先把看得到的台阶分成三组',
    subtitle: '这一张图先不急着猜隐藏块，只把外轮廓分成左高、中高、右低三段台阶。',
    emphasis: '遮挡题第一步先锁外轮廓，不要一上来就猜里面还藏了几个。',
    mode: 'visible_outline',
    blocks: [
      { x: 0, y: 0, z: 0, role: 'visible' },
      { x: 1, y: 0, z: 0, role: 'visible' },
      { x: 2, y: 0, z: 0, role: 'visible' },
      { x: 1, y: 1, z: 1, role: 'visible' },
      { x: 0, y: 2, z: 2, role: 'visible' },
    ],
    legend: [
      { label: '先看的外轮廓', cls: 'legend-visible' },
      { label: '暂不判断内部', cls: 'legend-muted' },
    ],
  },
  {
    index: 2,
    title: '第2步：有上层就先补支撑列',
    subtitle: '上面的方块不能悬空；看见更高一层时，要先往下补出必需的支撑块。',
    emphasis: '先补“必须存在”的支撑块，再讨论真正看不见的内部块，顺序会稳很多。',
    mode: 'support_columns',
    blocks: [
      { x: 0, y: 0, z: 0, role: 'visible' },
      { x: 1, y: 0, z: 0, role: 'visible' },
      { x: 2, y: 0, z: 0, role: 'visible' },
      { x: 1, y: 1, z: 1, role: 'visible' },
      { x: 0, y: 2, z: 2, role: 'visible' },
      { x: 1, y: 1, z: 0, role: 'support' },
      { x: 0, y: 2, z: 1, role: 'support' },
      { x: 0, y: 2, z: 0, role: 'support' },
    ],
    legend: [
      { label: '看得见的方块', cls: 'legend-visible' },
      { label: '必须补出的支撑块', cls: 'legend-support' },
    ],
  },
  {
    index: 3,
    title: '第3步：把“看不到”缩成后排和夹心两个区',
    subtitle: '真正需要终审的，不是整堆方块，而是那些被前排挡住、又可能在内部形成夹层的位置。',
    emphasis: '把隐藏块范围缩到几个“候选位置”后，再回头核图，会比盲猜总数更可靠。',
    mode: 'hidden_zones',
    blocks: [
      { x: 0, y: 0, z: 0, role: 'visible' },
      { x: 1, y: 0, z: 0, role: 'visible' },
      { x: 2, y: 0, z: 0, role: 'visible' },
      { x: 1, y: 1, z: 1, role: 'visible' },
      { x: 0, y: 2, z: 2, role: 'visible' },
      { x: 1, y: 1, z: 0, role: 'hidden' },
      { x: 0, y: 1, z: 0, role: 'hidden' },
      { x: 0, y: 2, z: 1, role: 'support' },
      { x: 0, y: 2, z: 0, role: 'support' },
    ],
    callouts: [
      { text: '后排候选', x: 650, y: 126 },
      { text: '夹心候选', x: 572, y: 214 },
    ],
    legend: [
      { label: '已经能确认的支撑', cls: 'legend-support' },
      { label: '仍待终审的隐藏区', cls: 'legend-hidden' },
    ],
  },
];

const hexGapWalkthroughSpecs = [
  {
    index: 1,
    title: '第1步：先把整张图看成一圈边框',
    subtitle: '先确认上下两排和左右两侧已经围成完整外圈，再去看中间缺口。',
    emphasis: '补缺题先锁整体轮廓。外圈一旦看成边框，中间空白就不再像一团模糊区域。',
    imagePath: '/assets/questions/34Y/34Y-14.png',
    overlays: [
      { x: 88, y: 118, width: 310, height: 34, cls: 'overlay-blue', label: '上边框', lx: 260, ly: 110 },
      { x: 77, y: 118, width: 70, height: 162, cls: 'overlay-blue', label: '左边框', lx: 56, ly: 190 },
      { x: 351, y: 118, width: 70, height: 162, cls: 'overlay-blue', label: '右边框', lx: 432, ly: 190 },
      { x: 88, y: 248, width: 310, height: 38, cls: 'overlay-blue', label: '下边框', lx: 260, ly: 314 }
    ],
    notes: [
      '先确认这是一圈完整边框，不要把注意力一开始就丢进中间空白。',
      '边框感一旦建立，中间就会自然被看成“内部缺口”。'
    ]
  },
  {
    index: 2,
    title: '第2步：把中间空白拆成几段再复核',
    subtitle: '不要整块空白一起数，可以先拆成上沿、中段、下沿三段。',
    emphasis: '大空白最怕一眼估数。拆成几段后，复核路径会稳定很多。',
    imagePath: '/assets/questions/34Y/34Y-14.png',
    overlays: [
      { x: 152, y: 150, width: 184, height: 24, cls: 'overlay-amber', label: '上沿缺口', lx: 246, ly: 144 },
      { x: 132, y: 176, width: 226, height: 46, cls: 'overlay-amber', label: '中段主缺口', lx: 246, ly: 202 },
      { x: 152, y: 224, width: 184, height: 24, cls: 'overlay-amber', label: '下沿缺口', lx: 246, ly: 262 }
    ],
    notes: [
      '先拆区域，再看每一段里实际缺了哪些六边形。',
      '中间不是一整块同形空白，按带状区域处理更稳。'
    ]
  },
  {
    index: 3,
    title: '第3步：最后只回查左右转角和中段连接处',
    subtitle: '真正容易漏的通常是左右向内转的地方，以及和中段接起来的位置。',
    emphasis: '复盘时缩小范围，只盯高风险转角和连接处，会比整题重数一遍更有效。',
    imagePath: '/assets/questions/34Y/34Y-14.png',
    overlays: [
      { x: 132, y: 172, width: 44, height: 62, cls: 'overlay-red', label: '左转角', lx: 96, ly: 204 },
      { x: 185, y: 188, width: 120, height: 28, cls: 'overlay-red', label: '中段连接', lx: 245, ly: 182 },
      { x: 322, y: 172, width: 44, height: 62, cls: 'overlay-red', label: '右转角', lx: 398, ly: 204 }
    ],
    notes: [
      '真正容易漏的不是大块中间，而是两侧转角。',
      '最后一轮复核只看这些高风险位置，效率更高。'
    ]
  }
];

const lineCountingWalkthroughSpecs = [
  {
    index: 1,
    title: '第1步：先只数最短的一格线段',
    subtitle: '这三张图是方法示意图，不是原题逐线描红。第一轮只把最短的基础线段数出来。',
    emphasis: '数线段题的起点不是总数，而是最短的一格小段。基础段一旦数清，后面更长的线段才不容易漏。',
    mode: 'unit',
    notes: [
      '第一轮只盯一格长的基础线段，不急着把两段或三段合起来。',
      '先把基础段数清，后面所有更长的线段都只是“在它上面再合并”。'
    ]
  },
  {
    index: 2,
    title: '第2步：横向和竖向分开统计',
    subtitle: '复合方框图最怕横线、竖线混着数，所以第二轮先把方向拆开。',
    emphasis: '先横后竖或先竖后横都可以，关键是一次只数一个方向，避免同一条线在脑中反复出现。',
    mode: 'direction',
    notes: [
      '蓝色示意横向线段，橙色示意竖向线段；方向一拆开，重复统计会明显减少。',
      '方向分层后，再在同一方向里看一格、两格、整条长段。'
    ]
  },
  {
    index: 3,
    title: '第3步：最后按长度复核并收口到 44',
    subtitle: '把同一方向里的 1 格段、2 格段和更长线段分层检查，最后再汇总总数。',
    emphasis: '这题页面按终审口径收口到 44。真正稳的方法不是死记答案，而是记住“先短后长、先横后竖”的统计顺序。',
    mode: 'length',
    notes: [
      '最后一轮不是重新整题乱数，而是按“1格段 / 2格段 / 更长段”逐层复核。',
      '复盘时只要顺着这条顺序走，总数自然会稳定收口到 44。'
    ]
  }
];

await writeSvgSet(foldTargetDir, figureSpecs, (spec) => `35Y-13-fold-${spec.index}.svg`, renderFigureSvg);
await writeSvgSet(spatialTargetDir, spatialWalkthroughSpecs, (spec) => `34Y-15-space-step-${spec.index}.svg`, renderSpatialStepSvg);
await writeSvgSet(spatialTargetDir, hexGapWalkthroughSpecs, (spec) => `34Y-14-gap-step-${spec.index}.svg`, renderQuestionOverlaySvg);
await writeSvgSet(foldTargetDir, lineCountingWalkthroughSpecs, (spec) => `35Y-17-count-step-${spec.index}.svg`, renderLineCountingSvg);

function renderFigureSvg(spec) {
  const width = 980;
  const height = 408;
  const panelGap = 28;
  const leftX = 40;
  const leftY = 78;
  const panelWidth = 420;
  const panelHeight = 242;
  const rightX = leftX + panelWidth + panelGap;
  const rightY = leftY;
  const cell = 48;
  const coords = spec.coords;
  const minX = Math.min(...coords.map((item) => item.x));
  const maxX = Math.max(...coords.map((item) => item.x));
  const minY = Math.min(...coords.map((item) => item.y));
  const maxY = Math.max(...coords.map((item) => item.y));
  const netWidth = (maxX - minX + 1) * cell;
  const netHeight = (maxY - minY + 1) * cell;
  const offsetX = leftX + (panelWidth - netWidth) / 2;
  const offsetY = leftY + 26 + (panelHeight - 40 - netHeight) / 2;

  const numberByCoordKey = new Map(coords.map((item) => [coordKey(item.x, item.y), item.id]));
  const orientationMap = computeOrientations(coords, spec.coords.find((item) => item.center) || coords[0]);
  const validSlotMap = spec.resultMode === 'valid' ? buildSlotMap(coords, orientationMap) : null;

  const edgeLines = [];
  const arrows = [];
  for (const item of coords) {
    const x = offsetX + (item.x - minX) * cell;
    const y = offsetY + (item.y - minY) * cell;
    const boxClass = item.center ? 'cell-center' : item.hidden ? 'cell-hidden' : item.final ? 'cell-final' : 'cell-base';
    edgeLines.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="12" class="${boxClass}" />`);
    edgeLines.push(`<text x="${x + cell / 2}" y="${y + cell / 2 + 6}" text-anchor="middle" class="cell-id">${item.hidden ? '?' : item.id}</text>`);

    const neighbors = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];
    for (const { dx, dy } of neighbors) {
      const nbKey = coordKey(item.x + dx, item.y + dy);
      const nbId = numberByCoordKey.get(nbKey);
      if (!nbId || nbId <= item.id) continue;
      const x1 = x + cell / 2;
      const y1 = y + cell / 2;
      const nx = offsetX + (item.x + dx - minX) * cell + cell / 2;
      const ny = offsetY + (item.y + dy - minY) * cell + cell / 2;
      arrows.push(`<line x1="${x1}" y1="${y1}" x2="${nx}" y2="${ny}" class="guide-line" marker-end="url(#arrowHead)" />`);
    }
  }

  const slotRects = [];
  const slotPositions = [
    { label: '上', x: rightX + 132, y: rightY + 34 },
    { label: '左', x: rightX + 48, y: rightY + 108 },
    { label: '前', x: rightX + 132, y: rightY + 108 },
    { label: '右', x: rightX + 216, y: rightY + 108 },
    { label: '下', x: rightX + 132, y: rightY + 182 },
    { label: '后', x: rightX + 300, y: rightY + 108 },
  ];
  const collisionLabel = spec.collision?.faceLabel;
  for (const slot of slotPositions) {
    const collision = spec.resultMode !== 'valid' && slot.label === collisionLabel;
    const fillClass = collision ? 'slot-collision' : 'slot-base';
    slotRects.push(`<rect x="${slot.x}" y="${slot.y}" width="68" height="54" rx="14" class="${fillClass}" />`);
    slotRects.push(`<text x="${slot.x + 16}" y="${slot.y + 20}" class="slot-label">${slot.label}</text>`);
    let occupantText = '';
    if (spec.resultMode === 'valid') {
      occupantText = validSlotMap.get(slot.label) || '—';
    } else if (collision) {
      occupantText = [...(spec.collision?.existingIds || []), ...(spec.collision?.incomingIds || [])].join(' + ');
    } else if (spec.resultMode === 'croppedCollision' && (slot.label === '前' || slot.label === '上' || slot.label === '右' || slot.label === '下')) {
      occupantText = '已分配';
    } else if (spec.resultMode === 'collision' && ['前', '左', '上', '右', '下'].includes(slot.label)) {
      occupantText = '占位';
    } else {
      occupantText = '—';
    }
    slotRects.push(`<text x="${slot.x + 34}" y="${slot.y + 38}" text-anchor="middle" class="slot-value">${occupantText}</text>`);
  }

  const legendBlocks = [
    { x: leftX, y: 24, text: spec.title, cls: 'title-main' },
    { x: leftX, y: 50, text: spec.subtitle, cls: 'title-sub' },
    { x: leftX + 18, y: leftY + 22, text: '展开图', cls: 'panel-title' },
    { x: rightX + 18, y: rightY + 22, text: spec.resultMode === 'valid' ? '折后方向' : '撞面示意', cls: 'panel-title' },
  ];

  const calloutY = rightY + 252;
  const calloutClass = spec.resultMode === 'valid' ? 'callout-ok' : 'callout-warn';
  const calloutIcon = spec.resultMode === 'valid' ? '✓' : '!' ;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(spec.title)}</title>
  <desc id="desc">${escapeXml(spec.subtitle)} ${escapeXml(spec.emphasis)}</desc>
  <defs>
    <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#4d6fff" />
    </marker>
  </defs>
  <style>
    .bg { fill: #f8fbff; }
    .panel { fill: #ffffff; stroke: #dbe6ff; stroke-width: 2; }
    .title-main { font: 700 28px 'Arial', sans-serif; fill: #18305b; }
    .title-sub { font: 400 16px 'Arial', sans-serif; fill: #4b628c; }
    .panel-title { font: 700 18px 'Arial', sans-serif; fill: #24416f; }
    .cell-base { fill: #edf3ff; stroke: #5577c8; stroke-width: 2.2; }
    .cell-center { fill: #d8e6ff; stroke: #2e5bc4; stroke-width: 2.6; }
    .cell-final { fill: #fff2da; stroke: #d28b1f; stroke-width: 2.2; }
    .cell-hidden { fill: #f4f6fb; stroke: #b6c0d7; stroke-width: 2; stroke-dasharray: 7 6; }
    .cell-id { font: 700 18px 'Arial', sans-serif; fill: #1f355d; }
    .guide-line { stroke: #86a3ff; stroke-width: 2.5; stroke-dasharray: 6 6; opacity: 0.9; }
    .slot-base { fill: #f2f6ff; stroke: #c8d8ff; stroke-width: 2; }
    .slot-collision { fill: #fff0ef; stroke: #e56b64; stroke-width: 2.6; }
    .slot-label { font: 700 14px 'Arial', sans-serif; fill: #567; }
    .slot-value { font: 700 17px 'Arial', sans-serif; fill: #1d3258; }
    .callout-ok { fill: #eef9f1; stroke: #7bc38f; stroke-width: 1.8; }
    .callout-warn { fill: #fff5f3; stroke: #f1a497; stroke-width: 1.8; }
    .callout-icon { font: 700 20px 'Arial', sans-serif; fill: #1f355d; }
    .callout-text { font: 400 16px 'Arial', sans-serif; fill: #2f4568; }
  </style>
  <rect width="${width}" height="${height}" class="bg" rx="28" />
  <rect x="${leftX}" y="${leftY}" width="${panelWidth}" height="${panelHeight}" rx="24" class="panel" />
  <rect x="${rightX}" y="${rightY}" width="${panelWidth}" height="${panelHeight}" rx="24" class="panel" />
  ${legendBlocks.map((item) => `<text x="${item.x}" y="${item.y}" class="${item.cls}">${escapeXml(item.text)}</text>`).join('')}
  ${edgeLines.join('')}
  ${arrows.join('')}
  ${slotRects.join('')}
  <rect x="${leftX}" y="${calloutY}" width="${panelWidth + panelGap + panelWidth}" height="60" rx="18" class="${calloutClass}" />
  <text x="${leftX + 18}" y="${calloutY + 38}" class="callout-icon">${escapeXml(calloutIcon)}</text>
  <text x="${leftX + 54}" y="${calloutY + 38}" class="callout-text">${escapeXml(spec.emphasis)}</text>
</svg>`;
}


async function writeSvgSet(targetDir, specs, filenameFor, renderFn) {
  await fs.mkdir(targetDir, { recursive: true });
  for (const spec of specs) {
    const svg = renderFn(spec);
    const filename = path.join(targetDir, filenameFor(spec));
    await fs.writeFile(filename, svg, 'utf8');
  }
}

function renderQuestionOverlaySvg(spec) {
  const width = 980;
  const height = 420;
  const imageX = 56;
  const imageY = 92;
  const imageWidth = 430;
  const imageHeight = 321;
  const sx = imageWidth / 495;
  const sy = imageHeight / 370;
  const boxes = (spec.overlays || []).map((item) => {
    const x = imageX + item.x * sx;
    const y = imageY + item.y * sy;
    const w = item.width * sx;
    const h = item.height * sy;
    const lx = imageX + item.lx * sx;
    const ly = imageY + item.ly * sy;
    return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" class="${item.cls}" /><text x="${lx}" y="${ly}" text-anchor="middle" class="overlay-label">${escapeXml(item.label)}</text></g>`;
  }).join('');
  const notes = (spec.notes || []).map((item, index) => `<g><circle cx="622" cy="${144 + index * 54}" r="14" class="note-dot" /><text x="622" y="${149 + index * 54}" text-anchor="middle" class="note-dot-text">${index + 1}</text><text x="648" y="${150 + index * 54}" class="note-text">${escapeXml(item)}</text></g>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(spec.title)}</title>
  <desc id="desc">${escapeXml(spec.subtitle)} ${escapeXml(spec.emphasis)}</desc>
  <style>
    .bg { fill: #f8fbff; }
    .panel { fill: #ffffff; stroke: #dbe6ff; stroke-width: 2; }
    .title-main { font: 700 28px 'Arial', sans-serif; fill: #18305b; }
    .title-sub { font: 400 16px 'Arial', sans-serif; fill: #4b628c; }
    .caption { font: 700 18px 'Arial', sans-serif; fill: #24416f; }
    .overlay-blue { fill: rgba(82, 120, 202, 0.18); stroke: #5278ca; stroke-width: 2.2; }
    .overlay-amber { fill: rgba(201, 141, 45, 0.18); stroke: #c98d2d; stroke-width: 2.2; }
    .overlay-red { fill: rgba(219, 117, 104, 0.18); stroke: #db7568; stroke-width: 2.2; }
    .overlay-label { font: 700 14px 'Arial', sans-serif; fill: #25416d; }
    .callout-box { fill: #f2f6ff; stroke: #cddafe; stroke-width: 1.8; }
    .callout-icon { font: 700 20px 'Arial', sans-serif; fill: #1f355d; }
    .callout-text { font: 400 16px 'Arial', sans-serif; fill: #2f4568; }
    .note-dot { fill: #18305b; }
    .note-dot-text { font: 700 14px 'Arial', sans-serif; fill: #ffffff; }
    .note-text { font: 400 16px 'Arial', sans-serif; fill: #314764; }
  </style>
  <rect width="${width}" height="${height}" rx="28" class="bg" />
  <rect x="40" y="78" width="470" height="272" rx="24" class="panel" />
  <rect x="534" y="78" width="406" height="272" rx="24" class="panel" />
  <text x="40" y="28" class="title-main">${escapeXml(spec.title)}</text>
  <text x="40" y="54" class="title-sub">${escapeXml(spec.subtitle)}</text>
  <text x="62" y="108" class="caption">题图区域示意</text>
  <text x="556" y="108" class="caption">复盘重点</text>
  <image href="${escapeXml(spec.imagePath)}" x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" preserveAspectRatio="xMidYMid meet" />
  ${boxes}
  ${notes}
  <rect x="40" y="366" width="900" height="40" rx="18" class="callout-box" />
  <text x="60" y="392" class="callout-icon">!</text>
  <text x="92" y="392" class="callout-text">${escapeXml(spec.emphasis)}</text>
</svg>`;
}

function renderLineCountingSvg(spec) {
  const width = 980;
  const height = 420;
  const panelX = 40;
  const panelY = 78;
  const panelWidth = 470;
  const noteX = 534;
  const noteWidth = 406;
  const pointsX = [126, 198, 270, 342, 414];
  const pointsY = [122, 170, 218, 266, 314];
  const baseSegments = [
    ['h', 0, 0], ['h', 1, 0], ['h', 2, 0], ['h', 3, 0],
    ['h', 0, 4], ['h', 1, 4], ['h', 2, 4], ['h', 3, 4],
    ['v', 0, 0], ['v', 0, 1], ['v', 0, 2], ['v', 0, 3],
    ['v', 4, 0], ['v', 4, 1], ['v', 4, 2], ['v', 4, 3],
    ['h', 1, 1], ['h', 2, 1],
    ['h', 1, 3], ['h', 2, 3],
    ['v', 1, 1], ['v', 1, 2],
    ['v', 3, 1], ['v', 3, 2],
    ['h', 0, 2], ['h', 1, 2], ['h', 2, 2], ['h', 3, 2],
    ['v', 2, 0], ['v', 2, 1], ['v', 2, 2], ['v', 2, 3],
  ];
  const drawSegment = (segment, cls) => {
    const [kind, a, b] = segment;
    if (kind === 'h') {
      const x1 = pointsX[a];
      const x2 = pointsX[a + 1];
      const y = pointsY[b];
      return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="${cls}" />`;
    }
    const x = pointsX[a];
    const y1 = pointsY[b];
    const y2 = pointsY[b + 1];
    return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="${cls}" />`;
  };
  const base = baseSegments.map((segment) => drawSegment(segment, 'seg-base')).join('');

  let highlights = '';
  let extras = '';
  if (spec.mode === 'unit') {
    highlights = baseSegments.map((segment) => drawSegment(segment, 'seg-unit')).join('');
    extras = `
      <text x="116" y="346" class="mini-caption">方法示意：先把最短基础段全数出来</text>
      <rect x="560" y="126" width="150" height="44" rx="18" class="badge blue" />
      <text x="635" y="154" text-anchor="middle" class="badge-text">第一轮：只看 1 格段</text>`;
  } else if (spec.mode === 'direction') {
    const horizontal = baseSegments.filter((segment) => segment[0] === 'h').map((segment) => drawSegment(segment, 'seg-horizontal')).join('');
    const vertical = baseSegments.filter((segment) => segment[0] === 'v').map((segment) => drawSegment(segment, 'seg-vertical')).join('');
    highlights = horizontal + vertical;
    extras = `
      <rect x="560" y="126" width="112" height="44" rx="18" class="badge blue" />
      <text x="616" y="154" text-anchor="middle" class="badge-text">横向</text>
      <rect x="684" y="126" width="112" height="44" rx="18" class="badge amber" />
      <text x="740" y="154" text-anchor="middle" class="badge-text">竖向</text>
      <text x="116" y="346" class="mini-caption">方向一拆开，同一条线就不容易来回重复进入统计</text>`;
  } else {
    highlights = `
      <line x1="${pointsX[0]}" y1="${pointsY[0]}" x2="${pointsX[1]}" y2="${pointsY[0]}" class="seg-unit strong" />
      <line x1="${pointsX[1]}" y1="${pointsY[1]}" x2="${pointsX[3]}" y2="${pointsY[1]}" class="seg-medium strong" />
      <line x1="${pointsX[4]}" y1="${pointsY[0]}" x2="${pointsX[4]}" y2="${pointsY[4]}" class="seg-long strong" />
      <line x1="${pointsX[0]}" y1="${pointsY[2]}" x2="${pointsX[4]}" y2="${pointsY[2]}" class="seg-long soft" />`;
    extras = `
      <rect x="560" y="120" width="146" height="40" rx="18" class="badge blue" />
      <text x="633" y="146" text-anchor="middle" class="badge-text">1格段</text>
      <rect x="560" y="172" width="146" height="40" rx="18" class="badge amber" />
      <text x="633" y="198" text-anchor="middle" class="badge-text">2格段</text>
      <rect x="560" y="224" width="146" height="40" rx="18" class="badge red" />
      <text x="633" y="250" text-anchor="middle" class="badge-text">更长线段</text>
      <rect x="724" y="120" width="186" height="144" rx="22" class="summary-card" />
      <text x="748" y="152" class="summary-title">最后一轮怎么收口</text>
      <text x="748" y="184" class="summary-text">1）同方向先看最短段</text>
      <text x="748" y="212" class="summary-text">2）再补 2 格、3 格和整条长段</text>
      <text x="748" y="240" class="summary-text">3）横竖都复核后，终审总数 = 44</text>
      <text x="116" y="346" class="mini-caption">示意图重点不是复刻题面，而是固定“先短后长、先横后竖”的顺序</text>`;
  }

  const notes = (spec.notes || []).map((item, index) => {
    const cy = 170 + index * 62;
    return `<g><circle cx="574" cy="${cy}" r="14" class="note-dot" /><text x="574" y="${cy + 5}" text-anchor="middle" class="note-dot-text">${index + 1}</text><text x="600" y="${cy + 6}" class="note-text">${escapeXml(item)}</text></g>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(spec.title)}</title>
  <desc id="desc">${escapeXml(spec.subtitle)} ${escapeXml(spec.emphasis)}</desc>
  <style>
    .bg { fill: #f8fbff; }
    .panel { fill: #ffffff; stroke: #dbe6ff; stroke-width: 2; }
    .title-main { font: 700 28px 'Arial', sans-serif; fill: #18305b; }
    .title-sub { font: 400 16px 'Arial', sans-serif; fill: #4b628c; }
    .caption { font: 700 18px 'Arial', sans-serif; fill: #24416f; }
    .seg-base { stroke: #d5ddf0; stroke-width: 6; stroke-linecap: round; }
    .seg-unit { stroke: #4f7fd9; stroke-width: 8; stroke-linecap: round; }
    .seg-horizontal { stroke: #4f7fd9; stroke-width: 8; stroke-linecap: round; }
    .seg-vertical { stroke: #d39a45; stroke-width: 8; stroke-linecap: round; }
    .seg-medium { stroke: #d39a45; stroke-width: 10; stroke-linecap: round; }
    .seg-long { stroke: #d96c63; stroke-width: 10; stroke-linecap: round; }
    .strong { opacity: 0.95; }
    .soft { opacity: 0.45; }
    .note-dot { fill: #18305b; }
    .note-dot-text { font: 700 14px 'Arial', sans-serif; fill: #ffffff; }
    .note-text { font: 400 16px 'Arial', sans-serif; fill: #314764; }
    .callout-box { fill: #f2f6ff; stroke: #cddafe; stroke-width: 1.8; }
    .callout-icon { font: 700 20px 'Arial', sans-serif; fill: #1f355d; }
    .callout-text { font: 400 16px 'Arial', sans-serif; fill: #2f4568; }
    .badge.blue { fill: rgba(79, 127, 217, 0.14); stroke: #4f7fd9; stroke-width: 1.8; }
    .badge.amber { fill: rgba(211, 154, 69, 0.16); stroke: #d39a45; stroke-width: 1.8; }
    .badge.red { fill: rgba(217, 108, 99, 0.14); stroke: #d96c63; stroke-width: 1.8; }
    .badge-text { font: 700 16px 'Arial', sans-serif; fill: #28446d; }
    .summary-card { fill: #fffaf3; stroke: #f0d5aa; stroke-width: 1.8; }
    .summary-title { font: 700 17px 'Arial', sans-serif; fill: #6a471a; }
    .summary-text { font: 400 15px 'Arial', sans-serif; fill: #704f25; }
    .mini-caption { font: 400 15px 'Arial', sans-serif; fill: #58709b; }
  </style>
  <rect width="${width}" height="${height}" rx="28" class="bg" />
  <rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="272" rx="24" class="panel" />
  <rect x="${noteX}" y="${panelY}" width="${noteWidth}" height="272" rx="24" class="panel" />
  <text x="40" y="28" class="title-main">${escapeXml(spec.title)}</text>
  <text x="40" y="54" class="title-sub">${escapeXml(spec.subtitle)}</text>
  <text x="62" y="108" class="caption">方法示意图</text>
  <text x="556" y="108" class="caption">复盘重点</text>
  ${base}
  ${highlights}
  ${extras}
  ${notes}
  <rect x="40" y="366" width="900" height="40" rx="18" class="callout-box" />
  <text x="60" y="392" class="callout-icon">!</text>
  <text x="92" y="392" class="callout-text">${escapeXml(spec.emphasis)}</text>
</svg>`;
}


function renderSpatialStepSvg(spec) {
  const width = 980;
  const height = 420;
  const originX = 210;
  const originY = 288;
  const blocks = [...spec.blocks].sort((a, b) => (a.x + a.y + a.z) - (b.x + b.y + b.z));
  const cubes = blocks.map((block) => drawSpatialCube(block, originX, originY)).join('');
  const legend = (spec.legend || []).map((item, index) => {
    const y = 112 + index * 34;
    return `<g transform="translate(650 ${y})"><rect width="22" height="22" rx="7" class="${item.cls}" /><text x="34" y="16" class="legend-text">${escapeXml(item.label)}</text></g>`;
  }).join('');
  const callouts = (spec.callouts || []).map((item) => `<g><rect x="${item.x - 14}" y="${item.y - 20}" width="124" height="34" rx="14" class="callout-chip" /><text x="${item.x}" y="${item.y + 2}" class="callout-chip-text">${escapeXml(item.text)}</text></g>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(spec.title)}</title>
  <desc id="desc">${escapeXml(spec.subtitle)} ${escapeXml(spec.emphasis)}</desc>
  <style>
    .bg { fill: #f8fbff; }
    .panel { fill: #ffffff; stroke: #dbe6ff; stroke-width: 2; }
    .title-main { font: 700 28px 'Arial', sans-serif; fill: #18305b; }
    .title-sub { font: 400 16px 'Arial', sans-serif; fill: #4b628c; }
    .caption { font: 700 18px 'Arial', sans-serif; fill: #24416f; }
    .front-visible { fill: #eef4ff; stroke: #5278ca; stroke-width: 2.2; }
    .top-visible { fill: #fcfdff; stroke: #5278ca; stroke-width: 2.2; }
    .side-visible { fill: #f4f7ff; stroke: #5278ca; stroke-width: 2.2; }
    .front-support { fill: #fff3db; stroke: #c98d2d; stroke-width: 2.2; }
    .top-support { fill: #fff9ef; stroke: #c98d2d; stroke-width: 2.2; }
    .side-support { fill: #fff6e7; stroke: #c98d2d; stroke-width: 2.2; }
    .front-hidden { fill: #fff0ef; stroke: #db7568; stroke-width: 2.2; stroke-dasharray: 6 5; }
    .top-hidden { fill: #fff7f6; stroke: #db7568; stroke-width: 2.2; stroke-dasharray: 6 5; }
    .side-hidden { fill: #fff4f2; stroke: #db7568; stroke-width: 2.2; stroke-dasharray: 6 5; }
    .legend-visible { fill: #eef4ff; stroke: #5278ca; stroke-width: 2; }
    .legend-support { fill: #fff3db; stroke: #c98d2d; stroke-width: 2; }
    .legend-hidden { fill: #fff0ef; stroke: #db7568; stroke-width: 2; }
    .legend-muted { fill: #f3f6fb; stroke: #c4d0e5; stroke-width: 2; }
    .legend-text { font: 400 16px 'Arial', sans-serif; fill: #314764; }
    .callout-box { fill: #f2f6ff; stroke: #cddafe; stroke-width: 1.8; }
    .callout-icon { font: 700 20px 'Arial', sans-serif; fill: #1f355d; }
    .callout-text { font: 400 16px 'Arial', sans-serif; fill: #2f4568; }
    .callout-chip { fill: #ffffff; stroke: #dbe6ff; stroke-width: 1.8; }
    .callout-chip-text { font: 700 14px 'Arial', sans-serif; fill: #c55d50; }
  </style>
  <rect width="${width}" height="${height}" rx="28" class="bg" />
  <rect x="40" y="78" width="560" height="256" rx="24" class="panel" />
  <rect x="624" y="78" width="316" height="256" rx="24" class="panel" />
  <text x="40" y="28" class="title-main">${escapeXml(spec.title)}</text>
  <text x="40" y="54" class="title-sub">${escapeXml(spec.subtitle)}</text>
  <text x="62" y="108" class="caption">空间结构示意</text>
  <text x="646" y="108" class="caption">复盘重点</text>
  ${cubes}
  ${legend}
  ${callouts}
  <rect x="40" y="352" width="900" height="48" rx="18" class="callout-box" />
  <text x="60" y="382" class="callout-icon">!</text>
  <text x="92" y="382" class="callout-text">${escapeXml(spec.emphasis)}</text>
</svg>`;
}

function drawSpatialCube(block, originX, originY) {
  const baseX = originX + block.x * 90 + block.y * 60;
  const baseY = originY - block.z * 76 - block.y * 34;
  const face = block.role || 'visible';
  const front = `${baseX},${baseY} ${baseX + 90},${baseY} ${baseX + 90},${baseY + 76} ${baseX},${baseY + 76}`;
  const top = `${baseX},${baseY} ${baseX + 60},${baseY - 34} ${baseX + 150},${baseY - 34} ${baseX + 90},${baseY}`;
  const side = `${baseX + 90},${baseY} ${baseX + 150},${baseY - 34} ${baseX + 150},${baseY + 42} ${baseX + 90},${baseY + 76}`;
  return `<g><polygon points="${top}" class="top-${face}" /><polygon points="${side}" class="side-${face}" /><polygon points="${front}" class="front-${face}" /></g>`;
}

function computeOrientations(coords, centerSpec) {
  const coordSet = new Set(coords.map((item) => coordKey(item.x, item.y)));
  const centerKey = coordKey(centerSpec.x, centerSpec.y);
  const orientations = new Map();
  orientations.set(centerKey, {
    u: [1, 0, 0],
    v: [0, 1, 0],
    n: [0, 0, 1],
  });
  const queue = [centerSpec];
  while (queue.length) {
    const current = queue.shift();
    const key = coordKey(current.x, current.y);
    const basis = orientations.get(key);
    const moves = [
      { dx: 1, dy: 0, fn: ({ u, v, n }) => ({ u: neg(n), v, n: u }) },
      { dx: -1, dy: 0, fn: ({ u, v, n }) => ({ u: n, v, n: neg(u) }) },
      { dx: 0, dy: 1, fn: ({ u, v, n }) => ({ u, v: neg(n), n: v }) },
      { dx: 0, dy: -1, fn: ({ u, v, n }) => ({ u, v: n, n: neg(v) }) },
    ];
    for (const move of moves) {
      const nx = current.x + move.dx;
      const ny = current.y + move.dy;
      const nextKey = coordKey(nx, ny);
      if (!coordSet.has(nextKey) || orientations.has(nextKey)) continue;
      orientations.set(nextKey, move.fn(basis));
      queue.push({ x: nx, y: ny });
    }
  }
  return orientations;
}

function buildSlotMap(coords, orientationMap) {
  const slotMap = new Map();
  for (const item of coords) {
    const basis = orientationMap.get(coordKey(item.x, item.y));
    if (!basis) continue;
    const faceLabel = FACE_LABELS.get(vectorKey(basis.n));
    if (!faceLabel) continue;
    slotMap.set(faceLabel, String(item.id));
  }
  return slotMap;
}

function coordKey(x, y) {
  return `${x},${y}`;
}

function vectorKey(vector) {
  return vector.join(',');
}

function neg(vector) {
  return vector.map((value) => value * -1);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
