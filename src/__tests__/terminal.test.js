import { describe, it, expect } from 'vitest';
import { runCommand } from '../lib/terminal';
import { PROFILE } from '../data/profile';

const text = (result) => result.lines.join('\n');

describe('New Game+ terminal commands', () => {
  it('lists commands with help', () => {
    expect(text(runCommand('help'))).toMatch(/whoami/);
  });

  it('describes the player', () => {
    expect(text(runCommand('whoami'))).toContain(PROFILE.name);
    const stats = text(runCommand('stats'));
    expect(stats).toMatch(/CLASS\s+Backend · Automation · Cloud/);
    expect(stats).toMatch(/XP\s+\d+\+ years/);
  });

  it('is case- and whitespace-insensitive', () => {
    expect(text(runCommand('  WHOAMI  '))).toContain(PROFILE.name);
  });

  it('jumps to sections with goto', () => {
    expect(runCommand('goto experience').action).toEqual({ type: 'scroll', id: 'experience' });
    expect(runCommand('cd skills/').action).toEqual({ type: 'scroll', id: 'skills' });
    expect(text(runCommand('goto narnia'))).toMatch(/no such section/);
  });

  it('switches view modes', () => {
    expect(runCommand('mode recruiter').action).toEqual({ type: 'mode', mode: 'recruiter' });
    expect(runCommand('play').action).toEqual({ type: 'mode', mode: 'play' });
    expect(text(runCommand('mode god'))).toMatch(/usage/);
  });

  it('opens links and the hire-me shortcut', () => {
    expect(runCommand('resume').action).toEqual({ type: 'open', url: PROFILE.resume });
    expect(runCommand('sudo hire-me').action).toEqual({ type: 'open', url: `mailto:${PROFILE.email}` });
  });

  it('handles clear and exit', () => {
    expect(runCommand('clear').action).toEqual({ type: 'clear' });
    expect(runCommand('exit').action).toEqual({ type: 'close' });
  });

  it('shows locked quests and certifications while they are empty', () => {
    expect(text(runCommand('quests'))).toMatch(/Quest log empty/);
    expect(text(runCommand('achievements'))).toMatch(/0 unlocked/);
  });

  it('passes free text to the portfolio assistant, else reports unknown commands', () => {
    expect(text(runCommand('what frameworks has he built'))).toMatch(/Robot Framework/);
    expect(text(runCommand('rm -rf /'))).toMatch(/command not found: rm/);
  });
});
