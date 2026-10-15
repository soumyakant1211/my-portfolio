import { Code2 } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useMode } from '../context/mode';

const Footer = ({ onOpenTerminal }) => {
  const { isPlay } = useMode();

  return (
    // Extra bottom (mobile) / right (desktop) padding keeps text clear of the floating chat button
    <footer className="mt-10 pt-8 pb-24 md:pb-8 border-t border-line">
      <div className="container mx-auto px-4 md:px-8 md:pr-24 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <p className="text-sm text-muted font-medium play:font-mono play:text-xs">
          {isPlay ? 'A game by ' : 'Designed & built by '}
          <span className="text-accent font-bold">{PROFILE.name}</span> · © {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted font-mono">
          {/* Easter egg hint — also the way in on touch screens with no arrow keys */}
          <button
            type="button"
            onClick={onOpenTerminal}
            title="Cheat code"
            aria-label="Open the secret terminal"
            className="text-xs tracking-widest text-muted/70 hover:text-accent transition-colors"
          >
            ↑↑↓↓←→←→BA
          </button>
          <span className="flex items-center gap-1.5">
            <Code2 size={14} aria-hidden="true" /> React 19 &amp; Tailwind CSS v4
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
