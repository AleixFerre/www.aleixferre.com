# E2-T1 — Shared components

| Epic | Branch | Depends on |
|---|---|---|
| [E2 — Home, About and Contact](../../MIGRATION.md#epic-2--home-about-and-contact) | `migration/e2-t1-shared-components` | E1 |

## User story

As the site owner, I want the reusable metric and icon blocks available as Astro components, so that the Home and About pages can be ported with the same visuals.

## Description

Port `metric-container` and `icon-text` to Astro components with the same inputs and styles, and move the shared `appear` animations to the global stylesheet.

## Context

- `metric-container`: inputs `title`, `number`, `symbol`, `numberAfterSymbol`, `description`, `small`. The host element receives extra classes from parents (`box center`, `has-image`, `has-flag`, `align-left`) and CSS variables (`--logo`, `--flag`). Its stylesheet uses `:host(.align-left)`.
- `icon-text`: inputs `text`, `icon`, `small`; renders an `<img>` and a `<p>`.
- `appear` (0.3s) and `appear-lite` (0.4s) keyframes are defined in `projects-content.component.scss` and `projects-details.component.scss`.

## Acceptance criteria

- [ ] `MetricContainer.astro` and `IconText.astro` accept the same props as their Angular counterparts.
- [ ] `MetricContainer` forwards `class` and `style` to its root element, so parent classes and CSS variables keep working.
- [ ] The rendered HTML and styles produce the same visuals as today (checked through E2-T2 and E2-T3).
- [ ] `.appear` and `.appear-lite` are available globally.
- [ ] `bun run build` passes.

## Technical specification

### Add

- `src/components/MetricContainer.astro`
  - Props: `title?: string = ''`, `number?: string = ''`, `symbol?: string = ''`, `numberAfterSymbol?: string = ''`, `description: string`, `small?: boolean = false`, `class?: string`, `style?: string | Record<string, string>`.
  - Root `<div class:list={['metric-container', className]} style={style}>` wrapping the ported template.
  - Styles: port `metric-container.component.scss`; replace `:host` with `.metric-container` and `:host(.align-left)` with `.metric-container.align-left`.
- `src/components/IconText.astro`
  - Props: `text: string`, `icon: string`, `small?: boolean = false`, `class?: string`.
  - Styles: port `icon-text.component.scss`, `:host` → root class.
- `src/styles/global.scss`: add the `appear` and `appear-lite` keyframes and classes.

### Notes

- Astro scopes component styles. Classes passed in from a parent page (e.g. `has-image`) are styled by the parent's own scoped CSS. Where the parent's styles target the component's root, use `:global()` in the parent or `is:global` blocks narrowly, matching how the Angular styles target the host.

## Testing steps

See [MIGRATION.md → E2-T1](../../MIGRATION.md#e2-t1--shared-components).
