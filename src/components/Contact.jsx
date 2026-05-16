import { Mail, Phone } from 'lucide-react';

// Reusable SVG components for brands since lucide-react removed them
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>  </svg>
);

const Contact = () => {
  return (
    <>
      <section id="contact" className="py-6 md:py-8 scroll-mt-20 flex flex-col items-center text-center relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <p className="text-violet-500 font-mono mb-4 text-sm font-medium">06. What's Next?</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50 max-w-2xl leading-tight">Open to SDET & QA Automation Opportunities</h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mb-12 text-lg leading-relaxed font-medium">
          I am currently exploring new engineering roles! Whether you're building modern Playwright ecosystems, AI-assisted testing frameworks, or scalable test architectures, my inbox is always open.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 mt-4 max-w-3xl w-full justify-items-center relative z-10 mb-16">
          {/* Cell Phone */}
          <a href="tel:+917978898543" aria-label="Phone" className="group flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all w-full">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 transition-colors shadow-sm">
              <Phone size={24} />
            </div>
            <span className="text-sm font-medium">+91-7978898543</span>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/917978898543" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-all w-full">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors shadow-sm">
              <WhatsappIcon />
            </div>
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          
          {/* Email */}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=soumyakant.tripathy422@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="group flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all w-full">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors shadow-sm">
              <Mail size={24} />
            </div>
            <span className="text-sm font-medium">Email</span>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/soumyakant-tripathy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all w-full">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors shadow-sm">
              <LinkedinIcon />
            </div>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a href="https://github.com/soumyakant1211" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all w-full col-span-2 md:col-span-1">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors shadow-sm">
              <GithubIcon />
            </div>
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="w-full py-8 border-t border-slate-200 dark:border-slate-800 mt-10">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
               Designed & Built by <span className="text-violet-500 font-bold">Soumyakant Tripathy</span>
            </p>
            
            <div className="flex items-center gap-6 text-sm text-slate-400 dark:text-slate-500 font-mono">
               <span className="flex items-center gap-1.5"><Code2 size={14} className="text-slate-300 dark:text-slate-600"/> React & Tailwind v4</span>
               <span>Last Updated: 2026</span>
            </div>
         </div>
      </footer>
    </>
  );
};

// Simple Code2 icon for the footer to avoid an extra import at the top level
const Code2 = ({ size, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export default Contact;
