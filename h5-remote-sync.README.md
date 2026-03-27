# h5 remote sync + analytics uploader

这一层把前面已经完成的：

- runtime state machine
- local persistence adapter
- analytics tracker / buffer

继续扩成两条远端能力：

1. **session snapshot 远端同步**
2. **analytics buffer 批量上报与重试**

## 文件

- `h5-remote-sync.schema.ts`
- `h5-remote-sync-adapter.ts`
- `h5-remote-sync.mock.ts`

## 目标

让前端运行时具备：

- 本地存档后，再推送远端
- 启动时可从远端拉取最近 snapshot
- analytics 先写本地 buffer，再按批上传
- 对失败事件区分：
  - accepted
  - retryable_rejected
  - permanent_rejected
- 上传后仅保留需要重试的事件

## 核心接口

### RemoteSyncTransport

由业务侧实现的远端传输层：

- `pushSnapshot(request)`
- `pullSnapshot(request)`
- `uploadAnalytics(request)`

这一层不绑定具体协议，可以接：

- REST
- GraphQL
- WebSocket RPC
- Tauri / Electron bridge
- 本地局域网同步服务

## 适配器入口

### createRemoteSyncAdapter(...)

```ts
const remoteSync = createRemoteSyncAdapter(
  transport,
  persistenceAdapter,
  {
    appNamespace: 'ymo.h5.runtime',
    deviceId: 'wall-screen-01',
    userId: 'parent-demo',
    analyticsBatchSize: 20,
  },
);
```

### 推送快照

```ts
await remoteSync.pushSnapshot(machineState, {
  source: 'autosave',
});
```

### 拉取并恢复

```ts
const result = await remoteSync.pullAndHydrateMachineState(machineId, questionMap);
if (result.found && result.hydrated) {
  // 直接拿 hydrated machine state 进入前端状态流
}
```

### 上传 analytics buffer

```ts
const uploadJob = await remoteSync.uploadAnalyticsBuffer(machineId);
```

## analytics uploader 处理规则

每个 event 上传后都会收到三种结果之一：

- `accepted`：已成功入远端，删除本地事件
- `retryable_rejected`：暂时失败，保留本地事件，后续重试
- `permanent_rejected`：永久失败，删除本地事件

`reconcileAnalyticsBuffer(...)` 会根据远端返回结果把本地 buffer 收敛成新的待重试集合。

## retry policy

默认策略：

- `maxAttempts = 3`
- `baseDelayMs = 800`
- `backoffFactor = 2`
- `maxDelayMs = 10000`
- `jitterRatio = 0.15`

可以通过 `RemoteSyncAdapterOptions.retryPolicy` 覆盖。

## 推荐接法

### 自动存档 + 远端同步

- 每次 `SUBMIT_CURRENT_QUESTION`
- 每次 `FINALIZE_SESSION`
- 离开页面前

触发：

1. `persistence.saveMachineState`
2. `remoteSync.pushSnapshot`

### analytics flush 时机

建议在这些时机做 `uploadAnalyticsBuffer`：

- session finalize
- 页面切后台
- 网络恢复
- buffer 达到阈值
- 定时器轮询

## mock 内容

`h5-remote-sync.mock.ts` 提供：

- 内存版 mock transport
- mock snapshot push（首轮失败一次）
- mock analytics upload
- retryable / permanent rejection 示例
- pull + hydrate 示例

## 当前范围

这一层先解决：

- 数据结构统一
- 远端接口抽象
- 批量上传与重试收口

还没有做：

- 真正的 HTTP uploader
- 并发上传调度器
- 离线网络监听
- 多设备冲突合并策略
- 增量 snapshot diff

这些可以在下一层继续补。
