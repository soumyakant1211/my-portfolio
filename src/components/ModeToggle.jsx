import { Gamepad2, FastForward } from 'lucide-react';
import { useMode } from '../context/mode';
import { MODES } from '../lib/preferences';

const OPTIONS = [
  { mode: MODES.PLAY, label: 'Play', icon: Gamepad2, title: 'Play Mode: explore the portfolio as an RPG' },
  { mode: MODES.RECRUITER, label: 'Recruiter', icon: FastForward, title: 'Skip cutscenes: plain resume view' },
];

/** Segmented "Play | Recruiter" switch. `onChange` defaults to switching the mode directly. */
const ModeToggle = ({ onChange }) => {
  const { mode, setMode } = useMode();
  const select = onChange ?? setMode;

  return (
    <div
      role="group"
      aria-label="View mode"
      className="flex items-center p-1 rounded-full play:rounded-md border border-line bg-surface font-mono text-xs font-bold"
    >
      {OPTIONS.map(({ mode: option, label, icon, title }) => {
        const Icon = icon;
        const active = mode === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            aria-label={`${label} mode`}
            title={title}
            onClick={() => !active && select(option)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full play:rounded-sm uppercase tracking-wider transition-colors ${
              active ? 'bg-cta text-on-cta shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            <Icon size={14} aria-hidden="true" />
            <span className="hidden min-[375px]:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ModeToggle;
