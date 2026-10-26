# E3-T3 — Gallery and lightbox

| Epic | Branch | Depends on |
|---|---|---|
| [E3 — Projects](../../MIGRATION.md#epic-3--projects) | `migration/e3-t3-gallery-lightbox` | E3-T2 |

## User story

As a visitor, I want to see a project's screenshots and open them full size, so that I can get a real look at the game.

## Description

Add the screenshot gallery to project pages and replace `ng-gallery` with PhotoSwipe, loaded only on project pages. Keep the current grid on desktop and the swipe carousel on mobile.

## Context

- `gallery.component.ts`:
  - shows thumbnails in a grid with `grid-template-columns: repeat(N, 1fr)`, where N is 1 below 1000px wide, otherwise `min(max(images, 2), 4)`, recalculated on resize;
  - opens a lightbox with full-size images, thumbnails on top, keyboard shortcuts, looping, `ImageSize.Contain`.
- `gallery.component.scss`: below 1000px the gallery becomes a horizontal scroll-snap carousel (`grid-auto-flow: column`, `82vw` items) and overrides the inline columns with `!important`.
- Images use the `unpic` directive, which only adds lazy loading and layout attributes for local images.
- PhotoSwipe requires the width and height of each full-size image.

## Acceptance criteria

- [ ] Project pages with images show the gallery between the description and the Details section, as on the live site.
- [ ] Desktop: same number of columns as the live site. Mobile: horizontal swipe carousel with snapping, as on the live site.
- [ ] Clicking a thumbnail opens a lightbox with the full-size image, scaled to fit.
- [ ] Arrow keys navigate, navigation loops, Esc and the close button close it, swipe works on touch.
- [ ] Navigating to another project and opening its lightbox shows only that project's images.
- [ ] No lightbox JS or CSS is downloaded on non-project pages.
- [ ] Accepted difference: the lightbox shows a counter instead of a thumbnail strip.

## Technical specification

### Add

- Dependency: `photoswipe`.
- `src/utils/image-size.ts`: `getImageSize(publicPath: string): Promise<{ width: number; height: number }>` using `sharp(`public${publicPath}`).metadata()`. Runs at build time only; reused in E5-T1.
- `src/components/Gallery.astro`
  - Props: `images: string[]`, `thumbs?: string[]`.
  - Renders `<div class="gallery pswp-gallery" style={`--cols: ${Math.min(Math.max(images.length, 2), 4)}`}>` with, per image, `<a href={full} data-pswp-width={w} data-pswp-height={h} target="_blank"><img class="screenshot" src={thumb} alt="" loading="lazy" decoding="async"></a>`.
  - Styles: port `gallery.component.scss`, replacing the inline column count with `grid-template-columns: repeat(var(--cols), 1fr)`; the mobile carousel rules stay as they are.
  - Processed `<script>`:
    ```ts
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import 'photoswipe/style.css';

    let lightbox: PhotoSwipeLightbox | null = null;

    document.addEventListener('astro:page-load', () => {
      lightbox?.destroy();
      lightbox = null;
      if (!document.querySelector('.pswp-gallery')) return;
      lightbox = new PhotoSwipeLightbox({
        gallery: '.pswp-gallery',
        children: 'a',
        loop: true,
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
    });
    ```

### Change

- `src/pages/projects/[id].astro`: render `<Gallery images={project.images} thumbs={project.imagesThumbs} />` when the project has images.

### Notes

- The `resize` listener is replaced by CSS (the `--cols` variable plus the existing media query).
- `target="_blank"` on the links keeps the full image reachable if JS fails; PhotoSwipe prevents the default when it's active.
- Remove the `ng-gallery` CSS overrides; PhotoSwipe's defaults are used.

## Testing steps

See [MIGRATION.md → E3-T3](../../MIGRATION.md#e3-t3--gallery-and-lightbox).
