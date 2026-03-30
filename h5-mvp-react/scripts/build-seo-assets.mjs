import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appDir, '..');
const publicDir = path.join(appDir, 'public');
const siteOrigin = normalizeOrigin(process.env.SITE_ORIGIN || process.env.VITE_SITE_ORIGIN || inferDefaultOrigin());
const seoEnv = process.env.SEO_ENV === 'preview' || process.env.VITE_SEO_ENV === 'preview' ? 'preview' : 'production';
const allowIndexing = seoEnv === 'production';

const config = await readQuestionBankConfig();
const catalog = JSON.parse(await fs.readFile(path.join(appDir, 'src/seo/catalog.json'), 'utf8'));
const questionOverrides = JSON.parse(await fs.readFile(path.join(appDir, 'src/seo/question-overrides.json'), 'utf8'));
const moduleMap = new Map(config.modules.map((module) => [module.key, module]));
const paperMap = new Map(config.papers.map((paper) => [paper.code, paper]));
const questionMap = new Map(config.questions.map((question) => [question.id, question]));
const topicIndexByQuestionId = buildTopicIndex(catalog.topics);
const seriesIndexByQuestionId = buildSeriesIndex(catalog.series || []);
const featuredSummaryByQuestionId = new Map(catalog.featuredQuestionPages.map((item) => [item.questionId, item.summary]));

await cleanGeneratedDirs();
await ensureDir(publicDir);

const urls = new Set(['/']);
const pages = [];


const indexPages = [
  {
    pathname: '/modules/',
    title: '一年级训练模块总览 | YMO',
    description: '按训练模块查看一年级思维题的专题入口，包括快算、规律、图形、空间和逻辑等内容。',
    html: renderStandardPage({
      pathname: '/modules/',
      title: '一年级训练模块总览',
      eyebrow: '模块导航',
      description: '按模块浏览当前题包的专题入口，再进入在线练习。',
      breadcrumbs: [{ name: '首页', href: '/' }, { name: '训练模块', href: '/modules/' }],
      body: `
        <section class="seo-card">
          <div class="link-grid">
            ${config.modules.map((module) => `
              <article>
                <h2><a href="/modules/${module.key}/">${escapeHtml(module.name)}</a></h2>
                <p>${escapeHtml(module.roomName)} · ${module.questionCount} 题</p>
              </article>`).join('')}
          </div>
        </section>
      `,
      structuredData: [buildBreadcrumbStructuredData([{ name: '首页', href: '/' }, { name: '训练模块', href: '/modules/' }])],
    }),
  },
  {
    pathname: '/papers/',
    title: '一年级试卷整理总览 | YMO',
    description: '按试卷查看 34Y、35Y、36Y 和 34W 的题型整理与代表题。',
    html: renderStandardPage({
      pathname: '/papers/',
      title: '一年级试卷整理总览',
      eyebrow: '试卷导航',
      description: '从试卷视角进入模块整理、代表题与在线训练。',
      breadcrumbs: [{ name: '首页', href: '/' }, { name: '试卷整理', href: '/papers/' }],
      body: `
        <section class="seo-card">
          <div class="link-grid">
            ${config.papers.map((paper) => `
              <article>
                <h2><a href="/papers/${paper.code.toLowerCase()}/">${escapeHtml(paper.name)}</a></h2>
                <p>${escapeHtml(paper.org)} · ${escapeHtml(paper.stage)}</p>
              </article>`).join('')}
          </div>
        </section>
      `,
      structuredData: [buildBreadcrumbStructuredData([{ name: '首页', href: '/' }, { name: '试卷整理', href: '/papers/' }])],
    }),
  },
  {
    pathname: '/topics/',
    title: '一年级题型专题总览 | YMO',
    description: '围绕找规律、数图形、空间想象、逻辑填数等高频专题，查看说明与示例题。',
    html: renderStandardPage({
      pathname: '/topics/',
      title: '一年级题型专题总览',
      eyebrow: '题型专题',
      description: '从高频搜索主题进入示例题、训练方法与在线练习。',
      breadcrumbs: [{ name: '首页', href: '/' }, { name: '题型专题', href: '/topics/' }],
      body: `
        <section class="seo-card">
          <div class="link-grid">
            ${catalog.topics.map((topic) => `
              <article>
                <h2><a href="/topics/${topic.slug}/">${escapeHtml(topic.title)}</a></h2>
                <p>${escapeHtml(topic.description)}</p>
              </article>`).join('')}
          </div>
        </section>
        ${(catalog.series || []).length ? `
        <section class="seo-card">
          <h2>精修系列入口</h2>
          <div class="link-grid">
            ${(catalog.series || []).map((series) => `
              <article>
                <h3><a href="/series/${series.slug}/">${escapeHtml(series.title)}</a></h3>
                <p>${escapeHtml(series.summary || series.description)}</p>
              </article>`).join('')}
          </div>
        </section>` : ''}
      `,
      structuredData: [buildBreadcrumbStructuredData([{ name: '首页', href: '/' }, { name: '题型专题', href: '/topics/' }])],
    }),
  },
  {
    pathname: '/series/',
    title: '一年级精修系列总览 | YMO',
    description: '查看空间/补缺观察页与计数/分层统计页两条精修训练线，把高价值题目串成可导流的系列入口。',
    html: renderStandardPage({
      pathname: '/series/',
      title: '一年级精修系列总览',
      eyebrow: '精修系列',
      description: '把高价值题目按方法线整理成系列入口，适合先看方法，再进入同类练习。',
      breadcrumbs: [{ name: '首页', href: '/' }, { name: '精修系列', href: '/series/' }],
      body: `
        <section class="seo-card">
          <div class="link-grid">
            ${(catalog.series || []).map((series) => `
              <article>
                <h2><a href="/series/${series.slug}/">${escapeHtml(series.title)}</a></h2>
                <p>${escapeHtml(series.description)}</p>
              </article>`).join('')}
          </div>
        </section>
      `,
      structuredData: [buildBreadcrumbStructuredData([{ name: '首页', href: '/' }, { name: '精修系列', href: '/series/' }])],
    }),
  },
  {
    pathname: '/guides/',
    title: '一年级训练指南总览 | YMO',
    description: '查看一年级思维训练的安排建议、规律题练习方法和专题复盘思路。',
    html: renderStandardPage({
      pathname: '/guides/',
      title: '一年级训练指南总览',
      eyebrow: '训练指南',
      description: '面向家长和老师的练习安排与复盘建议。',
      breadcrumbs: [{ name: '首页', href: '/' }, { name: '训练指南', href: '/guides/' }],
      body: `
        <section class="seo-card">
          <div class="link-grid">
            ${catalog.guides.map((guide) => `
              <article>
                <h2><a href="/guides/${guide.slug}/">${escapeHtml(guide.title)}</a></h2>
                <p>${escapeHtml(guide.description)}</p>
              </article>`).join('')}
          </div>
        </section>
      `,
      structuredData: [buildBreadcrumbStructuredData([{ name: '首页', href: '/' }, { name: '训练指南', href: '/guides/' }])],
    }),
  },
];

for (const page of indexPages) {
  urls.add(page.pathname);
  pages.push(page);
}

