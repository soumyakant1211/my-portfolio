import { Mail, Phone, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './BrandIcons';
import { PROFILE } from '../data/profile';
import { useMode } from '../context/mode';

const channels = [
  { label: PROFILE.phoneDisplay, ariaLabel: `Call ${PROFILE.phoneDisplay}`, href: PROFILE.phoneHref, icon: <Phone size={22} aria-hidden="true" /> },
  { label: 'WhatsApp', ariaLabel: 'WhatsApp', href: PROFILE.whatsapp, external: true, icon: <WhatsappIcon size={22} /> },
  { label: 'Email', ariaLabel: `Email ${PROFILE.email}`, href: `mailto:${PROFILE.email}`, icon: <Mail size={22} aria-hidden="true" /> },
  { label: 'LinkedIn', ariaLabel: 'LinkedIn', href: PROFILE.linkedin, external: true, icon: <LinkedinIcon size={22} /> },
  { label: 'GitHub', ariaLabel: 'GitHub', href: PROFILE.github, external: true, icon: <GithubIcon size={22} />, className: 'col-span-2 md:col-span-1' },
];

const Contact = ({ index }) => {
  const { isPlay } = useMode();

  return (
    <section id="contact" className="py-6 md:py-8 scroll-mt-20 animate-fade-up">
      <SectionHeading index={index} play="Party Up" plain="Contact" tagline="send a party invite" icon={Send} />

      <div className="panel flex flex-col items-center text-center px-6 py-12 md:py-16">
        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-ink max-w-2xl leading-tight play:font-mono play:uppercase play:text-2xl md:play:text-4xl play:tracking-wide">
          {isPlay ? 'Looking for a new party member?' : 'Open to New Opportunities'}
        </h3>

        <p className="text-body max-w-xl mb-10 text-lg leading-relaxed">
          {isPlay
            ? `${PROFILE.title} · ${PROFILE.classes.join(' · ')}. Ready for backend, automation and cloud quests — send an invite.`
            : "I'm exploring new engineering roles across backend, automation and cloud. Whether you're building scalable services, test platforms or AI-assisted tooling, my inbox is always open."}
        </p>

        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 mb-12 rounded-full play:rounded-md bg-cta text-on-cta font-bold shadow-lg shadow-accent/25 hover:-translate-y-0.5 transition-all play:font-mono play:uppercase play:tracking-wider"
        >
          <Mail size={18} aria-hidden="true" /> {isPlay ? 'Send party invite' : 'Say Hello'}
        </a>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 max-w-3xl w-full justify-items-center mb-6">
          {channels.map((channel) => (
            <li key={channel.label} className={`w-full ${channel.className ?? ''}`}>
              <a
                href={channel.href}
                aria-label={channel.ariaLabel}
                {...(channel.external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="group flex flex-col items-center gap-3 text-muted hover:text-accent transition-colors"
              >
                <span className="p-4 rounded-full play:rounded-md bg-canvas/70 border border-line group-hover:border-accent/50 transition-colors">
                  {channel.icon}
                </span>
                <span className="text-sm font-medium play:font-mono play:text-xs">{channel.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted font-mono break-all">{PROFILE.email}</p>
      </div>
    </section>
  );
};

export default Contact;
