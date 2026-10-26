# E3-T2 — Project detail pages

| Epic | Branch | Depends on |
|---|---|---|
| [E3 — Projects](../../MIGRATION.md#epic-3--projects) | `migration/e3-t2-project-details` | E3-T1 |

## User story

As a visitor, I want each project to have its own page with its description, details and timeline, so that I can read about it and share a direct link to it.

## Description

Generate one static page per project at `/projects/<id>`, with the side list of projects, the sticky action bar and all detail sections. The gallery is left out and added in E3-T3.

## Context

- `projects-details.component.html` renders:
  - a side list (`.grid.list.not-mobile-only`) with a sticky "See All" button and every project tile, the current one with `.selected`;
  - a sticky action bar: mobile back button, title, optional `additionalUrl` button (text on desktop, `project_report.svg` on mobile), "Visit Project" (text on desktop, `visit_project.svg` on mobile);
  - description, gallery, Details (`details` record in insertion order via `keyvalue: keepOrder`), "Good for you if", "What I learned";
  - Project Timeline: `createdAt | date: 'MMMM yyyy'` – `finishedAt` with duration from `getProjectDuration`, or "In Progress".
- On project change, `showPreview` toggles to replay the `appear-lite` animation.
- Some image paths are relative (`assets/back.svg`, `assets/projects/_actions/*.svg`). They break on nested URLs like `/projects/threefold/`.
- `DUMMY_PROJECT` is the fallback when the id is unknown.

## Acceptance criteria

- [ ] `bun run build` generates `dist/projects/<id>/index.html` for every project in `ALL_PROJECTS`.
- [ ] Each page matches the live site's detail view for that project, on desktop and mobile, except the gallery.
- [ ] Dates read "Month yyyy" in English. Duration text matches the live site, including "A week", "N days" and "In Progress".
- [ ] The current project is highlighted in the side list, and the list is scrolled so it's visible.
- [ ] "See All" links to `/projects`; external buttons open in a new tab.
- [ ] All image paths are absolute; nothing 404s in the Network tab.
- [ ] The details panel plays the `appear-lite` animation on each project page.
- [ ] `DUMMY_PROJECT` is removed from `src/data/projects.ts`, and `keepOrder` isn't ported.

## Technical specification

### Add

- `src/pages/projects/[id].astro`
  - `getStaticPaths()` returns `ALL_PROJECTS.map((project) => ({ params: { id: project.id }, props: { project } }))`.
  - `TabLayout activeTab={TABS.PROJECTS}` with title/description from the project (used fully in E4-T1).
  - Markup ported from `projects-details.component.html`; `(click)` handlers become `<a>` elements.
  - Details: `Object.entries(project.details)` (preserves insertion order like `keepOrder`).
- `src/utils/project-duration.ts`: `getProjectDuration(project)` copied from the component unchanged.
- `src/utils/format-month.ts`: `new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })`.
- Processed `<script>` in the page: on `astro:page-load`, `document.querySelector('.list .selected')?.scrollIntoView({ block: 'nearest' })`.
- Styles: port `projects-details.component.scss` (and the shared projects styles from E3-T1).

### Change

- `src/data/projects.ts`: remove `DUMMY_PROJECT`.

### Notes

- Dates in the data are ISO dates (`new Date('2025-01-01')`, UTC midnight). Formatting in UTC makes the output independent of the build machine's time zone.
- Unknown ids are already handled by the 404 page (E1-T4), which redirects to `/projects`.
- The `appear-lite` animation plays naturally on each navigation because the details panel is new content; the `showPreview` trick isn't needed.

## Testing steps

See [MIGRATION.md → E3-T2](../../MIGRATION.md#e3-t2--project-detail-pages).
