import { SITE } from './site';

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  wide?: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'Download CV', href: '/assets/contact/cv.pdf', icon: '/assets/contact/cv.json', wide: true },
  { label: 'Github', href: SITE.social.github, icon: '/assets/contact/github.json' },
  { label: 'Itch.io', href: SITE.social.itchio, icon: '/assets/contact/itchio.json' },
  { label: 'LinkedIn', href: SITE.social.linkedin, icon: '/assets/contact/linkedin.json' },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: '/assets/contact/email.json' },
];
