import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock window scroll and history functions
    window.scrollTo = vi.fn();
    window.history.replaceState = vi.fn();
  });

  it('renders all navigation links', () => {
    render(<Navbar darkMode={false} toggleTheme={() => {}} />);
    
    const expectedLinks = ['About', 'Experience', 'Skills', 'Recognitions', 'Contact'];
    
    // Check desktop links
    expectedLinks.forEach(link => {
      // getByRole 'link' to avoid getting multiple elements if we use getByText (desktop + mobile)
      const desktopLinks = screen.getAllByRole('link', { name: new RegExp(link, 'i') });
      expect(desktopLinks.length).toBeGreaterThan(0);
    });
  });

  it('renders the home button and scrolls to top when clicked', () => {
    render(<Navbar darkMode={false} toggleTheme={() => {}} />);
    
    const homeBtn = screen.getByText('Home');
    expect(homeBtn).toBeInTheDocument();
    
    fireEvent.click(homeBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('toggles theme when button is clicked', () => {
    const toggleThemeMock = vi.fn();
    render(<Navbar darkMode={false} toggleTheme={toggleThemeMock} />);
    
    // There are 2 toggle theme buttons (desktop and mobile), click the first one
    const toggleBtns = screen.getAllByRole('button', { name: /toggle theme/i });
    if(toggleBtns.length > 0) {
      fireEvent.click(toggleBtns[0]);
    } else {
      // If aria-label isn't set, try grabbing all buttons and find the sun/moon ones
      const buttons = screen.getAllByRole('button');
      // Just click the second button (first is usually Home)
      fireEvent.click(buttons[1]);
    }
    
    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('labels every theme toggle for screen readers', () => {
    render(<Navbar darkMode={true} toggleTheme={() => {}} />);
    // Desktop + mobile toggles
    expect(screen.getAllByRole('button', { name: /toggle theme/i })).toHaveLength(2);
  });

  it('opens and closes the mobile menu', () => {
    render(<Navbar darkMode={false} toggleTheme={() => {}} />);

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
