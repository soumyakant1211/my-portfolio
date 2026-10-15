import { useEffect, useRef } from 'react';

export const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const isTypingTarget = (el) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Calls `onUnlock` when the visitor types ↑ ↑ ↓ ↓ ← → ← → B A anywhere outside a text field. */
export function useKonamiCode(onUnlock) {
  const callbackRef = useRef(onUnlock);
  useEffect(() => {
    callbackRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    let progress = 0;
    const onKeyDown = (e) => {
      if (isTypingTarget(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI_SEQUENCE[progress]) {
        progress += 1;
        if (progress === KONAMI_SEQUENCE.length) {
          progress = 0;
          callbackRef.current();
        }
      } else {
        // A wrong key may still be the start of a new attempt
        progress = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
