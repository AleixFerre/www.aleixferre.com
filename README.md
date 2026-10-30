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
| `bun run generate:thumbs` | Create or refresh the `-thumb.webp` thumbnails for images in `public/assets/profile` and `public/assets/projects` |

## Project structure

| Path | Contents |
|---|---|
| `src/pages/` | One page per route: `/home`, `/projects`, `/projects/<id>`, `/about`, `/contact` |
| `src/layouts/` | Base HTML head and the tab shell shared by every page |
| `src/components/` | Reusable components (gallery, images, metrics, star background) |
| `src/data/` | Projects, about content and tabs, as plain TypeScript |
| `public/assets/` | Images, icons, Lordicon animations and the CV, served as `/assets/...` |
| `scripts/` | Thumbnail generation script |

## Adding a project

1. Add the images under `public/assets/projects/<id>/`.
2. Run `bun run generate:thumbs` to create the thumbnails.
3. Add the project to `src/data/projects.ts` and include it in `ALL_PROJECTS` (and `FEATURED_PROJECTS` to show it on the home page).
