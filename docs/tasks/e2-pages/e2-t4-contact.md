# E2-T4 — Contact page with Lordicon

| Epic | Branch | Depends on |
|---|---|---|
| [E2 — Home, About and Contact](../../MIGRATION.md#epic-2--home-about-and-contact) | `migration/e2-t4-contact` | E2-T1 |

## User story

As a visitor, I want the Contact tab with animated icons linking to my CV and profiles, so that I can reach out or learn more in one click.

## Description

Port `contact-content` into `/contact`, and load the Lordicon web component only on this page so its icons animate without adding JavaScript to the other pages.

## Context

- `contact-content.component.html` renders five `<a class="box">` links (CV PDF, GitHub, Itch.io, LinkedIn, `mailto:`), each with a `<lord-icon trigger="in" state="in-reveal" stroke="bold" src="/assets/contact/*.json">`, plus a credits line.
- `src/main.ts` imports `@lordicon/element` after Angular bootstraps and calls `defineElement()`, on every page.
- The component uses `@defer (on viewport)`.

## Acceptance criteria

- [ ] `/contact` shows the five links and the credits line like the live site, on desktop and mobile.
- [ ] Icons play the reveal animation on direct load and when arriving from another tab through a client-side navigation.
- [ ] All links point to the same targets and open in a new tab, as today.
- [ ] No Lordicon or lottie code is downloaded on `/home`, `/projects` or `/about`.

## Technical specification

### Change

- `src/pages/contact.astro`: `TabLayout activeTab={TABS.CONTACT}`, markup ported from `contact-content.component.html` (without `@defer`).
- Processed `<script>` in `contact.astro`:
  ```ts
  import { defineElement } from '@lordicon/element';
  if (!customElements.get('lord-icon')) defineElement();
  ```
- Styles: port `contact-content.component.scss` as scoped SCSS. `lord-icon` is a custom element, so style it through its class (`.icon`).

### Notes

- Astro only includes a page's bundled script on that page. ClientRouter loads it on the first navigation to `/contact`, and the custom element then upgrades every `<lord-icon>` on later visits. The `customElements.get` guard avoids a double registration error.
- Keep the `lottie-web` dependency: `@lordicon/element` uses it as its player.

## Testing steps

See [MIGRATION.md → E2-T4](../../MIGRATION.md#e2-t4--contact-page-with-lordicon).
