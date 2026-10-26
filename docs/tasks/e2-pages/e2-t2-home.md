# E2-T2 — Home page

| Epic | Branch | Depends on |
|---|---|---|
| [E2 — Home, About and Contact](../../MIGRATION.md#epic-2--home-about-and-contact) | `migration/e2-t2-home` | E2-T1 |

## User story

As a visitor, I want the Home tab to show my profile, experience, specialisations and featured projects, so that I get the same first impression as on the current site.

## Description

Port `home-content` into `/home` as static HTML. The profile box links to About, and each featured project links to its detail page.

## Context

- `home-content.component.html` renders:
  - a profile box (`yo_letra-thumb.webp`, "Game Designer & Developer") that navigates to `/about`,
  - an Experience box with two `metric-container`s ("Indie Games" since 2017-01-01, "Web & Mobile" since 2021-09-01, `+` symbol, "years"),
  - a "Specialized In" box with three `icon-text`s (Unity, Game Design, Project Management),
  - a Featured Projects grid from `FEATURED_PROJECTS`: tile `background-image` = `backgroundImage`, inner `<img>` = thumbnail, `large` class when `class === 'large'`, click navigates to `/projects/<id>`.
- Years are computed on load: `floor((now - start) / 365.25 days)`.
- The whole content is wrapped in `@defer (on viewport)` with an empty placeholder.

## Acceptance criteria

- [ ] `/home` shows the same boxes, texts, images and layout as the live site, on desktop and mobile.
- [ ] Experience years equal the values the live site shows on the build date.
- [ ] The profile box is an `<a href="/about">`; each featured tile is an `<a href="/projects/<id>">`.
- [ ] All content is present in the static HTML (no `@defer`-like lazy rendering).

## Technical specification

### Add

- `src/utils/years-since.ts`: `yearsSince(start: Date, now = new Date()): number` with the existing formula.

### Change

- `src/pages/home.astro`: `TabLayout activeTab={TABS.HOME}`, markup ported from `home-content.component.html`:
  - `(click)` handlers become `<a>` elements carrying the same classes.
  - Tile background: `style={`background-image: url('${item.backgroundImage}')`}`.
  - Image: `src={item.imageThumb ?? item.image}`, `alt={item.name}`.
  - `MetricContainer` and `IconText` replace the Angular components.
- Styles: port `home-content.component.scss` as scoped SCSS, adding `color: inherit; text-decoration: none` to the new links.

### Notes

- Years are computed at build time, so the numbers only change when the site is rebuilt. This is an accepted trade-off for a zero-JS page; deploys happen often enough.

## Testing steps

See [MIGRATION.md → E2-T2](../../MIGRATION.md#e2-t2--home-page).
