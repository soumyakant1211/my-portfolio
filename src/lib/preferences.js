// Visitor preferences. Must stay in sync with the inline script in index.html,
// which applies them before React loads so the page never flashes the wrong look.

export const MODES = { PLAY: 'play', RECRUITER: 'recruiter' };

const isMode = (value) => value === MODES.PLAY || value === MODES.RECRUITER;

// localStorage can throw (e.g. Safari private mode, blocked storage) — never let that break the page
export const readStored = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const store = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preference still applies for this visit; it just won't be remembered
  }
};

/** `?view=recruiter` (handy for sharing) wins over the stored choice; Play Mode is the default. */
export function readInitialMode(search = window.location.search) {
  const fromUrl = new URLSearchParams(search).get('view');
  if (isMode(fromUrl)) return fromUrl;
  const stored = readStored('view-mode');
  return isMode(stored) ? stored : MODES.PLAY;
}

/** Recruiter Mode supports light and dark; dark is the default. */
export const readInitialDarkMode = () => readStored('theme') !== 'light';
