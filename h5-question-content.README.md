# H5 题目内容层 schema 使用说明

这层 schema 用来补齐“题库母表/题库配置”里没有展开的正式题目内容，目标是让前端页面可以直接按配置渲染。

## 文件

- `h5-question-content.schema.ts`
  - 内容层 TypeScript 类型定义
- `h5-question-content.mock.ts`
  - 示例题目内容记录

## 这层解决的问题

统一结构化以下内容：

- 正式题面（标题、正文、提示、图片、网格）
- 选项 / 拖拽卡片 / 落点槽位
- 标准答案
- 分步解析
- 热区坐标
- 动画参数
- 题目资源清单

## 记录主键

内容层通过 `meta.questionId` 和题库配置里的 `questions[].id` 对齐。

例如：

- `36Y-1`
- `36Y-10`
- `36Y-19`

前端可以先读题库母表，再按 `questionId` 去内容层查正式题面。

## 热区坐标规范

热区统一使用归一化坐标：

- 左上角是 `(0, 0)`
- 右下角是 `(1, 1)`

这样前端无论图片实际像素是多少，都可以按相同比例渲染。

支持三种几何：

- `rect`
- `circle`
- `polygon`

## 动画参数规范

当前内置了 6 类动画：

- `frame_animation`
- `step_reveal_animation`
- `cube_rotation_animation`
- `gear_spin_animation`
- `balance_animation`
- `number_line_jump_animation`

推荐做法：

- 动画只负责“演示规则”
- 不把答案硬编码进播放过程
- 解析步骤通过 `relatedAnimationId` 关联动画

## 推荐的前端取数流程

1. 先读取 `题库配置_v1_YMO_WMO一年级_H5.json`
2. 拿到某题 `id`
3. 用同一个 `id` 去 `QuestionContentBundle.records` 里找到正式内容
4. 根据 `interaction.type` 选择题目组件
5. 根据 `answer.kind` 判分
6. 根据 `explanation` 展示讲解

## 当前 mock 覆盖的典型玩法

- `36Y-1`：数字输入 / 快算
- `36Y-2`：单选 / 规律
- `36Y-10`：点击高亮 / 数正方形
- `36Y-7`：立方体旋转观察
- `36Y-19`：4×4 拖数字入格
- `34W-20`：齿轮动画推理
- `34Y-18`：等和图拖拽填数

## 后续最适合继续补的两层

1. `asset manifest`
   - 图片尺寸
   - sprite sheet
   - GLB/音频文件索引

2. `renderer schema`
   - 每个交互组件的 UI 皮肤参数
   - 提交按钮、计时条、奖励动画样式
