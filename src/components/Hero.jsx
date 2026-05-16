import { ArrowRight, Download, Terminal, CheckCircle2, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="about" className="relative pt-24 pb-10 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[0%] left-[5%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-fuchsia-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center border-0 border-white">
          
          {/* Left Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-violet-600 dark:text-violet-400 font-bold tracking-[0.2em] uppercase text-sm sm:text-base ml-1">
                Hey, I am
              </p>
              
              <h1 className="text-6xl sm:text-7xl md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
                Soumyakant
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 pb-2">
                  Tripathy
                </span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-default group">
                <Terminal size={16} className="text-violet-600 dark:text-violet-400 shrink-0" />
                <span className="text-[13px] sm:text-sm font-bold tracking-widest uppercase mt-0.5">SDET Engineer | QA Automation</span>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-500 dark:text-slate-400 max-w-2xl leading-[1.2] tracking-tight">
                Engineering Quality through Intelligent Automation & CI/CD.
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
                  I automate the boring stuff, catch production-crashing bugs early, and keep continuous integration pipelines green. 
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-200 max-w-xl leading-relaxed font-bold border-l-4 border-violet-500 pl-4 bg-violet-500/5 dark:bg-violet-900/10 py-2">
                  Built scalable automation frameworks reducing regression effort by 40% and improving release confidence across enterprise workflows.
                </p>
              </div>
              
              {/* Fast Scanning Summary */}
              <div className="bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 max-w-xl shadow-sm">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="#experience" className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 group hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                        <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" /> 4 Years Experience
                    </a>
                    <a href="#skills" className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 group hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                        <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" /> Python • JavaScript
                    </a>
                    <a href="#skills" className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 group hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                        <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" /> Selenium • Playwright
                    </a>
                    <a href="#skills" className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 group hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                        <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" /> CI/CD • API Testing
                    </a>
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6">
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

          {/* Right Visual Content (Engineering Terminal Mockup) */}
          <div className="relative hidden lg:flex justify-center items-center w-full mt-10 lg:mt-0">
             <div className="w-full max-w-[500px] rounded-2xl overflow-hidden bg-[#0d1117] border border-slate-700/50 shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-2 group">
                
                {/* MacOS Terminal Header */}
                <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                   </div>
                   <div className="mx-auto flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Terminal size={12} />
                      bash — pytest test_suite.py
                   </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-[13px] leading-relaxed">
                   <div className="text-slate-400 mb-2">
                     $ pytest -v tests/e2e/payment_flow.py --browser chromium
                   </div>
                   
                   <div className="text-slate-300 mb-4 flex items-center gap-2">
                     <Play size={14} className="text-blue-400 animate-pulse" />
                     <span className="text-blue-400">Starting Playwright session...</span>
                   </div>

                   <div className="space-y-2.5">
                     <div className="flex items-center justify-between text-slate-300">
                       <span className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          test_user_login_valid_credentials
                       </span>
                       <span className="text-slate-500">1.24s</span>
                     </div>
                     <div className="flex items-center justify-between text-slate-300">
                       <span className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          test_cart_calculation_with_tax
                       </span>
                       <span className="text-slate-500">0.82s</span>
                     </div>
                     <div className="flex items-center justify-between text-slate-300 opacity-60 group-hover:opacity-100 transition-opacity delay-100">
                       <span className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          test_payment_gateway_mock_success
                       </span>
                       <span className="text-slate-500">2.10s</span>
                     </div>
                     <div className="flex items-center justify-between text-slate-300 opacity-60 group-hover:opacity-100 transition-opacity delay-200">
                       <span className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          test_order_confirmation_email_trigger
                       </span>
                       <span className="text-slate-500">1.45s</span>
                     </div>
                   </div>

                   <div className="mt-6 pt-4 border-t border-slate-800">
                     <div className="flex items-center gap-3">
                       <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                         PASS
                       </span>
                       <span className="text-emerald-400 font-semibold tracking-wide">142 passed in 18.43s</span>
                     </div>
                     <div className="text-slate-500 mt-3 text-xs tracking-wide">
                        Coverage: <span className="text-emerald-400">92.4%</span> | Stability: <span className="text-emerald-400">99.8%</span>
                     </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
