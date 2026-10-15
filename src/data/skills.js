// Skills are ranked by tier and backed by evidence rather than percentage bars.
// Evidence must point at something real (a result, a project, years used).
export const SKILL_TIERS = [
  { id: 'main', play: 'Main Weapons', plain: 'Core Strengths', glyph: '★' },
  { id: 'proficient', play: 'Equipped', plain: 'Proficient', glyph: '◆' },
];

export const SKILLS = [
  { name: 'Python', tier: 'main', evidence: 'Automation utilities, PyTest suites and AWS S3 tooling' },
  { name: 'Selenium', tier: 'main', evidence: 'Framework for system integration and end-to-end testing' },
  { name: 'PyTest', tier: 'main', evidence: 'Regression suites — execution time cut by 40%' },
  { name: 'CI/CD (Jenkins, CircleCI)', tier: 'main', evidence: 'Build validation time cut by 60%' },
  { name: 'API Testing (Postman)', tier: 'proficient', evidence: '~95% endpoint coverage' },
  { name: 'Robot Framework', tier: 'proficient', evidence: 'Keyword-driven integration suites' },
  { name: 'Playwright', tier: 'proficient' },
  { name: 'AWS (S3, IAM)', tier: 'proficient', evidence: 'Automated artifact uploads to S3' },
  { name: 'JavaScript', tier: 'proficient' },
];

// Full toolbox, grouped. "Loadout" in Play Mode.
export const LOADOUT = [
  { slot: 'Automation', items: ['Selenium', 'Playwright', 'Robot Framework', 'PyTest'] },
  { slot: 'Languages', items: ['Python', 'JavaScript'] },
  { slot: 'CI/CD', items: ['Jenkins', 'CircleCI', 'GitHub Actions'] },
  { slot: 'Cloud', items: ['AWS S3', 'AWS IAM', 'Cloud Workflows'] },
  { slot: 'API Testing', items: ['Postman', 'REST Assured', 'Requests'] },
  { slot: 'Tools & VCS', items: ['Git', 'GitHub', 'Bitbucket'] },
];
