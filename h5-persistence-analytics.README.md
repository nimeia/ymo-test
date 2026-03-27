# H5 Runtime Persistence Adapter + Analytics Event Schema

这层用于把前面已经整理好的运行时状态继续收口成两件可直接落地的能力：

1. **本地存档 / 恢复**
2. **埋点事件 / analytics buffer**

## 文件

- `h5-persistence-analytics.schema.ts`
  - persistence snapshot schema
  - analytics event schema
  - storage driver / sink 接口
- `h5-persistence-adapter.ts`
  - memory / localStorage driver
  - snapshot save / load / hydrate
  - analytics tracker / buffer
- `h5-persistence-analytics.mock.ts`
  - 样例状态流持久化
  - 样例事件流 analytics 转换

## 这一层解决的问题

### 1. 本地存档统一结构

运行中的 `RuntimeMachineState` 不适合原样直接落库，因为：

- `questions` 里有静态题面和大量资源引用
- 大对象重复写入 localStorage 不经济
- 恢复时静态题面本来就能从题库 bundle 再拿到

所以这里保存的是 **轻量快照**：

- session
- 当前题定位
- 草稿
- 最近一次判题结果
- banner / error
- event log tail

恢复时再结合题库 VM 重建 `RuntimeMachineState`。

### 2. 埋点与状态机事件对齐

这层把前端运行时事件统一映射为 analytics 事件，例如：

- `START_SESSION -> session_started + question_started`
- `SUBMIT_CURRENT_QUESTION -> question_submitted (+ question_judged)`
- `OPEN_REVIEW -> question_review_opened`
- `FINALIZE_SESSION -> session_finalized`

因此前端只要围绕 state machine dispatch，就能稳定产出埋点。

## 主要接口

### Persistence

```ts
const adapter = createRuntimePersistenceAdapter(new MemoryStorageDriver(), {
  appNamespace: 'ymo.h5.demo',
  snapshotVersion: '1',
});

const snapshot = adapter.saveMachineState(machineState);
const loaded = adapter.loadMachineSnapshot(machineState.machineId);
const hydrated = adapter.hydrateMachineState(machineState.machineId, questionPageMap);
```

### Analytics

```ts
const sink = new BufferedAnalyticsSink();
const tracker = createRuntimeAnalyticsTracker(sink, {
  includeDraftChanged: true,
  includeTimerTicks: false,
});

const events = tracker.trackTransition({
  event,
  before: prevState,
  after: nextState,
});
```

## 推荐接法

前端 reducer dispatch 后，按这个顺序接：

1. 得到 `nextState`
2. `tracker.trackTransition({ event, before, after: nextState })`
3. 以节流方式调用 `adapter.saveMachineState(nextState)`
4. 页面 unload / app hidden 时 flush analytics buffer

## 推荐存档策略

- `CHANGE_DRAFT`：不必每次都写，可以 1~2 秒节流
- `SUBMIT_CURRENT_QUESTION`：立即写
- `GO_TO_NEXT_QUESTION / GO_TO_PREVIOUS_QUESTION`：立即写
- `FINALIZE_SESSION`：立即写
- `PAUSE_SESSION`：立即写

## 推荐埋点策略

默认建议：

- 打开 `includeDraftChanged`
- 关闭 `includeTimerTicks`

因为 `TIMER_TICK` 频率太高，除非你确实要做实时时序分析，否则会放大埋点量。

## 当前边界

这版先提供：

- memory driver
- localStorage driver
- buffered analytics sink

还没有接：

- IndexedDB
- 远端上报 retry / batching
- 用户多 profile 隔离
- 存档 migration

这些可以留到下一层再收。
