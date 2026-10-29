# Migration Plan: Angular → Astro

Goal: rebuild www.aleixferre.com as a static Astro site with the same look, behaviour and URLs, shipping real HTML per route and almost no JavaScript.

## Ground rules

> [!CAUTION]
> **NEVER deploy the site until the migration is fully developed.** No `bun run deploy`, no `gh-pages` publish, no push to the `gh-pages` branch, until all six epics are merged into `epic/migration-to-astro`, that branch is merged into `main`, and the cutover in "Final merge to main" is started by the owner. Claude never deploys; the cutover is always done manually by the owner.

### Branching and PRs

```
main
 └─ epic/migration-to-astro                 umbrella branch (epic of epics)
     ├─ migration/e1-foundation             epic branch  ──PR──▶ epic/migration-to-astro
     │   ├─ migration/e1-t1-scaffold        task branch  ──merge──▶ migration/e1-foundation
     │   └─ ...
     ├─ migration/e2-pages
     └─ ...
```

- `epic/migration-to-astro` is the umbrella branch. It collects every epic and is merged into `main` only once, at the end (see "Final merge to main").
- Each epic has its own branch created from `epic/migration-to-astro`: `migration/e<N>-<slug>` (e.g. `migration/e1-foundation`).
- Each task has its own branch created from its epic branch: `migration/e<N>-t<M>-<slug>` (e.g. `migration/e1-t1-scaffold`).
- Tasks have **no PR**. When a task is done, its branch is merged (`--no-ff`) into the epic branch, then the next task starts from the updated epic branch.
- When every task of an epic is merged, a single **epic PR** is opened from the epic branch to `epic/migration-to-astro`. This is the only kind of PR that gets reviewed and manually tested.
- The next epic branch is created from `epic/migration-to-astro` only after the previous epic PR is merged.
- `main` is never touched during the migration.

### Epic PR content

```
## Description
<summary of the epic>

## E<N>-T<M> — <task title>
<what changed and why, 2–5 lines>

### Testing steps
1. ...
2. ...

<repeat for each task in the epic>
```

### Testing

