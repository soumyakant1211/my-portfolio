import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy-load all below-the-fold sections — they won't block the initial paint
const Experience   = lazy(() => import('./components/Experience'));
const Skills       = lazy(() => import('./components/Skills'));
const Recognitions = lazy(() => import('./components/Recognitions'));
const Contact      = lazy(() => import('./components/Contact'));
const Chatbot      = lazy(() => import('./components/Chatbot'));

// Minimal skeleton shown while a lazy section is loading
const SectionSkeleton = () => (
  <div className="py-12 animate-pulse">
    <div className="h-8 w-48 rounded-xl bg-slate-200 dark:bg-slate-800 mb-10" />
    <div className="space-y-4">
      <div className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 w-5/6" />
      <div className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 w-4/6" />
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return true; // Default to dark
  });

  // Apply theme class and mark as ready (enables transitions after first paint)
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    // Enable transitions only after theme is applied — prevents flash
    requestAnimationFrame(() => {
      root.classList.add('theme-ready');
    });
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className="min-h-screen transition-colors duration-150">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 md:px-8 space-y-24 py-20">
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

      <footer className="mt-20 py-8 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
        <p>© {new Date().getFullYear()} My Portfolio. Built with React &amp; Tailwind CSS.</p>
      </footer>

      {/* Global Chatbot */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}

export default App;
