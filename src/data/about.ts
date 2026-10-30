export interface AboutMetric {
  img?: string;
  title?: string;
  number: string;
  description: string;
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
  };
  focus: AboutSection<string>;
  education: AboutSection<AboutMetric>;
  professionalExperience: AboutSection<AboutMetric>;
  languages: AboutSection<AboutMetric>;
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
        img: '/assets/companies/udg.webp',
        title: 'University of Girona',
        number: 'Game Design and Development Degree',
        description: '2017 - 2021',
      },
    ],
  },
  professionalExperience: {
    title: 'Professional Experience',
    items: [
      {
        img: '/assets/projects/yuukogames/yuukogames-thumb.webp',
        title: 'Yuuko Games',
        number: 'Co-Founder',
        description: '2023 - Present',
      },
      {
        img: '/assets/companies/clearpeaks.webp',
        title: 'ClearPeaks',
        number: 'Senior Web & Mobile Developer',
        description: '2023 - Present',
      },
      {
        img: '/assets/companies/clearpeaks.webp',
        title: 'ClearPeaks',
        number: 'Junior Web Developer',
        description: '2021 - 2023',
      },
    ],
  },
  languages: {
    title: 'Languages',
    items: [
      {
        img: '/assets/flags/english.webp',
        number: 'English',
        description: 'Full Professional',
      },
      {
        img: '/assets/flags/spanish.webp',
        number: 'Spanish',
        description: 'Native',
      },
      {
        img: '/assets/flags/catalan.webp',
        number: 'Catalan',
        description: 'Native',
      },
    ],
  },
};
