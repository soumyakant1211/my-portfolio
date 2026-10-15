import { createContext, useContext } from 'react';
import { MODES } from '../lib/preferences';

// Play Mode is the cyberpunk RPG view; Recruiter Mode ("Skip Cutscenes") is the plain resume view.
export const ModeContext = createContext({
  mode: MODES.PLAY,
  isPlay: true,
  setMode: () => {},
});

export const useMode = () => useContext(ModeContext);
