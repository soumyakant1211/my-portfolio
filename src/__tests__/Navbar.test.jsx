import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../components/Navbar';
import { renderWithMode } from './renderWithMode';

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock window scroll and history functions
    window.scrollTo = vi.fn();
    window.history.replaceState = vi.fn();
  });

  it('uses RPG link names in Play Mode', () => {
    renderWithMode(<Navbar darkMode toggleTheme={() => {}} />);
    for (const name of ['Profile', 'Journey', 'Skills', 'Quests', 'Achievements', 'Party Up']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
  });

  it('uses plain link names in Recruiter Mode and hides empty sections', () => {
    renderWithMode(<Navbar darkMode toggleTheme={() => {}} />, { mode: 'recruiter' });
    for (const name of ['About', 'Experience', 'Skills', 'Achievements', 'Contact']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
    // No projects yet, so Recruiter Mode doesn't advertise the section
    expect(screen.queryByRole('link', { name: /projects|quests/i })).not.toBeInTheDocument();
  });

  it('renders the home button and scrolls to top when clicked', () => {
    renderWithMode(<Navbar darkMode toggleTheme={() => {}} />);
    fireEvent.click(screen.getByText('Home'));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('switches view mode from the Play | Recruiter toggle', () => {
    const setMode = vi.fn();
    renderWithMode(<Navbar darkMode toggleTheme={() => {}} />, { setMode });

    const [playBtn] = screen.getAllByRole('button', { name: 'Play mode' });
    const [recruiterBtn] = screen.getAllByRole('button', { name: 'Recruiter mode' });
    expect(playBtn).toHaveAttribute('aria-pressed', 'true');
    expect(recruiterBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(recruiterBtn);
    expect(setMode).toHaveBeenCalledWith('recruiter');
  });

  it('only offers the light/dark toggle in Recruiter Mode (Play Mode is always dark)', () => {
    const { unmount } = renderWithMode(<Navbar darkMode toggleTheme={() => {}} />);
    expect(screen.queryByRole('button', { name: /toggle theme/i })).not.toBeInTheDocument();
    unmount();

    const toggleThemeMock = vi.fn();
    renderWithMode(<Navbar darkMode={false} toggleTheme={toggleThemeMock} />, { mode: 'recruiter' });
    const toggles = screen.getAllByRole('button', { name: /toggle theme/i });
    expect(toggles).toHaveLength(2); // desktop + mobile
    fireEvent.click(toggles[0]);
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('opens and closes the mobile menu', () => {
    renderWithMode(<Navbar darkMode toggleTheme={() => {}} />);

    const menuBtn = screen.getByRole('button', { name: 'Open menu' });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(menuBtn).toHaveAccessibleName('Close menu');
    expect(screen.getByRole('link', { name: /Download Resume/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /Download Resume/i })).not.toBeInTheDocument();
  });
});
