import { ariaCurrentValue, isCurrent, type CurrentMode } from '../lib/navigation';

const currentMode = (link: HTMLElement): CurrentMode => (link.dataset.current === 'section' ? 'section' : 'page');

export const syncCurrentLinks = () => {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-current]')) {
    const mode = currentMode(link);
    if (isCurrent(location.pathname, link.pathname, mode)) link.setAttribute('aria-current', ariaCurrentValue(mode));
    else link.removeAttribute('aria-current');
  }
};

export const scrollCurrentIntoView = () => {
  for (const link of document.querySelectorAll('[data-scroll-current] [aria-current]')) {
    link.scrollIntoView({ block: 'nearest' });
  }
};
