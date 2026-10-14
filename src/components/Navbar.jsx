import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE } from '../data/profile';

const links = ['About', 'Experience', 'Skills', 'Recognitions', 'Contact'];

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Force scroll to top and clear hash on hard refresh
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  // Use a ref so the scroll handler never needs to be re-registered when activeSection changes
  const activeSectionRef = useRef(activeSection);

  const updateActiveSection = useCallback(() => {
    let currentSection = 'about';
    for (const link of links) {
      const section = document.getElementById(link.toLowerCase());
      if (section && section.getBoundingClientRect().top <= 150) currentSection = section.id;
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

  const ThemeIcon = darkMode ? Sun : Moon;

  return (
    <nav aria-label="Primary" className="fixed top-0 left-0 w-full z-50 glass border-b border-slate-200/70 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', window.location.pathname);
            }}
            className="text-xl font-black tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            Home
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-8 xl:space-x-12">
              {links.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-base font-semibold transition-colors ${
                      isActive
                        ? 'text-violet-600 dark:text-violet-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {link}
                  </a>
                );
              })}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 ml-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              aria-label="Toggle Theme"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <ThemeIcon size={18} />
            </button>

            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors ml-6">
              <GithubIcon />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors ml-4 mr-6">
              <LinkedinIcon />
            </a>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all text-sm shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              <Download size={14} /> Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <ThemeIcon size={18} />
            </button>
            <button
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800 p-1.5 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden glass border-t border-slate-200 dark:border-slate-800 px-6 py-6 space-y-5 shadow-2xl animate-slide-down">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={`block text-base font-bold transition-colors ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link}
              </a>
            );
          })}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all shadow-md shadow-violet-500/20"
            >
              <Download size={18} /> Download Resume
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              <GithubIcon />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
