# H5 题库前端类型与 mock 说明

本次补充了两份文件：

- `h5-question-bank.types.ts`
- `h5-question-bank.mock.ts`

## 1. types 文件用途

`h5-question-bank.types.ts` 分成两层：

第一层是**题库原始配置类型**，直接对应已有的 JSON：

- `QuestionBankConfig`
- `QuestionRecord`
- `ModuleInfo`
- `SubtypeInfo`
- `DevelopmentPriority`
- `UiPresets`

第二层是**页面层 ViewModel 类型**，直接给 H5 页面组件用：

- `HomePageData`
- `ModuleLobbyData`
- `QuestionPlayPageData`
- `ResultPageData`
- `WrongBookPageData`

## 2. mock 文件用途

`h5-question-bank.mock.ts` 不是题库源数据，而是示例页面的 mock：

- `mockHomePageData`：首页
- `mockModuleLobbyMap`：7 个房间的大厅页数据
- `mockPlayPageExamples`：6 个不同玩法的做题页 mock
- `mockResultPageData`：结算页
- `mockWrongBookPageData`：错题本

## 3. 适合前端的接入方式

### 方式 A：先直接用 mock 起页面

适合先把页面、动画、交互组件做起来。

### 方式 B：后面再接真实题库 JSON

建议建立一层 adapter：

- 输入：`QuestionBankConfig`
- 输出：`HomePageData / ModuleLobbyData / QuestionPlayPageData`

这样后面补齐正式题面、选项、答案、热区、讲解时，页面层不需要大改。

## 4. 当前还没有补进去的内容

这次是“类型 + 页面 mock”层，下面这些还可以继续加：

- 每道题的正式 `stem`
- `answer`
- `analysis`
- 图片热区坐标
- 动画参数
- 题目音频与旁白
- 闯关奖励配置
- 成就系统配置

## 5. 推荐下一步

最顺手的下一步是继续补一份：

- `question-content.schema.ts`
- `question-content.mock.json`

专门定义题目内容层，把正式题面、选项、答案和讲解结构化。
