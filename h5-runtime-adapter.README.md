# H5 Runtime Adapter

这一层的目标，是把前面三层数据：

1. `题库配置 JSON / h5-question-bank.types.ts`
2. `题目内容 schema / h5-question-content.schema.ts`
3. `asset manifest + renderer schema / h5-asset-renderer.schema.ts`

直接组装成前端页面可以消费的运行时 ViewModel。

---

## 文件说明

- `h5-runtime-adapter.ts`
  - 核心 runtime adapter
  - 提供 `createRuntimeQuestionPageViewModel()`
  - 输出完整做题页 ViewModel

- `h5-runtime-adapter.mock.ts`
  - 最小可运行 mock 依赖
  - 提供若干样例题的 runtime VM

---

## 输入

```ts
interface RuntimeAdapterDeps {
  bank: QuestionBankConfig;
  contentBundle: QuestionContentBundle;
  rendererBundle: AssetRendererBundle;
}
```

---

## 输出

核心输出是：

```ts
RuntimeQuestionPageViewModel
```

它包含：

- `question`
  - 已适配到页面层的题目卡片数据
- `playPage`
  - 兼容已有页面层的做题页结构
- `stem`
  - 正式题面 blocks，图片已解析 asset
- `hotspots`
  - 热区信息，已挂上 image asset
- `animations`
  - 动画信息，3D 模型已解析 asset
- `interaction`
  - 交互 ViewModel
- `judge`
  - 本地判题数据
- `review`
  - 解析 / 错因 / 记忆点
- `scene`
  - renderer preset + layout + layers + behavior
- `assets`
  - 页面所需资源字典
- `dependencyManifest`
  - 资源依赖清单 / preload 清单

---

## 最常用调用方式

```ts
import { createRuntimeQuestionPageViewModel } from './h5-runtime-adapter';

const vm = createRuntimeQuestionPageViewModel('36Y-10', {
  bank,
  contentBundle,
  rendererBundle,
}, {
  responsiveMode: 'landscape',
  playMode: 'mixed_challenge',
  exposeJudgeData: true,
});
```

---

## 适配流程

adapter 内部做了这些事：

1. 根据 `questionId` 找到：
   - 题库记录
   - 题目内容记录
   - renderer binding

2. 自动选择 renderer preset：
   - 先看 question binding
   - 再看 preset 的 `recommendedForQuestionIds`
   - 最后按 `interactionType` 回退匹配

3. 自动解析资源：
   - stem 图片
   - hotspot 图片
   - animation 对应 model / frame 资源
   - renderer layer 自带 asset

4. 自动应用皮肤：
   - preset layer 对应 skin
   - question binding 的 skin override

5. 自动生成页面绑定数据：
   - `interaction`
   - `interaction.options`
   - `hotspots`
   - `animations`
   - `questionCard`

---

## 当前建议的前端使用方式

### 页面容器

页面拿到 `RuntimeQuestionPageViewModel` 之后：

- 用 `scene.layout` 决定页面区域
- 用 `scene.layers` 决定组件挂载
- 用 `question / stem / interaction` 驱动内容组件
- 用 `judge` 做本地判题
- 用 `review` 做讲解与错题回放

### 资源预加载

建议页面切题前先预加载：

```ts
vm.dependencyManifest.preloadAssetKeys
```

### 判题策略

当前 adapter 默认输出：

```ts
judge.strategy === 'client_local'
```

如果以后需要把答案移到服务端，可以在这一层继续扩展：

- `client_local`
- `server_remote`
- `hybrid`

---

## mock 中已有的样例题

- `36Y-1` 快算输入
- `36Y-2` 规律单选
- `36Y-10` 数正方形热区点击
- `36Y-7` 立方体观察
- `36Y-19` 拖数字入格
- `34W-20` 齿轮推理
- `34Y-18` 等和图拖拽

可直接看：

```ts
mockRuntimeQuestionPageExamples
mockRuntimeQuestionPageMap
mockRuntimePreviewSummary
```

---

## 下一步最自然的扩展

建议继续补两层：

1. `runtime session state schema`
   - 用户当前答案
   - 计时
   - 星级
   - 连击
   - 历史步骤

2. `runtime judge engine`
   - numeric / choice / hotspot / grid / slot mapping 的统一判题器
   - 标准化错因返回
   - 讲解跳转建议
