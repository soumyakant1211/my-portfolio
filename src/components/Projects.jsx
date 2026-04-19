import { Clock } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800 dark:text-slate-100">
        <span className="text-violet-500 font-mono">04.</span> Projects
      </h2>
      
      <div className="flex flex-col items-center justify-center p-12 md:p-20 rounded-3xl glass text-center border border-dashed border-slate-300 dark:border-slate-700/50 min-h-[400px]">
        <div className="p-4 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400 mb-6 animate-[pulse_3s_ease-in-out_infinite]">
          <Clock size={48} />
        </div>
        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-200 mb-4 tracking-tight">Coming Soon</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
          I'm currently working on some exciting projects to showcase here. Check back in a bit!
        </p>
      </div>
    </section>
  );
};

export default Projects;
