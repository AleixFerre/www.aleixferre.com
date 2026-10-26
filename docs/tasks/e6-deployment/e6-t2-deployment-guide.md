# E6-T2 — Deployment and rollback guide

| Epic | Branch | Depends on |
|---|---|---|
| [E6 — Deployment](../../MIGRATION.md#epic-6--deployment) | `migration/e6-t2-deployment-guide` | E6-T1 |

## User story

As the site owner, I want written cutover and rollback steps in the README, so that I can switch the live site to Astro safely and undo it quickly if something goes wrong.

## Description

Add a "Deployment" section to `README.md` covering the one-time cutover, regular deploys and the rollback.

## Context

- The live site is the Angular build on the `gh-pages` branch.
- The cutover and rollback procedure is defined in [MIGRATION.md → Final merge to main](../../MIGRATION.md#final-merge-to-main): tag the current `gh-pages` commit as `pre-astro`, deploy from `main` with `bun run deploy`, and roll back by force-pushing `pre-astro` to `gh-pages`.

## Acceptance criteria

- [ ] `README.md` has a "Deployment" section with:
  - regular deploy: `bun run deploy` from an up-to-date `main`;
  - one-time cutover: create and push the `pre-astro` tag, then deploy;
  - rollback: `git push origin pre-astro:gh-pages --force`, with a warning that it overwrites the branch;
  - a check that GitHub Pages still uses the `gh-pages` branch, root folder, custom domain and HTTPS.
- [ ] Commands match `package.json` and MIGRATION.md exactly.

## Technical specification

### Change

- `README.md`: new "Deployment" section, as described above.

### Notes

- Documentation only; no command is run in this task.

## Testing steps

See [MIGRATION.md → E6-T2](../../MIGRATION.md#e6-t2--deployment-and-rollback-guide).
