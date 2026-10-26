# E1-T2 — Base layout, global styles and fonts

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t2-base-layout` | E1-T1 |

## User story

As a visitor, I want every page to have the same head metadata, fonts and base styles as today, so that the site looks and shares the same way after the migration.

## Description

Create the root HTML layout that every page uses. It carries everything the old `src/index.html` head had, and loads the global stylesheet. Title, description and preview image are props with today's values as defaults, so E4-T1 can set them per page.

## Context

- `src/index.html` (now removed, see git history) contains: charset, viewport, title, description, keywords, author, Open Graph and Twitter tags, the Google Fonts stylesheet with two preconnects, the favicon (`assets/favicon.ico`), and the ahrefs analytics script (`data-key="fPJUOKILanfySrwwfD8iPA"`, `async`).
- `src/styles.scss` sets the base font (Fira Code), 16px font size, and 10px below 1000px wide. Its selector is `.html, body` (a class, not the element), so today only `body` is affected.
- The `<base href="/">` tag was needed by the Angular router only.

## Acceptance criteria

- [ ] Every page rendered through the layout has the same head tags as `src/index.html`, with the same values, written in the static HTML.
- [ ] `title`, `description` and `image` can be overridden per page; the defaults equal today's values.
- [ ] Favicon, Google Fonts and ahrefs analytics load on every page.
- [ ] Global styles render identically to the live site, including the smaller font size below 1000px wide.
- [ ] No `<base>` tag is emitted.

## Technical specification

### Add

- `src/layouts/BaseLayout.astro`
  - Props: `title?: string`, `description?: string`, `image?: string` (site-relative path).
  - Renders `<html lang="en">`, the full `<head>` and `<body><slot /></body>`.
  - Favicon as `/assets/favicon.ico` (absolute path).
  - ahrefs script rendered with `is:inline` so Astro doesn't bundle it.
  - Imports `../styles/global.scss` in the frontmatter.
- `src/styles/global.scss`: `git mv src/styles.scss src/styles/global.scss`, content unchanged. Keep the `.html, body` selector as is: fixing it would change `rem`-based sizes and break visual parity.

### Change

- `src/pages/index.astro`: wrap the placeholder in `BaseLayout`.

### Notes

- OG and Twitter URLs stay as today (`aleixferre.github.io`) in this task; E4-T1 fixes them.
- Fonts are self-hosted later in E5-T2; keep the Google Fonts link for now.

## Testing steps

See [MIGRATION.md → E1-T2](../../MIGRATION.md#e1-t2--base-layout-global-styles-and-fonts).
