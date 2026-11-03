export interface FeaturedProject {
  id: string;
  size?: 'large';
}

export interface ExperienceStat {
  label: string;
  since: Date;
}

export interface Specialization {
  text: string;
  icon: string;
}

export const HOME: {
  featured: FeaturedProject[];
  experience: ExperienceStat[];
  specializations: Specialization[];
} = {
  featured: [
    { id: 'yuukogames' },
    { id: 'usignals' },
    { id: '24h-antes-del-apocalipsis' },
    { id: 'threefold', size: 'large' },
    { id: 'the-forbidden-door', size: 'large' },
  ],
  experience: [
    { label: 'Indie Games', since: new Date('2017-01-01') },
    { label: 'Web & Mobile', since: new Date('2021-09-01') },
  ],
  specializations: [
    { text: 'Unity', icon: '/assets/tecnologies/unity.svg' },
    { text: 'Game Design', icon: '/assets/tecnologies/game_design.svg' },
    { text: 'Project Management', icon: '/assets/tecnologies/project_management.svg' },
  ],
};
