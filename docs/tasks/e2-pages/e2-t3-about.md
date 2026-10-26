# E2-T3 — About page

| Epic | Branch | Depends on |
|---|---|---|
| [E2 — Home, About and Contact](../../MIGRATION.md#epic-2--home-about-and-contact) | `migration/e2-t3-about` | E2-T1 |

## User story

As a visitor, I want the About tab to show my background, focus, education, experience and languages, so that I can learn about the person behind the projects.

## Description

Port `about-content` into `/about` as static HTML, rendering the `ABOUT` data with the shared components.

## Context

- `about-content.component.html` renders a hero (eyebrow, title, pills, HTML description), a profile box (name, age, location), a focus list (HTML items), and three lists of `metric-container`s: Education, Professional Experience, Languages.
- Metric items with `img` get the `has-image` class and a `--logo: url(...)` variable; language items get `has-flag` and `--flag`. Languages also use `align-left`.
- HTML strings are rendered with `[innerHTML]`.
- Age is computed as `currentYear - 2000` (not from `birthDate`).
- `goToContact()` exists in the component but is unused in the template.

## Acceptance criteria

- [ ] `/about` shows the same sections, texts, logos and flags as the live site, on desktop and mobile.
- [ ] Bold text and line breaks inside the hero description and focus items render as HTML.
- [ ] Age matches the live site on the build date.
- [ ] All content is present in the static HTML.

## Technical specification

### Change

- `src/pages/about.astro`: `TabLayout activeTab={TABS.ABOUT}`, markup ported from `about-content.component.html`:
  - `[innerHTML]` → `set:html`.
  - `[class.has-image]` / `[style.--logo]` → `class:list={['box', 'center', { 'has-image': !!item.img }]}` and `style={item.img ? `--logo: url(${item.img})` : undefined}` on `MetricContainer`.
  - Same pattern for languages with `has-flag`, `--flag` and `align-left`.
  - `age = new Date().getFullYear() - 2000`, same formula as today.
- Styles: port `about-content.component.scss` as scoped SCSS; selectors that target the metric container root from the page use `:global()` where scoping requires it.

### Notes

- `set:html` is safe here: the HTML comes from the repo's own data file, not from users.
- The unused `goToContact()` is not ported.

## Testing steps

See [MIGRATION.md → E2-T3](../../MIGRATION.md#e2-t3--about-page).
