import { swapFunctions, type TransitionBeforeSwapEvent } from 'astro:transitions/client';
import { normalizePath } from '../lib/navigation';
import { scrollCurrentIntoView, syncCurrentLinks } from './current-links';

const STYLES = 'link[rel=stylesheet], style';
const CURRENT_PANEL = '[data-tab-link][aria-current] + [data-tab-panel]';

const isPlainClick = (event: MouseEvent) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

const isSamePage = (to: URL) =>
  to.origin === location.origin &&
  normalizePath(to.pathname) === normalizePath(location.pathname) &&
  to.search === location.search &&
  to.hash === location.hash;

const preventSamePageNavigation = (event: MouseEvent) => {
  if (!isPlainClick(event)) return;

  const link = (event.target as Element | null)?.closest?.('a');
  if (!link || !link.href || link.hasAttribute('download')) return;
  if (link.target && link.target !== '_self') return;

  if (isSamePage(new URL(link.href, location.href))) event.preventDefault();
};

const keepLoadedStyles = (newDocument: Document) => {
  const incoming = [...newDocument.head.querySelectorAll(STYLES)];
  for (const style of document.head.querySelectorAll(STYLES)) {
    if (!incoming.some((el) => el.isEqualNode(style))) newDocument.head.append(style.cloneNode(true));
  }
};

const isLoaded = (script: HTMLScriptElement) =>
  [...document.scripts].some((loaded) =>
    script.src ? loaded.src === script.src : loaded.textContent === script.textContent,
  );

const appendNewScripts = (newDocument: Document) => {
  for (const script of newDocument.body.querySelectorAll<HTMLScriptElement>(':scope > script')) {
    if (!isLoaded(script)) document.body.append(script);
  }
};

const swapRegion = (content: Element, newContent: Element) => {
  const newRegion = newContent.querySelector<HTMLElement>('[data-swap-region]');
  const region = newRegion && content.querySelector(`[data-swap-region="${newRegion.dataset.swapRegion}"]`);
  if (!newRegion || !region) return false;

  region.replaceWith(newRegion);
  return true;
};

const resetScroll = (panel: HTMLElement) => {
  for (const element of [panel, ...panel.querySelectorAll('[data-reset-scroll]')]) element.scrollTop = 0;
};

const swapPanelContent = (panel: HTMLElement, newContent: Element) => {
  const content = panel.querySelector('[data-tab-content]');

  if (!content) panel.replaceChildren(newContent);
  else if (!swapRegion(content, newContent)) content.replaceWith(newContent);
  resetScroll(panel);
};

const swapCurrentPanel = (newDocument: Document) => {
  const newPanel = newDocument.querySelector<HTMLElement>(CURRENT_PANEL);
  const newContent = newPanel?.querySelector('[data-tab-content]');
  const panel = newPanel && document.querySelector<HTMLElement>(`[data-tab-panel="${newPanel.dataset.tabPanel}"]`);
  if (!newContent || !panel) return;

  swapPanelContent(panel, newContent);
};

const replaceDefaultSwap = (event: TransitionBeforeSwapEvent) => {
  event.swap = () => {
    swapFunctions.deselectScripts(event.newDocument);
    swapFunctions.swapRootAttributes(event.newDocument);
    keepLoadedStyles(event.newDocument);
    swapFunctions.swapHeadElements(event.newDocument);
    swapCurrentPanel(event.newDocument);
    appendNewScripts(event.newDocument);
  };
};

const clearIfStale = (panel: HTMLElement) => {
  if (!panel.matches(CURRENT_PANEL)) panel.replaceChildren();
};

const clearAfterCollapse = (panel: HTMLElement) => {
  const transitions = panel.getAnimations();
  if (transitions.length === 0) return clearIfStale(panel);

  Promise.all(transitions.map((transition) => transition.finished)).then(
    () => clearIfStale(panel),
    () => {},
  );
};

const clearStalePanels = () => {
  for (const panel of document.querySelectorAll<HTMLElement>('[data-tab-panel]')) {
    if (!panel.matches(CURRENT_PANEL)) clearAfterCollapse(panel);
  }
};

const syncAfterSwap = () => {
  syncCurrentLinks();
  clearStalePanels();
};

document.addEventListener('click', preventSamePageNavigation, { capture: true });
document.addEventListener('astro:before-swap', replaceDefaultSwap);
document.addEventListener('astro:after-swap', syncAfterSwap);
document.addEventListener('astro:page-load', scrollCurrentIntoView);
