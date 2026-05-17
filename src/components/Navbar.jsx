import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

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
    window.history.replaceState(null, null, window.location.pathname);
  }, []);

  // Use a ref so the scroll handler never needs to be re-registered when activeSection changes
  const activeSectionRef = useRef(activeSection);

  const handleScroll = useCallback(() => {
    const sections = links.map(link => document.getElementById(link.toLowerCase()));

    let currentSection = 'about';
    for (const section of sections) {
      if (!section) continue;
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) currentSection = section.id;
    }

    if (currentSection !== activeSectionRef.current) {
      activeSectionRef.current = currentSection;
      setActiveSection(currentSection);
      if (currentSection === 'about') {
        window.history.replaceState(null, null, window.location.pathname);
      } else if (window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, null, `#${currentSection}`);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Defer initial check to avoid synchronous setState inside effect (react-hooks/set-state-in-effect)
    const timerId = setTimeout(handleScroll, 0);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timerId);
    };
  }, [handleScroll]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, null, window.location.pathname);
            }} 
            className="text-xl font-black tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            Home
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {links.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  className={`text-base font-semibold transition-all ${
                    isActive 
                      ? 'text-violet-600 dark:text-violet-400 scale-105' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {link}
                </a>
              );
            })}
            
            <button 
              onClick={toggleTheme}
              className="p-2 ml-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <a href="https://github.com/soumyakant1211" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors ml-4">
              <GithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/soumyakant-tripathy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors ml-4 mr-6">
              <LinkedinIcon />
            </a>
            <a 
              href="/Soumyakant_Tripathy_SDET_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all text-sm shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              <Download size={14} /> Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800 p-1.5 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-slate-200 dark:border-slate-800 px-6 py-6 space-y-5 shadow-2xl animate-in slide-in-from-top-2">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block text-base font-bold transition-colors ${
                  isActive 
                    ? 'text-violet-600 dark:text-violet-400 pointer-events-none' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link}
              </a>
            );
          })}
          
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <a 
              href="/Soumyakant_Tripathy_SDET_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all shadow-md shadow-violet-500/20"
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
