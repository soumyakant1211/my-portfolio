import { Briefcase, ScrollText } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { EXPERIENCE } from '../data/experience';
import { useMode } from '../context/mode';

const Experience = ({ index }) => {
  const { isPlay } = useMode();

  return (
    <section id="experience" className="py-10 md:py-12 scroll-mt-20 animate-fade-up">
      <SectionHeading index={index} play="Journey" plain="Experience" tagline="career timeline" icon={ScrollText} />

      <ol className="space-y-8 relative before:absolute before:inset-y-0 before:left-5 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-accent/50 before:via-accent-2/30 before:to-transparent">
        {EXPERIENCE.map((exp, i) => (
          <li key={exp.id} className="relative flex items-start group">
            <div className="flex items-center justify-center w-10 h-10 mt-6 shrink-0 z-10 rounded-full play:rounded-sm play:rotate-45 border-4 play:border-2 border-canvas play:border-accent bg-accent/15 text-accent shadow-sm play:shadow-[0_0_16px] play:shadow-accent/50 transition-transform group-hover:scale-110">
              <Briefcase size={16} className="play:-rotate-45" aria-hidden="true" />
            </div>

            <article className="panel w-[calc(100%-4rem)] ml-6 p-6 md:p-8 transition-all hover:-translate-y-1 hover:border-accent/40">
              {isPlay && (
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent-2 mb-2">
                  Chapter {String(EXPERIENCE.length - i).padStart(2, '0')}
                </p>
              )}
              <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-2 gap-3">
                <h3 className="text-xl md:text-2xl font-bold text-ink play:font-mono play:tracking-tight">{exp.role}</h3>
                <span className="text-sm font-bold text-accent font-mono bg-accent/10 px-3 py-1 rounded-full play:rounded-sm w-fit shrink-0">{exp.period}</span>
              </div>
              <p className="font-semibold text-body mb-6 text-lg">
                {isPlay && <span className="font-mono text-sm text-muted">Guild · </span>}
                {exp.company}
              </p>

              <ul className="space-y-3 mb-6">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="text-body text-sm md:text-base leading-relaxed flex items-start gap-3">
                    <span className="text-accent mt-1 shrink-0" aria-hidden="true">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-line">
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted mb-3">
                  {isPlay ? 'Gear used' : 'Technologies'}
                </p>
                <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
                  {exp.stack.map((skill) => (
                    <li key={skill} className="px-3 py-1 rounded-full play:rounded-sm text-xs font-semibold font-mono bg-accent/10 text-accent border border-accent/20">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
