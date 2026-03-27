# h5 HTTP transport + upload scheduler

这一层把前面已经完成的：

- remote sync schema / adapter
- local persistence / analytics buffer
- runtime state machine

继续往前收成两块可直接接后端的实现：

1. **HTTP transport implementation**
2. **upload scheduler**

## 文件

- `h5-http-transport.ts`
- `h5-upload-scheduler.ts`
- `h5-http-transport.mock.ts`

## HTTP transport

### 入口

```ts
const transport = createHttpRemoteSyncTransport({
  baseUrl: 'https://example.com/api/runtime',
  endpoints: {
    snapshotPush: { path: '/snapshot/push', method: 'POST' },
    snapshotPull: { path: '/snapshot/pull', method: 'POST' },
    analyticsUpload: { path: '/analytics/upload', method: 'POST' },
  },
  authToken: 'demo-token',
});
```

### 特点

- 基于 `fetch`
- 自动包装 JSON envelope
- 自动附带：
  - `Authorization`
  - `X-App-Namespace`
  - `X-Trace-Id`
- 支持超时
- 将 HTTP status 统一映射成 `RemoteSyncFailure`

### 路由约定

默认按远端三条能力分开：

- snapshot push
- snapshot pull
- analytics upload

也支持把 `path` 写成函数，根据请求体动态拼路径。

## upload scheduler

### 入口

```ts
const scheduler = createRuntimeUploadScheduler(
  remoteSyncAdapter,
  persistenceAdapter,
  {
    machineId: machineState.machineId,
    flushIntervalMs: 15000,
    analyticsThreshold: 12,
    snapshotDebounceMs: 1000,
  },
);
```

### scheduler 负责的事

- analytics buffer 达阈值后自动上传
- 定时 flush
- 页面隐藏时尝试 flush
- 网络恢复时重试
- 对 snapshot push 做 debounce
- 对失败任务做 retry backoff

### 常用接法

#### 1）在状态机 transition 后接入

```ts
const analyticsEvents = analyticsTracker.trackTransition({ event, before, after });
await scheduler.onRuntimeTransition({
  event,
  after,
  analyticsEvents,
});
```

#### 2）手动立即 flush

```ts
await scheduler.flushNow(machineState, 'manual');
```

#### 3）只调度 snapshot

```ts
scheduler.scheduleSnapshotPush(machineState, 'submit', 500);
```

#### 4）只调度 analytics

```ts
scheduler.scheduleAnalyticsUpload('threshold', 0);
```

## 默认策略

- `flushIntervalMs = 15000`
- `analyticsThreshold = 12`
- `analyticsRetryFloorMs = 2000`
- `snapshotDebounceMs = 1000`
- `maxBufferedAnalyticsEvents = 400`

## 当前边界

这一层已经解决：

- 抽象 transport -> HTTP fetch transport
- 本地 analytics buffer -> 远端 uploader
- snapshot debounce + retry
- analytics threshold / interval / online / hidden flush

还没有继续做：

- 多并发 worker
- pause/resume with foreground policy
- keepalive / beacon transport
- service worker 背景上报
- 多设备 snapshot merge strategy
- 指数退避策略的持久化恢复

这些可以在下一层继续补。
