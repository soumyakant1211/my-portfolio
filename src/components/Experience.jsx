import { Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer (SDET)",
    company: "Relevance Lab",
    period: "Aug 2022 – Present",
    bullets: [
      "Designed, developed, and maintained automation frameworks using Selenium, PyTest, and Robot Framework to support system integration and end-to-end testing.",
      "Built Python-based automation utilities to capture application screenshots, generate structured documents, and upload artifacts to Amazon S3, reducing manual documentation effort by 50%.",
      "Integrated automated test execution into CI/CD pipelines (Jenkins, CircleCI), reducing build validation time by 60% and enabling rapid, continuous deployment.",
      "Led manual testing and test execution for healthcare compliance workflows (GMP Gatekeeper), ensuring 100% release readiness against strict regulatory standards.",
      "Performed comprehensive API testing using Postman to validate backend request/response behavior, achieving 95% endpoint coverage.",
      "Collaborated closely with front-end developers to improve testability by introducing data-test-ids, accelerating test authoring speed by ~30%.",
      "Improved overall test coverage to ~90% and reduced regression execution time by 40% by optimizing reusable automation components.",
      "Conducted rigorous code and PR reviews for automation scripts to ensure quality, maintainability, and alignment with modern architecture standards.",
      "Worked directly with clients and cross-functional teams for requirement clarification, defect triage, and seamless release sign-off workflows."
    ],
    skills: ["Selenium", "Playwright", "PyTest", "Python", "Jenkins", "CircleCI", "Postman", "AWS S3"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-10 md:py-12 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-800 dark:text-slate-100">
        <span className="text-violet-500 font-mono">01.</span> Experience
      </h2>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px lg:before:mx-auto lg:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-violet-300 dark:before:via-violet-900/50 before:to-transparent">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative flex items-start justify-between lg:justify-normal lg:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-violet-100 dark:bg-violet-900/40 text-violet-500 shrink-0 lg:order-1 lg:group-odd:-translate-x-1/2 lg:group-even:translate-x-1/2 shadow-sm z-10 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all mt-6 lg:mt-0">
              <Briefcase size={16} />
            </div>
            
            <div className="w-[calc(100%-4rem)] lg:w-[calc(50%-2.5rem)] p-6 md:p-8 rounded-3xl glass transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 border border-transparent hover:border-violet-500/20">
              <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-2 gap-4 xl:gap-0">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                <span className="text-sm font-bold text-violet-600 dark:text-violet-400 font-mono xl:bg-violet-500/10 xl:px-3 xl:py-1 xl:rounded-full inline-block w-fit shrink-0">{exp.period}</span>
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-6 text-lg">{exp.company}</p>
              
              <ul className="space-y-3 mb-6">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed flex items-start gap-3">
                    <span className="text-violet-500 mt-1 shrink-0">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
