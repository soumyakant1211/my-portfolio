import { render } from '@testing-library/react';
import { ModeContext } from '../context/mode';

/** Renders `ui` inside a ModeContext so components can be tested in Play or Recruiter Mode. */
export function renderWithMode(ui, { mode = 'play', setMode = () => {} } = {}) {
  const value = { mode, isPlay: mode === 'play', setMode };
  return render(<ModeContext value={value}>{ui}</ModeContext>);
}
