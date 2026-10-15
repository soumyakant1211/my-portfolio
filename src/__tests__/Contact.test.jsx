import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../components/Contact';
import { PROFILE } from '../data/profile';
import { renderWithMode } from './renderWithMode';

describe('Contact Component', () => {
  it('links email through mailto so any mail client works', () => {
    renderWithMode(<Contact index="06" />, { mode: 'recruiter' });
    expect(screen.getByRole('link', { name: `Email ${PROFILE.email}` })).toHaveAttribute('href', `mailto:${PROFILE.email}`);
    expect(screen.getByRole('link', { name: /Say Hello/i })).toHaveAttribute('href', `mailto:${PROFILE.email}`);
  });

  it('becomes a party invite in Play Mode', () => {
    renderWithMode(<Contact index="06" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/party up/i);
    expect(screen.getByRole('link', { name: /send party invite/i })).toHaveAttribute('href', `mailto:${PROFILE.email}`);
  });

  it('opens social profiles in a new tab safely', () => {
    renderWithMode(<Contact index="06" />);
    for (const name of ['LinkedIn', 'GitHub', 'WhatsApp']) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('renders the phone number as a tel: link', () => {
    renderWithMode(<Contact index="06" />);
    expect(screen.getByRole('link', { name: `Call ${PROFILE.phoneDisplay}` })).toHaveAttribute('href', PROFILE.phoneHref);
  });
});
