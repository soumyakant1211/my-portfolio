import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy-load all below-the-fold sections — they won't block the initial paint
const Experience   = lazy(() => import('./components/Experience'));
const Skills       = lazy(() => import('./components/Skills'));
const Recognitions = lazy(() => import('./components/Recognitions'));
const Contact      = lazy(() => import('./components/Contact'));
const Chatbot      = lazy(() => import('./components/Chatbot'));

// Minimal skeleton shown while a lazy section is loading
const SectionSkeleton = () => (
  <div className="py-12 animate-pulse" aria-hidden="true">
    <div className="h-8 w-48 rounded-xl bg-slate-200 dark:bg-slate-800 mb-10" />
    <div className="space-y-4">
      <div className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 w-5/6" />
      <div className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 w-4/6" />
    </div>
  </div>
);

// localStorage can throw (e.g. Safari private mode, blocked storage) — never let that break the page
const readStoredTheme = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const storeTheme = (theme) => {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Theme still applies for this visit; it just won't be remembered
  }
};

function App() {
  // Default to dark; must match the inline script in index.html
  const [darkMode, setDarkMode] = useState(() => readStoredTheme() !== 'light');

  // Apply theme class and mark as ready (enables transitions after first paint)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
    storeTheme(darkMode ? 'dark' : 'light');
    // Enable transitions only after theme is applied — prevents flash
    const frameId = requestAnimationFrame(() => {
      root.classList.add('theme-ready');
    });
    return () => cancelAnimationFrame(frameId);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className="min-h-screen transition-colors duration-150">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-violet-600 focus:text-white focus:font-bold"
      >
        Skip to content
      </a>

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main id="main" className="container mx-auto px-4 md:px-8 space-y-24 py-20">
        {/* Hero is critical path — always eager */}
        <Hero />

        {/* Below-fold sections are lazy — load after Hero paints */}
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Recognitions />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />

      {/* Global Chatbot */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}

export default App;
