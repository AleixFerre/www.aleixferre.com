const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatMonth(date: Date): string {
  return monthFormat.format(date);
}
