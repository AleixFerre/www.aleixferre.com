# E1-T1 — Replace Angular toolchain with Astro

| Epic | Branch | Depends on |
|---|---|---|
| [E1 — Foundation and tab shell](../../MIGRATION.md#epic-1--foundation-and-tab-shell) | `migration/e1-t1-scaffold` | — |

## User story

As the site owner, I want the project to build with Astro instead of Angular, so that every later task can produce static HTML pages.

## Description

Remove the Angular build toolchain and its runtime dependencies, scaffold an Astro project in place, and move static files to Astro's `public/` folder. A placeholder page proves that dev, build and preview work. The Angular source under `src/app/` stays in the repo, untouched and excluded from compilation, as the reference for porting.

## Context

- The site is an Angular 22 SPA built with `@angular/build:application` and deployed with `angular-cli-ghpages` (see `angular.json`, `package.json`).
- Static files live in `src/assets/` and are copied to `/assets/` by the Angular `assets` config. All templates and data reference them as `/assets/...` (and a few as `assets/...`).
- Bun is the package manager (`bun.lock`, `bunfig.toml` with `peer = false`). Node version is pinned in `.nvmrc` (22.12).
- `scripts/generate-image-thumbs.mjs` creates `-thumb.webp` files next to the originals under `src/assets/profile` and `src/assets/projects`.
- The live site is served from the `gh-pages` branch and must not be deployed during the migration.

## Acceptance criteria

- [ ] `bun install` succeeds on a clean checkout with no Angular packages installed.
- [ ] `bun run dev` serves a placeholder page at http://localhost:4321/.
- [ ] `bun run build` succeeds and writes a static site to `dist/`.
- [ ] `bun run preview` serves `dist/`.
- [ ] Every file previously under `src/assets/` is reachable at the same `/assets/...` URL.
- [ ] `/robots.txt` is served with the same content as before.
- [ ] `bun run generate:thumbs` reads and writes under `public/assets/`.
- [ ] `src/app/` is still present but not compiled or type-checked.
- [ ] There is no `deploy` script in `package.json` (it comes back in E6-T1).

## Technical specification

### Remove

- Files: `angular.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `src/main.ts`, `src/index.html`. `src/styles.scss` stays until E1-T2 moves it.
- Dependencies: every `@angular/*` package, `zone.js`, `rxjs`, `tslib`, `ng-gallery`, `@unpic/angular`, `angular-cli-ghpages`, `vitest`, `jsdom`.
- Scripts: `ng`, `start`, `watch`, `test`, `deploy`.

### Add

- Dependencies: `astro`, `sass` (dev), `@astrojs/check` and `typescript` (dev).
- Keep: `@lordicon/element`, `lottie-web` (used in E2-T4), `sharp` (thumbnail script, image sizes).
- `astro.config.mjs`:
  ```js
  export default defineConfig({
    site: 'https://www.aleixferre.com',
    output: 'static',
    trailingSlash: 'ignore',
    build: { format: 'directory' },
  });
  ```
- `tsconfig.json` extending `astro/tsconfigs/strict`, with `"exclude": ["dist", "src/app"]`.
- `src/pages/index.astro`: minimal placeholder HTML.
- Scripts:
  ```json
  "dev": "astro dev",
  "build": "astro check && astro build",
  "preview": "astro preview",
  "generate:thumbs": "node scripts/generate-image-thumbs.mjs"
  ```

### Move

- `src/assets/**` → `public/assets/**` with `git mv`, so history is preserved.
- `src/robots.txt` → `public/robots.txt`.

### Change

- `scripts/generate-image-thumbs.mjs`: `ROOTS = ['public/assets/profile', 'public/assets/projects']`.
- `.gitignore`: add `.astro/`.

### Notes

- `src/app/**` keeps importing `@angular/*`, which no longer exists. That's fine because it's excluded from `tsconfig.json` and never imported by Astro. It's deleted in E5-T3.
- Astro serves `public/` at the site root in both dev and build, so no asset URL changes.

## Testing steps

See [MIGRATION.md → E1-T1](../../MIGRATION.md#e1-t1--replace-angular-toolchain-with-astro).
