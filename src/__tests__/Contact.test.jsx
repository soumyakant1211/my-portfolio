import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../components/Contact';
import { PROFILE } from '../data/profile';

describe('Contact Component', () => {
  it('links email through mailto so any mail client works', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: `Email ${PROFILE.email}` })).toHaveAttribute('href', `mailto:${PROFILE.email}`);
    expect(screen.getByRole('link', { name: /Say Hello/i })).toHaveAttribute('href', `mailto:${PROFILE.email}`);
  });

  it('opens social profiles in a new tab safely', () => {
    render(<Contact />);
    for (const name of ['LinkedIn', 'GitHub', 'WhatsApp']) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('renders the phone number as a tel: link', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: `Call ${PROFILE.phoneDisplay}` })).toHaveAttribute('href', PROFILE.phoneHref);
  });
});
