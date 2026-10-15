import { useMode } from '../context/mode';

/**
 * Section title that reads as a HUD label in Play Mode ("// 01 · career timeline / JOURNEY")
 * and as a plain numbered heading in Recruiter Mode ("01. Experience").
 */
const SectionHeading = ({ index, play, plain, tagline, icon: Icon, children }) => {
  const { isPlay } = useMode();

  if (!isPlay) {
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-ink">
          <span className="text-accent font-mono">{index}.</span> {plain}
        </h2>
        {children}
      </div>
    );
  }

  return (
    <div className="mb-10">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent-2">
        // {index} · {tagline}
      </p>
      <h2 className="mt-2 flex items-center gap-3 font-mono text-2xl md:text-3xl font-bold uppercase tracking-wider text-ink">
        {Icon && <Icon size={26} className="text-accent shrink-0" aria-hidden="true" />}
        {play}
      </h2>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-accent/60 via-accent-2/30 to-transparent" aria-hidden="true" />
      {children}
    </div>
  );
};

export default SectionHeading;
