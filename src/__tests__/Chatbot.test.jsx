import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Chatbot from '../components/Chatbot';
import { PROFILE } from '../data/profile';

const openChat = () => {
  const toggle = screen.getByRole('button', { name: 'Toggle Chatbot' });
  fireEvent.click(toggle);
  return toggle;
};

describe('Chatbot Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.open = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens and closes, reflecting state in aria-expanded', () => {
    render(<Chatbot />);
    const toggle = openChat();

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: 'AI Portfolio Assistant' })).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('heading', { name: 'AI Portfolio Assistant' })).not.toBeInTheDocument();
  });

  it('closes with the Escape key', () => {
    render(<Chatbot />);
    openChat();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('heading', { name: 'AI Portfolio Assistant' })).not.toBeInTheDocument();
  });

  it('replies to a suggested prompt after the typing delay', () => {
    render(<Chatbot />);
    openChat();

    fireEvent.click(screen.getByRole('button', { name: /What automation frameworks has he built/i }));
    expect(screen.getByText('What automation frameworks has he built?')).toBeInTheDocument();
    expect(screen.queryByText(/Robot Framework implementations/)).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(600));
    expect(screen.getByText(/Robot Framework implementations/)).toBeInTheDocument();
  });

  it('opens external links immediately so popup blockers allow them', () => {
    render(<Chatbot />);
    openChat();

    fireEvent.click(screen.getByRole('button', { name: /View GitHub/i }));
    expect(window.open).toHaveBeenCalledWith(PROFILE.github, '_blank', 'noopener,noreferrer');
  });

  it('sends typed messages and ignores blank ones', () => {
    render(<Chatbot />);
    openChat();

    const input = screen.getByRole('textbox', { name: /message the portfolio assistant/i });
    const send = screen.getByRole('button', { name: 'Send message' });
    expect(send).toBeDisabled();

    fireEvent.change(input, { target: { value: '   ' } });
    expect(send).toBeDisabled();

    fireEvent.change(input, { target: { value: 'What tools does he use?' } });
    fireEvent.submit(input.closest('form'));
    expect(input).toHaveValue('');

    act(() => vi.advanceTimersByTime(600));
    expect(screen.getByText(/core tech stack/)).toBeInTheDocument();
  });
});
