import { PROFILE } from '../data/profile';
import { QUESTS } from '../data/quests';
import { AWARDS, CERTIFICATIONS } from '../data/achievements';
import { LOADOUT } from '../data/skills';
import { LEARNING } from '../data/learning';
import { formatExperience } from './career';

export const WELCOME_MESSAGE = `Hi! I'm Soumyakant's AI Portfolio Assistant.

You can ask about:
• Experience
• Automation frameworks
• Playwright & Selenium
• CI/CD workflows
• Skills
• Projects & certifications
• Resume
• Contact details`;

export const SUGGESTED_PROMPTS = [
  'Tell me about his experience',
  'What automation frameworks has he built?',
  'What tools does he use?',
  'Explain his CI/CD experience',
  'What is he currently learning?',
  'Download resume',
  'View GitHub',
  'Connect on LinkedIn',
];

export const FALLBACK_REPLY =
  "I am strictly scoped to Soumyakant's portfolio! Please ask me about his experience, automation frameworks, skills, or for his resume.";

const open = (url) => ({ type: 'open', url });
const scrollTo = (id) => ({ type: 'scroll', id });
const bullets = (items) => items.map((item) => `• ${item}`).join('\n');

// Built from the data files so the bot never disagrees with the page
const projectsReply = QUESTS.length
  ? `He has written up ${QUESTS.length} project case ${QUESTS.length === 1 ? 'study' : 'studies'}:\n${bullets(QUESTS.map((q) => q.title))}`
  : 'Project case studies are being written up right now. In the meantime, his GitHub has his public work.';

const certificationsReply = CERTIFICATIONS.length
  ? `Certifications:\n${bullets(CERTIFICATIONS.map((c) => `${c.name} — ${c.issuer} (${c.date})`))}`
  : "He's working toward his certifications. They'll appear in the Achievements section once earned.";

// Checked top to bottom and the first match wins, so specific intents must come
// before broad ones (e.g. "CI/CD experience" is a CI/CD question, not an experience one).
const INTENTS = [
  {
    pattern: /\b(resume|cv)\b/,
    reply: "I'm opening Soumyakant's resume in a new tab for you!",
    action: open(PROFILE.resume),
  },
  {
    pattern: /\bgithub\b/,
    reply: 'Taking you to his GitHub profile now!',
    action: open(PROFILE.github),
  },
  {
    pattern: /\blinkedin\b/,
    reply: 'Opening his LinkedIn profile for you!',
    action: open(PROFILE.linkedin),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\b(experience|journey)\b/,
    reply: 'Navigating to the Experience section...',
    action: scrollTo('experience'),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\bskills?\b/,
    reply: 'Navigating to the Skills section...',
    action: scrollTo('skills'),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\b(recognitions?|awards?|achievements?)\b/,
    reply: 'Navigating to the Achievements section...',
    action: scrollTo('achievements'),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\b(projects?|quests?)\b/,
    reply: 'Navigating to the Projects section...',
    action: scrollTo('projects'),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\bcontact\b/,
    reply: 'Navigating to the Contact section...',
    action: scrollTo('contact'),
  },
  {
    pattern: /\bci\s*\/?\s*cd\b|\bpipelines?\b|\bjenkins\b|\bcircleci\b|\bgithub actions\b/,
    reply:
      'He has strong CI/CD experience, seamlessly integrating test automation into Jenkins, CircleCI, and GitHub Actions to ensure continuous testing and immediate feedback on PRs.',
  },
  {
    pattern: /\b(projects?|quests?|case stud(y|ies))\b/,
    reply: projectsReply,
  },
  {
    pattern: /\b(certifications?|certificates?|certified)\b/,
    reply: certificationsReply,
  },
  {
    pattern: /\b(awards?|recognitions?|achievements?)\b/,
    reply: `He has won ${AWARDS.length} company awards:\n${bullets(AWARDS.map((a) => `${a.title} (${a.date})`))}`,
    action: scrollTo('achievements'),
  },
  {
    pattern: /\bframeworks?\b/,
    reply: `Soumyakant has worked on:
• Selenium automation frameworks
• Playwright-based UI automation
• PyTest automation suites
• Robot Framework implementations
• API testing frameworks using Postman and Requests

He also integrated automated execution into CI/CD pipelines using Jenkins, CircleCI, and GitHub Actions.`,
  },
  {
    pattern: /\b(learning|exploring|focus)\b/,
    reply: `Currently exploring:\n${bullets(LEARNING.map((node) => node.name))}\n\nCurrent focus: ${PROFILE.focus.join(', ')}.`,
  },
  {
    pattern: /\b(playwright|selenium)\b/,
    reply:
      'He is an expert in both! He builds scalable Page Object Model (POM) frameworks using Selenium for enterprise legacy systems, and modern blazing-fast UI automation using Playwright.',
  },
  {
    pattern: /\b(tools?|skills?|stack|tech|technologies)\b/,
    reply: `His core tech stack:\n${bullets(LOADOUT.map(({ slot, items }) => `${slot}: ${items.join(', ')}`))}`,
  },
  {
    pattern: /\b(experience|work|years|history|career|background)\b/,
    reply: `Soumyakant is a ${PROFILE.title} (${PROFILE.classes.join(' · ')}) with ${formatExperience().toLowerCase()} of experience at ${PROFILE.company}.

He has worked extensively on Selenium, Playwright, PyTest, API testing, and CI/CD automation in healthcare compliance workflows.

His work includes:
• reducing regression execution time by 40%
• improving build validation speed by 60%
• achieving ~95% API endpoint coverage
• integrating automated pipelines using Jenkins and CircleCI`,
  },
  {
    pattern: /\b(contact|email|e-mail|phone|call|reach|hire|whatsapp)\b/,
    reply: `You can reach Soumyakant at:
• Email: ${PROFILE.email}
• Phone / WhatsApp: ${PROFILE.phoneDisplay}

I'm scrolling you to the Contact section too.`,
    action: scrollTo('contact'),
  },
  {
    pattern: /^\s*(hi+|hello|hey)\b/,
    reply:
      "Hello! I am the AI Portfolio Assistant. How can I help you learn more about Soumyakant's engineering background today?",
  },
];

/**
 * Maps a visitor's message to a canned reply and an optional side effect.
 * Pure function: the caller decides when to run the returned action.
 */
export function getBotReply(input) {
  const text = input.toLowerCase();
  const intent = INTENTS.find(({ pattern }) => pattern.test(text));
  if (!intent) return { text: FALLBACK_REPLY, action: null };
  return { text: intent.reply, action: intent.action ?? null };
}
