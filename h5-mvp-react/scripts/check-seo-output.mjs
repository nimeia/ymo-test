import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const distDir = path.join(appDir, 'dist');
const catalog = JSON.parse(await fs.readFile(path.join(appDir, 'src/seo/catalog.json'), 'utf8'));

const expectedPaths = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  'manifest.webmanifest',
  'modules/mental_math/index.html',
  'papers/34y/index.html',
  `topics/${catalog.topics[0].slug}/index.html`,
  `guides/${catalog.guides[0].slug}/index.html`,
  `questions/${catalog.featuredQuestionPages[0].questionId.toLowerCase()}/index.html`,
];

for (const relativePath of expectedPaths) {
  try {
    await fs.access(path.join(distDir, relativePath));
  } catch {
    throw new Error(`Missing expected SEO output: ${relativePath}`);
  }
}

console.log(`SEO output verified: ${expectedPaths.length} key files found in dist.`);