for (const module of config.modules) {
  const moduleQuestions = config.questions.filter((question) => question.moduleKey === module.key);
  const subtypeSummary = [...module.subtypes].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
  const relatedTopics = catalog.topics.filter((topic) => topic.moduleKey === module.key);
  const pathname = `/modules/${module.key}/`;
  urls.add(pathname);
  pages.push({
    pathname,
    title: `一年级${module.name}练习题与训练方法 | YMO`,
    description: `${module.name}模块共 ${module.questionCount} 题，覆盖 ${subtypeSummary.slice(0, 3).map((item) => item.name).join('、')} 等题型，适合一年级思维训练与在线练习。`,
    html: renderStandardPage({
      pathname,
      title: `一年级${module.name}练习题与训练方法`,
      eyebrow: module.roomName,
      description: `${module.name}模块当前共收录 ${module.questionCount} 题，适合围绕 ${subtypeSummary.slice(0, 4).map((item) => item.name).join('、')} 做专题训练。`,
      breadcrumbs: [
        { name: '首页', href: '/' },
        { name: '模块专题', href: pathname },
      ],
      body: `
        <section class="seo-card">
          <div class="tag-row">
            <span>模块优先级 P${module.priority}</span>
            <span>${module.questionCount} 题</span>
            <span>${module.interactionTypes.join(' / ') || 'mixed_interaction'}</span>
          </div>
          <p class="hero-copy">${escapeHtml(moduleDescription(module.key, module.name))}</p>
          <div class="cta-row">
            <a class="primary-link" href="/">进入在线训练</a>
            <a class="link-button" href="#sample-questions">先看代表题</a>
          </div>
        </section>
        <section class="section-grid">
          <article class="seo-card">
            <h2>适合练什么</h2>
            <ul class="list-tight">
              ${subtypeSummary.slice(0, 6).map((item) => `<li>${escapeHtml(item.name)}：${item.count} 题</li>`).join('')}
            </ul>
          </article>
          <article class="seo-card">
            <h2>练习建议</h2>
            <ul class="list-tight">
              ${modulePracticeTips(module.key).map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
            </ul>
          </article>
        </section>
        ${relatedTopics.length ? `
        <section class="seo-card">
          <h2>相关专题页</h2>
          <div class="link-grid">
            ${relatedTopics.map((topic) => `
              <article>
                <h3><a href="/topics/${topic.slug}/">${escapeHtml(topic.title)}</a></h3>
                <p>${escapeHtml(topic.description)}</p>
              </article>`).join('')}
          </div>
        </section>` : ''}
        <section class="seo-card" id="sample-questions">
          <h2>代表题目</h2>
          <div class="sample-grid">
            ${moduleQuestions.slice(0, 8).map((question) => renderQuestionSummaryCard(question, topicIndexByQuestionId)).join('')}
          </div>
        </section>
      `,
      structuredData: [
        buildBreadcrumbStructuredData([
          { name: '首页', href: '/' },
          { name: module.name, href: pathname },
        ]),
      ],
    }),
  });
}

for (const paper of config.papers) {
  const paperQuestions = config.questions.filter((question) => question.paper === paper.code);
  const moduleCounts = summarizeByModule(paperQuestions, config.modules);
  const pathname = `/papers/${paper.code.toLowerCase()}/`;
  urls.add(pathname);
  pages.push({
    pathname,
    title: `${paper.name}题型整理与在线训练 | YMO`,
    description: `${paper.name}当前可在线查看题型分布、代表题与练习入口，覆盖 ${paperQuestions.length} 道一年级思维训练题。`,
    html: renderStandardPage({
      pathname,
      title: `${paper.name}题型整理与在线训练`,
      eyebrow: `${paper.org} · ${paper.grade} · ${paper.stage}`,
      description: `${paper.name}共整理出 ${paperQuestions.length} 道正式题，适合从试卷视角查看模块覆盖与代表题。`,
      breadcrumbs: [
        { name: '首页', href: '/' },
        { name: '试卷整理', href: pathname },
      ],
      body: `
        <section class="seo-card">
          <div class="tag-row">
            <span>${paper.org}</span>
            <span>${paper.grade}</span>
            <span>${paper.stage}</span>
            <span>${paperQuestions.length} 题</span>
          </div>
          <p class="hero-copy">这套试卷已经被重组进当前训练系统，可按模块、按专题或按试卷视角进入练习。</p>
          <div class="cta-row">
            <a class="primary-link" href="/">直接在线练这一套</a>
          </div>
        </section>
        <section class="section-grid">
          <article class="seo-card">
            <h2>模块覆盖</h2>
            <ul class="list-tight">
              ${moduleCounts.map((item) => `<li>${escapeHtml(item.name)}：${item.count} 题</li>`).join('')}
            </ul>
          </article>
          <article class="seo-card">
            <h2>适合怎么用</h2>
            <ul class="list-tight">
              <li>想做套卷训练时，可以先按试卷整体完成，再回到错题做专题复练。</li>
              <li>想看某套卷更偏哪类题时，可以先看模块覆盖，再进入对应专题页。</li>
              <li>如果是第一次接触，建议先做其中 5 到 8 道代表题，再决定是否整套练习。</li>
            </ul>
          </article>
        </section>
        <section class="seo-card">
          <h2>代表题目</h2>
          <div class="sample-grid">
            ${paperQuestions.slice(0, 8).map((question) => renderQuestionSummaryCard(question, topicIndexByQuestionId)).join('')}
          </div>
        </section>
      `,
      structuredData: [buildBreadcrumbStructuredData([
        { name: '首页', href: '/' },
        { name: paper.name, href: pathname },
      ])],
    }),
  });
}

for (const topic of catalog.topics) {
  const topicQuestions = topic.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
  const relatedSeries = (catalog.series || []).filter((series) => (series.topicSlugs || []).includes(topic.slug) || topic.questionIds.some((id) => series.questionIds.includes(id)));
  const pathname = `/topics/${topic.slug}/`;
  urls.add(pathname);
  const module = moduleMap.get(topic.moduleKey);
  pages.push({
    pathname,
    title: `${topic.title} | 示例题与方法讲解 | YMO`,
    description: topic.description,
    html: renderStandardPage({
      pathname,
      title: topic.title,
      eyebrow: module ? `${module.roomName} · ${module.name}` : '专题训练',
      description: topic.description,
      breadcrumbs: [
        { name: '首页', href: '/' },
        { name: '题型专题', href: '/topics/' },
        { name: topic.title, href: pathname },
      ],
      body: `
        <section class="seo-card">
          <div class="tag-row">${topic.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}</div>
          ${topic.intro.map((paragraph) => `<p class="hero-copy">${escapeHtml(paragraph)}</p>`).join('')}
          <div class="cta-row">
            <a class="primary-link" href="/">在线做同类题</a>
            ${module ? `<a class="link-button" href="/modules/${module.key}/">查看模块页</a>` : ''}
          </div>
        </section>
        <section class="section-grid">
          <article class="seo-card">
            <h2>专题训练重点</h2>
            <ul class="list-tight">
              ${topic.skills.map((skill) => `<li>围绕“${escapeHtml(skill)}”做 1 到 2 个短时训练小节。</li>`).join('')}
            </ul>
          </article>
          <article class="seo-card">
            <h2>建议做法</h2>
            <ul class="list-tight">
              ${topicTrainingTips(topic.slug).map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
            </ul>
          </article>
        </section>
        ${relatedSeries.length ? `
        <section class="seo-card">
          <h2>精修系列入口</h2>
          <div class="link-grid">
            ${relatedSeries.map((series) => `
              <article>
                <h3><a href="/series/${series.slug}/">${escapeHtml(series.title)}</a></h3>
                <p>${escapeHtml(series.summary || series.description)}</p>
              </article>`).join('')}
          </div>
        </section>` : ''}
        <section class="seo-card">
          <h2>示例题</h2>
          <div class="sample-grid">
            ${topicQuestions.map((question) => renderQuestionSummaryCard(question, topicIndexByQuestionId)).join('')}
          </div>
        </section>
      `,
      structuredData: [buildBreadcrumbStructuredData([
        { name: '首页', href: '/' },
        { name: '题型专题', href: '/topics/' },
        { name: topic.title, href: pathname },
      ])],
    }),
  });
}

