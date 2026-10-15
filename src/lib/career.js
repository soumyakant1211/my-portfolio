import { PROFILE } from '../data/profile';

/**
 * Whole years and leftover months between the career start date and `now`.
 * Drives the XP stat and the System Status uptime so they never go stale.
 */
export function getCareerLength(start = PROFILE.careerStart, now = new Date()) {
  // Parse "YYYY-MM-DD" by hand: new Date(string) treats it as UTC and can shift the day
  const [year, month, day] = start.split('-').map(Number);
  let months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  if (now.getDate() < day) months -= 1;
  months = Math.max(0, months);
  return { years: Math.floor(months / 12), months: months % 12 };
}

/** "4+ years" style label used in stats and copy. */
export function formatExperience(length = getCareerLength()) {
  const { years } = length;
  if (years < 1) return 'Under 1 year';
  return `${years}+ year${years === 1 ? '' : 's'}`;
}

/** Compact "4y 2m" label used for the System Status uptime readout. */
export function formatUptime(length = getCareerLength()) {
  return `${length.years}y ${length.months}m`;
}
