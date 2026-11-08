import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { site } from './src/site.config';

export default defineConfig({
  site: site.url,
  // Cloudflare Pages serves this committed folder as-is, with no build step.
  outDir: './docs',
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', nl: 'nl' } },
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'vitesse-light' },
  },
});