for (const series of catalog.series || []) {
  const seriesQuestions = series.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
  const relatedTopics = catalog.topics.filter((topic) => (series.topicSlugs || []).includes(topic.slug) || topic.questionIds.some((id) => series.questionIds.includes(id)));
  const pathname = `/series/${series.slug}/`;
  urls.add(pathname);
  pages.push({
    pathname,
    title: `${series.title} | 系列精修题与练习入口 | YMO`,
    description: series.description,
    html: renderStandardPage({
      pathname,
      title: series.title,
      eyebrow: '精修系列',
      description: series.summary || series.description,
      breadcrumbs: [
        { name: '首页', href: '/' },
        { name: '精修系列', href: '/series/' },
        { name: series.title, href: pathname },
      ],
      body: `
        <section class="seo-card">
          <div class="tag-row">
            ${(series.moduleKeys || []).map((key) => moduleMap.get(key)?.name).filter(Boolean).map((name) => `<span>${escapeHtml(name)}</span>`).join('')}
            <span>${seriesQuestions.length} 页精修题</span>
          </div>
          ${(series.intro || []).map((paragraph) => `<p class="hero-copy">${escapeHtml(paragraph)}</p>`).join('')}
          <div class="cta-row">
            <a class="primary-link" href="/topics/">先看同类专题</a>
            <a class="link-button" href="/">回到在线训练</a>
          </div>
        </section>
        <section class="section-grid">
          <article class="seo-card">
            <h2>这个系列适合怎么练</h2>
            <ul class="list-tight">
              ${(series.focus || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </article>
          <article class="seo-card">
            <h2>建议使用顺序</h2>
            <ol class="list-tight">
              <li>先按页面顺序看一遍方法导语和示意图。</li>
              <li>再做同类题时，优先复用页面里的观察顺序或统计顺序。</li>
              <li>做完后回到这页，挑一题再复盘一次关键卡点。</li>
            </ol>
          </article>
        </section>
        ${renderSeriesPracticeOrderSection(series, seriesQuestions)}
        ${renderSeriesNextStepsSection(series, seriesQuestions)}
        ${renderSeriesCompletionPreviewSection(series)}
        <section class="seo-card">
          <h2>已接入的精修题</h2>
          <div class="sample-grid">
            ${seriesQuestions.map((question) => renderSeriesQuestionCard(question, series)).join('')}
          </div>
        </section>
        ${relatedTopics.length ? `
        <section class="seo-card">
          <h2>相关专题页</h2>
          <div class="link-grid">
            ${relatedTopics.map((topic) => `
              <article>
                <h3><a href="/topics/${topic.slug}/">${escapeHtml(topic.title)}</a></h3>
                <p>${escapeHtml(topic.description)}</p>
              </article>`).join('')}
          </div>
        </section>` : ''}
      `,
      structuredData: [buildBreadcrumbStructuredData([
        { name: '首页', href: '/' },
        { name: '精修系列', href: '/series/' },
        { name: series.title, href: pathname },
      ])],
    }),
  });

  const completionPathname = `/series/${series.slug}/completed/`;
  urls.add(completionPathname);
  pages.push({
    pathname: completionPathname,
    title: `${series.completion?.title || `${series.title}完成页`} | 下一步练什么 | YMO`,
    description: series.completion?.description || `做完${series.title}后，继续去同类专题随机练习，把方法带回真实做题流。`,
    html: renderStandardPage({
      pathname: completionPathname,
      title: series.completion?.title || `${series.title}完成页`,
      eyebrow: '系列完成页',
      description: series.completion?.summary || series.completion?.description || `做完${series.title}后，继续去同类专题随机练习，把方法真正用出去。`,
      breadcrumbs: [
        { name: '首页', href: '/' },
        { name: '精修系列', href: '/series/' },
        { name: series.title, href: pathname },
        { name: '系列完成页', href: completionPathname },
      ],
      body: renderSeriesCompletionPage(series, seriesQuestions, relatedTopics),
      structuredData: [buildBreadcrumbStructuredData([
        { name: '首页', href: '/' },
        { name: '精修系列', href: '/series/' },
        { name: series.title, href: pathname },
        { name: '系列完成页', href: completionPathname },
      ])],
    }),
  });
}

for (const guide of catalog.guides) {
  const pathname = `/guides/${guide.slug}/`;
  urls.add(pathname);
  pages.push({
    pathname,
    title: `${guide.title} | YMO`,
    description: guide.description,
    html: renderStandardPage({
      pathname,
      title: guide.title,
      eyebrow: '训练指南',
      description: guide.summary,
      breadcrumbs: [
        { name: '首页', href: '/' },
        { name: '训练指南', href: '/guides/' },
        { name: guide.title, href: pathname },
      ],
      body: guide.sections.map((section) => `
        <section class="seo-card">
          <h2>${escapeHtml(section.title)}</h2>
          ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        </section>
      `).join(''),
      structuredData: [buildBreadcrumbStructuredData([
        { name: '首页', href: '/' },
        { name: '训练指南', href: '/guides/' },
        { name: guide.title, href: pathname },
      ])],
    }),
  });
}


for (const question of config.questions) {
  const pathname = `/questions/${question.id.toLowerCase()}/`;
  urls.add(pathname);
  const topic = catalog.topics.find((item) => item.questionIds.includes(question.id));
  const imagePath = await resolveQuestionImage(question);
  const override = questionOverrides[question.id];
  const summary = override?.description || featuredSummaryByQuestionId.get(question.id) || `${question.subtype}题，适合训练${question.skills.join('、')}等能力。`;
  const relatedSeries = seriesIndexByQuestionId.get(question.id) || [];
  const breadcrumbs = [
    { name: '首页', href: '/' },
    topic ? { name: topic.title, href: `/topics/${topic.slug}/` } : { name: question.moduleName, href: `/modules/${question.moduleKey}/` },
    { name: question.id, href: pathname },
  ];
  const structuredData = [buildBreadcrumbStructuredData(breadcrumbs)];
  if (override?.faq?.length) {
    structuredData.push(buildFaqStructuredData(override.faq));
  }

  pages.push({
    pathname,
    title: `${question.title} - 示例讲解与练习入口 | YMO`,
    description: summary,
    html: renderStandardPage({
      pathname,
      title: question.title,
      eyebrow: `${question.paper} · ${question.moduleName} · ${question.subtype}`,
      description: summary,
      breadcrumbs,
      body: override
        ? renderDetailedQuestionBody({ question, topic, imagePath, summary, override, relatedSeries })
        : renderGenericQuestionBody({ question, topic, imagePath, summary, relatedSeries }),
      structuredData,
    }),
  });
}

