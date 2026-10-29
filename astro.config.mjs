import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.aleixferre.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  redirects: {
    '/': '/home',
  },
});
