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
- SEO 内容页（静态生成）
  - 模块页
  - 试卷页
  - 题型专题页
  - 训练指南页
  - 题目说明页

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
- Preview / Production 差异化 SEO 输出

## 目录

- `src/App.tsx`：应用入口与路由切换
- `src/hooks/useRuntimeMachineDemo.ts`：状态机 + 本地持久化封装
- `src/components/QuestionInteractionPanel.tsx`：题目交互区
- `src/styles.css`：基础样式
- `src/seo/catalog.json`：专题、指南与精选题目页配置
- `scripts/build-seo-assets.mjs`：SEO 静态页、`robots.txt`、`sitemap.xml` 生成脚本
- `scripts/check-seo-output.mjs`：构建产物校验脚本

## 启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建时会自动执行：

1. 生成 SEO 静态页面与 `robots.txt` / `sitemap.xml`
2. 构建 React 应用
3. 校验关键 SEO 产物是否进入 `dist/`

## SEO 环境变量

可选环境变量：

- `SITE_ORIGIN` / `VITE_SITE_ORIGIN`：正式站点域名，例如 `https://example.com`
- `SEO_ENV` / `VITE_SEO_ENV`：`production` 或 `preview`

行为约定：

- `production`：页面允许索引，`robots.txt` 允许抓取，输出 `sitemap.xml`
- `preview`：页面统一 `noindex,nofollow`，`robots.txt` 禁止抓取

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
- `SITE_ORIGIN`：正式站点域名，未配置时会回退到 `https://<project>.pages.dev`

**Repository Secrets**

- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare 账户 ID
- `CLOUDFLARE_API_TOKEN`：Cloudflare API Token

### 工作流做了什么

1. 进入 `h5-mvp-react`
2. 执行 `npm install`
3. 注入 `production` / `preview` SEO 环境变量
4. 执行 `npm run build`
5. 将 `dist/` 目录通过 `cloudflare/wrangler-action@v3` 发布到 Cloudflare Pages