for (const page of pages) {
  await writePage(page.pathname, page.html);
}

await fs.writeFile(path.join(publicDir, 'robots.txt'), buildRobotsTxt(urls), 'utf8');
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap([...urls].sort()), 'utf8');
await fs.writeFile(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(buildManifest(), null, 2), 'utf8');

console.log(`SEO assets built: ${pages.length} pages, environment=${seoEnv}, indexing=${allowIndexing ? 'enabled' : 'disabled'}`);

function normalizeOrigin(origin) {
  return origin.replace(/\/+$/, '');
}

function inferDefaultOrigin() {
  const projectName = process.env.CLOUDFLARE_PAGES_PROJECT_NAME;
  return projectName ? `https://${projectName}.pages.dev` : 'https://example.com';
}

async function readQuestionBankConfig() {
  const candidates = (await fs.readdir(repoRoot)).filter((name) => name.endsWith('.json'));
  for (const candidate of candidates) {
    const filePath = path.join(repoRoot, candidate);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed?.meta?.questionCount && Array.isArray(parsed?.questions) && Array.isArray(parsed?.modules)) {
      return parsed;
    }
  }
  throw new Error('Failed to locate question bank config JSON in repo root.');
}

function buildTopicIndex(topics) {
  const index = new Map();
  for (const topic of topics) {
    for (const questionId of topic.questionIds) {
      if (!index.has(questionId)) index.set(questionId, []);
      index.get(questionId).push(topic);
    }
  }
  return index;
}

