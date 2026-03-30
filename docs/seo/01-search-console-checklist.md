# Search Console 接入清单

## 1. 目标

本清单用于把当前 SEO 内容层正式接入 Google Search Console，并完成上线后的首轮抓取、索引、canonical 与 sitemap 验证。

当前项目已具备以下前置条件：

- 生产环境输出 `robots.txt`
- 生产环境输出 `sitemap.xml`
- Preview 环境统一输出 `noindex,nofollow`
- 内容页已具备独立 URL、`canonical`、面包屑与基础元信息

## 2. 建议的 Property 策略

### 2.1 首选：Domain property

适用场景：

- 已绑定正式自定义域名
- 希望统一覆盖 `http/https`、主域名与子域名

执行方式：

- 在 Search Console 中添加 Domain property
- 按向导在 DNS 服务商处添加 TXT 验证记录
- 等待验证生效后完成所有权确认

### 2.2 可选：额外增加 URL-prefix property

适用场景：

- 需要只盯某一个正式 Host
- 需要更直接地排查 `https://正式域名/` 这一条生产入口

建议：

- 如已使用 Domain property，可按需要再补一个生产 URL-prefix property
- Preview 地址不接 Search Console，不做提交，不做请求抓取

## 3. 上线前检查

### 3.1 生产域名

确认以下 URL 在生产环境可访问：

- `/robots.txt`
- `/sitemap.xml`
- `/modules/`
- `/papers/`
- `/topics/`
- `/guides/`

### 3.2 Preview 域名

确认以下行为：

- 页面 `<meta name="robots">` 为 `noindex,nofollow`
- `robots.txt` 为全站禁止抓取
- Preview 不提交到 Search Console
- Preview 不作为 canonical 目标

### 3.3 Canonical 抽样检查

至少抽查以下页面：

- 首页
- 1 个模块页，例如 `/modules/patterns/`
- 1 个专题页，例如 `/topics/find-patterns/`
- 1 个题目页，例如 `/questions/34w-12/`

验收标准：

- `canonical` 指向生产正式 URL
- 页面不指向 preview host
- 页面不互相错误指向其他专题或题目页

## 4. Search Console 接入步骤

### Step 1：添加 Property

推荐顺序：

1. 添加 Domain property
2. 完成 DNS 验证
3. 按需增加生产 URL-prefix property

### Step 2：提交 Sitemap

进入 Search Console 的 Sitemap 页面，提交：

- `<生产域名>/sitemap.xml`

提交后记录：

- 首次提交时间
- Search Console 是否读取成功
- 是否存在解析错误

### Step 3：抽样用 URL Inspection 检查页面

建议首批检查：

- 首页 `/`
- 模块页 `/modules/plane_geometry_counting/`
- 专题页 `/topics/count-shapes/`
- 指南页 `/guides/grade1-thinking-training/`
- 精修题解页 `/questions/34w-12/`
- 精修题解页 `/questions/36y-10/`

重点看：

- URL 是否允许被索引
- 用户声明 canonical 与 Google 选择 canonical 是否一致
- 页面是否可抓取
- 页面资源是否能正常加载

### Step 4：请求重新抓取

对首页、模块页、专题页和首批精修题解页做请求抓取。

建议首批请求范围：

- 首页
- 7 个模块页
- 6 个专题页
- 8 个高价值题目页

## 5. Page Indexing 报表检查项

接入后持续看 Page indexing 报表，重点关注以下状态：

- 已索引
- 已发现，尚未编入索引
- 已抓取，尚未编入索引
- 被 `noindex` 排除
- 由于备用页面而未编入索引
- Google 选择的 canonical 与用户不同

### 排查优先级

#### P0

- 生产正式页被 `noindex`
- canonical 指到了错误域名或 preview 域名
- sitemap 读取失败

#### P1

- 精修题解页长期处于“已发现，尚未编入索引”
- 生产专题页被识别为重复页

#### P2

- 普通题目页收录慢
- 次级导航页索引延迟

## 6. 首批 URL 验收样本

### 首页与聚合页

- `/`
- `/modules/`
- `/papers/`
- `/topics/`
- `/guides/`

### 专题页

- `/topics/find-patterns/`
- `/topics/count-shapes/`
- `/topics/spatial-reasoning/`
- `/topics/logic-fill-number/`

### 精修题解页

- `/questions/34w-1/`
- `/questions/34w-8/`
- `/questions/34w-12/`
- `/questions/34y-12/`
- `/questions/34y-15/`
- `/questions/35y-13/`
- `/questions/35y-17/`
- `/questions/36y-10/`

## 7. 精修题解页的验证重点

### 7.1 内容差异性

确认每页具备：

- 独立的问题背景说明
- 独立的分步方法
- 独立的常见卡点
- 独立 FAQ

### 7.2 答案状态管理

当前分两类：

- `verified`：可直接展示答案与核对说明
- `pending_verification`：保留方法讲解，但答案状态明确标记为待终审

上线后要避免把“待终审”页在 Search Console 里误判成内容错误；它们的问题不在索引，而在题面答案尚未完成最终业务校验。

## 8. 首月跟踪节奏

### 上线当天

- 完成 Property 验证
- 提交 sitemap
- 用 URL Inspection 检查首页与首批重点页
- 对首批重点页请求抓取

### 第 3 天

- 看 sitemap 是否读取成功
- 抽查是否已有页面进入已发现或已抓取状态
- 检查生产页是否误触发 `noindex`

### 第 7 天

- 查看模块页、专题页、精修题解页的索引进度
- 关注 canonical 是否被 Google 改判
- 关注是否出现“已抓取，尚未编入索引”聚集现象

### 第 14 天

- 根据 Search Console 数据决定下一批扩页方向
- 优先继续扩“已获得展示但内容仍偏薄”的题解页
- 对长期未收录页补更强的正文差异、内链与 FAQ

## 9. 上线验收标准

满足以下条件，视为 Search Console 首轮接入完成：

- Property 验证完成
- `sitemap.xml` 提交成功且可读取
- 首页、模块页、专题页、首批精修题解页均完成 URL Inspection 抽查
- 生产页 canonical 指向正确
- Preview 页保持 `noindex`
- 至少已有一批重点页进入“已发现”或“已抓取”状态

## 10. 下一轮建议

在 Search Console 首轮接入完成后，下一轮优先继续做两件事：

1. 把 `pending_verification` 的高价值题目完成正式答案终审
2. 从 Search Console 的实际展示词和查询词里反推下一批专题页与题解页
