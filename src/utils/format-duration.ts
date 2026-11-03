const MS_PER_DAY = 1000 * 60 * 60 * 24;

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? '' : 's'}`;
}

export function formatDuration(start: Date, end: Date): string {
  let totalMonths = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth());
  if (end.getUTCDate() < start.getUTCDate()) totalMonths--;

  if (totalMonths < 1) {
    return plural(Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY), 'day');
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [years > 0 && plural(years, 'year'), months > 0 && plural(months, 'month')].filter(Boolean);
  return parts.join(' and ');
}
