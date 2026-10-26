# E4-T2 — Sitemap and robots.txt

| Epic | Branch | Depends on |
|---|---|---|
| [E4 — SEO and metadata](../../MIGRATION.md#epic-4--seo-and-metadata) | `migration/e4-t2-sitemap` | E4-T1 |

## User story

As the site owner, I want a sitemap that lists every page, so that search engines discover all project pages.

## Description

Generate a sitemap at build time and point `robots.txt` to it.

## Context

- `robots.txt` references `https://aleixferre.github.io/sitemap.xml`, which doesn't exist.
- After E3, the site has a static page per project, so a sitemap can list them all.

## Acceptance criteria

- [ ] `bun run build` writes `dist/sitemap-index.xml` and the sitemap files it references.
- [ ] The sitemap lists `/home`, `/projects`, every `/projects/<id>`, `/about` and `/contact`, on `https://www.aleixferre.com`.
- [ ] The sitemap doesn't list `/404` or the `/` redirect page.
- [ ] `robots.txt` contains `Sitemap: https://www.aleixferre.com/sitemap-index.xml`.

## Technical specification

### Add

- Dependency: `@astrojs/sitemap`.

### Change

- `astro.config.mjs`:
  ```js
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && page !== 'https://www.aleixferre.com/',
    }),
  ],
  ```
- `public/robots.txt`: update the `Sitemap:` line.

### Notes

- Check the exact URL format in the generated file (trailing slashes) and adjust the filter if needed; the URLs in the sitemap must match the canonical URLs from E4-T1.

## Testing steps

See [MIGRATION.md → E4-T2](../../MIGRATION.md#e4-t2--sitemap-and-robotstxt).
