import { Award, Star, Trophy, Lock, BadgeCheck, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { AWARDS, CERTIFICATIONS } from '../data/achievements';
import { useMode } from '../context/mode';

const AWARD_ICONS = {
  award: <Award className="text-amber-400" size={22} />,
  trophy: <Trophy className="text-emerald-400" size={22} />,
  star: <Star className="text-accent" size={22} />,
};

const Certifications = () => {
  const { isPlay } = useMode();

  if (CERTIFICATIONS.length === 0) {
    // Nothing to show recruiters yet; Play Mode hints that the slots exist
    if (!isPlay) return null;
    return (
      <div className="panel mt-8 flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-5 border-dashed">
        <Lock size={20} className="text-muted shrink-0" aria-hidden="true" />
        <p className="font-mono text-sm text-body">
          <span className="font-bold tracking-[0.2em] uppercase text-muted">Certifications · 0 unlocked</span>
          <span className="block sm:inline sm:ml-3 text-muted">Slots reserved — currently in training.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="mb-5 text-xl font-bold text-ink play:font-mono play:uppercase play:tracking-widest play:text-base">Certifications</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.id} className="panel p-6 flex gap-4">
            <BadgeCheck size={24} className="text-accent shrink-0" aria-hidden="true" />
            <div>
              <p className="font-bold text-ink">{cert.name}</p>
              <p className="text-sm text-body">{cert.issuer} · {cert.date}</p>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline underline-offset-4">
                  Verify credential <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Achievements = ({ index }) => {
  const { isPlay } = useMode();

  return (
    <section id="achievements" className="py-10 md:py-12 scroll-mt-20 animate-fade-up">
      <SectionHeading index={index} play="Achievements" plain="Achievements" tagline="awards & milestones" icon={Trophy} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AWARDS.map((award) => (
          <article
            key={award.id}
            className="panel flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 group"
          >
            <div className="relative h-56 w-full bg-line shrink-0 overflow-hidden">
              <img
                src={award.image}
                alt={`${award.title} award ceremony`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {isPlay && (
                <span className="absolute top-3 left-3 px-2 py-1 rounded-sm bg-canvas/85 backdrop-blur font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-accent border border-accent/40">
                  Achievement unlocked
                </span>
              )}
            </div>

            <div className="flex flex-col p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl play:rounded-sm bg-canvas/70 border border-line" aria-hidden="true">
                  {AWARD_ICONS[award.icon]}
                </div>
                <span className="text-xs font-bold font-mono px-3 py-1 rounded-full play:rounded-sm bg-accent/10 text-accent">
                  {award.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3 play:font-mono play:uppercase play:text-lg play:tracking-wide">{award.title}</h3>
              <p className="text-body leading-relaxed text-sm">{award.description}</p>
            </div>
          </article>
        ))}
      </div>

      <Certifications />
    </section>
  );
};

export default Achievements;
