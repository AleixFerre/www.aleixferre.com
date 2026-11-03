const MS_PER_DAY = 1000 * 60 * 60 * 24;

const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function wholeMonthsBetween(start: Date, end: Date): number {
  const months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth());
  return end.getUTCDate() < start.getUTCDate() ? months - 1 : months;
}

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? '' : 's'}`;
}

export function formatMonth(date: Date): string {
  return monthFormat.format(date);
}

export function yearsSince(start: Date, now = new Date()): number {
  return Math.floor(wholeMonthsBetween(start, now) / 12);
}

export function ageOn(birthDate: Date, now = new Date()): number {
  return yearsSince(birthDate, now);
}

export function formatDuration(start: Date, end: Date): string {
  const totalMonths = wholeMonthsBetween(start, end);

  if (totalMonths < 1) {
    return plural(Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY), 'day');
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [years > 0 && plural(years, 'year'), months > 0 && plural(months, 'month')].filter(Boolean);
  return parts.join(' and ');
}
