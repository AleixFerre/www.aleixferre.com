import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.aleixferre.com',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/home/'),
    }),
  ],
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  redirects: {
    '/home': '/',
  },
});
