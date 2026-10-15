import { renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useKonamiCode, KONAMI_SEQUENCE } from '../hooks/useKonamiCode';

const press = (keys, target = window) => keys.forEach((key) => fireEvent.keyDown(target, { key }));

describe('useKonamiCode', () => {
  it('fires after the full sequence', () => {
    const onUnlock = vi.fn();
    renderHook(() => useKonamiCode(onUnlock));

    press(KONAMI_SEQUENCE.slice(0, -1));
    expect(onUnlock).not.toHaveBeenCalled();
    press(['a']);
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('accepts uppercase B and A', () => {
    const onUnlock = vi.fn();
    renderHook(() => useKonamiCode(onUnlock));
    press([...KONAMI_SEQUENCE.slice(0, -2), 'B', 'A']);
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('resets on a wrong key but allows an immediate retry', () => {
    const onUnlock = vi.fn();
    renderHook(() => useKonamiCode(onUnlock));
    press(['ArrowUp', 'ArrowUp', 'x']);
    press(KONAMI_SEQUENCE);
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('ignores keys typed into text fields', () => {
    const onUnlock = vi.fn();
    renderHook(() => useKonamiCode(onUnlock));
    const input = document.createElement('input');
    document.body.appendChild(input);
    press(KONAMI_SEQUENCE, input);
    expect(onUnlock).not.toHaveBeenCalled();
    input.remove();
  });
});
