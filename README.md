# Aleix Ferré Portfolio

This is the source code for my personal portfolio website, [www.aleixferre.com](https://www.aleixferre.com). It showcases my projects, experience, and skills.

The site is built with [Astro](https://astro.build) as fully static pages, with SCSS styles and a few small client scripts (star background, tab transitions, project gallery lightbox and Lordicon icons).

## Requirements

- [Node.js](https://nodejs.org) 24 (see `.nvmrc`)
- [Bun](https://bun.sh)

## Commands

| Command | Description |
|---|---|
| `bun install` | Install dependencies |
| `bun run dev` | Start the dev server at http://localhost:4321 |
| `bun run build` | Type-check with `astro check` and build the static site into `dist/` |
| `bun run preview` | Serve `dist/` at http://localhost:4321 to test the production build |
| `bun run deploy` | Build the site and publish `dist/` to the `gh-pages` branch (see [Deployment](#deployment)) |

## Project structure

| Path | Contents |
|---|---|
| `src/pages/` | One page per route: `/`, `/projects`, `/projects/<id>`, `/about`, `/contact` |
| `src/layouts/` | Base HTML head and the tab shell shared by every page |
| `src/components/` | Reusable components (gallery, images, metrics, star background) |
| `src/data/` | Projects, about content and tabs, as plain TypeScript |
| `src/assets/` | Profile, project, company logo and flag images, resized and optimized at build time by Astro's `<Image>` |
| `public/assets/` | SVG icons, Lordicon animations, the CV, the favicon and the social preview image, served as `/assets/...` |
| `src/lib/assets.ts` | Image widths, sizes and quality, and the responsive background helper |
| `src/lib/dates.ts` | Month, age, years-since and duration formatting (UTC) |
| `src/lib/breakpoints.ts` | Mobile breakpoint shared by the Astro config, SCSS and responsive images |

## Adding a project

1. Add the `.webp` images under `src/assets/projects/<id>/`.
2. Add the project to `src/data/projects.ts` and include it in `ALL_PROJECTS` (and `FEATURED_PROJECTS` to show it on the home page).

## Deployment

GitHub Pages serves the `gh-pages` branch with the custom domain `www.aleixferre.com`. Deploying is always a manual command; nothing deploys automatically.

`bun run deploy` runs `bun run build` and publishes `dist/` to `gh-pages` with the [`gh-pages`](https://github.com/tschaub/gh-pages) package. Dotfiles are included, so `CNAME` (custom domain) and `.nojekyll` (needed for the `_astro/` folder) reach the branch. Each deploy adds a commit, so earlier builds stay in the branch history.

### Regular deploy

From an up-to-date `main`:

```sh
git checkout main
git pull
bun install
bun run deploy
```

### One-time cutover from Angular

Before the first Astro deploy, tag the current Angular build as the rollback point:

```sh
git fetch origin gh-pages
git tag pre-astro origin/gh-pages
git push origin pre-astro
```

Then:

1. From an up-to-date `main`: `bun install && bun run deploy`.
2. GitHub > Settings > Pages: check the source is still "Deploy from a branch", `gh-pages`, `/ (root)`, and the custom domain is still `www.aleixferre.com` with "Enforce HTTPS" on.

### Rollback

> [!WARNING]
> This force-pushes and overwrites the `gh-pages` branch. Any deploy made after the `pre-astro` tag disappears from the branch.

```sh
git push origin pre-astro:gh-pages --force
```

GitHub Pages republishes the Angular build from the restored branch. Afterwards, repeat the Pages settings check from the cutover.
