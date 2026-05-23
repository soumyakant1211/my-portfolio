import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../components/Hero';

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    const heading = screen.getByText(/Soumyakant/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the role badge', () => {
    render(<Hero />);
    const badge = screen.getByText(/SDET Engineer \| QA Automation/i);
    expect(badge).toBeInTheDocument();
  });

  it('contains download resume link', () => {
    render(<Hero />);
    const resumeLinks = screen.getAllByText(/Resume/i);
    expect(resumeLinks.length).toBeGreaterThan(0);
    // At least one link should have the correct href
    const downloadLink = resumeLinks.find(link => link.closest('a')?.getAttribute('href') === '/Soumyakant_Tripathy_SDET_Resume.pdf');
    expect(downloadLink).toBeTruthy();
  });

  it('renders the terminal mockup with test results', () => {
    render(<Hero />);
    const terminalText = screen.getByText(/pytest -v tests\/e2e\/payment_flow.py/i);
    expect(terminalText).toBeInTheDocument();
    
    const passBadge = screen.getAllByText(/PASS/i)[0];
    expect(passBadge).toBeInTheDocument();
  });
});
