# E1-T7 — Node 24 LTS and Astro 7

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t7-astro-7` | E1-T6 |

## User story

As the site owner, I want the project on the latest Node LTS and the latest Astro major, so that the migration doesn't start on an outdated framework version.

## Description

Pin the project to Node 24.22.1 (latest LTS) and upgrade Astro from 6.4.8 to 7.4.2.

## Context

- E1-T1 used Astro 6.4.8 because Astro 7 requires Node ≥ 22.23.4, while `.nvmrc` pinned 22.12.
- Node is managed locally with nvm-windows.

## Acceptance criteria

- [ ] `.nvmrc` contains `v24.22.1`.
- [ ] `package.json` pins `astro` to `7.4.2`.
- [ ] `bun run build` passes type checking and builds every page.
- [ ] Routes, redirects, the 404 page, tab transitions and the star background behave as in E1-T4 to E1-T6.

## Technical specification

### Change

- `.nvmrc`: `v24.22.1`.
- `package.json`: `"astro": "7.4.2"`; `bun.lock` updated.

### Notes

- No source change was needed: `ClientRouter`, `transition:*` directives, `redirects` and static output work the same on Astro 7.

## Testing steps

See [MIGRATION.md → E1-T7](../../MIGRATION.md#e1-t7--node-24-lts-and-astro-7).
