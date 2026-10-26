# E4-T1 — Per-page metadata

| Epic | Branch | Depends on |
|---|---|---|
| [E4 — SEO and metadata](../../MIGRATION.md#epic-4--seo-and-metadata) | `migration/e4-t1-page-metadata` | E3 |

## User story

As someone sharing a link to the site, I want every page to have its own title, description and preview image, so that search results and link previews show what the page is actually about.

## Description

Give each page its own title, description, canonical URL and Open Graph/Twitter tags, built from `Astro.site` so every URL points to `https://www.aleixferre.com`.

## Context

- Today every URL serves the same `index.html` head: one title, one description, `og:url` and `og:image` on `https://aleixferre.github.io/`, while the site is served on `https://www.aleixferre.com`.
- `BaseLayout` (E1-T2) already accepts `title`, `description` and `image`.
- `astro.config.mjs` has `site: 'https://www.aleixferre.com'`.

## Acceptance criteria

- [ ] Each page has a distinct `<title>` and `<meta name="description">`:

  | Page | Title | Description | Image |
  |---|---|---|---|
  | `/home` | Aleix Ferré - Game Designer & Programmer | current default | `/assets/profile/promo.webp` |
  | `/projects` | Projects \| Aleix Ferré | short projects summary | `/assets/profile/promo.webp` |
  | `/projects/<id>` | `<name>` \| Aleix Ferré | `project.description` | `project.image` |
  | `/about` | About \| Aleix Ferré | short about summary | `/assets/profile/promo.webp` |
  | `/contact` | Contact \| Aleix Ferré | short contact summary | `/assets/profile/promo.webp` |

- [ ] Each page has `<link rel="canonical">`, `og:url`, `og:title`, `og:description`, `og:image`, `twitter:title`, `twitter:description` and `twitter:image`, all with absolute `https://www.aleixferre.com/...` URLs.
- [ ] No `aleixferre.github.io` URL remains in the built HTML.
- [ ] The 404 page has `noindex` and no canonical.
- [ ] Content is readable with JavaScript disabled.

## Technical specification

### Change

- `src/layouts/BaseLayout.astro`
  - New prop `noindex?: boolean`.
  - `const canonical = new URL(Astro.url.pathname, Astro.site)`.
  - `const ogImage = new URL(image ?? '/assets/profile/promo.webp', Astro.site)`.
  - Emit canonical and OG/Twitter tags from these values; skip canonical when `noindex`.
- `src/layouts/TabLayout.astro`: forward `title`, `description`, `image` to `BaseLayout`.
- Each page passes its values from the table above. Project pages use the project data.
- `src/pages/404.astro`: `noindex`.

### Notes

- `Astro.url.pathname` in static builds has no trailing slash for `format: 'directory'` pages unless configured. Keep the canonical consistent with the URLs GitHub Pages serves (`/projects/threefold/` after its redirect), and check it in the built HTML.
- Short summaries for the non-home pages are written from the existing page content; no new claims.

## Testing steps

See [MIGRATION.md → E4-T1](../../MIGRATION.md#e4-t1--per-page-metadata).