async function cleanGeneratedDirs() {
  for (const folder of ['modules', 'papers', 'topics', 'questions', 'guides', 'series']) {
    await fs.rm(path.join(publicDir, folder), { recursive: true, force: true });
  }
  for (const fileName of ['robots.txt', 'sitemap.xml', 'manifest.webmanifest']) {
    await fs.rm(path.join(publicDir, fileName), { force: true });
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writePage(pathname, html) {
  const targetDir = path.join(publicDir, pathname.replace(/^\//, ''));
  await ensureDir(targetDir);
  await fs.writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
}

function renderStandardPage({ pathname, title, eyebrow, description, breadcrumbs, body, structuredData = [] }) {
  const canonical = `${siteOrigin}${pathname}`;
  const robots = allowIndexing ? 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' : 'noindex,nofollow';
  const schemaBlocks = [
    buildWebsiteStructuredData(),
    ...structuredData,
  ].map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n');
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="YMO 一年级思维训练" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="/seo.css" />
    ${schemaBlocks}
  </head>
  <body>
    <div class="seo-shell">
      <header class="site-header">
        <div class="eyebrow">${escapeHtml(eyebrow)}</div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
        <nav class="top-nav" aria-label="站点导航">
          <a href="/">在线训练首页</a>
          <a href="/guides/grade1-thinking-training/">训练指南</a>
          <a href="/topics/find-patterns/">题型专题</a>
          <a href="/series/">精修系列</a>
        </nav>
      </header>
      <main class="seo-main">
        <nav class="breadcrumb" aria-label="面包屑">
          ${breadcrumbs.map((item) => `<a href="${item.href}">${escapeHtml(item.name)}</a>`).join('<span>›</span>')}
        </nav>
        ${body}
      </main>
      <footer class="site-footer">正式题包已接通 80 题，当前页面用于专题说明、试卷整理与搜索入口承接。</footer>
    </div>
  </body>
</html>`;
}

function renderQuestionSummaryCard(question, topicIndex) {
  const topics = topicIndex.get(question.id) || [];
  return `<article>
    <h3><a href="/questions/${question.id.toLowerCase()}/">${escapeHtml(question.title)}</a></h3>
    <p>${escapeHtml(question.moduleName)} · ${escapeHtml(question.subtype)}</p>
    <div class="tag-row">${question.skills.slice(0, 3).map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}</div>
    <p>${topics[0] ? `同类专题：<a class="inline-link" href="/topics/${topics[0].slug}/">${escapeHtml(topics[0].title)}</a>` : ''}</p>
  </article>`;
}

function renderSeriesQuestionCard(question, series) {
  const override = questionOverrides[question.id];
  const summary = override?.description || featuredSummaryByQuestionId.get(question.id) || `${question.subtype}题，适合训练${question.skills.join('、')}等能力。`;
  const answerStatus = override?.answer?.status === 'verified' ? '答案已校验' : '方法已固定';
  return `<article>
    <h3><a href="/questions/${question.id.toLowerCase()}/">${escapeHtml(question.title)}</a></h3>
    <p>${escapeHtml(summary)}</p>
    <div class="tag-row"><span>${escapeHtml(question.paper)}</span><span>${escapeHtml(question.subtype)}</span><span>${escapeHtml(answerStatus)}</span></div>
    <p><a class="inline-link" href="/series/${series.slug}/">当前系列：${escapeHtml(series.title)}</a></p>
  </article>`;
}

function renderSeriesPracticeOrderSection(series, seriesQuestions) {
  const route = buildSeriesRoute(series, seriesQuestions);
  if (!route.length) return '';
  return `
    <section class="seo-card">
      <h2>推荐练习顺序</h2>
      <div class="series-route-grid">
        ${route.map((item) => `
          <article class="series-route-card">
            <div class="tag-row"><span>第 ${item.step} 步</span><span>${escapeHtml(item.stageLabel)}</span></div>
            <h3><a href="/questions/${item.question.id.toLowerCase()}/">${escapeHtml(item.question.title)}</a></h3>
            <p>${escapeHtml(item.whyFirst)}</p>
            <p class="series-route-next"><strong>练完后下一页：</strong>${item.nextQuestion ? `<a class="inline-link" href="/questions/${item.nextQuestion.id.toLowerCase()}/">${escapeHtml(item.nextQuestion.title)}</a>` : `<a class="inline-link" href="${item.nextHref}">${escapeHtml(item.nextLabel)}</a>`}</p>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderSeriesNextStepsSection(series, seriesQuestions) {
  const route = buildSeriesRoute(series, seriesQuestions);
  if (!route.length) return '';
  return `
    <section class="seo-card">
      <h2>练完后下一页去哪</h2>
      <div class="series-next-grid">
        ${route.map((item) => `
          <article class="series-next-card">
            <h3>做完 ${escapeHtml(item.question.id)} 后</h3>
            <p>${escapeHtml(item.afterFinish)}</p>
            <p><a class="inline-link" href="${item.nextHref}">${escapeHtml(item.nextLabel)}</a></p>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderSeriesCompletionPreviewSection(series) {
  const completion = series.completion;
  if (!completion) return '';
  return `
    <section class="seo-card">
      <h2>整条线做完后怎么继续练</h2>
      <p>${escapeHtml(completion.summary || completion.description)}</p>
      <div class="cta-row">
        <a class="primary-link" href="/series/${series.slug}/completed/">进入系列完成页</a>
        <a class="link-button" href="/topics/">先看同类专题</a>
      </div>
    </section>`;
}

function renderSeriesCompletionPage(series, seriesQuestions, relatedTopics) {
  const completion = series.completion || {};
  const practiceItems = completion.randomPractice || [];
  const recommendedQuestions = renderSeriesCompletionQuestionCards(completion.recommendedQuestions || [], series, completion);
  return `
    <section class="seo-card">
      <div class="tag-row">
        <span>已完成 ${seriesQuestions.length} 页精修题</span>
        <span>下一步：同类随机练习</span>
      </div>
      <p class="hero-copy">${escapeHtml(completion.description || `做完${series.title}后，先去同类专题随机练 1 到 2 题，再回到在线训练继续做。`)}</p>
      <div class="cta-row">
        <a class="primary-link" href="${practiceItems[0]?.href || '/topics/'}">${escapeHtml(practiceItems[0]?.ctaLabel || '去同类专题随机挑题')}</a>
        <a class="link-button" href="/series/${series.slug}/">回到系列入口复盘</a>
      </div>
    </section>
    ${completion.checklist?.length ? `
    <section class="seo-card">
      <h2>做随机题前，先检查这 3 件事</h2>
      <ul class="list-tight">
        ${completion.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>` : ''}
    ${recommendedQuestions}
    ${practiceItems.length ? `
    <section class="seo-card">
      <h2>做完这一条线后，去做哪类随机题</h2>
      <div class="series-completion-grid">
        ${practiceItems.map((item) => `
          <article class="series-completion-card">
            <div class="tag-row">${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <p><a class="inline-link" href="${item.href}">${escapeHtml(item.ctaLabel || '继续练习')}</a></p>
          </article>`).join('')}
      </div>
    </section>` : ''}
    <section class="seo-card">
      <h2>这一条线你已经练过什么</h2>
      <div class="sample-grid">
        ${seriesQuestions.map((question) => renderSeriesQuestionCard(question, series)).join('')}
      </div>
    </section>
    ${relatedTopics.length ? `
    <section class="seo-card">
      <h2>继续做时优先看这几个专题页</h2>
      <div class="link-grid">
        ${relatedTopics.map((topic) => `
          <article>
            <h3><a href="/topics/${topic.slug}/">${escapeHtml(topic.title)}</a></h3>
            <p>${escapeHtml(topic.description)}</p>
          </article>`).join('')}
      </div>
    </section>` : ''}
  `;
}

function renderSeriesCompletionQuestionCards(items = [], series = {}, completion = {}) {
  const validItems = items.filter((item) => questionMap.has(item.questionId));
  const practicedTarget = completion.randomPractice?.[0] || null;
  const total = validItems.length;
  const stageItems = [
    {
      label: '完成 1 张',
      description: '先不要急着换专题，先顺着同题组把方法跑通一轮。',
    },
    {
      label: '完成 2 张',
      description: '第二张做完后，方法会更稳定，继续把最后一张也收掉。',
    },
    {
      label: '全部完成',
      description: '这一组练完后，就去同类随机题里做迁移，别停在讲解页。',
    },
  ].slice(0, Math.max(total, 1));
  const cards = validItems.map((item, index) => {
    const question = questionMap.get(item.questionId);
    if (!question) return '';
    const override = questionOverrides[question.id];
    const topic = (topicIndexByQuestionId.get(question.id) || [])[0] || null;
    const answerStatus = override?.answer?.status === 'verified' ? '答案已校验' : '方法已固定';
    const swapItem = validItems[(index + 1) % validItems.length];
    const swapQuestion = swapItem ? questionMap.get(swapItem.questionId) : null;
    const swapHref = swapQuestion ? `/questions/${swapQuestion.id.toLowerCase()}/` : `/series/${series.slug || ''}/`;
    const swapLabel = swapQuestion ? `换一题：${swapQuestion.title}` : '换一题';
    const practicedHref = practicedTarget?.href ? practicedTarget.href : (topic ? `/topics/${topic.slug}/` : `/series/${series.slug || ''}/completed/`);
    const practicedLabel = practicedTarget?.ctaLabel || (topic ? `已练过：去${topic.title}随机练` : '已练过：回完成页');
    const currentLabel = `第 ${index + 1} 张`;
    const nextQueueLabel = total > 1 ? `下一张：第 ${((index + 1) % total) + 1} 张` : '下一张：已到本组末尾';
    const stageLabel = index + 1 < total ? `做完这张后：完成 ${index + 1} 张` : '做完这张后：全部完成';
    const stageCopy = index + 1 < total
      ? `当前先把 ${currentLabel} 做完；一旦完成，你就进入“完成 ${index + 1} 张”的阶段，可以继续顺着队列去下一张。`
      : '当前这张就是这一组的最后一张。做完后会进入“全部完成”，这时最合适的是去同类随机题做迁移练习。';
    return `
    <article class="series-completion-card">
      <div class="series-queue-row">
        <span class="series-queue-badge">同题组序号 · ${currentLabel}</span>
        <span class="series-queue-total">共 ${total} 张</span>
      </div>
      <div class="tag-row">${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      <h3><a href="/questions/${question.id.toLowerCase()}/">${escapeHtml(question.title)}</a></h3>
      <p>${escapeHtml(item.reason || `${question.subtype}题，适合继续巩固${question.skills.join('、')}。`)}</p>
      <div class="tag-row"><span>${escapeHtml(question.paper)}</span><span>${escapeHtml(question.subtype)}</span><span>${escapeHtml(answerStatus)}</span></div>
      <p>${topic ? `同类专题：<a class="inline-link" href="/topics/${topic.slug}/">${escapeHtml(topic.title)}</a>` : ''}</p>
      <div class="practice-stage-chip">${escapeHtml(stageLabel)}</div>
      <div class="practice-state-card">
        <div class="practice-state-head">
          <p class="practice-state-title">练习状态卡</p>
          <p class="practice-state-queue">${escapeHtml(currentLabel)} / 共 ${total} 张 · ${escapeHtml(nextQueueLabel)}</p>
        </div>
        <div class="practice-state-grid">
          <a class="practice-state-pill is-next" href="/questions/${question.id.toLowerCase()}/">下一题</a>
          <a class="practice-state-pill" href="${swapHref}">换一题</a>
          <a class="practice-state-pill" href="${practicedHref}">已练过</a>
        </div>
        <p class="practice-state-copy">这 3 张卡现在按同题组排成一个微型连练队列。先从当前这张进题；如果想跳到同方法的下一张，就点“换一题”；如果这张已经做过了，就点“已练过”直接回到同类随机练习。</p>
        <p class="practice-stage-copy">${escapeHtml(stageCopy)}</p>
      </div>
      <p><a class="inline-link" href="/questions/${question.id.toLowerCase()}/">${escapeHtml(item.ctaLabel || '直接进入这题')}</a></p>
      <p class="practice-state-footnote">队列去向：<strong>${escapeHtml(currentLabel)}</strong> · <a class="inline-link" href="${swapHref}">${escapeHtml(swapLabel)}</a> · <a class="inline-link" href="${practicedHref}">${escapeHtml(practicedLabel)}</a></p>
    </article>`;
  }).filter(Boolean).join('');

  if (!cards) return '';

  return `
    <section class="seo-card">
      <h2>完成后推荐 3 题随机抽练卡</h2>
      <p>如果你不想只停留在专题说明里，可以直接从下面 3 题开始。现在每张卡都补了“下一题 / 换一题 / 已练过”三种状态，并加上“第 1 张 / 第 2 张 / 第 3 张”的同题组序号，让完成页更像一个可连续练的小队列。</p>
      <div class="practice-stage-strip">
        ${stageItems.map((stage, index) => `
          <article class="practice-stage-card">
            <p class="practice-stage-kicker">阶段 ${index + 1}</p>
            <h3>${escapeHtml(stage.label)}</h3>
            <p>${escapeHtml(stage.description)}</p>
          </article>`).join('')}
      </div>
      <div class="series-completion-grid">
        ${cards}
      </div>
    </section>`;
}

function renderSeriesProgressSection(question, relatedSeries = []) {
  if (!relatedSeries.length) return '';
  return relatedSeries.map((series) => {
    const seriesQuestions = (series.questionIds || []).map((id) => questionMap.get(id)).filter(Boolean);
    const route = buildSeriesRoute(series, seriesQuestions);
    const current = route.find((item) => item.question.id === question.id);
    if (!current) return '';
    return `
      <section class="seo-card">
        <h2>当前系列进度</h2>
        <div class="tag-row"><span>${escapeHtml(series.title)}</span><span>第 ${current.step} / ${route.length} 步</span></div>
        <p>${escapeHtml(current.whyFirst)}</p>
        <div class="cta-row">
          <a class="link-button" href="/series/${series.slug}/">返回系列入口</a>
          <a class="primary-link" href="${current.nextHref}">${escapeHtml(current.nextLabel)}</a>
        </div>
      </section>`;
  }).join('');
}

function buildSeriesRoute(series, seriesQuestions) {
  return seriesQuestions.map((question, index) => {
    const nextQuestion = seriesQuestions[index + 1] || null;
    const guidance = getSeriesRouteGuidance(series.slug, question.id, index, seriesQuestions.length);
    const nextLabel = nextQuestion ? `下一页：${nextQuestion.title}` : guidance.finalCtaLabel;
    const nextHref = nextQuestion ? `/questions/${nextQuestion.id.toLowerCase()}/` : guidance.finalCtaHref;
    return {
      step: index + 1,
      question,
      nextQuestion,
      nextLabel,
      nextHref,
      stageLabel: guidance.stageLabel,
      whyFirst: guidance.whyFirst,
      afterFinish: guidance.afterFinish,
    };
  });
}

function getSeriesRouteGuidance(seriesSlug, questionId, index, total) {
  const defaults = {
    stageLabel: `方法第 ${index + 1} 站`,
    whyFirst: '先把这一页的方法看懂，再进入下一页，会更容易形成稳定的做题顺序。',
    afterFinish: index + 1 < total ? '这一页做完后，直接顺着系列往下一页走，把刚建立的方法继续用在下一题里。' : '这页做完后，回到系列入口再选一题复盘，或直接去同类专题继续练。',
    finalCtaLabel: '去系列完成页选下一轮随机题',
    finalCtaHref: `/series/${seriesSlug}/completed/`,
  };

  const guidanceMap = {
    'spatial-gap-observation': {
      '34Y-14': {
        stageLabel: '先看外轮廓',
        whyFirst: '先从平面补缺题开局，先把“外圈边框—空白分带—转角复核”的观察顺序固定下来，后面再进立体题会更稳。',
        afterFinish: '做完这页后，下一页去 34Y-15，把“先看整体轮廓”的方法迁移到遮挡计数里。',
      },
      '34Y-15': {
        stageLabel: '再看隐藏层',
        whyFirst: '这一页把平面观察升级成空间遮挡：先找外轮廓，再看支撑列和隐藏区，刚好承接上一页的方法。',
        afterFinish: '做完这页后，下一页去 35Y-13，把“看隐藏关系”继续升级成“看折叠后会不会撞面”。',
      },
      '35Y-13': {
        stageLabel: '最后看折叠关系',
        whyFirst: '这一页是这一条线里最抽象的一题，放在最后做更合适：前两页已经把整体观察和隐藏关系练过一轮，再看展开图更容易。',
        afterFinish: '这页做完后，建议回到空间想象专题，再随机做 1 到 2 题，把“先整体、后局部”的顺序真正用出去。',
        finalCtaLabel: '去系列完成页选空间随机题',
        finalCtaHref: '/series/spatial-gap-observation/completed/',
      },
    },
    'count-layered-statistics': {
      '34Y-12': {
        stageLabel: '先固定分组',
        whyFirst: '先从点阵计数开局，最适合把“先定最小单位，再按位置分组”的方法固定下来。',
        afterFinish: '做完这页后，下一页去 35Y-17，把同样的分组思路迁移到数线段题里。',
      },
      '35Y-17': {
        stageLabel: '再拆方向与长度',
        whyFirst: '这一页把点阵分组升级成线段统计：不仅要分方向，还要按长度复核，正好承接上一页的计数思路。',
        afterFinish: '做完这页后，下一页去 36Y-10，把“按长度分层”再升级成“按大小分层”。',
      },
      '36Y-10': {
        stageLabel: '最后按大小分层',
        whyFirst: '数正方形是这一条线里最适合收尾的一题：前两页已经练过最小单位和方向拆分，这一页只要把大小层级补齐。',
        afterFinish: '这页做完后，建议回到数图形专题，再做 1 到 2 道同类题，把“先分类、再汇总”的流程用熟。',
        finalCtaLabel: '去系列完成页选计数随机题',
        finalCtaHref: '/series/count-layered-statistics/completed/',
      },
    },
  };

  return { ...defaults, ...(guidanceMap[seriesSlug]?.[questionId] || {}) };
}

function renderSeriesEntrySection(relatedSeries = []) {
  if (!relatedSeries.length) {
    return '';
  }
  return `
    <section class="seo-card">
      <h2>所属精修系列</h2>
      <div class="link-grid">
        ${relatedSeries.map((series) => `
          <article>
            <h3><a href="/series/${series.slug}/">${escapeHtml(series.title)}</a></h3>
            <p>${escapeHtml(series.summary || series.description)}</p>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderGenericQuestionBody({ question, topic, imagePath, summary, relatedSeries = [] }) {
  return `
    <section class="question-card">
      <div class="tag-row">
        <span>${escapeHtml(question.paper)}</span>
        <span>${escapeHtml(question.subtype)}</span>
        <span>${escapeHtml(question.interactionLabel)}</span>
        <span>${escapeHtml(question.difficultyLabel)}</span>
      </div>
      <p class="hero-copy">${escapeHtml(summary)}</p>
      ${imagePath ? `<p><img class="figure-preview" src="${imagePath}" alt="${escapeHtml(question.title)} 题图" loading="lazy" /></p>` : ''}
      <div class="cta-row">
        <a class="primary-link" href="/">在线做同类题</a>
        ${topic ? `<a class="link-button" href="/topics/${topic.slug}/">返回同类专题</a>` : `<a class="link-button" href="/modules/${question.moduleKey}/">查看模块页</a>`}
      </div>
    </section>
    ${renderSeriesEntrySection(relatedSeries)}
    ${renderSeriesProgressSection(question, relatedSeries)}
    <section class="section-grid">
      <article class="seo-card">
        <h2>这题在练什么</h2>
        <ul class="list-tight">
          ${question.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join('')}
        </ul>
      </article>
      <article class="seo-card">
        <h2>建议解题顺序</h2>
        <ol class="list-tight">
          ${buildQuestionSteps(question).map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </article>
    </section>
    <section class="seo-card">
      <h2>常见错误</h2>
      <ul class="list-tight">
        ${buildCommonMistakes(question).map((mistake) => `<li>${escapeHtml(mistake)}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderDetailedQuestionBody({ question, topic, imagePath, summary, override, relatedSeries = [] }) {
  const answerHeading = override.answer?.status === 'verified' ? '答案与核对' : '答案状态';
  const answerBadge = override.answer?.status === 'verified' ? '答案已校验' : '答案待终审';
  const visualWalkthrough = buildVisualWalkthrough(override);
  return `
    <section class="question-card">
      <div class="tag-row">
        <span>${escapeHtml(question.paper)}</span>
        <span>${escapeHtml(question.subtype)}</span>
        <span>${escapeHtml(question.interactionLabel)}</span>
        <span>${escapeHtml(question.difficultyLabel)}</span>
        <span>${escapeHtml(override.searchIntentTitle || '精修题解')}</span>
      </div>
      <p class="hero-copy">${escapeHtml(summary)}</p>
      ${imagePath ? `<p><img class="figure-preview" src="${imagePath}" alt="${escapeHtml(question.title)} 题图" loading="lazy" /></p>` : ''}
      <div class="cta-row">
        <a class="primary-link" href="/">在线做同类题</a>
        ${topic ? `<a class="link-button" href="/topics/${topic.slug}/">返回同类专题</a>` : `<a class="link-button" href="/modules/${question.moduleKey}/">查看模块页</a>`}
      </div>
    </section>
    ${renderSeriesEntrySection(relatedSeries)}
    ${renderSeriesProgressSection(question, relatedSeries)}
    <section class="seo-card">
      <h2>这题为什么值得单独练</h2>
      <p>${escapeHtml(override.whyItMatters)}</p>
    </section>
    <section class="section-grid">
      <article class="seo-card">
        <h2>这题在练什么</h2>
        <ul class="list-tight">
          ${question.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join('')}
        </ul>
      </article>
      <article class="seo-card">
        <h2>${escapeHtml(answerHeading)}</h2>
        <div class="tag-row"><span>${escapeHtml(answerBadge)}</span></div>
        <p><strong>${escapeHtml(override.answer?.text || '待补充')}</strong></p>
        <p>${escapeHtml(override.answer?.explanation || '')}</p>
      </article>
    </section>
    <section class="seo-card">
      <h2>推荐思路</h2>
      <div class="topic-grid">
        ${override.methodSteps.map((step) => `
          <article>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.body)}</p>
          </article>
        `).join('')}
      </div>
    </section>
    ${visualWalkthrough ? renderVisualWalkthroughSection(question, visualWalkthrough) : ''}
    <section class="seo-card">
      <h2>常见卡点</h2>
      <ul class="list-tight">
        ${override.commonMistakes.map((mistake) => `<li>${escapeHtml(mistake)}</li>`).join('')}
      </ul>
    </section>
    ${override.faq?.length ? `
    <section class="seo-card">
      <h2>相关问题</h2>
      ${override.faq.map((item) => `
        <div class="faq-item">
          <h3>${escapeHtml(item.question)}</h3>
          <p>${escapeHtml(item.answer)}</p>
        </div>
      `).join('')}
    </section>` : ''}
  `;
}

function buildVisualWalkthrough(override) {
  if (override.visualWalkthrough?.items?.length) {
    return {
      title: override.visualWalkthrough.title || '逐步拆解',
      intro: override.visualWalkthrough.intro || '',
      items: override.visualWalkthrough.items.map((item) => ({
        label: item.label || '',
        statusLabel: item.statusLabel || item.verdict || '',
        title: item.title || '',
        body: item.body || item.reason || '',
        tip: item.tip || '',
        image: item.image || '',
        imageCaption: item.imageCaption || '题图切片',
        diagram: item.diagram || '',
        diagramCaption: item.diagramCaption || '示意图',
      })),
    };
  }
  if (override.figureBreakdown?.length) {
    return {
      title: '5个图逐个判断',
      intro: '',
      items: override.figureBreakdown.map((item) => ({
        label: item.label || '',
        statusLabel: item.verdict || '',
        title: item.title || `${item.label || ''}${item.verdict ? `：${item.verdict}` : ''}`,
        body: item.reason || '',
        tip: item.tip || '',
        image: item.image || '',
        imageCaption: item.imageCaption || '原题切图',
        diagram: item.diagram || '',
        diagramCaption: item.diagramCaption || '折叠方向示意图',
      })),
    };
  }
  return null;
}

function renderVisualWalkthroughSection(question, walkthrough) {
  return `
    <section class="seo-card">
      <h2>${escapeHtml(walkthrough.title)}</h2>
      ${walkthrough.intro ? `<p class="figure-breakdown-intro">${escapeHtml(walkthrough.intro)}</p>` : ''}
      <div class="figure-breakdown-grid">
        ${walkthrough.items.map((item) => renderVisualWalkthroughCard(question, item)).join('')}
      </div>
    </section>`;
}

function renderVisualWalkthroughCard(question, item) {
  const cardTitle = item.title || [item.label, item.statusLabel].filter(Boolean).join('：') || '拆解卡片';
  const imageAltSuffix = item.imageCaption || '题图切片';
  const diagramAltSuffix = item.diagramCaption || '示意图';
  return `
        <article class="figure-breakdown-card">
          <div class="figure-breakdown-media${item.diagram ? ' has-diagram' : ''}">
            ${item.image ? `
            <figure class="figure-breakdown-figure">
              <img class="figure-breakdown-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(question.title)} ${escapeHtml(item.label || cardTitle)} ${escapeHtml(imageAltSuffix)}" loading="lazy" />
              <figcaption>${escapeHtml(item.imageCaption || '题图切片')}</figcaption>
            </figure>` : ''}
            ${item.diagram ? `
            <figure class="figure-breakdown-figure figure-breakdown-diagram-block">
              <img class="figure-breakdown-image figure-breakdown-diagram" src="${escapeHtml(item.diagram)}" alt="${escapeHtml(question.title)} ${escapeHtml(item.label || cardTitle)} ${escapeHtml(diagramAltSuffix)}" loading="lazy" />
              <figcaption>${escapeHtml(item.diagramCaption || '示意图')}</figcaption>
            </figure>` : ''}
          </div>
          ${(item.label || item.statusLabel) ? `<div class="tag-row">${item.label ? `<span>${escapeHtml(item.label)}</span>` : ''}${item.statusLabel ? `<span>${escapeHtml(item.statusLabel)}</span>` : ''}</div>` : ''}
          <h3>${escapeHtml(cardTitle)}</h3>
          <p>${escapeHtml(item.body || '')}</p>
          ${item.tip ? `<p class="figure-breakdown-tip"><strong>复盘提示：</strong>${escapeHtml(item.tip)}</p>` : ''}
        </article>`;
}

function summarizeByModule(questions, modules) {
  const moduleNameByKey = new Map(modules.map((module) => [module.key, module.name]));
  const counts = new Map();
  for (const question of questions) {
    counts.set(question.moduleKey, (counts.get(question.moduleKey) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count, name: moduleNameByKey.get(key) || key }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}

function moduleDescription(moduleKey, moduleName) {
  const descriptions = {
    mental_math: '以数感、逆推与凑整为核心，适合一年级孩子建立稳定的运算策略。',
    patterns: '从找规律到系统规则，重点训练先观察、再表达、再检验的做题顺序。',
    counting_and_construct: '聚焦枚举、组合与最值构造，帮助孩子把“有多少种”这类问题做得更有条理。',
    equivalence_and_balance: '把文字关系转成数量关系，是和差、代换和平衡类题目的关键能力。',
    plane_geometry_counting: '强调图形拆分、分层计数和补图判断，适合作为图形专题的核心模块。',
    spatial_reasoning: '围绕方位、遮挡、展开图和立体观察，逐步建立空间想象能力。',
    logic_puzzles: '通过填数、等和和约束推理题，训练试填、排除和条件联动能力。',
  };
  return descriptions[moduleKey] || `${moduleName}模块已整理成适合一年级思维训练的在线练习内容。`;
}

function modulePracticeTips(moduleKey) {
  const tips = {
    mental_math: ['先看数字结构，再决定是否凑整、拆分或逆推。', '遇到单位换算题时，先统一单位再比较。', '做完后把关键一步说出来，能帮助稳定方法感。'],
    patterns: ['先判断是数量、位置、方向还是颜色在变。', '看不出时，把奇数位和偶数位分开观察。', '选完答案后再倒推检验一次。'],
    counting_and_construct: ['先分类，再计数，最后检查是否有重复。', '涉及最值时，优先从最大位或最关键位置入手。', '可以用列表法减少漏数。'],
    equivalence_and_balance: ['先整理“谁比谁多、总量是多少、差是多少”。', '图形代换类题先找相同单位。', '至少、多几、少几这类词要单独圈出来。'],
    plane_geometry_counting: ['先按大小或方向分层统计。', '补图题先看缺口，再看整体图案。', '最后检查是否有重叠部分被重复计算。'],
    spatial_reasoning: ['先分清前后、左右、上下关系。', '遮挡题先数能看到的，再推看不到的。', '展开图题重点看相邻面和对面。'],
    logic_puzzles: ['先用限制条件最强的位置开局。', '先排除不能填什么，再考虑能填什么。', '记录中间结论，避免来回重复试错。'],
  };
  return tips[moduleKey] || ['建议先观察题目条件，再做分类和验证。'];
}

function topicTrainingTips(topicSlug) {
  const tips = {
    'mental-math-tricks': ['先选 3 到 5 题做短练习，比一次刷很多题更有效。', '复盘时重点说出“为什么这样算更快”。'],
    'find-patterns': ['观察时先定维度，再定变化顺序。', '多用“我看到的是……”来表达规律。'],
    'count-shapes': ['先按类型分组，再做汇总。', '画辅助记号可以减少漏数。'],
    'spatial-reasoning': ['尽量把看得到和看不到的部分分开思考。', '做展开图题时先找固定面，再判断相邻关系。'],
    'equal-balance': ['先用简单语言重述题目关系。', '代换前先确认同一种图形或量代表同一数值。'],
    'logic-fill-number': ['从限制最多的位置开始试填。', '每填一步就检查是否和其他条件冲突。'],
  };
  return tips[topicSlug] || ['建议先做 3 到 5 道题，再做一次同类复盘。'];
}

async function resolveQuestionImage(question) {
  const candidate = path.join(publicDir, 'assets', 'questions', question.paper, `${question.id}.png`);
  try {
    await fs.access(candidate);
    return `/assets/questions/${question.paper}/${question.id}.png`;
  } catch {
    return '';
  }
}

function buildQuestionSteps(question) {
  const common = ['先确认题目条件里哪些信息是固定的，哪些信息需要推出来。'];
  const byModule = {
    mental_math: '从数字关系入手，判断是凑整、逆推还是拆分更合适。',
    patterns: '先找变化维度，再判断是周期、递推还是交替变化。',
    counting_and_construct: '先分类列出情况，再统计总数并排除重复。',
    equivalence_and_balance: '把文字关系整理成“总量、差量、对应量”三类信息。',
    plane_geometry_counting: '先分层或分方向计数，最后核对是否有重叠。',
    spatial_reasoning: '先想清楚视角，再判断哪些部分会被遮挡或相邻。',
    logic_puzzles: '先使用限制最强的条件，逐步缩小可填范围。',
  };
  return [
    ...common,
    byModule[question.moduleKey] || '根据题型先确定一种稳定的判断顺序。',
    `这题的核心能力是 ${question.skills.join('、')}，做完后要回头检查每个条件是否都被满足。`,
  ];
}

function buildCommonMistakes(question) {
  const common = ['只看答案像不像，没有回到题目条件逐一检查。'];
  const byModule = {
    mental_math: ['没有先看数字结构，直接按最慢的方法硬算。'],
    patterns: ['只看一个位置，忽略了图形可能有两个维度同时变化。'],
    counting_and_construct: ['出现漏数或把同一种情况重复统计。'],
    equivalence_and_balance: ['把“多、少、至少”这些关系词理解反了。'],
    plane_geometry_counting: ['没有分层统计，导致大图形和小图形混在一起数。'],
    spatial_reasoning: ['把看到的面和被挡住的部分混在一起判断。'],
    logic_puzzles: ['没有先用限制条件缩小范围，就开始随意试填。'],
  };
  return [...common, ...(byModule[question.moduleKey] || ['没有把题目条件分步整理。'])];
}

function buildSeriesIndex(seriesList) {
  const index = new Map();
  for (const series of seriesList) {
    for (const questionId of series.questionIds || []) {
      if (!index.has(questionId)) {
        index.set(questionId, []);
      }
      index.get(questionId).push(series);
    }
  }
  return index;
}

function buildWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YMO 一年级思维训练',
    url: siteOrigin,
    inLanguage: 'zh-CN',
  };
}

function buildBreadcrumbStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteOrigin}${item.href}`,
    })),
  };
}


function buildFaqStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildRobotsTxt(urls) {
  if (!allowIndexing) {
    return 'User-agent: *\nDisallow: /\n';
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;
}

function buildSitemap(urlList) {
  const urls = allowIndexing ? urlList : [];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((pathname) => `  <url><loc>${siteOrigin}${pathname}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
}

function buildManifest() {
  return {
    name: 'YMO 一年级思维训练',
    short_name: 'YMO H5',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f9fe',
    theme_color: '#3777ff',
    lang: 'zh-CN',
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
