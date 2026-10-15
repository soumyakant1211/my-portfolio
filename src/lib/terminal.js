import { PROFILE } from '../data/profile';
import { SKILLS } from '../data/skills';
import { QUESTS } from '../data/quests';
import { AWARDS, CERTIFICATIONS } from '../data/achievements';
import { SECTIONS } from '../data/sections';
import { getCareerLength, formatExperience, formatUptime } from './career';
import { getBotReply, FALLBACK_REPLY } from './chatbot';

export const BOOT_LINES = [
  '> NEW GAME+ UNLOCKED',
  '> Cheat code accepted. Welcome back, player.',
  "Type 'help' to see available commands.",
];

const SECTION_IDS = ['about', ...SECTIONS.map((section) => section.id)];

const HELP = `Available commands:
  whoami            who is this player?
  stats             class, XP and status
  skills            main weapons and equipped skills
  quests            projects / case studies
  achievements      awards and certifications
  focus             current focus areas
  ls                list map sections
  goto <section>    jump to a section (e.g. goto experience)
  contact           how to reach me
  resume            open the resume
  github, linkedin  open profiles
  mode <play|recruiter>  switch view mode
  clear             clear the screen
  exit              close the terminal

Anything else is passed to the portfolio assistant.`;

const out = (text, action = null) => ({ lines: text.split('\n'), action });

/**
 * Runs one terminal command. Pure: returns the lines to print and an optional
 * action ({ type: 'open' | 'scroll' | 'mode' | 'clear' | 'close', ... }) for the UI to perform.
 */
export function runCommand(rawInput) {
  const input = rawInput.trim();
  const [command = '', ...args] = input.toLowerCase().split(/\s+/);
  const arg = args.join(' ');

  switch (command) {
    case '':
      return out('');
    case 'help':
    case '?':
      return out(HELP);
    case 'whoami':
      return out(`${PROFILE.name}\n${PROFILE.title} · ${PROFILE.classes.join(' · ')}`);
    case 'stats': {
      const career = getCareerLength();
      return out(
        [
          `CLASS   ${PROFILE.classes.join(' · ')}`,
          `XP      ${formatExperience(career)}`,
          `GUILD   ${PROFILE.company}`,
          `UPTIME  ${formatUptime(career)}`,
          `STATUS  ${PROFILE.openToWork ? 'Open to new quests' : 'On a quest'}`,
        ].join('\n'),
      );
    }
    case 'skills':
      return out(
        SKILLS.map((skill) => `${skill.tier === 'main' ? '★' : '◆'} ${skill.name}${skill.evidence ? ` — ${skill.evidence}` : ''}`).join('\n'),
      );
    case 'quests':
      return out(
        QUESTS.length
          ? QUESTS.map((quest) => `▸ ${quest.title}${quest.summary ? ` — ${quest.summary}` : ''}`).join('\n')
          : 'Quest log empty. New quests unlocking soon.',
      );
    case 'achievements':
      return out(
        [
          ...AWARDS.map((award) => `🏆 ${award.title} (${award.date})`),
          CERTIFICATIONS.length
            ? CERTIFICATIONS.map((cert) => `✔ ${cert.name} — ${cert.issuer}`).join('\n')
            : 'Certifications: 0 unlocked (in training)',
        ].join('\n'),
      );
    case 'focus':
      return out(PROFILE.focus.map((area) => `[ ${area} ]`).join('\n'));
    case 'ls':
      return out(SECTION_IDS.map((id) => `${id}/`).join('  '));
    case 'cd':
    case 'goto': {
      const target = arg.replace(/\/$/, '');
      if (!SECTION_IDS.includes(target)) return out(`goto: no such section: ${arg || '(none)'}. Try 'ls'.`);
      return out(`Fast travelling to ${target}...`, { type: 'scroll', id: target });
    }
    case 'contact':
      return out(`Email  ${PROFILE.email}\nPhone  ${PROFILE.phoneDisplay}`);
    case 'resume':
      return out('Opening resume...', { type: 'open', url: PROFILE.resume });
    case 'github':
      return out('Opening GitHub...', { type: 'open', url: PROFILE.github });
    case 'linkedin':
      return out('Opening LinkedIn...', { type: 'open', url: PROFILE.linkedin });
    case 'mode':
    case 'play':
    case 'recruiter': {
      const next = command === 'mode' ? arg : command;
      if (next !== 'play' && next !== 'recruiter') return out("usage: mode <play|recruiter>");
      return out(`Switching to ${next === 'play' ? 'Play' : 'Recruiter'} Mode...`, { type: 'mode', mode: next });
    }
    case 'sudo':
      if (arg === 'hire-me' || arg === 'hire me') {
        return out('[sudo] password for recruiter: ********\nAccess granted. Opening party invite...', {
          type: 'open',
          url: `mailto:${PROFILE.email}`,
        });
      }
      return out('Nice try. This incident will be reported.');
    case 'konami':
      return out('↑↑↓↓←→←→BA — you already know the code.');
    case 'clear':
      return out('', { type: 'clear' });
    case 'exit':
    case 'quit':
      return out('Saving game...', { type: 'close' });
    default: {
      const reply = getBotReply(input);
      if (reply.text !== FALLBACK_REPLY) return out(reply.text, reply.action);
      return out(`command not found: ${command}. Type 'help' for a list of commands.`);
    }
  }
}
