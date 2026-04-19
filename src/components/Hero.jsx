import { ArrowRight, Download, Sparkles, Bot, Cog, MousePointerClick, FileCheck, Terminal, Cpu, FileCode2, MonitorPlay } from 'lucide-react';

const Hero = () => {
  return (
    <section id="about" className="relative pt-32 pb-20 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Advanced Modern Background Glow Elements */}
      <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-violet-600/20 dark:bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[0%] left-[5%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-fuchsia-600/20 dark:bg-fuchsia-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center border-0 border-white">
          
          {/* Left Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-violet-600 dark:text-violet-400 font-bold tracking-[0.2em] uppercase text-sm sm:text-base ml-1">
                Hey, I am
              </p>
              
              <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
                Soumyakant
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 pb-2">
                  Tripathy
                </span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-default group">
                <Sparkles size={16} className="animate-pulse text-yellow-500 shrink-0 group-hover:rotate-12 transition-transform" />
                <span className="text-[13px] sm:text-sm font-bold tracking-widest uppercase mt-0.5">Senior Software Engineer</span>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-500 dark:text-slate-400 max-w-2xl leading-[1.2] tracking-tight">
                Engineering Quality through Intelligent Automation & CI/CD.
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
                I automate the boring stuff, catch production-crashing bugs early, and keep continuous integration pipelines green. With nearly 4 years of SDET experience, I specialize in building bulletproof software quality and robust test architectures.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-10">
              <a 
                href="#experience" 
                className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-slate-900/10 dark:shadow-white/10"
              >
                View Experience <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
              
              <a 
                href="/Soumyakant_Tripathy_SDET_Python_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-400 dark:bg-slate-900/40 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all shadow-sm group backdrop-blur-sm"
              >
                <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Resume
              </a>
            </div>
          </div>

          {/* Right Visual Content (Floating Abstract Glassmorphic Cards) */}
          <div className="relative hidden lg:flex justify-center items-center h-[500px] w-full mt-10 lg:mt-0">
            {/* Center Main Orb */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-[50px] opacity-30 animate-[pulse_6s_ease-in-out_infinite]" />
            
            {/* 1. Automation */}
            <div className="absolute top-4 left-10 glass p-4 lg:p-5 rounded-3xl animate-[bounce_5s_infinite_ease-in-out] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20">
              <div className="p-2 lg:p-3 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300">
                 <Cog size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">Automation</span>
            </div>

            {/* 2. Robot Framework */}
            <div className="absolute top-10 right-4 glass p-4 lg:p-5 rounded-3xl animate-[bounce_6s_infinite_ease-in-out_reverse] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '0.5s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300">
                 <Bot size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">Robot FW</span>
            </div>

            {/* 3. Python */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 glass p-4 lg:p-5 rounded-3xl animate-[bounce_4s_infinite_ease-in-out_reverse] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '1s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                 <Terminal size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">Python</span>
            </div>

            {/* 4. CI/CD */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 glass p-4 lg:p-5 rounded-3xl animate-[bounce_5.5s_infinite_ease-in-out] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '1.5s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300">
                 <Cpu size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">CI/CD</span>
            </div>

            {/* 5. Selenium */}
            <div className="absolute bottom-20 left-8 glass p-4 lg:p-5 rounded-3xl animate-[bounce_6s_infinite_ease-in-out_reverse] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '0.2s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300">
                 <MousePointerClick size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">Selenium</span>
            </div>
            
            {/* 6. Test Report */}
            <div className="absolute bottom-24 right-6 glass p-4 lg:p-5 rounded-3xl animate-[bounce_4.5s_infinite_ease-in-out] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '2s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300">
                 <FileCheck size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">Reports</span>
            </div>

            {/* 7. JavaScript */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 glass p-4 lg:p-5 rounded-3xl animate-[bounce_5s_infinite_ease-in-out_reverse] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '0.8s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400">
                 <FileCode2 size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">JavaScript</span>
            </div>

            {/* 8. Playwright */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 glass p-4 lg:p-5 rounded-3xl animate-[bounce_5.5s_infinite_ease-in-out] shadow-2xl border border-white/20 dark:border-white/10 flex flex-col items-center gap-2 w-[100px] lg:w-[110px] backdrop-blur-xl z-20" style={{ animationDelay: '1.2s' }}>
              <div className="p-2 lg:p-3 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">
                 <MonitorPlay size={24} />
              </div>
              <span className="font-bold text-[11px] lg:text-xs text-slate-800 dark:text-slate-200 text-center">Playwright</span>
            </div>
            
            {/* Central Decorative Circle */}
            <div className="w-64 h-64 rounded-full border-[4px] border-dashed border-violet-500/20 animate-[spin_40s_linear_infinite] absolute z-0" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
