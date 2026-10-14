import { PROFILE } from '../data/profile';

export const WELCOME_MESSAGE = `Hi! I'm Soumyakant's AI Portfolio Assistant.

You can ask about:
• Experience
• Automation frameworks
• Playwright & Selenium
• CI/CD workflows
• Skills
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
    pattern: /\b(show|go to|navigate to|take me to)\b.*\bexperience\b/,
    reply: 'Navigating to the Experience section...',
    action: scrollTo('experience'),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\bskills?\b/,
    reply: 'Navigating to the Skills section...',
    action: scrollTo('skills'),
  },
  {
    pattern: /\b(show|go to|navigate to|take me to)\b.*\b(recognitions?|awards?)\b/,
    reply: 'Navigating to the Recognitions section...',
    action: scrollTo('recognitions'),
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
    pattern: /\b(learning|exploring)\b/,
    reply: `Currently exploring:
• Agentic AI
• AI-assisted testing
• LangChain
• modern Playwright ecosystems
• scalable automation architecture`,
  },
  {
    pattern: /\b(playwright|selenium)\b/,
    reply:
      'He is an expert in both! He builds scalable Page Object Model (POM) frameworks using Selenium for enterprise legacy systems, and modern blazing-fast UI automation using Playwright.',
  },
  {
    pattern: /\b(tools?|skills?|stack|tech|technologies)\b/,
    reply: `His core tech stack includes: Python, JavaScript, Selenium, Playwright, PyTest, Docker, Postman, AWS S3, Jenkins, and GitHub Actions.

He specializes in modern scalable architecture and AI-assisted testing.`,
  },
  {
    pattern: /\b(experience|work|years|history|career|background)\b/,
    reply: `Soumyakant is a Senior Software Engineer (SDET) with 4 years of experience in QA automation and enterprise testing.

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
