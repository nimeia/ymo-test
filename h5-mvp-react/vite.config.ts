import { defineConfig, loadEnv } from 'vite';

function normalizeOrigin(origin?: string): string {
  if (!origin) return 'https://example.com';
  return origin.replace(/\/+$/, '');
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteOrigin = normalizeOrigin(env.VITE_SITE_ORIGIN || env.SITE_ORIGIN || (env.CLOUDFLARE_PAGES_PROJECT_NAME ? `https://${env.CLOUDFLARE_PAGES_PROJECT_NAME}.pages.dev` : undefined));
  const isPreview = (env.VITE_SEO_ENV || env.SEO_ENV) === 'preview';
  const seoRobots = isPreview ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';

  return {
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    plugins: [
      {
        name: 'seo-index-transform',
        transformIndexHtml(html) {
          return html
            .replaceAll('__SITE_ORIGIN__', siteOrigin)
            .replaceAll('__SEO_ROBOTS__', seoRobots);
        },
      },
    ],
  };
});
