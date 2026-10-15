import { ArrowRight, Download, FastForward, Radar } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE } from '../data/profile';
import { useMode } from '../context/mode';
import { MODES } from '../lib/preferences';
import { getCareerLength, formatExperience, formatUptime } from '../lib/career';

const classLine = PROFILE.classes.join(' · ');

/** Play Mode: the visitor meets a character card and a live "system status" readout. */
const PlayHero = () => {
  const { setMode } = useMode();
  const career = getCareerLength();
  const stats = [
    { label: 'Class', value: classLine },
    { label: 'XP', value: formatExperience(career) },
    { label: 'Guild', value: PROFILE.company },
    {
      label: 'Status',
      value: PROFILE.openToWork ? 'Open to new quests' : 'On a quest',
      live: PROFILE.openToWork,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-12 items-center">
      {/* Character card */}
      <div className="space-y-7">
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-accent-2">
          &gt; PLAYER_PROFILE.load()
        </p>

        <div>
          <h1 className="font-mono font-extrabold uppercase leading-[0.95] tracking-tight text-[2.6rem] sm:text-6xl xl:text-7xl">
            <span className="block text-ink">{PROFILE.firstName}</span>{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2 pb-1">
              {PROFILE.lastName}
            </span>
          </h1>
          <p className="mt-4 font-mono text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-accent">
            {PROFILE.title}
          </p>
        </div>

        <dl className="panel grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden bg-line max-w-xl">
          {stats.map(({ label, value, live }) => (
            <div key={label} className="bg-canvas/90 px-4 py-3">
              <dt className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">{label}</dt>
              <dd className="mt-1 font-mono text-sm font-bold text-ink flex items-center gap-2">
                {live && <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400 animate-pulse" aria-hidden="true" />}
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">Current Quest</p>
          <p className="mt-1 font-mono text-lg sm:text-xl text-ink">
            <span className="text-accent" aria-hidden="true">&gt; </span>
            {PROFILE.currentQuest}
            <span className="ml-1 inline-block w-2.5 h-5 align-middle bg-accent animate-blink" aria-hidden="true" />
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#experience"
            className="group flex items-center gap-2 px-6 py-3 rounded-md bg-cta text-on-cta font-mono font-bold uppercase tracking-wider text-sm shadow-lg shadow-accent/25 hover:shadow-accent/50 transition-shadow"
          >
            Start Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-md border border-accent/40 text-accent font-mono font-bold uppercase tracking-wider text-sm hover:bg-accent/10 transition-colors"
          >
            <Download size={16} /> Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMode(MODES.RECRUITER)}
          className="flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors"
        >
          <FastForward size={14} aria-hidden="true" /> In a hurry? Skip cutscenes
        </button>
      </div>

      {/* System status readout */}
      <aside className="panel p-6 sm:p-7 w-full max-w-xl lg:justify-self-end" aria-labelledby="system-status-title">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-line">
          <h2 id="system-status-title" className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.2em] uppercase text-ink">
            <Radar size={16} className="text-accent" aria-hidden="true" /> System Status
          </h2>
          <span className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" /> ONLINE
          </span>
        </div>

        <p className="mt-5 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">Current Focus</p>
        <ul className="mt-3 space-y-2.5">
          {PROFILE.focus.map((area) => (
            <li key={area} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-sm border border-line bg-canvas/60 font-mono text-sm">
              <span className="text-ink">
                <span className="text-accent" aria-hidden="true">[ </span>
                {area}
                <span className="text-accent" aria-hidden="true"> ]</span>
              </span>
              <span className="text-[10px] tracking-widest text-accent-2">ACTIVE</span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-line font-mono text-xs">
          <div>
            <dt className="tracking-[0.25em] uppercase text-muted">Uptime</dt>
            <dd className="mt-1 text-sm font-bold text-ink">{formatUptime(career)}</dd>
          </div>
          <div>
            <dt className="tracking-[0.25em] uppercase text-muted">Links</dt>
            <dd className="mt-1 flex gap-3 text-body">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors"><GithubIcon size={18} /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors"><LinkedinIcon size={18} /></a>
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
};

/** Recruiter Mode: a compact, scannable intro. */
const RecruiterHero = () => (
  <div className="max-w-3xl space-y-7">
    <div className="space-y-3">
      <p className="text-accent font-bold tracking-[0.2em] uppercase text-sm">Hey, I am</p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-ink leading-[0.95]">
        {PROFILE.firstName}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">{PROFILE.lastName}</span>
      </h1>
      <p className="text-xl sm:text-2xl font-bold text-body">
        {PROFILE.title} <span className="text-muted font-semibold">· {classLine}</span>
      </p>
    </div>

    <p className="text-lg text-body leading-relaxed max-w-2xl">{PROFILE.summary}</p>

    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
      {[
        ['Experience', formatExperience()],
        ['Current company', PROFILE.company],
        ['Availability', PROFILE.openToWork ? 'Open to opportunities' : 'Not looking'],
      ].map(([label, value]) => (
        <div key={label} className="panel rounded-2xl px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
          <dd className="mt-1 font-bold text-ink">{value}</dd>
        </div>
      ))}
    </dl>

    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Current focus</p>
      <ul className="flex flex-wrap gap-2">
        {PROFILE.focus.map((area) => (
          <li key={area} className="px-3 py-1.5 rounded-full text-sm font-semibold bg-accent/10 text-accent border border-accent/20">
            {area}
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-wrap items-center gap-3 pt-1">
      <a
        href="#experience"
        className="group flex items-center gap-2 px-7 py-3 rounded-full bg-cta text-on-cta font-bold shadow-lg shadow-accent/20 hover:-translate-y-0.5 transition-transform"
      >
        View Experience <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </a>
      <a
        href={PROFILE.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-7 py-3 rounded-full border border-line text-ink font-bold hover:border-accent hover:text-accent transition-colors"
      >
        <Download size={18} /> Resume
      </a>
      <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-full border border-line text-body hover:text-accent hover:border-accent transition-colors">
        <LinkedinIcon size={18} />
      </a>
      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full border border-line text-body hover:text-accent hover:border-accent transition-colors">
        <GithubIcon size={18} />
      </a>
    </div>
  </div>
);

const Hero = () => {
  const { isPlay } = useMode();
  return (
    <section
      id="about"
      className={`relative pt-28 pb-6 flex flex-col justify-center animate-fade-up ${isPlay ? 'min-h-[92vh]' : 'min-h-[70vh]'}`}
    >
      {isPlay ? <PlayHero /> : <RecruiterHero />}
    </section>
  );
};

export default Hero;
