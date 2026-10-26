# E1-T4 — Tab shell and routes

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t4-tab-shell` | E1-T2, E1-T3 |

## User story

As a visitor, I want the same four-column tab layout with the same URLs, so that bookmarks and shared links keep working and the site feels the same.

## Description

Recreate the accordion shell from `app.component` as an Astro layout, and create one page per tab. Tab titles become real links. Add the `/` redirect and a 404 page that sends unknown URLs to the right tab.

## Context

- `app.component.html` renders, for each tab: a `.col.title` clickable header and a `.col.scrollable.content-hide` panel. The active panel gets `.isActive` (`flex: 1`, full opacity); the others have `width: 0; opacity: 0`.
- Below 1000px the row becomes a column and titles switch from `writing-mode: sideways-lr` to horizontal.
- The active title is bold (`.selected`) and titles have a text-shadow on hover.
- Routes today: `/home`, `/projects`, `/projects/:id`, `/about`, `/contact`. `''` and `**` redirect to `/home`. An unknown project id redirects to `/projects` (`projects.service.ts`).
- GitHub Pages serves `404.html` for unknown paths.

## Acceptance criteria

- [ ] `/home`, `/projects`, `/about`, `/contact` are static pages rendered through the tab layout, each with its own tab expanded on first paint.
- [ ] Tab titles are `<a>` links, styled like today (no underline, inherited colour), bold when active, with the hover text-shadow.
- [ ] Desktop and mobile layouts match the live site.
- [ ] `/` redirects to `/home`.
- [ ] Unknown `/projects/<anything>` URLs end on `/projects`; any other unknown URL ends on `/home`.
- [ ] Browser back/forward shows the tab matching the URL.
- [ ] The temporary project list from E1-T3 is removed.

## Technical specification

### Add

- `src/layouts/TabLayout.astro`
  - Props: `activeTab: TABS`, plus `title`/`description`/`image` forwarded to `BaseLayout`.
  - Markup ported from `app.component.html`: `main.row`, then for each entry of `TABS_LIST` an `<a class="col title" href={`/${tab}`}>` with `<p class:list={{ selected: tab === activeTab }}>` and a `<div class:list={['col', 'scrollable', 'content-hide', { isActive: tab === activeTab }]}>`.
  - Only the active panel renders `<div class="main-content"><slot /></div>`; inactive panels are empty.
  - Styles: port `app.component.scss` as scoped SCSS. Add `a.title { color: inherit; text-decoration: none; }`.
  - Leaves a slot/placeholder for the stars background (E1-T5).
- Pages with placeholder content: `src/pages/home.astro`, `src/pages/projects/index.astro`, `src/pages/about.astro`, `src/pages/contact.astro`.
- `src/pages/404.astro`: inline script
  ```js
  location.replace(location.pathname.startsWith('/projects/') ? '/projects' : '/home');
  ```
  plus a visible fallback link to `/home` for no-JS visitors, and `<meta name="robots" content="noindex">`.

### Change

- `astro.config.mjs`: `redirects: { '/': '/home' }`.
- Remove `src/pages/index.astro`.

### Notes

- The old `router.navigate(..., { replaceUrl: true })` replaced history entries. Real links push entries instead, which is standard browser behaviour and makes back/forward meaningful. This is an intentional change.
- The `.main-content` styles (`height: calc(100vh - 40px)`, centring) come from `app.component.scss` and go into the layout.

## Testing steps

See [MIGRATION.md → E1-T4](../../MIGRATION.md#e1-t4--tab-shell-and-routes).
