# H5 Asset Manifest + Renderer Schema

这层配置解决的是“题目已经结构化了，但前端还不知道怎么摆、怎么用资源、怎么换皮肤”的问题。

## 文件

- `h5-asset-renderer.schema.ts`
  - 资源清单 schema
  - 组件皮肤 schema
  - 渲染预设 schema
  - 题目到渲染预设的绑定 schema
- `h5-asset-renderer.mock.ts`
  - 一组可直接联调的示例资源、皮肤、预设、题目绑定

## 三层职责

### 1. content 层
来自 `h5-question-content.schema.ts`

负责：
- 正式题面
- 选项
- 答案
- 解析
- 热区
- 动画逻辑参数

### 2. asset + renderer 层
来自本次新增文件

负责：
- 图片、sprite、3D 模型、音频、字体的统一注册
- 组件皮肤参数（颜色、边框、阴影、字号、拖拽槽位风格）
- 不同玩法页面的布局与挂载点
- 指定某道题应该走哪套渲染预设

### 3. page / runtime 层
前端项目自行实现

负责：
- React/Vue/小游戏组件真正渲染
- 把 content record 和 renderer preset 合并成最终页面
- 做响应式、动画执行、音效播放、结果上报

## 推荐的前端组装顺序

1. 读取 `QuestionContentRecord`
2. 通过 `questionId` 在 `questionBindings` 找到 `presetKey`
3. 根据 `presetKey` 取 `RendererPreset`
4. 根据 preset 中的 layer 和 region 渲染页面骨架
5. 读取 `skins`，按 `skinKey` 给组件注入样式 token
6. 读取 `assets`，把 image / sprite / model / audio 预加载或懒加载
7. 把 content 的 `stem / interaction / hotspots / animations` 挂到对应 layer

## 关键设计点

### Asset Manifest
统一注册：
- `image`
- `sprite_sheet`
- `atlas`
- `model_3d`
- `audio`
- `font`
- `video`

这样做的好处是：
- 资源 key 全局唯一
- 题目和 UI 都只引用 key，不直接写路径
- 后续换 CDN、换目录、换压缩格式都不需要改题目数据

### Component Skin
把组件样式参数化：
- 背景色
- 边框
- 阴影
- 字体
- hover / correct / wrong 状态
- 额外字段（例如网格线宽、拖拽块最小尺寸）

这样可以做：
- 春季主题
- 太空主题
- 海洋主题
- 节日皮肤

只换 skin，不改题目内容。

### Renderer Preset
用预设描述“页面怎么摆”：
- 哪些区域存在
- 题面在哪
- 交互区在哪
- 3D 模型在哪
- 热区层在哪
- HUD 在哪
- 哪些行为在进入页面/答对/答错时触发

所以你后面做新题时，不一定每题都写一套页面；大多数题只要绑定已有 preset 即可。

## 当前 mock 已覆盖的典型玩法

- `mental_math_fast_input`：快算输入页
- `pattern_single_choice`：规律单选页
- `geometry_click_highlight`：数图热区点击页
- `cube_rotate_choice`：立方体旋转观察页
- `logic_grid_drag_fill`：逻辑网格拖拽页
- `gear_animation_choice`：齿轮动画推理页
- `equal_sum_drag_slots`：等和图拖拽页

## 前端最常用的两个入口

### 资源注册表
使用：`mockAssetRendererBundle.assets`

适合做：
- preload loader
- asset resolver
- sprite frame parser
- 3D model registry

### 题目绑定表
使用：`mockAssetRendererBundle.questionBindings`

适合做：
- questionId -> presetKey 查找
- 特定题目的皮肤覆盖
- 某些题的行为开关配置

## 建议下一步

最顺手的一步是继续补：
- `renderer runtime adapter`
- `question-to-view-model mapper`
- `asset preload plan generator`

这样前端项目里就能直接从三份 schema 组装出真正的做题页数据。
