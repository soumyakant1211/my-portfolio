import { Map as MapIcon, Lock, ExternalLink, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { GithubIcon } from './BrandIcons';
import { QUESTS } from '../data/quests';
import { PROFILE } from '../data/profile';
import { useMode } from '../context/mode';

// Case-study labels: game flavor in Play Mode, plain language for recruiters
const LABELS = {
  mission: { play: 'Mission', plain: 'Problem' },
  strategy: { play: 'Strategy', plain: 'Approach' },
  loot: { play: 'Loot', plain: 'Results' },
};

export const QuestCard = ({ quest }) => {
  const { isPlay } = useMode();
  const label = (key) => (isPlay ? LABELS[key].play : LABELS[key].plain);

  return (
    <article className="panel flex flex-col p-6 md:p-7">
      <h3 className="text-xl font-bold text-ink play:font-mono play:uppercase play:tracking-wide play:text-lg">{quest.title}</h3>
      {quest.summary && <p className="mt-2 text-body">{quest.summary}</p>}

      <dl className="mt-5 space-y-4 text-sm">
        {quest.mission && (
          <div>
            <dt className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-2">{label('mission')}</dt>
            <dd className="mt-1 text-body leading-relaxed">{quest.mission}</dd>
          </div>
        )}
        {quest.strategy && (
          <div>
            <dt className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-2">{label('strategy')}</dt>
            <dd className="mt-1 text-body leading-relaxed">{quest.strategy}</dd>
          </div>
        )}
        {quest.loot?.length > 0 && (
          <div>
            <dt className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-2">{label('loot')}</dt>
            <dd className="mt-1">
              <ul className="space-y-1.5">
                {quest.loot.map((item) => (
                  <li key={item} className="flex gap-2 text-ink font-semibold">
                    <span className="text-accent" aria-hidden="true">+</span> {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      {quest.stack?.length > 0 && (
        <ul aria-label="Technologies used" className="mt-5 flex flex-wrap gap-2">
          {quest.stack.map((tech) => (
            <li key={tech} className="px-2.5 py-1 rounded-full play:rounded-sm text-xs font-semibold font-mono bg-accent/10 text-accent border border-accent/20">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(quest.links?.repo || quest.links?.demo) && (
        <div className="mt-auto pt-6 flex gap-4 text-sm font-bold">
          {quest.links.repo && (
            <a href={quest.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-body hover:text-accent transition-colors">
              <GithubIcon size={16} /> Code
            </a>
          )}
          {quest.links.demo && (
            <a href={quest.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-body hover:text-accent transition-colors">
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </a>
          )}
        </div>
      )}
    </article>
  );
};

/** Shown in Play Mode while the quest log is empty (Recruiter Mode hides the section instead). */
const LockedQuests = () => (
  <div>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-5" aria-label="Locked quests">
      {[1, 2, 3].map((slot) => (
        <li key={slot} className="panel flex flex-col items-center justify-center gap-3 py-12 border-dashed text-center">
          <Lock size={26} className="text-muted" aria-hidden="true" />
          <p className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-muted">Quest locked</p>
          <p className="font-mono text-xs text-muted">Case study incoming</p>
        </li>
      ))}
    </ul>
    <p className="mt-6 font-mono text-sm text-body">
      <span className="text-accent" aria-hidden="true">&gt; </span>
      The quest log is being written. Until then, explore side quests on{' '}
      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4">
        GitHub <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </p>
  </div>
);

const Quests = ({ index }) => (
  <section id="projects" className="py-10 md:py-12 scroll-mt-20 animate-fade-up">
    <SectionHeading index={index} play="Quests" plain="Projects" tagline="projects & case studies" icon={MapIcon} />
    {QUESTS.length === 0 ? (
      <LockedQuests />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {QUESTS.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    )}
  </section>
);

export default Quests;
