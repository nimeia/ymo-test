# H5 Runtime Reducer / State Machine / Event Schema

这层用于把前端页面事件流统一掉，直接承接前面已经补好的：

- `h5-runtime-adapter.ts`
- `h5-runtime-judge.schema.ts`
- `h5-runtime-judge.engine.ts`

## 文件

- `h5-runtime-events.schema.ts`
  - 事件类型定义
  - 运行时状态机状态定义
  - 草稿、banner、导航、事件日志结构
- `h5-runtime-state-machine.ts`
  - reducer / state machine 实现
  - 支持 start / tick / draft / submit / review / next / prev / skip / finalize / restart
- `h5-runtime-state-machine.mock.ts`
  - 演示用事件流
  - 初始状态、暂停状态、完成状态、重开状态

## 核心设计

### 1. 统一事件入口

所有页面层动作都走 `RuntimeMachineEvent`：

- `START_SESSION`
- `OPEN_QUESTION`
- `CHANGE_DRAFT`
- `SUBMIT_CURRENT_QUESTION`
- `OPEN_REVIEW`
- `GO_TO_NEXT_QUESTION`
- `GO_TO_PREVIOUS_QUESTION`
- `PAUSE_SESSION`
- `RESUME_SESSION`
- `FINALIZE_SESSION`
- `RESTART_SESSION`

### 2. 状态机视图阶段

`RuntimeMachineState.phase`：

- `booting`
- `ready`
- `answering`
- `judged`
- `reviewing`
- `transitioning`
- `completed`
- `paused`
- `error`

### 3. 输出给前端的关键字段

- `currentQuestion`
- `currentQuestionState`
- `draftByQuestionId`
- `lastJudgeResult`
- `reviewVisible`
- `feedbackBanner`
- `navigation`
- `ui.submitDisabled`
- `ui.canGoPrev`
- `ui.canGoNext`
- `ui.timerWarning`
- `eventLog`

## 最小接法

```ts
import { createRuntimeMachineState, createEvent, runtimeReducer } from './h5-runtime-state-machine';
import { mockRuntimeQuestionPageMap } from './h5-runtime-adapter.mock';

const machine = createRuntimeMachineState({
  questions: {
    '36Y-1': mockRuntimeQuestionPageMap['36Y-1'],
    '36Y-2': mockRuntimeQuestionPageMap['36Y-2'],
  },
});

const s1 = runtimeReducer(machine, createEvent('START_SESSION', { questionId: '36Y-1' }));
const s2 = runtimeReducer(
  s1,
  createEvent('CHANGE_DRAFT', {
    questionId: '36Y-1',
    answer: { kind: 'numeric', value: 100 },
  }),
);
const s3 = runtimeReducer(s2, createEvent('SUBMIT_CURRENT_QUESTION', { questionId: '36Y-1' }));
```

## 当前约定

1. reducer 只负责状态流转，不直接操心组件渲染。
2. 判题依赖 `h5-runtime-judge.engine.ts`。
3. 结果页 / 错题本在 `FINALIZE_SESSION` 时自动写回 session。
4. `draftByQuestionId` 保留每题草稿，便于上一题返回编辑。
5. `eventLog` 方便做埋点和调试面板。

## 下一步适合继续补的层

- 持久化 adapter：把 `RuntimeMachineState` 存成 localStorage / IndexedDB 快照
- analytics schema：统一埋点事件名、字段、耗时、错误码
- multiplayer / classroom schema：排行榜、老师控制台、批量下发题包
