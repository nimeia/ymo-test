# Task.md

## Done

- [x] E-OPS-001 新增 GitHub Actions：构建 `h5-mvp-react` 并发布到 Cloudflare Pages。
  - 工作流文件：`.github/workflows/deploy-cloudflare-pages.yml`
  - 发布方式：push 到 `master/main` 发布生产；PR 发布预览；支持手动触发。
  - 依赖配置：`CLOUDFLARE_PAGES_PROJECT_NAME`、`CLOUDFLARE_ACCOUNT_ID`、`CLOUDFLARE_API_TOKEN`

- [x] SEO-001 补齐站点基础 SEO 头信息与环境控制。
  - 修改文件：`h5-mvp-react/index.html`、`h5-mvp-react/vite.config.ts`
  - 已补内容：`description`、`robots`、`canonical`、Open Graph、Twitter Card
  - 环境策略：生产环境允许索引；Preview 环境统一 `noindex,nofollow`

- [x] SEO-002 新增静态 SEO 页面生成链路。
  - 新增文件：`h5-mvp-react/scripts/build-seo-assets.mjs`
  - 数据来源：仓库根目录题库 JSON + `h5-mvp-react/src/seo/catalog.json`
  - 生成内容：模块页、试卷页、专题页、指南页、题目页、`robots.txt`、`sitemap.xml`、`manifest.webmanifest`

- [x] SEO-003 新增构建校验脚本。
  - 新增文件：`h5-mvp-react/scripts/check-seo-output.mjs`
  - 已接入 `npm run build` 后置校验，确保关键 SEO 产物进入 `dist/`

- [x] SEO-004 在现有 H5 首页中补充内容层入口，不改玩法主链。
  - 修改文件：`h5-mvp-react/src/App.tsx`、`h5-mvp-react/src/styles.css`
  - 已补内容：专题入口、指南入口、试卷页入口、模块专题页入口、动态页面标题/描述更新

- [x] SEO-005 发布流程接入 SEO 环境变量。
  - 修改文件：`.github/workflows/deploy-cloudflare-pages.yml`
  - 新增变量：`SITE_ORIGIN`
  - 行为：构建阶段自动区分 `production` / `preview`，并注入站点域名与索引策略

## Backlog

- [x] SEO-006 为高价值题目补充更细粒度人工题解文案，替换当前通用讲解模板。
  - 新增文件：`h5-mvp-react/src/seo/question-overrides.json`
  - 首批精修页面：`34W-1`、`34W-8`、`34W-12`、`34Y-12`、`34Y-15`、`35Y-13`、`35Y-17`、`36Y-10`
  - 已补内容：差异化导语、分步思路、答案状态、常见卡点、FAQ
  - [x] SEO-006A 收口 `35Y-13` 为正式答案页，并将 `34Y-15` 的答案状态文案从“待校验”统一收口为“待终审”。
  - [x] SEO-006B 将 `35Y-13` 从通用展开图讲解收成逐图解析页，补 5 个候选图的逐个保留/排除说明，并新增配套切图素材。
  - [x] SEO-006C 为 `35Y-13` 逐图解析页再补一层“折叠方向示意图”，新增 5 张 SVG 图示，把“为什么撞面”画成更直观的图示版。
- [ ] SEO-007 增加专题页与题目页的更完整结构化数据（可结合后续内容精修再推进）。
- [x] SEO-008 补 Search Console 接入清单与上线验收文档。
  - 新增文件：`docs/seo/01-search-console-checklist.md`
  - 已补内容：Property 策略、sitemap 提交、URL Inspection 抽样、Page indexing 验收、首月跟踪节奏

  - [x] SEO-006D 抽象“可视化拆解”通用模板：将逐图解析卡片升级为通用 `visualWalkthrough` 渲染层，并复用到 `34Y-15`，补 3 张空间题示意图（外轮廓 / 支撑列 / 隐藏区）。

  - [x] SEO-006E 将 `visualWalkthrough` 继续复用到 `34Y-14`，补 3 张六边形补缺示意图（外圈边框 / 空白分带 / 转角复核），形成可复用的图形缺口精修页。
  - [x] SEO-006F 将 `visualWalkthrough` 复用到 `35Y-17`，补 3 张图形计数示意图（先看最短段 / 拆方向 / 按长度复核），形成“计数/分层统计”系列页。

  - [x] SEO-006G 将空间/补缺观察页与计数/分层统计页整理成两个系列专题聚合页，新增 `/series/` 总览页与两个系列落地页，并把相关精修题页回链到系列入口。

  - [x] SEO-006H 为两个系列专题页补“推荐练习顺序 + 练完后下一页去哪”，并在系列内题目页增加当前进度与下一页导流区块。
  - [x] SEO-006I 为两个系列专题页补“系列完成页”，新增 `/series/<slug>/completed/`，并将最终导流从静态入口推进到“同类随机题 / 相关专题 / 在线训练”的完成页闭环。
- SEO-CompletionCards: 为空间/补缺观察线和计数/分层统计线的系列完成页补充“完成后推荐 3 题随机抽练卡”，每张卡直接链接到具体题目页，强化从完成页到同类练习的导流闭环。
- SEO-034：为两个系列完成页的 6 张随机抽练卡补上“已练过 / 下一题 / 换一题”状态卡；在完成页模板中新增三态跳转入口，并同步更新 SEO 样式与生成产物。
- SEO-035：为两个系列完成页的 6 张随机抽练卡补“同题组序号”，在完成页模板中新增“第 1 张 / 第 2 张 / 第 3 张”队列标识，并把三态卡升级成更明确的微型连练队列。
- SEO-阶段提示：为系列完成页的微型连练队列补充“完成 1 张 / 完成 2 张 / 全部完成”阶段提示，完成页顶部增加阶段卡，每张抽练卡增加阶段标签与完成后提示文案。
