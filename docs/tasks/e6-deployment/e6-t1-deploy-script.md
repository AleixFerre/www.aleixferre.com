# E6-T1 — Deploy script to the gh-pages branch

| Epic | Branch | Depends on |
|---|---|---|
| [E6 — Deployment](../../MIGRATION.md#epic-6--deployment) | `migration/e6-t1-deploy-script` | E5 |

> [!CAUTION]
> This task adds the deploy command but must **never run it** against `gh-pages`. The only allowed publish is the dry run to `gh-pages-test`, done by the owner. See the ground rules in [MIGRATION.md](../../MIGRATION.md#ground-rules).

## User story

As the site owner, I want one command that builds and publishes the site to the `gh-pages` branch with the custom domain file included, so that deploying stays as simple as it is today.

## Description

Add the `CNAME` and `.nojekyll` files to `public/`, and a `deploy` script that builds and publishes `dist/` to `gh-pages` with the `gh-pages` package.

## Context

- Today, `ng deploy --base-href=https://www.aleixferre.com/` uses `angular-cli-ghpages`, a wrapper around the `gh-pages` package, to push the build to the `gh-pages` branch.
- GitHub Pages serves the `gh-pages` branch (legacy build, root folder) with the custom domain `www.aleixferre.com`. The branch currently contains `CNAME` and `404.html`.
- Astro emits its bundles in `dist/_astro/`. GitHub Pages runs Jekyll on branch deploys by default, and Jekyll ignores folders starting with `_` unless a `.nojekyll` file exists.
- The `gh-pages` package skips dotfiles unless `--dotfiles` is passed.

## Acceptance criteria

- [ ] `public/CNAME` contains exactly `www.aleixferre.com`.
- [ ] `public/.nojekyll` exists (empty).
- [ ] `bun run build` produces `dist/CNAME` and `dist/.nojekyll`.
- [ ] `package.json` has `"deploy": "bun run build && gh-pages -d dist --dotfiles -m \"deploy: astro build\""`.
- [ ] The `gh-pages` package is a dev dependency.
- [ ] Publishing to a test branch (`-b gh-pages-test`) puts `CNAME`, `.nojekyll`, `_astro/`, `assets/` and the page folders at the branch root.
- [ ] `bun run deploy` is never run during the migration.

## Technical specification

### Add

- `public/CNAME`, `public/.nojekyll`.
- Dev dependency: `gh-pages`.
- Script `deploy` as above.

### Notes

- `gh-pages` keeps the branch history by default (it adds a commit), so earlier builds stay recoverable.
- It uses the local git remote and credentials, as `angular-cli-ghpages` did.
- `404.html` is produced by `src/pages/404.astro`, so GitHub Pages keeps a custom 404.

## Testing steps

See [MIGRATION.md → E6-T1](../../MIGRATION.md#e6-t1--deploy-script-to-the-gh-pages-branch).
