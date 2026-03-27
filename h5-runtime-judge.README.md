# H5 Runtime Judge Engine + Session State

这层补充了两部分：

1. `h5-runtime-judge.schema.ts`
   - 定义 session state、题目计时状态、提交 payload、判题结果、错因反馈、结果页/错题本构建输入。
2. `h5-runtime-judge.engine.ts`
   - 提供可直接运行的本地判题与 session 演进函数。
3. `h5-runtime-judge.mock.ts`
   - 提供样例题的提交数据、整轮 session 演进、结果页与错题本 mock。

---

## 目标

把以下内容统一收口：

- 判题输入
- 倒计时 / 已用时
- 星级计算
- 连击计算
- 错因反馈
- 单题状态演进
- 整轮 session 汇总
- 结果页 / 错题本生成

---

## 主要类型

### Session
- `RuntimeSessionStateSchema`
- `RuntimeSessionTotals`
- `RuntimeQuestionSessionState`
- `RuntimeQuestionTimerState`

### Judge
- `RuntimeSubmissionPayload`
- `RuntimeJudgeResult`
- `JudgeFeedbackItem`
- `RuntimeJudgePolicy`
- `QuestionJudgeSnapshot`

### 构建输出
- `SessionProgressSnapshot`
- `ResultPageData`
- `WrongBookPageData`

---

## 已支持的判题类型

当前 engine 已支持：

- `numeric`
- `single_choice`
- `multi_choice`
- `slot_mapping`
- `grid_fill`
- `hotspot_selection`
- `sequence`
- `free_text`

如果题目没有本地标准答案，engine 会返回 `unsupported_answer_kind`。

---

## 主要函数

### 1. 创建 session

```ts
const session = createRuntimeSessionState(questionIds, {
  sessionId: 'demo-session',
  mode: 'mixed_challenge',
  createdAtMs: Date.now(),
  questionTimersMs: {
    '36Y-1': 15000,
    '36Y-2': 20000,
  },
});
```

### 2. 开始一道题

```ts
const nextSession = startRuntimeQuestion(session, '36Y-1', {
  startedAtMs: Date.now(),
});
```

### 3. 提交并判题

```ts
const judged = judgeRuntimeQuestionSubmission(
  runtimePageVm,
  nextSession,
  {
    questionId: '36Y-1',
    submittedAtMs: Date.now(),
    elapsedMs: 3500,
    answer: {
      kind: 'numeric',
      value: '100',
    },
  },
);
```

返回：

```ts
{
  session: RuntimeSessionStateSchema,
  result: RuntimeJudgeResult,
}
```

### 4. 打开解析页

```ts
const reviewed = markQuestionReviewOpened(judged.session, '36Y-1');
```

### 5. 生成结果页 / 错题本

```ts
const resultPage = buildResultPageData({ session, questionMetaMap });
const wrongBook = buildWrongBookPageData({
  session,
  questionMetaMap,
  generatedAtIso: new Date().toISOString(),
});
```

### 6. 收口最终 session

```ts
const finalized = finalizeRuntimeSession(
  session,
  { session, questionMetaMap },
  { session, questionMetaMap, generatedAtIso: new Date().toISOString() },
);
```

---

## 星级规则

默认策略：

- 答错：0 星
- 无倒计时：
  - 第 1 次答对：3 星
  - 第 2 次答对：2 星
  - 第 3 次及以后：1 星
- 有倒计时：
  - 剩余时间比例 >= 40% 且首次答对：3 星
  - 剩余时间比例 >= 15%：2 星
  - 其他答对：1 星

可通过 `RuntimeJudgePolicy` 覆盖。

---

## 连击与分数

默认规则：

- 答对：连击 +1
- 答错：连击归零
- 单题得分：`100 + comboAfter * 10`

可通过 `RuntimeJudgePolicy` 覆盖：

- `baseScorePerCorrect`
- `comboBonusMultiplier`
- `combo.resetOnWrong`
- `combo.wrongPenalty`
- `combo.correctBaseIncrement`

---

## 错因返回

每次判题会统一返回：

- `primaryReasonCode`
- `feedback[]`
- `wrongReasons[]`

其中：

- `feedback[]` 来自 engine，可直接驱动 toast / 面板提示。
- `wrongReasons[]` 来自题目内容层，可直接驱动“常见错因”模块。

常见 reason code：

- `empty_submission`
- `incorrect_value`
- `incorrect_option`
- `incorrect_selection`
- `missing_slot`
- `incorrect_mapping`
- `incorrect_grid`
- `incorrect_sequence`
- `incorrect_text`
- `extra_selection`
- `time_expired`

---

## mock 内容

`h5-runtime-judge.mock.ts` 已提供：

- `mockJudgeSubmissionMap`
- `mockJudgeRoundTrip`
- `mockJudgeResultPage`
- `mockJudgeWrongBook`
- `mockFinalizedJudgeSession`
- `mockJudgeEngineSummary`

可以直接用于：

- 前端联调
- session reducer 调试
- 结果页渲染
- 错题本渲染
- 连击 / 星级 / 计时 UI 联调

---

## 当前边界

这版是“本地同步判题”模型，暂未包含：

- 服务端判题回写
- 多端同步 session
- 防作弊签名
- hint 使用次数对星级的影响
- 动态难度调节策略
- 自定义组件题的专属 judge plugin

这些后续可以在当前 schema 上继续扩展。
