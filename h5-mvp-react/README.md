# H5 MVP React Demo

这是一套基于现有运行时设计包的 **React + Vite 前端骨架**，目标是把已经完成的：

- 题库配置
- 题目内容 schema
- renderer schema
- runtime adapter
- judge engine
- state machine
- persistence / analytics / remote sync

真正串成一套可以开始联调 UI 的 H5 MVP。

## 已接起来的页面

- 首页
- 模块大厅
- 做题页
- 结算页
- 错题本页

## 已接起来的运行能力

- 题目列表切换
- 做题状态机驱动
- 单题计时
- 提交判题
- 解析查看
- 上一题 / 下一题
- 完成后结算
- 本地快照恢复（localStorage）
- Demo 题组切换

## 说明

当前 Demo 使用的是已经结构化的 7 道样题：

- 36Y-1
- 36Y-2
- 36Y-10
- 36Y-7
- 36Y-19
- 34W-20
- 34Y-18

模块 C / D 在这套样题里还没有正式内容录入，所以页面会显示“待录题”提示。这是 UI 骨架层的真实状态，不是 bug。

## 目录

- `src/App.tsx`：应用入口与路由切换
- `src/hooks/useRuntimeMachineDemo.ts`：状态机 + 本地持久化封装
- `src/components/QuestionInteractionPanel.tsx`：题目交互区
- `src/styles.css`：基础样式

## 启动

```bash
npm install
npm run dev
```

## 下一步建议

下一步优先做这三件事：

1. 批量补齐 80 道题的正式 `QuestionContentRecord`
2. 把图片 / sprite / 3D 模型换成真实资源
3. 接真实后端接口，把 scheduler + remote sync 跑通
