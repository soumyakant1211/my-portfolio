import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Recognitions from './components/Recognitions';
import Contact from './components/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return true; // Default to dark
  });

  // Initialize theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto px-4 md:px-8 space-y-24 py-20">
        <Hero />
        <Experience />
        <Skills />
        <Recognitions />
        <Contact />
      </main>

      <footer className="mt-20 py-8 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
        <p>© {new Date().getFullYear()} My Portfolio. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
