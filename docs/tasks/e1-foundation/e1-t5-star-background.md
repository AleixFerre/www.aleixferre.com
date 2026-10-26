# E1-T5 — Star background

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t5-star-background` | E1-T4 |

## User story

As a visitor, I want the drifting star field behind the site, so that it keeps its current atmosphere.

## Description

Port the canvas star animation to an Astro component with a small client script, and mount it in the tab layout so that it persists across tab navigations.

## Context

- `background-stars.component.ts` draws 300 stars on a full-window canvas: radius `0.2–1.4`, velocity `±0.025` px/frame per axis, bouncing at the edges, white fill, redrawn every `requestAnimationFrame`.
- It resizes the canvas on `window:resize` (without re-seeding the stars).
- It sits behind the content: `position: absolute; inset 0; z-index: -1` (`app.component.scss` `.stars`).

## Acceptance criteria

- [ ] The star field looks and moves like the live site.
- [ ] The canvas always fills the viewport after a resize, without stretching and without scrollbars.
- [ ] The canvas is persisted across view-transition navigations (`transition:persist`), so the animation doesn't restart once E1-T6 is in.
- [ ] Only one animation loop runs at a time, even after many navigations.
- [ ] No framework runtime is shipped for this feature.

## Technical specification

### Add

- `src/components/BackgroundStars.astro`
  - Markup: `<canvas id="stars" class="stars" transition:persist="stars"></canvas>`.
  - Scoped styles ported from `background-stars.component.scss` and `.stars` in `app.component.scss`.
  - Processed `<script>` (bundled module, runs once per full page load):
    - type `Star = { x: number; y: number; radius: number; vx: number; vy: number }` replacing `any[]`.
    - `resize()`, `initStars()` and `animate()` with the same constants as today.
    - Guard against double initialisation with a module-level flag or a `data-initialised` attribute on the canvas.

### Change

- `src/layouts/TabLayout.astro`: render `<BackgroundStars />` as the first child of `main.row`, where `app-background-stars` was.

### Notes

- Astro bundles a component `<script>` once per page load and doesn't re-run it on ClientRouter navigations. Together with `transition:persist`, the same canvas and loop survive tab changes.

## Testing steps

See [MIGRATION.md → E1-T5](../../MIGRATION.md#e1-t5--star-background).
