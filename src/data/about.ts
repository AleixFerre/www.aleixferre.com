import type { ImageMetadata } from 'astro';
import profilePhoto from '../assets/profile/yo_letra.webp';
import profileBackground from '../assets/profile/yo.webp';
import udgLogo from '../assets/companies/udg.webp';
import clearpeaksLogo from '../assets/companies/clearpeaks.webp';
import yuukoGamesLogo from '../assets/projects/yuukogames/yuukogames.webp';
import englishFlag from '../assets/flags/english.webp';
import spanishFlag from '../assets/flags/spanish.webp';
import catalanFlag from '../assets/flags/catalan.webp';

export interface AboutItem {
  image?: ImageMetadata;
  heading?: string;
  title: string;
  subtitle: string;
}

export interface AboutSection<T> {
  title: string;
  items: T[];
}

export interface AboutContent {
  hero: {
    eyebrow: string;
    title: string;
    pills: string[];
    description: string;
  };
  profile: {
    name: string;
    birthDate: string;
    location: string;
    photo: ImageMetadata;
    background: ImageMetadata;
  };
  focus: AboutSection<string>;
  education: AboutSection<AboutItem>;
  professionalExperience: AboutSection<AboutItem>;
  languages: AboutSection<AboutItem>;
}

export const ABOUT: AboutContent = {
  hero: {
    eyebrow: 'Aleix Ferré',
    title: 'Game Designer & Developer',
    pills: ['Team Management', 'Game Design', 'Unity', 'Angular', 'Flutter'],
    description: `Crafting web dashboards and mobile apps at <strong>ClearPeaks</strong> by day, <br>
      making <strong>Yuuko Games</strong> better by night, <br>
      and going to the gym to unrust.`,
  },
  profile: {
    name: 'Aleix Ferré',
    birthDate: '1999-12-19',
    location: 'Girona',
    photo: profilePhoto,
    background: profileBackground,
  },
  focus: {
    title: 'Currently focused on',
    items: [
      'Shipping new engaging experiences with <strong>Yuuko Games</strong>.',
      'Building web and mobile interactive dashboards at <strong>ClearPeaks</strong>.',
      'Prototyping mechanics, shaders, and tools to build <strong>new game experiments</strong>.',
    ],
  },
  education: {
    title: 'Education',
    items: [
      {
        image: udgLogo,
        heading: 'University of Girona',
        title: 'Game Design and Development Degree',
        subtitle: '2017 - 2021',
      },
    ],
  },
  professionalExperience: {
    title: 'Professional Experience',
    items: [
      {
        image: yuukoGamesLogo,
        heading: 'Yuuko Games',
        title: 'Co-Founder',
        subtitle: '2023 - Present',
      },
      {
        image: clearpeaksLogo,
        heading: 'ClearPeaks',
        title: 'Senior Web & Mobile Developer',
        subtitle: '2023 - Present',
      },
      {
        image: clearpeaksLogo,
        heading: 'ClearPeaks',
        title: 'Junior Web Developer',
        subtitle: '2021 - 2023',
      },
    ],
  },
  languages: {
    title: 'Languages',
    items: [
      {
        image: englishFlag,
        title: 'English',
        subtitle: 'Full Professional',
      },
      {
        image: spanishFlag,
        title: 'Spanish',
        subtitle: 'Native',
      },
      {
        image: catalanFlag,
        title: 'Catalan',
        subtitle: 'Native',
      },
    ],
  },
};
