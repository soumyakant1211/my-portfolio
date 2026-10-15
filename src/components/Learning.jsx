import { Brain } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { LEARNING } from '../data/learning';
import { useMode } from '../context/mode';

const STATUS_LABELS = {
  active: { play: 'In progress', plain: 'Learning now' },
  queued: { play: 'Queued', plain: 'Up next' },
  done: { play: 'Unlocked', plain: 'Completed' },
};

const Learning = ({ index }) => {
  const { isPlay } = useMode();

  return (
    <section id="learning" className="py-10 md:py-12 scroll-mt-20 animate-fade-up">
      <SectionHeading index={index} play="Knowledge Tree" plain="Currently Learning" tagline="learning roadmap" icon={Brain} />

      {isPlay ? (
        <ol className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {LEARNING.map((node, i) => (
            <li key={node.name} className="panel flex items-center gap-4 px-5 py-4">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rotate-45 border border-accent/60 bg-accent/10 shadow-[0_0_14px] shadow-accent/30" aria-hidden="true">
                <span className="-rotate-45 font-mono text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="flex-1 font-mono text-sm font-bold text-ink">{node.name}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent-2">
                {STATUS_LABELS[node.status]?.play}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {LEARNING.map((node) => (
            <li key={node.name} className="px-4 py-2 rounded-xl text-sm font-semibold bg-accent/10 text-accent border border-accent/20">
              {node.name}
              <span className="sr-only"> — {STATUS_LABELS[node.status]?.plain}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Learning;
