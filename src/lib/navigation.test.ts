import { describe, expect, it } from 'vitest';
import { ariaCurrentValue, isCurrent, normalizePath } from './navigation';

describe('normalizePath', () => {
  it('removes trailing slashes', () => {
    expect(normalizePath('/projects/')).toBe('/projects');
    expect(normalizePath('/projects///')).toBe('/projects');
    expect(normalizePath('/projects/threefold')).toBe('/projects/threefold');
  });

  it('keeps the root as a single slash', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('//')).toBe('/');
    expect(normalizePath('')).toBe('/');
  });
});

describe('isCurrent in page mode', () => {
  it('matches the exact path regardless of trailing slashes', () => {
    expect(isCurrent('/projects/threefold/', '/projects/threefold', 'page')).toBe(true);
    expect(isCurrent('/projects/threefold', '/projects/threefold/', 'page')).toBe(true);
  });

  it('does not match nested paths', () => {
    expect(isCurrent('/projects/threefold', '/projects', 'page')).toBe(false);
  });

  it('matches the root only on the root', () => {
    expect(isCurrent('/', '/', 'page')).toBe(true);
    expect(isCurrent('/about', '/', 'page')).toBe(false);
  });
});

describe('isCurrent in section mode', () => {
  it('matches the section itself and its nested paths', () => {
    expect(isCurrent('/projects', '/projects', 'section')).toBe(true);
    expect(isCurrent('/projects/', '/projects', 'section')).toBe(true);
    expect(isCurrent('/projects/threefold', '/projects', 'section')).toBe(true);
    expect(isCurrent('/projects/threefold/', '/projects/', 'section')).toBe(true);
  });

  it('does not match paths that only share a prefix', () => {
    expect(isCurrent('/projects-archive', '/projects', 'section')).toBe(false);
    expect(isCurrent('/about', '/projects', 'section')).toBe(false);
  });

  it('does not treat the root as a prefix of every path', () => {
    expect(isCurrent('/', '/', 'section')).toBe(true);
    expect(isCurrent('/about', '/', 'section')).toBe(false);
  });
});

describe('ariaCurrentValue', () => {
  it('maps the mode to an aria-current value', () => {
    expect(ariaCurrentValue('page')).toBe('page');
    expect(ariaCurrentValue('section')).toBe('true');
  });
});
