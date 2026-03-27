# Task.md

## Done

- [x] E-OPS-001 新增 GitHub Actions：构建 `h5-mvp-react` 并发布到 Cloudflare Pages。
  - 工作流文件：`.github/workflows/deploy-cloudflare-pages.yml`
  - 发布方式：push 到 `master/main` 发布生产；PR 发布预览；支持手动触发。
  - 依赖配置：`CLOUDFLARE_PAGES_PROJECT_NAME`、`CLOUDFLARE_ACCOUNT_ID`、`CLOUDFLARE_API_TOKEN`
