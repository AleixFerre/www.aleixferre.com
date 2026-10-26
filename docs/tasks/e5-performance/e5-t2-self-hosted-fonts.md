# E5-T2 — Self-hosted fonts

| Epic | Branch | Depends on |
|---|---|---|
| [E5 — Performance and cleanup](../../MIGRATION.md#epic-5--performance-and-cleanup) | `migration/e5-t2-self-hosted-fonts` | E4 |

## User story

As a visitor, I want text to show up immediately without waiting for third-party font servers, so that pages render faster and no request goes to Google.

## Description

Serve the fonts from the site itself, keeping only the families and weights that are used.

## Context

- The head loads Google Fonts with Fira Code (300–700), PT Sans (400/700, regular and italic) and Rubik (300–900, regular and italic), plus two preconnects.
- Usage in the styles:
  - Fira Code: global font.
  - PT Sans: project details (`projects-details`, `projects-content`), regular and bold.
  - Rubik: not used anywhere.
  - No italic text is styled with these fonts.

## Acceptance criteria

- [ ] No request goes to `fonts.googleapis.com` or `fonts.gstatic.com`.
- [ ] Fira Code (variable, 300–700) and PT Sans (400 and 700, regular only) are served from the site.
- [ ] Rubik and the italic variants are no longer loaded.
- [ ] Text uses `font-display: swap` and is visible immediately with a fallback font.
- [ ] Pages look the same as at the end of E4.

## Technical specification

### Add

- Dependencies: `@fontsource-variable/fira-code`, `@fontsource/pt-sans`.

### Change

- `src/layouts/BaseLayout.astro`
  - Frontmatter imports:
    ```ts
    import '@fontsource-variable/fira-code';
    import '@fontsource/pt-sans/400.css';
    import '@fontsource/pt-sans/700.css';
    ```
  - Remove the Google Fonts `<link>` and both preconnects.
- `src/styles/global.scss` and component styles: `font-family: "Fira Code Variable", "Fira Code", monospace`. PT Sans keeps its name.

### Notes

- Fontsource CSS uses `font-display: swap` and `unicode-range`, so the browser only downloads the subsets a page needs.
- Optionally preload the Latin Fira Code `woff2` from the layout if Lighthouse flags it.

## Testing steps

See [MIGRATION.md → E5-T2](../../MIGRATION.md#e5-t2--self-hosted-fonts).
