import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../components/Hero';
import { PROFILE } from '../data/profile';
import { renderWithMode } from './renderWithMode';

describe('Hero Component', () => {
  describe('Play Mode', () => {
    it('renders the character card', () => {
      renderWithMode(<Hero />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Soumyakant Tripathy');
      expect(screen.getByText(PROFILE.title)).toBeInTheDocument();
      expect(screen.getByText('Class')).toBeInTheDocument();
      expect(screen.getByText('Backend · Automation · Cloud')).toBeInTheDocument();
      expect(screen.getByText(PROFILE.currentQuest)).toBeInTheDocument();
    });

    it('shows XP worked out from the career start date, and no Level stat', () => {
      renderWithMode(<Hero />);
      expect(screen.getByText('XP').nextSibling).toHaveTextContent(/^\d+\+ years?$/);
      expect(screen.queryByText(/level/i)).not.toBeInTheDocument();
    });

    it('lists every focus area under System Status', () => {
      renderWithMode(<Hero />);
      expect(screen.getByRole('heading', { name: /system status/i })).toBeInTheDocument();
      for (const area of PROFILE.focus) {
        expect(screen.getByText(area)).toBeInTheDocument();
      }
    });

    it('offers a "Skip cutscenes" shortcut to Recruiter Mode', () => {
      const setMode = vi.fn();
      renderWithMode(<Hero />, { setMode });
      fireEvent.click(screen.getByRole('button', { name: /skip cutscenes/i }));
      expect(setMode).toHaveBeenCalledWith('recruiter');
    });

    it('links to the resume', () => {
      renderWithMode(<Hero />);
      expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', PROFILE.resume);
    });
  });

  describe('Recruiter Mode', () => {
    it('renders a plain intro with title, summary and focus', () => {
      renderWithMode(<Hero />, { mode: 'recruiter' });
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Soumyakant Tripathy');
      expect(screen.getByText(PROFILE.summary)).toBeInTheDocument();
      expect(screen.getByText('Open to opportunities')).toBeInTheDocument();
      expect(screen.queryByText(/system status/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/quest/i)).not.toBeInTheDocument();
    });

    it('links to the resume', () => {
      renderWithMode(<Hero />, { mode: 'recruiter' });
      expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', PROFILE.resume);
    });
  });
});
