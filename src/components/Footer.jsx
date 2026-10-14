import { Code2 } from 'lucide-react';
import { PROFILE } from '../data/profile';

const Footer = () => (
  // Extra bottom (mobile) / right (desktop) padding keeps text clear of the floating chat button
  <footer className="mt-10 pt-8 pb-24 md:pb-8 border-t border-slate-200 dark:border-slate-800">
    <div className="container mx-auto px-4 md:px-8 md:pr-24 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        Designed &amp; built by <span className="text-violet-600 dark:text-violet-400 font-bold">{PROFILE.name}</span> · © {new Date().getFullYear()}
      </p>
      <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-mono">
        <Code2 size={14} aria-hidden="true" /> React 19 &amp; Tailwind CSS v4
      </p>
    </div>
  </footer>
);

export default Footer;
