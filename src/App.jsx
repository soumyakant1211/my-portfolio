import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { ModeContext } from './context/mode';
import { MODES, readInitialMode, readInitialDarkMode, store } from './lib/preferences';
import { getVisibleSections } from './data/sections';
import { useKonamiCode } from './hooks/useKonamiCode';

// Lazy-load all below-the-fold sections — they won't block the initial paint
const SECTION_COMPONENTS = {
  experience:   lazy(() => import('./components/Experience')),
  skills:       lazy(() => import('./components/Skills')),
  learning:     lazy(() => import('./components/Learning')),
  projects:     lazy(() => import('./components/Quests')),
  achievements: lazy(() => import('./components/Achievements')),
  contact:      lazy(() => import('./components/Contact')),
};
const Chatbot    = lazy(() => import('./components/Chatbot'));
const NewGamePlus = lazy(() => import('./components/NewGamePlus'));

// Minimal skeleton shown while a lazy section is loading
const SectionSkeleton = () => (
  <div className="py-12 animate-pulse" aria-hidden="true">
    <div className="h-8 w-48 rounded-xl bg-line mb-10" />
    <div className="space-y-4">
      <div className="h-4 rounded-lg bg-line w-full" />
      <div className="h-4 rounded-lg bg-line w-5/6" />
      <div className="h-4 rounded-lg bg-line w-4/6" />
    </div>
  </div>
);

function App() {
  const [mode, setMode] = useState(readInitialMode);
  // Only used in Recruiter Mode — Play Mode is always dark
  const [darkMode, setDarkMode] = useState(readInitialDarkMode);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const isPlay = mode === MODES.PLAY;

  useKonamiCode(() => setTerminalOpen(true));

  // Apply mode/theme classes (must match the inline script in index.html)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isPlay || darkMode);
    root.classList.toggle('mode-play', isPlay);
    root.classList.toggle('mode-recruiter', !isPlay);
    store('view-mode', mode);
    store('theme', darkMode ? 'dark' : 'light');
    // Enable transitions only after the look is applied — prevents flash
    const frameId = requestAnimationFrame(() => {
      root.classList.add('theme-ready');
    });
    return () => cancelAnimationFrame(frameId);
  }, [mode, isPlay, darkMode]);

  const modeValue = useMemo(() => ({ mode, isPlay, setMode }), [mode, isPlay]);
  const sections = getVisibleSections(isPlay);

  return (
    <ModeContext value={modeValue}>
      <div className="min-h-screen transition-colors duration-150">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cta focus:text-on-cta focus:font-bold"
        >
          Skip to content
        </a>

        <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode((prev) => !prev)} />

        <main id="main" className="container mx-auto px-4 md:px-8 space-y-24 pb-20">
          {/* Hero is critical path — always eager */}
          <Hero />

          {/* Below-fold sections are lazy — load after Hero paints */}
          {sections.map((section, i) => {
            const Section = SECTION_COMPONENTS[section.id];
            return (
              <Suspense key={section.id} fallback={<SectionSkeleton />}>
                <Section index={String(i + 1).padStart(2, '0')} />
              </Suspense>
            );
          })}
        </main>

        <Footer onOpenTerminal={() => setTerminalOpen(true)} />

        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>

        {terminalOpen && (
          <Suspense fallback={null}>
            <NewGamePlus onClose={() => setTerminalOpen(false)} />
          </Suspense>
        )}
      </div>
    </ModeContext>
  );
}

export default App;
