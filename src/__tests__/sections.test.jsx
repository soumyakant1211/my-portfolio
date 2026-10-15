import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { getVisibleSections, getNavLinks } from '../data/sections';
import Quests, { QuestCard } from '../components/Quests';
import Achievements from '../components/Achievements';
import { renderWithMode } from './renderWithMode';

const sampleQuest = {
  id: 'sample',
  title: 'Sample Quest',
  summary: 'A test project',
  mission: 'The problem',
  strategy: 'The approach',
  loot: ['Cut latency by 40%'],
  stack: ['Python'],
  links: { repo: 'https://github.com/example/repo' },
};

describe('section visibility', () => {
  it('shows every section in Play Mode, including empty ones', () => {
    expect(getVisibleSections(true).map((s) => s.id)).toContain('projects');
  });

  it('hides empty sections in Recruiter Mode', () => {
    expect(getVisibleSections(false).map((s) => s.id)).not.toContain('projects');
    expect(getNavLinks(false).map((l) => l.id)).toEqual(['about', 'experience', 'skills', 'achievements', 'contact']);
  });
});

describe('Quests', () => {
  it('shows locked quest slots while the quest log is empty', () => {
    renderWithMode(<Quests index="04" />);
    expect(screen.getAllByText(/quest locked/i)).toHaveLength(3);
  });

  it('renders a case study with game labels in Play Mode', () => {
    renderWithMode(<QuestCard quest={sampleQuest} />);
    for (const label of ['Mission', 'Strategy', 'Loot']) expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('Cut latency by 40%')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /code/i })).toHaveAttribute('href', sampleQuest.links.repo);
  });

  it('renders a case study with plain labels in Recruiter Mode', () => {
    renderWithMode(<QuestCard quest={sampleQuest} />, { mode: 'recruiter' });
    for (const label of ['Problem', 'Approach', 'Results']) expect(screen.getByText(label)).toBeInTheDocument();
  });
});

describe('Achievements', () => {
  it('shows awards in both modes', () => {
    renderWithMode(<Achievements index="05" />, { mode: 'recruiter' });
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByText('Rising Star')).toBeInTheDocument();
  });

  it('marks awards as unlocked and shows reserved certification slots in Play Mode only', () => {
    const { unmount } = renderWithMode(<Achievements index="05" />);
    expect(screen.getAllByText(/achievement unlocked/i)).toHaveLength(3);
    expect(screen.getByText(/certifications · 0 unlocked/i)).toBeInTheDocument();
    unmount();

    renderWithMode(<Achievements index="05" />, { mode: 'recruiter' });
    expect(screen.queryByText(/certifications/i)).not.toBeInTheDocument();
  });
});
