# E3-T1 — Projects grid

| Epic | Branch | Depends on |
|---|---|---|
| [E3 — Projects](../../MIGRATION.md#epic-3--projects) | `migration/e3-t1-projects-grid` | E2 |

## User story

As a visitor, I want to see all projects as a visual grid, so that I can browse them and open the one I'm interested in.

## Description

Port the grid view of `projects-content` into `/projects`. Each tile links to its project page.

## Context

- `projects-content.component.html` shows the grid when no project is selected, and `projects-details` otherwise. In Astro these become two routes: `/projects` (this task) and `/projects/<id>` (E3-T2).
- Each tile: `class="box project"` plus `item.class` (`wide` for Threefold), `background-image` from `backgroundImage`, inner `<img>` thumbnail, click navigates to `/projects/<id>`.
- The grid fades in with the `appear` animation.

## Acceptance criteria

- [ ] `/projects` shows all projects in `ALL_PROJECTS` order with the same tile sizes, images and backgrounds as the live site, on desktop and mobile.
- [ ] Each tile is an `<a href="/projects/<id>">`.
- [ ] The grid uses the `appear` entry animation.
- [ ] The PROJECTS tab is expanded.

## Technical specification

### Change

- `src/pages/projects/index.astro`: `TabLayout activeTab={TABS.PROJECTS}`, `<div class="grid appear">` with one `<a class:list={['box', 'project', item.class]} href={`/projects/${item.id}`} style={`background-image: url('${item.backgroundImage}')`}>` per project, containing `<img src={item.imageThumb ?? item.image} alt={item.name}>`.
- Styles: move the grid-related rules of `projects-content.component.scss` into the page as scoped SCSS. Rules for the details layout (`.row`, `.details`, `.grid.list`) go to E3-T2.

### Notes

- The detail-view rules in `projects-content.component.scss` and the tile styles are shared with the details sidebar. If both pages need them, extract them to `src/styles/projects.scss` and import it in both pages instead of duplicating.

## Testing steps

See [MIGRATION.md → E3-T1](../../MIGRATION.md#e3-t1--projects-grid).
