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

## GitHub Actions 发布到 Cloudflare Pages

仓库已补充工作流：

- `.github/workflows/deploy-cloudflare-pages.yml`

### 触发方式

- 推送到 `master` 或 `main`：发布生产环境
- 提交 / 更新 Pull Request：发布预览环境
- 手动触发 `workflow_dispatch`：手动发布生产环境

### 需要在 GitHub 仓库中配置的变量与密钥

**Repository Variables**

- `CLOUDFLARE_PAGES_PROJECT_NAME`：Cloudflare Pages 项目名

**Repository Secrets**

- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare 账户 ID
- `CLOUDFLARE_API_TOKEN`：Cloudflare API Token

### API Token 权限

建议按 Cloudflare Pages 官方文档创建自定义 Token，权限至少包含：

- `Account / Cloudflare Pages / Edit`

### 工作流做了什么

1. 进入 `h5-mvp-react`
2. 执行 `npm install`
3. 执行 `npm run build`
4. 将 `dist/` 目录通过 `cloudflare/wrangler-action@v3` 发布到 Cloudflare Pages

### 说明

当前仓库的前端项目位于子目录 `h5-mvp-react`，因此工作流已经固定从该目录构建，并发布其产物目录 `dist/`。

