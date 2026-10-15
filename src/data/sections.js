import { QUESTS } from './quests';

// Page sections in display order. `play` / `plain` are the Play Mode and Recruiter Mode names.
export const SECTIONS = [
  { id: 'experience', play: 'Journey', plain: 'Experience', inNav: true },
  { id: 'skills', play: 'Skills', plain: 'Skills', inNav: true },
  { id: 'learning', play: 'Knowledge Tree', plain: 'Currently Learning', inNav: false },
  // Recruiter Mode hides empty sections; Play Mode shows them as locked content
  { id: 'projects', play: 'Quests', plain: 'Projects', inNav: true, isEmpty: () => QUESTS.length === 0 },
  { id: 'achievements', play: 'Achievements', plain: 'Achievements', inNav: true },
  { id: 'contact', play: 'Party Up', plain: 'Contact', inNav: true },
];

export const getVisibleSections = (isPlay) =>
  SECTIONS.filter((section) => isPlay || !section.isEmpty?.());

/** Nav links: the hero ("about") plus every visible section flagged for the nav. */
export const getNavLinks = (isPlay) => [
  { id: 'about', play: 'Profile', plain: 'About' },
  ...getVisibleSections(isPlay).filter((section) => section.inNav),
];
