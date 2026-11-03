export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  wide?: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'Download CV', href: '/assets/contact/cv.pdf', icon: '/assets/contact/cv.json', wide: true },
  { label: 'Github', href: 'https://github.com/AleixFerre', icon: '/assets/contact/github.json' },
  { label: 'Itch.io', href: 'https://aleixferre.itch.io/', icon: '/assets/contact/itchio.json' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aleixferre/', icon: '/assets/contact/linkedin.json' },
  { label: 'Email', href: 'mailto:afj.99@hotmail.com', icon: '/assets/contact/email.json' },
];
