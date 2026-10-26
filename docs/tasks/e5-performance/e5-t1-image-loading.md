# E5-T1 — Image loading

| Epic | Branch | Depends on |
|---|---|---|
| [E5 — Performance and cleanup](../../MIGRATION.md#epic-5--performance-and-cleanup) | `migration/e5-t1-image-loading` | E4 |

## User story

As a visitor on a slow connection, I want the visible content to load first and the page not to jump while images arrive, so that the site feels fast and stable.

## Description

Add intrinsic sizes and loading hints to every `<img>`: lazy loading for images below the fold, high priority for the main image above it.

## Context

- Images are pre-generated `.webp` files plus `-thumb.webp` thumbnails (max 900px) created by `scripts/generate-image-thumbs.mjs`.
- No `<img>` has `width`/`height`, which causes layout shift.
- Tile backgrounds are CSS `background-image` and can't be lazy-loaded with attributes.
- `src/utils/image-size.ts` (E3-T3) reads image dimensions at build time.

## Acceptance criteria

- [ ] Every `<img>` that points to a raster file under `/assets` has `width` and `height` matching the file.
- [ ] Images below the fold have `loading="lazy"` and `decoding="async"`.
- [ ] The main above-the-fold image of each page has `fetchpriority="high"` and isn't lazy: the profile image on `/home`, and the first two tiles on `/projects`.
- [ ] Lighthouse shows no "Image elements do not have explicit width and height" warning on `/home`, `/projects` and a project page.
- [ ] No visual change compared with the end of E4.

## Technical specification

### Add

- `src/components/Img.astro`
  - Props: `src: string`, `alt: string`, `class?: string`, `priority?: boolean = false`.
  - Reads `width`/`height` with `getImageSize(src)` for raster files (skip `.svg`).
  - Emits `<img>` with `loading={priority ? 'eager' : 'lazy'}`, `fetchpriority={priority ? 'high' : undefined}`, `decoding="async"`.

### Change

- Replace raster `<img>` tags in Home, About, Projects grid, project pages and `Gallery.astro` with `Img`.
- Mark the priority images listed in the acceptance criteria.

### Notes

- CSS keeps controlling the displayed size; `width`/`height` only give the browser the aspect ratio. Check that no rule relies on images having no intrinsic size (add `height: auto` where needed).
- Out of scope: lazy loading CSS background images, and replacing the thumbnail script with `astro:assets`.

## Testing steps

See [MIGRATION.md → E5-T1](../../MIGRATION.md#e5-t1--image-loading).
