import { describe, expect, it } from 'vitest';
import { ageOn, formatDuration, formatMonth, yearsSince } from './dates';

const utc = (value: string) => new Date(`${value}T00:00:00Z`);

describe('formatMonth', () => {
  it('formats month and year in UTC', () => {
    expect(formatMonth(utc('2024-03-01'))).toBe('March 2024');
    expect(formatMonth(new Date('2024-02-29T23:30:00Z'))).toBe('February 2024');
  });
});

describe('ageOn', () => {
  const birthDate = utc('2000-06-15');

  it('does not count the year before the birthday', () => {
    expect(ageOn(birthDate, utc('2026-06-14'))).toBe(25);
  });

  it('counts the year on the birthday', () => {
    expect(ageOn(birthDate, utc('2026-06-15'))).toBe(26);
  });

  it('counts the year after the birthday', () => {
    expect(ageOn(birthDate, utc('2026-11-03'))).toBe(26);
  });

  it('does not count the year earlier in the birthday year', () => {
    expect(ageOn(birthDate, utc('2026-01-20'))).toBe(25);
  });
});

describe('yearsSince', () => {
  it('counts whole years only', () => {
    expect(yearsSince(utc('2021-09-01'), utc('2026-08-31'))).toBe(4);
    expect(yearsSince(utc('2021-09-01'), utc('2026-09-01'))).toBe(5);
  });
});

describe('formatDuration', () => {
  it('combines years and months', () => {
    expect(formatDuration(utc('2020-01-10'), utc('2022-04-10'))).toBe('2 years and 3 months');
    expect(formatDuration(utc('2020-01-10'), utc('2021-02-10'))).toBe('1 year and 1 month');
  });

  it('shows only years when there are no extra months', () => {
    expect(formatDuration(utc('2020-01-10'), utc('2021-01-10'))).toBe('1 year');
    expect(formatDuration(utc('2020-01-10'), utc('2023-01-10'))).toBe('3 years');
  });

  it('shows only months below one year', () => {
    expect(formatDuration(utc('2024-01-10'), utc('2024-02-10'))).toBe('1 month');
    expect(formatDuration(utc('2024-01-10'), utc('2024-04-10'))).toBe('3 months');
  });

  it('shows days below one month', () => {
    expect(formatDuration(utc('2024-01-10'), utc('2024-01-11'))).toBe('1 day');
    expect(formatDuration(utc('2024-01-10'), utc('2024-01-22'))).toBe('12 days');
  });

  it('rolls back a month when the end day is before the start day', () => {
    expect(formatDuration(utc('2024-01-20'), utc('2024-03-19'))).toBe('1 month');
    expect(formatDuration(utc('2024-01-20'), utc('2024-02-19'))).toBe('30 days');
    expect(formatDuration(utc('2020-05-31'), utc('2021-05-30'))).toBe('11 months');
  });
});
