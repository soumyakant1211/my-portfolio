import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import ModeToggle from './ModeToggle';
import { PROFILE } from '../data/profile';
import { getNavLinks } from '../data/sections';
import { useMode } from '../context/mode';

const Navbar = ({ darkMode, toggleTheme }) => {
  const { isPlay, setMode } = useMode();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const links = getNavLinks(isPlay);

  // Force scroll to top and clear hash on hard refresh
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  // Refs so the scroll handler never needs to be re-registered
  const activeSectionRef = useRef(activeSection);
  const linksRef = useRef(links);
  useEffect(() => {
    linksRef.current = links;
  });

  const updateActiveSection = useCallback(() => {
    let currentSection = 'about';
    for (const link of linksRef.current) {
      const section = document.getElementById(link.id);
      if (section && section.getBoundingClientRect().top <= 150) currentSection = link.id;
    }

    if (currentSection !== activeSectionRef.current) {
      activeSectionRef.current = currentSection;
      setActiveSection(currentSection);
      if (currentSection === 'about') {
        window.history.replaceState(null, '', window.location.pathname);
      } else if (window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, '', `#${currentSection}`);
      }
    }
  }, []);

  useEffect(() => {
    // Measure at most once per frame instead of on every scroll event
    let frameId = 0;
    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        updateActiveSection();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Defer initial check to avoid synchronous setState inside effect (react-hooks/set-state-in-effect)
    const timerId = setTimeout(updateActiveSection, 0);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
    };
  }, [updateActiveSection]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Switching modes changes section heights, so keep the section being read in view
  const switchMode = (next) => {
    const anchor = activeSectionRef.current;
    setMode(next);
    if (anchor === 'about') return;
    requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  };

  const label = (link) => (isPlay ? link.play : link.plain);
  const ThemeIcon = darkMode ? Sun : Moon;
  const themeButton = (className) =>
    !isPlay && (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full bg-surface border border-line text-muted hover:text-accent transition-colors ${className}`}
        aria-label="Toggle Theme"
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <ThemeIcon size={18} />
      </button>
    );

  return (
    <nav aria-label="Primary" className="fixed top-0 left-0 w-full z-50 bg-canvas/80 backdrop-blur-md border-b border-line">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 gap-3">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', window.location.pathname);
            }}
            className="text-xl font-black tracking-tight text-ink hover:opacity-80 transition-opacity play:font-mono play:uppercase play:text-lg play:tracking-widest"
          >
            Home
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="flex items-center gap-6 xl:gap-8">
              {links.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-sm xl:text-base font-semibold transition-colors play:font-mono play:uppercase play:text-xs xl:play:text-sm play:tracking-widest ${
                      isActive ? 'text-accent' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label(link)}
                  </a>
                );
              })}
            </div>

            <ModeToggle onChange={switchMode} />
            {themeButton('')}

            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full play:rounded-md bg-cta text-on-cta font-bold text-sm shadow-md shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all play:font-mono play:uppercase play:tracking-wider"
            >
              <Download size={14} /> Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle onChange={switchMode} />
            {themeButton('')}
            <button
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="text-ink border border-line p-1.5 rounded-lg play:rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden bg-canvas/95 backdrop-blur-md border-t border-line px-6 py-6 space-y-5 shadow-2xl animate-slide-down">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={`block text-base font-bold transition-colors play:font-mono play:uppercase play:tracking-widest ${
                  isActive ? 'text-accent' : 'text-body'
                }`}
              >
                {label(link)}
              </a>
            );
          })}

          <div className="pt-4 border-t border-line flex items-center gap-3">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl play:rounded-md bg-cta text-on-cta font-bold shadow-md shadow-accent/20"
            >
              <Download size={18} /> Download Resume
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-3.5 rounded-xl play:rounded-md border border-line text-body">
              <GithubIcon />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-3.5 rounded-xl play:rounded-md border border-line text-body">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
