import { Bug, Code2, GitBranch, Webhook, Cloud, GitFork, Swords } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { SKILLS, SKILL_TIERS, LOADOUT } from '../data/skills';
import { useMode } from '../context/mode';

const SLOT_ICONS = {
  Automation: Bug,
  Languages: Code2,
  'CI/CD': GitBranch,
  Cloud,
  'API Testing': Webhook,
  'Tools & VCS': GitFork,
};

const Skills = ({ index }) => {
  const { isPlay } = useMode();

  return (
    <section id="skills" className="py-10 md:py-12 scroll-mt-20 animate-fade-up">
      <SectionHeading index={index} play="Skills" plain="Skills" tagline="proficiency & loadout" icon={Swords} />

      {/* Tiered skills, each backed by evidence instead of a made-up percentage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {SKILL_TIERS.map((tier) => (
          <div key={tier.id} className="panel p-6 md:p-8">
            <h3 className="flex items-center gap-2 mb-5 text-lg font-bold text-ink play:font-mono play:uppercase play:tracking-widest play:text-base">
              {isPlay && <span className="text-accent-2" aria-hidden="true">{tier.glyph}</span>}
              {isPlay ? tier.play : tier.plain}
            </h3>
            <ul className="space-y-4">
              {SKILLS.filter((skill) => skill.tier === tier.id).map((skill) => (
                <li key={skill.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-bold text-ink sm:w-52 shrink-0 play:font-mono play:text-sm">{skill.name}</span>
                  {skill.evidence && <span className="text-sm text-body leading-relaxed">{skill.evidence}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Full toolbox */}
      <h3 className="mb-5 text-xl font-bold text-ink play:font-mono play:uppercase play:tracking-widest play:text-base">
        {isPlay ? (
          <><span className="text-accent-2" aria-hidden="true">⚙ </span>Loadout</>
        ) : (
          'Toolbox'
        )}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LOADOUT.map(({ slot, items }) => {
          const Icon = SLOT_ICONS[slot] ?? Code2;
          return (
            <div key={slot} className="panel p-6 group transition-all hover:-translate-y-1 hover:border-accent/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl play:rounded-sm bg-accent/10 text-accent group-hover:bg-cta group-hover:text-on-cta transition-colors" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <h4 className="font-bold text-ink play:font-mono play:uppercase play:text-sm play:tracking-wider">
                  {isPlay ? `Slot · ${slot}` : slot}
                </h4>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="px-3 py-1.5 rounded-lg play:rounded-sm text-sm font-semibold bg-canvas/60 text-body border border-line play:font-mono play:text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
