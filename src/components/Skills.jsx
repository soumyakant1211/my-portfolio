import { Code2, Bug, GitBranch, Webhook, Cloud, GitFork, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    title: "Automation",
    icon: <Bug size={24} />,
    items: [
      "Selenium", 
      "Playwright",
      "Robot Framework", 
      "PyTest"
    ]
  },
  {
    title: "Languages",
    icon: <Code2 size={24} />,
    items: [
      "Python", 
      "JavaScript"
    ]
  },
  {
    title: "CI/CD",
    icon: <GitBranch size={24} />,
    items: [
        "Jenkins", 
        "CircleCI", 
        "GitHub Actions"
    ]
  },
  {
    title: "Cloud",
    icon: <Cloud size={24} />,
    items: [
        "AWS S3",
        "AWS IAM",
        "Cloud Workflows"
    ]
  },
  {
    title: "API Testing",
    icon: <Webhook size={24} />,
    items: [
        "Postman",
        "REST Assured",
        "Requests"
    ]
  },
  {
    title: "Tools & VCS",
    icon: <GitFork size={24} />,
    items: [
        "Git",
        "GitHub",
        "Bitbucket"
    ]
  },
  {
    title: "Currently Exploring",
    icon: <Sparkles size={24} />,
    items: [
        "Agentic AI",
        "AI-Assisted Testing",
        "LangChain",
        "Modern Playwright"
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-10 md:py-12 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800 dark:text-slate-100">
        <span className="text-violet-500 font-mono">02.</span> Core Skills
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skillCategories.map((category, index) => (
          <div 
            key={index}
            className="p-6 md:p-8 rounded-3xl glass border border-transparent hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-all hover:shadow-2xl hover:shadow-violet-500/5 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white shadow-sm transition-all">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {category.items.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-xl text-sm font-semibold tracking-wide bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:border-violet-500 dark:hover:bg-violet-500 dark:hover:text-white dark:hover:border-violet-500 shadow-sm transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
