# E1-T3 — Data layer

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t3-data-layer` | E1-T1 |

## User story

As the site owner, I want the projects, about and tabs content in framework-free TypeScript, so that pages can render it at build time and I keep editing content in one place.

## Description

Move the content models out of the Angular components into `src/data/`, unchanged in shape and values. A temporary list on the placeholder page proves the data loads in Astro.

## Context

- `src/app/projects-content/projects.model.ts` holds the `Project` type, `withThumbs`/`toThumb` helpers, one constant per project, `DUMMY_PROJECT`, `FEATURED_PROJECTS` (5 items, two overridden with `class: 'large'`) and `ALL_PROJECTS` (15 items, display order).
- `src/app/about-content/about-content.model.ts` holds the `AboutContent` type and the `ABOUT` constant. Some strings contain HTML (`<strong>`, `<br>`).
- `src/app/app.model.ts` holds the `TABS` enum and the `TABS_LIST` labels.
- None of these files import Angular.

## Acceptance criteria

- [ ] `src/data/projects.ts`, `src/data/about.ts` and `src/data/tabs.ts` exist and export the same names, types and values as the Angular models.
- [ ] Project order in `ALL_PROJECTS` and `FEATURED_PROJECTS` is unchanged.
- [ ] Thumbnail paths are still derived by `withThumbs` (`*.webp` → `*-thumb.webp`).
- [ ] `bun run build` passes type checking.
- [ ] The placeholder page lists all project names in `ALL_PROJECTS` order (temporary, removed in E1-T4).

## Technical specification

### Add

- `src/data/projects.ts`: copy of `projects.model.ts`.
- `src/data/about.ts`: copy of `about-content.model.ts`.
- `src/data/tabs.ts`: copy of `app.model.ts`.

### Change

- `src/pages/index.astro`: import `ALL_PROJECTS` and render `<ul>` of `project.name`.

### Notes

- Copy, don't move: `src/app/` stays as the porting reference until E5-T3.
- `DUMMY_PROJECT` is kept for now and removed in E3-T2, where static paths make it unnecessary.
- `TABS` stays a regular `enum` (allowed with `isolatedModules`); don't use `const enum`.

## Testing steps

See [MIGRATION.md → E1-T3](../../MIGRATION.md#e1-t3--data-layer).
