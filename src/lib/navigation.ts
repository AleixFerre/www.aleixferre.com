export type CurrentMode = 'page' | 'section';

export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

export const isCurrent = (path: string, href: string, mode: CurrentMode) => {
  const current = normalizePath(path);
  const target = normalizePath(href);
  return current === target || (mode === 'section' && current.startsWith(`${target}/`));
};

export const ariaCurrentValue = (mode: CurrentMode) => (mode === 'page' ? 'page' : 'true');
