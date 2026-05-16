import { Github, Star, GitFork, BookOpen } from 'lucide-react';

const githubRepos = [
  {
    id: 1,
    name: "playwright-e2e-framework",
    description: "Robust end-to-end testing framework built with Playwright and TypeScript, featuring auto-retries, Allure reporting, and CI/CD integration.",
    language: "TypeScript",
    languageColor: "bg-blue-500",
    stars: 12,
    forks: 3,
    link: "https://github.com/soumyakant1211"
  },
  {
    id: 2,
    name: "pytest-api-automation",
    description: "Scalable API test automation boilerplate using PyTest and Requests, designed for high-performance concurrent endpoint validation.",
    language: "Python",
    languageColor: "bg-blue-400",
    stars: 8,
    forks: 1,
    link: "https://github.com/soumyakant1211"
  },
  {
    id: 3,
    name: "robot-framework-suite",
    description: "Keyword-driven acceptance testing suite for UI and database validation, built with Robot Framework and SeleniumLibrary.",
    language: "RobotFramework",
    languageColor: "bg-emerald-500",
    stars: 5,
    forks: 0,
    link: "https://github.com/soumyakant1211"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-10 md:py-12 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
            <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800 dark:text-slate-100">
                <span className="text-violet-500 font-mono">05.</span> Open Source
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">Explore my technical playground and framework boilerplates.</p>
        </div>
        
        <a 
          href="https://github.com/soumyakant1211" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:scale-105 transition-transform shadow-lg shadow-slate-900/10 dark:shadow-white/10 shrink-0 w-fit"
        >
          <Github size={18} /> View GitHub
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {githubRepos.map((repo) => (
           <a 
             key={repo.id}
             href={repo.link}
             target="_blank"
             rel="noopener noreferrer"
             className="flex flex-col p-6 rounded-3xl glass border border-slate-200 dark:border-slate-800 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 group bg-white/50 dark:bg-slate-900/50"
           >
              <div className="flex items-start gap-3 mb-4">
                 <BookOpen size={20} className="text-slate-400 mt-1 shrink-0" />
                 <h3 className="text-lg font-bold text-violet-600 dark:text-violet-400 group-hover:underline decoration-2 underline-offset-4">{repo.name}</h3>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed font-medium">
                 {repo.description}
              </p>

              <div className="flex items-center gap-5 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400">
                 <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${repo.languageColor}`}></span>
                    {repo.language}
                 </div>
                 <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <Star size={14} /> {repo.stars}
                 </div>
                 <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    <GitFork size={14} /> {repo.forks}
                 </div>
              </div>
           </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
