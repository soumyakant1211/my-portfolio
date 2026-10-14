import { Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './BrandIcons';
import { PROFILE } from '../data/profile';

const channels = [
  {
    label: PROFILE.phoneDisplay,
    ariaLabel: `Call ${PROFILE.phoneDisplay}`,
    href: PROFILE.phoneHref,
    icon: <Phone size={24} aria-hidden="true" />,
    hover: 'hover:text-violet-600 dark:hover:text-violet-400',
    hoverBg: 'group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40',
  },
  {
    label: 'WhatsApp',
    ariaLabel: 'WhatsApp',
    href: PROFILE.whatsapp,
    external: true,
    icon: <WhatsappIcon size={24} />,
    hover: 'hover:text-green-600 dark:hover:text-green-400',
    hoverBg: 'group-hover:bg-green-100 dark:group-hover:bg-green-900/40',
  },
  {
    label: 'Email',
    ariaLabel: `Email ${PROFILE.email}`,
    href: `mailto:${PROFILE.email}`,
    icon: <Mail size={24} aria-hidden="true" />,
    hover: 'hover:text-red-500 dark:hover:text-red-400',
    hoverBg: 'group-hover:bg-red-100 dark:group-hover:bg-red-900/40',
  },
  {
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn',
    href: PROFILE.linkedin,
    external: true,
    icon: <LinkedinIcon size={24} />,
    hover: 'hover:text-blue-600 dark:hover:text-blue-400',
    hoverBg: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40',
  },
  {
    label: 'GitHub',
    ariaLabel: 'GitHub',
    href: PROFILE.github,
    external: true,
    icon: <GithubIcon size={24} />,
    hover: 'hover:text-slate-900 dark:hover:text-white',
    hoverBg: 'group-hover:bg-slate-200 dark:group-hover:bg-slate-700',
    className: 'col-span-2 md:col-span-1',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-6 md:py-8 scroll-mt-20 flex flex-col items-center text-center relative animate-fade-up">
      <p className="text-violet-500 font-mono mb-4 text-sm font-medium">04. What's Next?</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50 max-w-2xl leading-tight">Open to SDET &amp; QA Automation Opportunities</h2>

      <p className="text-slate-600 dark:text-slate-400 max-w-xl mb-10 text-lg leading-relaxed font-medium">
        I am currently exploring new engineering roles! Whether you're building modern Playwright ecosystems, AI-assisted testing frameworks, or scalable test architectures, my inbox is always open.
      </p>

      <a
        href={`mailto:${PROFILE.email}`}
        className="inline-flex items-center gap-2 px-8 py-3.5 mb-12 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/25"
      >
        <Mail size={18} aria-hidden="true" /> Say Hello
      </a>

      <ul className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 max-w-3xl w-full justify-items-center relative z-10 mb-6">
        {channels.map((channel) => (
          <li key={channel.label} className={`w-full ${channel.className ?? ''}`}>
            <a
              href={channel.href}
              aria-label={channel.ariaLabel}
              {...(channel.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className={`group flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 transition-colors ${channel.hover}`}
            >
              <span className={`p-4 rounded-full bg-slate-100 dark:bg-slate-800/50 transition-colors shadow-sm ${channel.hoverBg}`}>
                {channel.icon}
              </span>
              <span className="text-sm font-medium">{channel.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono break-all">{PROFILE.email}</p>
    </section>
  );
};

export default Contact;
