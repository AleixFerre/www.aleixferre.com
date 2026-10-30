const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function yearsSince(start: Date, now = new Date()): number {
  return Math.floor((now.getTime() - start.getTime()) / MS_PER_YEAR);
}
