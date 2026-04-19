import { Code2, Bug, GitBranch, Cloud, Users, Webhook } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming & Scripting",
    icon: <Code2 size={24} />,
    items: [
      "Python", 
      "JavaScript"
    ]
  },
  {
    title: "Test Automation & QA",
    icon: <Bug size={24} />,
    items: [
        "Selenium", 
        "Playwright",
        "PyTest", 
        "Robot Framework", 
        "Manual Testing", 
        "Test Planning & Execution", 
        "Defect Analysis"
    ]
  },
  {
    title: "CI/CD & Dev Practices",
    icon: <GitBranch size={24} />,
    items: [
        "Jenkins", 
        "CircleCI", 
        "Git", 
        "BitBucket"
    ]
  },
  {
    title: "API & Integration Testing",
    icon: <Webhook size={24} />,
    items: [
        "Postman"
    ]
  },
  {
    title: "Cloud & Platforms",
    icon: <Cloud size={24} />,
    items: [
        "AWS S3", 
        "AWS IAM", 
        "Cloud Workflows"
    ]
  },
  {
    title: "Other",
    icon: <Users size={24} />,
    items: [
        "Agile / Scrum", 
        "Client Communication", 
        "Mentoring"
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800 dark:text-slate-100">
        <span className="text-violet-500 font-mono">02.</span> Core Skills
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
