export interface AboutItem {
  image?: string;
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
    photo: string;
    background: string;
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
    photo: '/assets/profile/yo_letra.webp',
    background: '/assets/profile/yo.webp',
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
        image: '/assets/companies/udg.webp',
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
        image: '/assets/projects/yuukogames/yuukogames.webp',
        heading: 'Yuuko Games',
        title: 'Co-Founder',
        subtitle: '2023 - Present',
      },
      {
        image: '/assets/companies/clearpeaks.webp',
        heading: 'ClearPeaks',
        title: 'Senior Web & Mobile Developer',
        subtitle: '2023 - Present',
      },
      {
        image: '/assets/companies/clearpeaks.webp',
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
        image: '/assets/flags/english.webp',
        title: 'English',
        subtitle: 'Full Professional',
      },
      {
        image: '/assets/flags/spanish.webp',
        title: 'Spanish',
        subtitle: 'Native',
      },
      {
        image: '/assets/flags/catalan.webp',
        title: 'Catalan',
        subtitle: 'Native',
      },
    ],
  },
};
