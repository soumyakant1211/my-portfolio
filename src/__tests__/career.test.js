import { describe, it, expect } from 'vitest';
import { getCareerLength, formatExperience, formatUptime } from '../lib/career';

describe('career length', () => {
  it('counts whole months since the start date', () => {
    expect(getCareerLength('2022-08-01', new Date(2026, 9, 15))).toEqual({ years: 4, months: 2 });
  });

  it('does not count a month until its day has been reached', () => {
    expect(getCareerLength('2022-08-20', new Date(2023, 7, 19))).toEqual({ years: 0, months: 11 });
    expect(getCareerLength('2022-08-20', new Date(2023, 7, 20))).toEqual({ years: 1, months: 0 });
  });

  it('never goes negative', () => {
    expect(getCareerLength('2030-01-01', new Date(2026, 0, 1))).toEqual({ years: 0, months: 0 });
  });

  it('formats XP and uptime labels', () => {
    expect(formatExperience({ years: 4, months: 2 })).toBe('4+ years');
    expect(formatExperience({ years: 1, months: 0 })).toBe('1+ year');
    expect(formatExperience({ years: 0, months: 5 })).toBe('Under 1 year');
    expect(formatUptime({ years: 4, months: 2 })).toBe('4y 2m');
  });
});