- No automated tests are written. All verification is manual, following the testing steps in each epic PR.
- The live site (https://www.aleixferre.com, served from the `gh-pages` branch) stays untouched until the cutover and is the **reference** for visual and behavioural comparison.
- Never run any deploy command before the cutover in "Final merge to main" (see the caution above). The only exception is the E6-T1 dry run, which publishes to the throwaway `gh-pages-test` branch and never to `gh-pages`.

### Commands used in testing steps

| Command | Purpose |
|---|---|
| `bun install` | Install dependencies |
| `bun run dev` | Dev server at http://localhost:4321 |
| `bun run build` | Static build into `dist/` |
| `bun run preview` | Serve `dist/` at http://localhost:4321 (production-like) |

### Target architecture

- Astro (latest stable) with static output, `build.format: 'directory'`, `site: 'https://www.aleixferre.com'`.
- SCSS kept (via `sass`), styles ported per component as scoped `<style lang="scss">`.
- Content data kept as plain TypeScript in `src/data/`.
- Static assets moved from `src/assets/` to `public/assets/`, so every existing `/assets/...` path keeps working.
- URLs preserved: `/home`, `/projects`, `/projects/<id>`, `/about`, `/contact`; `/` redirects to `/home`.
- Each tab is its own page. The accordion animation between tabs is reproduced with Astro View Transitions (`<ClientRouter />`).
- Client JavaScript only for: star background, tab transition, project gallery lightbox, Lordicon icons.

---

## Epic 1 — Foundation and tab shell

**Manual test session:** the app builds, the four-column shell renders on desktop and mobile, tab navigation works with the sliding animation, the star background animates and survives navigation, unknown URLs redirect.

### E1-T1 — Replace Angular toolchain with Astro

User story: [tasks/e1-foundation/e1-t1-scaffold.md](tasks/e1-foundation/e1-t1-scaffold.md)

**Description:** Remove Angular (dependencies, `angular.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `src/main.ts`, `src/index.html`, vitest/jsdom, `angular-cli-ghpages`) and scaffold an Astro project. Move `src/assets/` to `public/assets/`, `src/robots.txt` to `public/robots.txt`. Keep `scripts/generate-image-thumbs.mjs` working against `public/assets`. Angular components under `src/app/` stay in place for reference until they are ported, and are deleted in E5-T3. A placeholder page proves the pipeline works.

**Testing steps:**
1. Delete `node_modules`, run `bun install`; it finishes without errors.
2. Run `bun run dev` and open http://localhost:4321/; a placeholder page renders.
3. Open http://localhost:4321/assets/profile/yo.webp and http://localhost:4321/assets/contact/cv.pdf; both load.
4. Run `bun run build`; it succeeds and `dist/` contains `assets/` and `robots.txt`.
5. Run `bun run generate:thumbs`; it completes and reports thumbnails up to date (or regenerates them under `public/assets`).

### E1-T2 — Base layout, global styles and fonts

User story: [tasks/e1-foundation/e1-t2-base-layout.md](tasks/e1-foundation/e1-t2-base-layout.md)

**Description:** Create `src/layouts/BaseLayout.astro` with everything from the old `index.html` head (charset, viewport, title, description, keywords, author, Open Graph, Twitter card, Google Fonts, favicon, ahrefs analytics). Title and description become props with the current values as defaults. Port `src/styles.scss` as the global stylesheet.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/.
2. The tab title is "Aleix Ferré - Game Designer & Programmer" and the favicon shows.
3. Text renders in Fira Code (compare with the live site).
4. View page source: meta description, OG and Twitter tags are present in the HTML (not injected by JS).
5. Resize the window below 1000px wide: the base font size shrinks as on the live site.

### E1-T3 — Data layer

User story: [tasks/e1-foundation/e1-t3-data-layer.md](tasks/e1-foundation/e1-t3-data-layer.md)

**Description:** Move `projects.model.ts`, `about-content.model.ts` and the tabs model (`app.model.ts`) into `src/data/` as framework-free TypeScript. Keep `withThumbs`, `FEATURED_PROJECTS`, `ALL_PROJECTS` and the `Project` / `AboutContent` types unchanged. Add a temporary debug list on the placeholder page that prints the project names, so the data can be checked.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/.
2. The placeholder page lists every project in the same order as the projects grid on the live site.
3. `bun run build` succeeds with no TypeScript errors.

### E1-T4 — Tab shell and routes

User story: [tasks/e1-foundation/e1-t4-tab-shell.md](tasks/e1-foundation/e1-t4-tab-shell.md)

**Description:** Create `src/layouts/TabLayout.astro`, which reproduces `app.component.html` and its styles: four columns with vertical titles on desktop and horizontal titles on mobile. The active tab's panel is expanded and the others are collapsed. Titles become real links (`<a href="/home">` …). Add pages `/home`, `/projects`, `/about`, `/contact` with placeholder content, a `/` → `/home` redirect, and a `404` page that redirects to `/projects` for unknown `/projects/...` URLs and to `/home` otherwise. Remove the debug list from E1-T3.

**Testing steps:**
1. `bun run build && bun run preview`.
2. Open http://localhost:4321/; it ends up on `/home` with HOME expanded and in bold.
3. Click PROJECTS, ABOUT, CONTACT: the URL changes and the right panel is expanded each time.
4. Use browser back/forward: the expanded panel follows the URL.
5. Open http://localhost:4321/about directly: ABOUT is expanded on first paint.
6. Open http://localhost:4321/does-not-exist: you land on `/home`.
7. Open http://localhost:4321/projects/does-not-exist: you land on `/projects`.
8. Resize below 1000px (or use DevTools mobile emulation): the tabs stack vertically with horizontal titles, matching the live site.
9. Hover a tab title: the text-shadow hover effect appears.

### E1-T5 — Star background

User story: [tasks/e1-foundation/e1-t5-star-background.md](tasks/e1-foundation/e1-t5-star-background.md)

**Description:** Port `background-stars` to `src/components/BackgroundStars.astro`: a canvas plus a small inline script with the same star count, sizes, speeds and bouncing. Include it in `TabLayout` with `transition:persist` so it doesn't restart between tabs. Handle window resize.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/home.
2. Stars drift slowly behind the content, as on the live site.
3. Resize the window: the canvas fills the new size, with no stretching or scrollbars.
4. Switch tabs a few times (after E1-T6 is merged into the epic branch, the stars keep their positions instead of resetting).

### E1-T6 — Animated tab switching

User story: [tasks/e1-foundation/e1-t6-tab-transitions.md](tasks/e1-foundation/e1-t6-tab-transitions.md)

**Description:** Enable Astro View Transitions (`<ClientRouter />`) in `TabLayout` and define transitions so that switching tabs animates the collapsing and expanding panels with the same 0.3s ease-in-out feel as today. Respect `prefers-reduced-motion`.

**Testing steps:**
1. `bun run build && bun run preview`, open http://localhost:4321/home.
2. Click each tab: the old panel collapses and the new one expands smoothly, with no full white flash. Compare with the live site.
3. Stars keep moving continuously across tab switches.
4. In DevTools > Rendering, enable "prefers-reduced-motion: reduce": tab switches happen without animation.
5. Back/forward navigation also animates and lands on the correct tab.
6. Repeat steps 2 and 5 at mobile width.

### E1-T7 — Node 24 LTS and Astro 7

User story: [tasks/e1-foundation/e1-t7-astro-7.md](tasks/e1-foundation/e1-t7-astro-7.md)

**Description:** Pin Node to the latest LTS (24.22.1) in `.nvmrc` and upgrade Astro from 6.4.8 to 7.4.2, which requires Node ≥ 22.23.4.

**Testing steps:**
1. `nvm install 24.22.1 && nvm use 24.22.1`; `node --version` prints `v24.22.1`.
2. Delete `node_modules`, run `bun install`; `astro` 7.4.2 is installed.
3. `bun run build` succeeds with 0 errors.
4. Repeat the E1-T4 and E1-T6 testing steps in `bun run preview`: same behaviour as on Astro 6.

---

## Epic 2 — Home, About and Contact

**Manual test session:** the three non-project tabs match the live site in content, layout and interactions, on desktop and mobile.

### E2-T1 — Shared components

User story: [tasks/e2-pages/e2-t1-shared-components.md](tasks/e2-pages/e2-t1-shared-components.md)

**Description:** Port `metric-container` and `icon-text` to `src/components/MetricContainer.astro` and `src/components/IconText.astro` with the same props and styles. Port the `appear` entry animation previously triggered by `@defer` as a CSS class.

**Testing steps:**
1. `bun run build` succeeds.
2. Components are verified visually through E2-T2 and E2-T3 (no standalone page).

### E2-T2 — Home page

User story: [tasks/e2-pages/e2-t2-home.md](tasks/e2-pages/e2-t2-home.md)

**Description:** Port `home-content` into `/home`: profile box linking to `/about`, the two experience metrics, the "Specialized In" icons, and the featured projects linking to `/projects/<id>`. The years of experience are calculated when the site is built.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/home and the live site side by side.
2. Profile picture, "Game Designer & Developer", Experience (Indie Games and Web & Mobile years), Specialized In (Unity, Game Design, Project Management) all match.
3. Featured projects show the same thumbnails, background images and large/small sizes.
4. Click the profile box: navigates to `/about`.
5. Click each featured project: navigates to `/projects/<id>` (the page shows the placeholder until Epic 3).
6. Check mobile width matches the live site.

### E2-T3 — About page

User story: [tasks/e2-pages/e2-t3-about.md](tasks/e2-pages/e2-t3-about.md)

**Description:** Port `about-content` into `/about`: hero with pills and HTML description, profile with age (calculated at build), focus list, education, professional experience and languages with logos and flags.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/about and the live site side by side.
2. All sections and texts match, including bold text in the hero description and focus list.
3. Company logos and language flags display as on the live site.
4. The age displayed is correct.
5. Check mobile width matches the live site.

### E2-T4 — Contact page with Lordicon

User story: [tasks/e2-pages/e2-t4-contact.md](tasks/e2-pages/e2-t4-contact.md)

**Description:** Port `contact-content` into `/contact`: CV download, GitHub, Itch.io, LinkedIn, Email and the credits line. Load `@lordicon/element` only on this page, through a client script, so the animated icons play their "in" reveal. Remove the unused `lottie-web` dependency.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/contact.
2. All five boxes show their animated icons, which play the reveal animation on load.
3. Navigate Home → Contact through the tab bar: the icons still animate (works after a View Transition, not only on full load).
4. "Download CV" opens `cv.pdf` in a new tab; GitHub, Itch.io and LinkedIn open the correct profiles in new tabs; Email opens a mail client to `afj.99@hotmail.com`.
5. Credits links work.
6. DevTools > Network on `/home`: no Lordicon script is downloaded.

---

## Epic 3 — Projects

**Manual test session:** the projects grid, every project detail page and the image lightbox match the live site.

### E3-T1 — Projects grid

User story: [tasks/e3-projects/e3-t1-projects-grid.md](tasks/e3-projects/e3-t1-projects-grid.md)

**Description:** Port the grid view of `projects-content` into `/projects`: every project tile with its thumbnail, background image and size class, each linking to `/projects/<id>`.

**Testing steps:**
1. `bun run dev`, open http://localhost:4321/projects and the live site's Projects tab side by side.
2. Same tiles, same order, same large/wide sizes.
3. Click a tile: navigates to `/projects/<id>`.
4. Check mobile width matches the live site.

### E3-T2 — Project detail pages

User story: [tasks/e3-projects/e3-t2-project-details.md](tasks/e3-projects/e3-t2-project-details.md)

**Description:** Generate one static page per project with `getStaticPaths` at `/projects/<id>`. Port `projects-details` except the gallery: the side list with the current project highlighted, "See All" back button, sticky action bar (Visit Project, optional additional link, mobile icon buttons), description, details, "Good for you if", "What I learned", and the project timeline with dates formatted as "Month yyyy" and the duration text. Normalize every relative asset path (e.g. `assets/back.svg`) to absolute so it works on nested URLs.

**Testing steps:**
1. `bun run build && bun run preview`.
2. For every project in the grid, open its page and compare with the live site: title, buttons, description, details, lists and timeline text (including duration and "In Progress" where applicable).
3. The current project is highlighted in the side list; clicking another one switches to it.
4. "See All" returns to `/projects`.
5. "Visit Project" and the additional link (e.g. Masters Arena report) open in a new tab.
6. Reload `/projects/threefold` directly: the page loads with the correct project (no redirect).
7. At mobile width: the side list is hidden, the back icon and icon-only action buttons appear, and the action bar stays sticky while scrolling.

### E3-T3 — Gallery and lightbox

User story: [tasks/e3-projects/e3-t3-gallery-lightbox.md](tasks/e3-projects/e3-t3-gallery-lightbox.md)

**Description:** Replace `ng-gallery` with a lightweight lightbox (PhotoSwipe) loaded only on project pages. Gallery grid columns are handled in CSS: `min(max(images, 2), 4)` on desktop, and the existing horizontal swipe carousel below 1000px. Thumbnails are shown in the grid and full images in the lightbox, with keyboard navigation and looping.

**Testing steps:**
1. `bun run dev`, open a project with several images (e.g. http://localhost:4321/projects/masters-arena).
2. The grid shows thumbnails with the same column count as the live site; at mobile width it becomes a horizontal swipe carousel, as on the live site.
3. Click an image: the lightbox opens with the full-size image.
4. Arrow keys go to the next/previous image, and it loops from last to first; Esc closes it.
5. On mobile emulation, swipe changes images and the close button works.
6. Navigate to another project through the side list and open its lightbox: it shows that project's images, not the previous ones.
7. DevTools > Network on `/home`: no lightbox script is downloaded.

---

## Epic 4 — SEO and metadata

**Manual test session:** each page has correct metadata, previews and a sitemap; crawlers see real content.

### E4-T1 — Per-page metadata

User story: [tasks/e4-seo/e4-t1-page-metadata.md](tasks/e4-seo/e4-t1-page-metadata.md)

**Description:** Give each page its own title, description, canonical URL and Open Graph/Twitter tags, using absolute URLs on `https://www.aleixferre.com` (fixing the old `aleixferre.github.io` values). Project pages use the project name, description and main image.

**Testing steps:**
1. `bun run build`.
2. Open `dist/home/index.html`, `dist/about/index.html` and `dist/projects/threefold/index.html` in an editor: each has a distinct `<title>`, description, `canonical` and `og:url` on `https://www.aleixferre.com/...`.
3. The project page's `og:image` points to that project's image.
4. `bun run preview`, open each page with JavaScript disabled (DevTools > Settings > Debugger > Disable JavaScript): the content is still visible.

### E4-T2 — Sitemap and robots.txt

User story: [tasks/e4-seo/e4-t2-sitemap.md](tasks/e4-seo/e4-t2-sitemap.md)

**Description:** Add `@astrojs/sitemap` and point `robots.txt` to `https://www.aleixferre.com/sitemap-index.xml`.

**Testing steps:**
1. `bun run build`.
2. `dist/sitemap-index.xml` exists and links to a sitemap listing `/home`, `/projects`, every `/projects/<id>`, `/about` and `/contact` on `https://www.aleixferre.com`.
3. `dist/robots.txt` references the sitemap URL above.
4. `/404` is not in the sitemap.

---

## Epic 5 — Performance and cleanup

**Manual test session:** Lighthouse scores of the preview build beat the live site; no Angular leftovers remain.

### E5-T1 — Image loading

User story: [tasks/e5-performance/e5-t1-image-loading.md](tasks/e5-performance/e5-t1-image-loading.md)

**Description:** Add `width`/`height`, `loading="lazy"` and `decoding="async"` to every image below the fold, and `fetchpriority="high"` to the main above-the-fold image of each page. Keep the existing thumbnail pipeline.

**Testing steps:**
1. `bun run build && bun run preview`.
2. On `/home`, `/projects` and a project page, scroll slowly: images appear without layout jumps.
3. DevTools > Network, filter Img, reload `/projects/masters-arena`: gallery images further down load only when scrolled near them.
4. Lighthouse (mobile) on `/home`: no "Image elements do not have explicit width and height" warning.

### E5-T2 — Self-hosted fonts

User story: [tasks/e5-performance/e5-t2-self-hosted-fonts.md](tasks/e5-performance/e5-t2-self-hosted-fonts.md)

**Description:** Replace the Google Fonts stylesheet with self-hosted fonts for Fira Code and PT Sans, including only the weights in use. Rubik and the italic variants are dropped because nothing uses them. Remove the Google Fonts preconnects.

**Testing steps:**
1. `bun run build && bun run preview`.
2. All pages look identical to before (compare headings, body text and metrics against the live site).
3. DevTools > Network: no requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
4. Throttle to "Slow 4G" and reload: text is visible immediately with a fallback font, then swaps.

### E5-T3 — Remove Angular leftovers

User story: [tasks/e5-performance/e5-t3-angular-cleanup.md](tasks/e5-performance/e5-t3-angular-cleanup.md)

**Description:** Delete `src/app/`, `.angular/`, stale `dist/`, Angular entries in `.gitignore`, `.vscode` launch/tasks for `ng`, and any unused dependency. Update `README.md` with the new commands.

**Testing steps:**
1. Delete `node_modules`, `bun install`, `bun run build`: succeeds.
2. Search the repo for `@angular`: no results outside `bun.lock` history.
3. Click through every page in `bun run preview`: nothing is broken.
4. Run Lighthouse (mobile) on `/home` and a project page for both the preview build and the live site; the preview build scores equal or higher in Performance and SEO. Paste the scores in the epic PR.

---

## Epic 6 — Deployment

**Manual test session:** `bun run deploy` builds the site and publishes it to the `gh-pages` branch with `CNAME` and `.nojekyll` included, so GitHub Pages keeps serving it from that branch with the custom domain. The Pages settings don't change.

### E6-T1 — Deploy script to the gh-pages branch

User story: [tasks/e6-deployment/e6-t1-deploy-script.md](tasks/e6-deployment/e6-t1-deploy-script.md)

**Description:** Add `public/CNAME` (`www.aleixferre.com`) and `public/.nojekyll` (required because Astro outputs an `_astro/` folder, which Jekyll would otherwise ignore). Replace the old `ng deploy` script with `bun run deploy`, which runs `astro build` and publishes `dist/` to the `gh-pages` branch using the `gh-pages` package with dotfiles included. The branch history is kept, so a previous deploy can be restored. The script never runs automatically: deploying stays a manual command, as today.

**Testing steps:**
1. Run `bun run build`; `dist/CNAME` exists and contains exactly `www.aleixferre.com`, and `dist/.nojekyll` exists.
2. Dry run without touching the live site: `bunx gh-pages -d dist --dotfiles -b gh-pages-test`. On GitHub, open the `gh-pages-test` branch: `CNAME`, `.nojekyll`, `_astro/`, `assets/`, `home/index.html` and `projects/threefold/index.html` are at the root of the branch.
3. Delete the test branch: `git push origin --delete gh-pages-test`.

### E6-T2 — Deployment and rollback guide

User story: [tasks/e6-deployment/e6-t2-deployment-guide.md](tasks/e6-deployment/e6-t2-deployment-guide.md)

**Description:** Add a "Deployment" section to `README.md` with the cutover and rollback steps listed in "Final merge to main".

**Testing steps:**
1. Read the "Deployment" section of `README.md`; the deploy and rollback steps are clear and match the commands in `package.json`.

---

## Final merge to main

When all six epic PRs are merged into `epic/migration-to-astro`, a single PR is opened from `epic/migration-to-astro` to `main`. Its body lists the six epic PRs; no new code is added. Merging it doesn't change the live site; only `bun run deploy` does.

Before the first Astro deploy, tag the current Angular build as the rollback point:

```
git fetch origin gh-pages
git tag pre-astro origin/gh-pages
git push origin pre-astro
```

Cutover (manual, done by you from an up-to-date `main`):
1. `bun install && bun run deploy`.
2. GitHub > Settings > Pages: the source is still "Deploy from a branch", `gh-pages`, `/`, and the custom domain is still `www.aleixferre.com` with HTTPS enforced.

Rollback:
1. `git push origin pre-astro:gh-pages --force` restores the Angular build on the `gh-pages` branch, and Pages republishes it.

**Testing steps (on the live site after cutover):**
1. The "pages build and deployment" run in GitHub > Actions succeeds.
2. On GitHub, the `gh-pages` branch contains `CNAME` with `www.aleixferre.com` and `.nojekyll`.
3. https://www.aleixferre.com opens `/home` over HTTPS.
4. https://aleixferre.com redirects to `https://www.aleixferre.com`.
5. Direct loads of `/projects`, `/projects/threefold`, `/about`, `/contact` work, return status 200 (DevTools > Network) and show the correct tab.
6. An unknown URL redirects to `/home`.
7. Share `https://www.aleixferre.com/projects/threefold` in a link preview tool (e.g. opengraph.xyz): the project title and image appear.
8. Run Lighthouse on the live site and compare with the scores saved in Epic 5.
