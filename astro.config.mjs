import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { MOBILE_BREAKPOINT } from './src/utils/breakpoints';

export default defineConfig({
  site: 'https://www.aleixferre.com',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/home/'),
    }),
  ],
  prefetch: {
    prefetchAll: true,
  },
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  redirects: {
    '/home': '/',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
          additionalData: `@use "breakpoints" as * with ($mobile-breakpoint: ${MOBILE_BREAKPOINT}px);\n`,
        },
      },
    },
  },
});
