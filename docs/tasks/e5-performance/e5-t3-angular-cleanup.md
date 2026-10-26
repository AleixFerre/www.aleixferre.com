# E5-T3 — Remove Angular leftovers

| Epic | Branch | Depends on |
|---|---|---|
| [E5 — Performance and cleanup](../../MIGRATION.md#epic-5--performance-and-cleanup) | `migration/e5-t3-angular-cleanup` | E5-T1, E5-T2 |

## User story

As the site owner, I want no Angular code, config or tooling left in the repo, so that the project is easy to understand and maintain.

## Description

Delete the Angular reference source and every leftover config, update editor settings for Astro, and rewrite the README.

## Context

- `src/app/` was kept as the porting reference and is excluded in `tsconfig.json`.
- Leftovers: `.angular/` cache, stale `dist/`, Angular entries in `.gitignore` (`/.angular/cache`, `/out-tsc`, `/bazel-out`, `testem.log`, …), `.vscode/tasks.json` and `.vscode/launch.json` running `ng serve`/`ng test` on port 4200.
- `README.md` doesn't describe how to run or build the project.

## Acceptance criteria

- [ ] `src/app/` and `.angular/` are deleted; `tsconfig.json` no longer excludes `src/app`.
- [ ] `.gitignore` only contains entries relevant to Astro/Bun/editors (including `dist/` and `.astro/`).
- [ ] `.vscode/launch.json` launches the browser on http://localhost:4321 with a pre-launch `bun run dev` task; `.vscode/tasks.json` has no `ng` tasks; `.vscode/extensions.json` recommends `astro-build.astro-vscode` instead of Angular.
- [ ] `package.json` has no unused dependency.
- [ ] Searching the repo for `@angular` returns nothing outside git history.
- [ ] `README.md` explains install, dev, build, preview and thumbnail generation.
- [ ] A clean install and build succeed and every page works in preview.

## Technical specification

### Remove

- `src/app/`, `.angular/`, local `dist/` (untracked).
- Any dependency no longer imported (check `@lordicon/element`, `lottie-web`, `sharp`, `photoswipe` are still used; remove anything else).

### Change

- `tsconfig.json`: `"exclude": ["dist"]`.
- `.gitignore`, `.vscode/*.json` as described above.
- `README.md`: commands table matching `package.json`.

### Notes

- The Lighthouse comparison in this task's testing steps is the measurement for the whole epic. Paste the scores in the epic PR.

## Testing steps

See [MIGRATION.md → E5-T3](../../MIGRATION.md#e5-t3--remove-angular-leftovers).
