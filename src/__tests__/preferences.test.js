import { describe, it, expect, beforeEach } from 'vitest';
import { readInitialMode, readInitialDarkMode } from '../lib/preferences';

describe('view preferences', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to Play Mode and dark theme', () => {
    expect(readInitialMode('')).toBe('play');
    expect(readInitialDarkMode()).toBe(true);
  });

  it('remembers the last chosen mode and theme', () => {
    localStorage.setItem('view-mode', 'recruiter');
    localStorage.setItem('theme', 'light');
    expect(readInitialMode('')).toBe('recruiter');
    expect(readInitialDarkMode()).toBe(false);
  });

  it('lets a ?view= link override the stored mode', () => {
    localStorage.setItem('view-mode', 'play');
    expect(readInitialMode('?view=recruiter')).toBe('recruiter');
    localStorage.setItem('view-mode', 'recruiter');
    expect(readInitialMode('?view=play')).toBe('play');
  });

  it('ignores unknown values', () => {
    localStorage.setItem('view-mode', 'god-mode');
    expect(readInitialMode('?view=nope')).toBe('play');
  });
});
