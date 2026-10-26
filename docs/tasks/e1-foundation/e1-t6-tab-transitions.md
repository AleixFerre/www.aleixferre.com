# E1-T6 — Animated tab switching

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t6-tab-transitions` | E1-T4, E1-T5 |

## User story

As a visitor, I want tabs to slide open and closed when I switch between them, so that navigating feels as smooth as today even though each tab is now its own page.

## Description

Enable Astro's client router and View Transitions so tab navigations don't reload the page visually. Each panel and title gets a stable transition name, so the browser animates the old panel collapsing and the new one expanding.

## Context

- Today the four panels are always in the DOM. Switching tabs toggles `.isActive`, and `.col { transition: all 0.3s ease-in-out }` animates width and opacity.
- After E1-T4, each tab is a separate HTML page, so that CSS transition no longer runs across navigations.
- View Transitions snapshot named elements before and after a navigation, and animate each named element's size and position between the two states.

## Acceptance criteria

- [ ] Clicking a tab doesn't flash white; the outgoing panel collapses and the incoming one expands over ~0.3s with ease-in-out.
- [ ] Titles move smoothly to their new positions on desktop and mobile.
- [ ] Back/forward navigations animate the same way.
- [ ] Stars keep moving across navigations.
- [ ] With `prefers-reduced-motion: reduce`, navigations switch instantly.
- [ ] Browsers without the View Transition API still navigate correctly (Astro's fallback).

## Technical specification

### Change

- `src/layouts/BaseLayout.astro`: add `import { ClientRouter } from 'astro:transitions'` and `<ClientRouter />` in `<head>`.
- `src/layouts/TabLayout.astro`:
  - `transition:name={`title-${tab}`}` on each title link.
  - `transition:name={`panel-${tab}`}` on each panel.
  - `transition:animate="none"` on the `main.row` so the page itself doesn't fade.
- Global styles (`src/styles/global.scss`):
  ```scss
  ::view-transition-group(*) {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
  ```
- Remove `transition: all 0.3s` from `.col` for width and opacity (keep the title hover transition), so CSS and View Transitions don't animate twice.

### Notes

- Every panel exists on every page (collapsed or expanded), so each `panel-<tab>` name has an old and a new state, and the group animation interpolates its width/height. That reproduces the accordion.
- Any client script added in later tasks that must run on each page has to listen to the `astro:page-load` event, not only run at module load.

## Testing steps

See [MIGRATION.md → E1-T6](../../MIGRATION.md#e1-t6--animated-tab-switching).
