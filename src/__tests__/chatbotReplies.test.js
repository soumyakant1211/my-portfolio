import { describe, it, expect } from 'vitest';
import { getBotReply, SUGGESTED_PROMPTS, FALLBACK_REPLY } from '../lib/chatbot';
import { PROFILE } from '../data/profile';

describe('getBotReply', () => {
  it('answers every suggested prompt with its own topic', () => {
    const expected = {
      'Tell me about his experience': /\d\+ years of experience/,
      'What automation frameworks has he built?': /Robot Framework implementations/,
      'What tools does he use?': /core tech stack/,
      'Explain his CI/CD experience': /strong CI\/CD experience/,
      'What is he currently learning?': /Currently exploring/,
      'Download resume': /resume/,
      'View GitHub': /GitHub profile/,
      'Connect on LinkedIn': /LinkedIn profile/,
    };
    expect(Object.keys(expected)).toEqual(SUGGESTED_PROMPTS);

    for (const [prompt, pattern] of Object.entries(expected)) {
      expect(getBotReply(prompt).text, prompt).toMatch(pattern);
    }
  });

  it('opens external links for resume, GitHub and LinkedIn', () => {
    expect(getBotReply('Download resume').action).toEqual({ type: 'open', url: PROFILE.resume });
    expect(getBotReply('can I see his CV?').action).toEqual({ type: 'open', url: PROFILE.resume });
    expect(getBotReply('View GitHub').action).toEqual({ type: 'open', url: PROFILE.github });
    expect(getBotReply('Connect on LinkedIn').action).toEqual({ type: 'open', url: PROFILE.linkedin });
  });

  it('scrolls to sections for navigation commands', () => {
    expect(getBotReply('show experience').action).toEqual({ type: 'scroll', id: 'experience' });
    expect(getBotReply('take me to skills').action).toEqual({ type: 'scroll', id: 'skills' });
    expect(getBotReply('go to awards').action).toEqual({ type: 'scroll', id: 'achievements' });
    expect(getBotReply('show projects').action).toEqual({ type: 'scroll', id: 'projects' });
    expect(getBotReply('navigate to contact').action).toEqual({ type: 'scroll', id: 'contact' });
  });

  it('shares contact details when asked', () => {
    const reply = getBotReply('Contact details');
    expect(reply.text).toContain(PROFILE.email);
    expect(reply.text).toContain(PROFILE.phoneDisplay);
    expect(reply.action).toEqual({ type: 'scroll', id: 'contact' });
  });

  it('does not treat "framework" as a question about work history', () => {
    expect(getBotReply('which frameworks?').text).toMatch(/Selenium automation frameworks/);
  });

  it('only greets when the message starts with a greeting', () => {
    expect(getBotReply('hi').text).toMatch(/^Hello!/);
    expect(getBotReply('Hey there').text).toMatch(/^Hello!/);
    // "this" / "which" contain "hi" but are not greetings
    expect(getBotReply('which way?').text).toBe(FALLBACK_REPLY);
    expect(getBotReply('what is this').text).toBe(FALLBACK_REPLY);
  });

  it('answers project and certification questions while those lists are empty', () => {
    expect(getBotReply('Do you have any projects?').text).toMatch(/being written up/);
    expect(getBotReply('Any certifications?').text).toMatch(/working toward/);
  });

  it('builds answers from the page data', () => {
    expect(getBotReply('what awards has he won?').text).toMatch(/Rising Star \(Feb 2023\)/);
    expect(getBotReply('what is his current focus?').text).toContain(PROFILE.focus.join(', '));
  });

  it('falls back for off-topic questions', () => {
    expect(getBotReply('what is the weather today?')).toEqual({ text: FALLBACK_REPLY, action: null });
  });
});
