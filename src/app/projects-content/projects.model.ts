export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  additionalUrl?: [string, string]; // Optional field to indicate an additional URL to visit the project. Template: [URL, Title]
  image: string;
  backgroundImage: string;
  images: string[];
  details: Record<string, string>; // Details about the project, such as technologies used, team members, main focus, challenges faced, etc.
  goodForYouIf?: string[]; // Optional field to indicate if the project is suitable for certain audiences. Template: Good for you if "You X".
  whatILearned?: string[]; // Optional field to indicate what the author learned from the project. Template: I learned "X".
  createdAt: Date; // Date of creation.
  finishedAt?: Date; // Optional field to indicate when the project was finished. If null, the project is still in progress.
  class?: string;
}

export const DUMMY_PROJECT: Project = {
  id: '__dummy__',
  name: 'Dummy Project',
  description: 'You should never see this.',
  url: '#',
  image: '',
  backgroundImage: '',
  images: [],
  details: {},
  createdAt: new Date(),
};

const YuukoGamesProject: Project = {
  id: 'yuukogames',
  name: 'Yuuko Games',
  description:
    'A game development studio focused on creating unique and engaging games based in Girona.',
  url: 'https://yuukogamesstudio.github.io',
  image: '/assets/projects/yuukogames/yuukogames.webp',
  backgroundImage: '/assets/projects/yuukogames/yuukogames_bg.webp',
  images: [
    '/assets/projects/yuukogames/yuukogames-1.webp',
    '/assets/projects/yuukogames/yuukogames-2.webp',
  ],
  details: {
    'Main Focus': 'Game Development and Design',
    'Notable Projects': 'The Forbidden Door, USignals',
    'Technologies Used': 'Unity, C#, Git',
    'Team Members': 'Aleix Ferré, Joaquin Villena, Arnau Albertí',
  },
  goodForYouIf: [
    'You are looking for a quality-first game development studio.',
    'You want to work with a team of talented and experienced developers.',
    'You want to create a unique and engaging game that will captivate players.',
  ],
  whatILearned: [
    'How to finish a complete commercial game from start to finish.',
    'How to market a game.',
    'How to work in a team with other developers.',
  ],
  createdAt: new Date('2023-04-01'),
};

const USignalsProject: Project = {
  id: 'usignals',
  name: 'USignals',
  description:
    'A lightweight package that provides a simple and easy to use a reactive signal system for Unity.',
  url: 'https://github.com/Yuuko-Games/usignals',
  image: '/assets/projects/usignals/usignals.webp',
  backgroundImage: '/assets/projects/usignals/usignals_bg.webp',
  images: [
    '/assets/projects/usignals/usignals-1.webp',
    '/assets/projects/usignals/usignals-2.webp',
  ],
  details: {
    'Main Focus': 'Library Development.',
    'Notable Features': 'Reactive programming, event handling and signaling.',
    'Technologies Used': 'Unity, C#, Git.',
    'Challenges Faced': 'Making the package useful and easy to use.',
  },
  whatILearned: [
    'How to create and publish a package for Unity.',
    'How to make reusable components in Unity.',
    'How to use reactive programming concepts in Unity.',
  ],
  createdAt: new Date('2025-01-01'),
  finishedAt: new Date('2025-03-02'),
};

const TheForbiddenDoorProject: Project = {
  id: 'the-forbidden-door',
  name: 'The Forbidden Door',
  description:
    'A horror puzzle game that challenges players to solve intricate puzzles while navigating a chilling atmosphere.',
  url: 'https://yuukogames.itch.io/the-forbidden-door',
  image: '/assets/projects/the-forbidden-door/the-forbidden-door.webp',
  backgroundImage:
    '/assets/projects/the-forbidden-door/the-forbidden-door_bg.webp',
  images: [
    '/assets/projects/the-forbidden-door/the-forbidden-door-1.webp',
    '/assets/projects/the-forbidden-door/the-forbidden-door-2.webp',
    '/assets/projects/the-forbidden-door/the-forbidden-door-3.webp',
  ],
  details: {
    'Main Focus': 'Development and Design of a complete Horror Puzzle Game.',
    'Notable Features':
      'A unique puzzle system, a unique art style, and a unique story.',
    'Technologies Used': 'Unity, C#, Git.',
    Authors: 'Aleix Ferré, Joaquín Villena.',
  },
  goodForYouIf: [
    'You like atmospheric puzzle horror games.',
    'You would like to live a unique and immersive experience.',
    'You like a short but intense experience.',
  ],
  whatILearned: [
    'How to create a complete commercial game from start to finish.',
    'How to market a game.',
    'How to work in a team with other developers.',
  ],
  createdAt: new Date('2023-04-01'),
  finishedAt: new Date('2025-04-01'),
};

const MastersArenaProject: Project = {
  id: 'masters-arena',
  name: 'Masters Arena',
  description:
    'A multiplayer online battle arena game that pits players against each other in strategic combat.',
  url: 'https://aleixferre.itch.io/masters-arena',
  additionalUrl: ['/assets/projects/masters-arena/tfg.pdf', 'Project Report'],
  image: '/assets/projects/masters-arena/masters-arena.webp',
  backgroundImage: '/assets/projects/masters-arena/masters-arena_bg.webp',
  images: [
    '/assets/projects/masters-arena/masters-arena-1.webp',
    '/assets/projects/masters-arena/masters-arena-2.webp',
    '/assets/projects/masters-arena/masters-arena-3.webp',
    '/assets/projects/masters-arena/masters-arena-4.webp',
  ],
  details: {
    'Main Focus': 'Realtime Multiplayer Game Development in Unity.',
    'Notable Features':
      'Real-time multiplayer combat, unique character abilities, scalable systems and fun gameplay.',
    'University Final Project':
      'This was my final project for my university Game Design & Development degree. I had a 10/10 grade.',
    'Technologies Used': 'Unity, C#, Photon Pun, Git, Mixamo.',
  },
  goodForYouIf: [
    'You like fast MOBA games.',
    'You want to experiment a fresh take on the genre.',
    'You want to check out what I did for my final project at university.',
  ],
  whatILearned: [
    'I learned how to create a game that involves real-time multiplayer combat, unique character abilities, and scalable systems.',
    'I learned how to use the Unity game engine to create a game that is both challenging and engaging.',
    'I learned how to use the Photon Pun Services to create a game that uses the client-server architecture.',
  ],
  createdAt: new Date('2021-03-01'),
  finishedAt: new Date('2022-01-02'),
};

const EndlessDungeonProject: Project = {
  id: 'endless-dungeon',
  name: 'Endless Dungeon',
  description:
    'A gamejam game about a knight that has a ball attached to a chain, swinging it around to move smoothly and defeat enemies.',
  url: 'https://aleixferre.itch.io/endless-dungeon',
  image: '/assets/projects/endless-dungeon/endless-dungeon.webp',
  backgroundImage: '/assets/projects/endless-dungeon/endless-dungeon_bg.webp',
  images: [
    '/assets/projects/endless-dungeon/endless-dungeon-1.webp',
    '/assets/projects/endless-dungeon/endless-dungeon-2.webp',
    '/assets/projects/endless-dungeon/endless-dungeon-3.webp',
    '/assets/projects/endless-dungeon/endless-dungeon-4.webp',
  ],
  details: {
    'Main Focus': 'GameJam Game Development.',
    'Notable Features':
      'A unique gameplay mechanic, making it useful and interesting.',
    'Technologies Used': 'Unity, C#, Git.',
    'Challenges Faced':
      'Making the mechanic interesting, useful and easily understandable.',
    Authors: 'Aleix Ferré, Joaquín Villena, Joel Pérez.',
  },
  goodForYouIf: [
    'You like fast and challenging games.',
    'You want to play a unique and engaging game.',
  ],
  whatILearned: [
    'How to design an innovative game mechanic that is both interesting and useful.',
    'How to design and implement fun mechanics fast and efficiently.',
  ],
  createdAt: new Date('2021-07-01'),
  finishedAt: new Date('2021-07-02'),
};

const AngryStewardessProject: Project = {
  id: 'angry-stewardess',
  name: 'The Angry Stewardess',
  description:
    'A gamejam game about a stewardess in a train that kicks all security guards out of the train.',
  url: 'https://aleixferre.itch.io/the-angry-stewardess',
  image: '/assets/projects/angry-stewardess/angry-stewardess.webp',
  backgroundImage: '/assets/projects/angry-stewardess/angry-stewardess_bg.webp',
  images: [
    '/assets/projects/angry-stewardess/angry-stewardess-1.webp',
    '/assets/projects/angry-stewardess/angry-stewardess-2.webp',
    '/assets/projects/angry-stewardess/angry-stewardess-3.webp',
  ],
  details: {
    'Main Focus': 'GameJam Game Development.',
    'Notable Features':
      'The rage mechanic, that is a counter-mechanic for the health, makes the game interesting and engaging.',
    'Technologies Used': 'Unity, C#, Git.',
    'Challenges Faced':
      'Making the rage mechanic interesting, useful and easily understandable.',
    Authors: 'Aleix Ferré, Eric Valero, Laureola, Joel Pérez, Arnau Albertí.',
  },
  goodForYouIf: [
    'You like fast and challenging games.',
    'You want to play a unique and engaging game.',
    'You like a short but intense experience.',
  ],
  whatILearned: [
    'How to design an innovative game mechanic that is both interesting and useful.',
    'How to design and implement fun mechanics fast and efficiently.',
  ],
  createdAt: new Date('2022-09-01'),
  finishedAt: new Date('2022-09-02'),
};

const ASCIIShaderProject: Project = {
  id: 'ascii-shader',
  name: 'ASCII Shader',
  description:
    'A shader for Unity that converts your screen into a text-based ASCII art.',
  url: 'https://aleixferre.itch.io/ascii-shader',
  image: '/assets/projects/ascii-shader/ascii-shader.webp',
  backgroundImage: '/assets/projects/ascii-shader/ascii-shader_bg.webp',
  images: [
    '/assets/projects/ascii-shader/ascii-shader-1.webp',
    '/assets/projects/ascii-shader/ascii-shader-2.webp',
  ],
  details: {
    'Main Focus': 'Unity Fullscreen Shader Development.',
    'Notable Features': 'A shader that converts your screen into ASCII art.',
    'University Project': 'This is a university project.',
    'Technologies Used': 'Unity, C#, ShaderLab, Git.',
    'Challenges Faced': 'Making the shader visually appealing and performant.',
    Authors: 'Aleix Ferré, Joaquín Villena, Joel Pérez.',
  },
  goodForYouIf: [
    'You like this shader for your games.',
    'You want to make a variant of this shader.',
  ],
  whatILearned: [
    'How a shader works in Unity.',
    'How to make a shader visually appealing and performant.',
  ],
  createdAt: new Date('2021-03-01'),
  finishedAt: new Date('2021-04-01'),
};

const DragThemOutIntoSpaceProject: Project = {
  id: 'drag-them-out-into-space',
  name: 'Drag Them Out Into Space',
  description:
    'A gamejam game about a superwoman that needs to protect the city from meteors by dragging them out into space.',
  url: 'https://aleixferre.itch.io/drag-them-out-into-space',
  image:
    '/assets/projects/drag-them-out-into-space/drag-them-out-into-space.webp',
  backgroundImage:
    '/assets/projects/drag-them-out-into-space/drag-them-out-into-space_bg.webp',
  images: [
    '/assets/projects/drag-them-out-into-space/drag-them-out-into-space-1.webp',
    '/assets/projects/drag-them-out-into-space/drag-them-out-into-space-2.webp',
    '/assets/projects/drag-them-out-into-space/drag-them-out-into-space-3.webp',
  ],
  details: {
    'Main Focus': 'GameJam Game Development.',
    'Notable Features':
      'The drag mechanic makes it easily compatible with mobile devices.',
    'Technologies Used': 'Unity, C#, Bfxr, Git.',
    'Challenges Faced':
      'Balancing the meteorite frequence and the drag mechanic to make it fun and challenging.',
    Authors: 'Aleix Ferré, Joaquín Villena, Joel Pérez.',
  },
  goodForYouIf: [
    'You want to play a game with a unique mechanic.',
    'You like a short but intense experience.',
  ],
  whatILearned: [
    'How to design an innovative game mechanic that is both interesting and useful.',
    'How to design and implement fun mechanics fast and efficiently.',
  ],
  createdAt: new Date('2021-04-01'),
  finishedAt: new Date('2021-04-02'),
};

const SmokeFighterProject: Project = {
  id: 'smoke-fighter',
  name: 'SmokeFighter',
  description:
    'A gamejam game about a fire fighter that needs to protect a building from smoke and fire!',
  url: 'https://aleixferre.itch.io/smokefighter',
  image: '/assets/projects/smokefighter/smokefighter.webp',
  backgroundImage: '/assets/projects/smokefighter/smokefighter_bg.webp',
  images: [
    '/assets/projects/smokefighter/smokefighter-1.webp',
    '/assets/projects/smokefighter/smokefighter-2.webp',
    '/assets/projects/smokefighter/smokefighter-3.webp',
  ],
  details: {
    'Main Focus': 'GameJam Game Development.',
    'Notable Features':
      'The movement is smooth due to the lerp function. The fire mechanic make the game increasingly difficult.',
    'Technologies Used': 'Unity, C#, Git.',
    'Challenges Faced':
      'Making the progressive difficulty and the fire mechanic interesting, useful and easily understandable.',
    Authors: 'Aleix Ferré, Joaquín Villena.',
  },
  goodForYouIf: [
    'You like incresingly difficult games.',
    'You like a short but intense experience.',
  ],
  whatILearned: [
    'How to design an innovative game mechanic that is both interesting and useful.',
    'How to design and implement fun mechanics fast and efficiently.',
  ],
  createdAt: new Date('2021-04-01'),
  finishedAt: new Date('2021-04-02'),
};

const PraeliaProject: Project = {
  id: 'praelia',
  name: 'PRAELIA',
  description:
    'A university 3D puzzle project about navigating through a series of intricate futuristic mazes.',
  url: 'https://aleixferre.itch.io/praelia',
  image: '/assets/projects/praelia/praelia.webp',
  backgroundImage: '/assets/projects/praelia/praelia_bg.webp',
  images: [
    '/assets/projects/praelia/praelia-1.webp',
    '/assets/projects/praelia/praelia-2.webp',
    '/assets/projects/praelia/praelia-3.webp',
    '/assets/projects/praelia/praelia-4.webp',
  ],
  details: {
    'Main Focus': 'Design and Implement 3D Puzzle Game.',
    'Notable Features':
      'The first game using HDRP. It also was first time designing 3D puzzle mechanics.',
    'University Project': 'This is a university project.',
    'Technologies Used': 'Unity, C#, Unity Version Control System, Git.',
    'Challenges Faced':
      'Making the puzzle mechanic interesting, useful and easily understandable.',
    Authors: 'Aleix Ferré, Oriol Viu, Roger Gibert.',
  },
  goodForYouIf: [
    'You like puzzle heavy challenging games.',
    'You like a realistic and immersive experience.',
    'You like a interesting short story.',
  ],
  whatILearned: [
    'How to use the new HDRP in Unity.',
    'How to design 3D puzzle mechanics that are both interesting and challenging.',
    'How to use the integrated version control system from Unity.',
    'How to make a minimap using a cenital camera.',
  ],
  createdAt: new Date('2019-10-01'),
  finishedAt: new Date('2020-01-01'),
};

const AimDemoProject: Project = {
  id: 'aim-demo',
  name: 'AIM Demo',
  description:
    'My first game ever made, a simple aim training game with a shooting range.',
  url: 'https://yuukogames.github.io/aimdemo/',
  image: '/assets/projects/aim-demo/aim-demo.webp',
  backgroundImage: '/assets/projects/aim-demo/aim-demo_bg.webp',
  images: [
    '/assets/projects/aim-demo/aim-demo-1.webp',
    '/assets/projects/aim-demo/aim-demo-2.webp',
    '/assets/projects/aim-demo/aim-demo-3.webp',
  ],
  details: {
    'Main Focus': 'Finish the first game ever made.',
    'Notable Features': 'A simple aim training game with a shooting range.',
    'Technologies Used': 'Unity, C#, Git.',
  },
  goodForYouIf: [
    'You like a game that is easy to learn.',
    'You like a game that is fun to play.',
    'You would like to see my first game ever made.',
  ],
  whatILearned: [
    'How to create a simple game with a shooting range.',
    'How to use the Unity game engine.',
    'How to use the Git version control system.',
  ],
  createdAt: new Date('2019-05-01'),
  finishedAt: new Date('2019-07-01'),
};

const CataBotProject: Project = {
  id: 'catabot',
  name: 'CataBot',
  description:
    'A Discord bot that helps you manage your server with various commands and features.',
  url: 'https://www.github.com/AleixFerre/CataBot',
  image: '/assets/projects/catabot/catabot.webp',
  backgroundImage: '/assets/projects/catabot/catabot_bg.webp',
  images: [
    '/assets/projects/catabot/catabot-1.webp',
    '/assets/projects/catabot/catabot-2.webp',
    '/assets/projects/catabot/catabot-3.webp',
    '/assets/projects/catabot/catabot-4.webp',
  ],
  details: {
    'Main Focus': 'Discord Bot Development.',
    'Notable Features':
      'A Discord bot that lets you play music, manage your server, play games, have currency, xp, have lots of API connections to grab real-time data, and much more.',
    'Technologies Used':
      'Discord.js, YTDL (Youtube Download Library), JavaScript, Git, Heroku.',
    Records:
      'It was the most used Catalan Discord Bot in 2021 in the entire Discord. I had over 100k users.',
    Discontinued:
      'The bot was discontinued in 2022. Since Youtube decided to shut down the music API, I decided to stop updating the bot.',
    'Challenges Faced':
      'The biggest challenges were integrating the YTDL API to stream music into a voice channel and establishing a real-time database connection to reliably store all client data.',
  },
  goodForYouIf: [
    'You want a Discord bot in your server. Sadly it is now discontinued.',
    'You want to learn how to make a Discord bot. You can check out the source code on GitHub.',
  ],
  whatILearned: [
    'How to create a Discord bot.',
    'How to use the Discord.js library.',
    'How to use the YTDL package to play music in the voice channel.',
    'How to deploy a node server to Heroku.',
  ],
  createdAt: new Date('2020-01-01'),
  finishedAt: new Date('2022-08-01'),
};

const VeintiCuatroHorasAntesDelApocalipsisProject: Project = {
  id: '24h-antes-del-apocalipsis',
  name: '24h Antes del Apocalipsis',
  description:
    'A short story driven game, where your decisions will affect the outcome of the game.',
  url: 'https://yuukogames.itch.io/24h-antes-del-apocalipsis',
  image: '/assets/projects/24h-antes/24h-antes.webp',
  backgroundImage: '/assets/projects/24h-antes/24h-antes_bg.webp',
  images: [
    '/assets/projects/24h-antes/24h-antes-1.webp',
    '/assets/projects/24h-antes/24h-antes-2.webp',
    '/assets/projects/24h-antes/24h-antes-3.webp',
  ],
  details: {
    'Main Focus': 'Story-driven Game Development.',
    'Notable Features': 'Decision-based narrative with multiple outcomes.',
    'Technologies Used': 'Twine, HTML.',
  },
  goodForYouIf: [
    'You like story-driven games with meaningful choices.',
    'You want to experience a narrative game with multiple endings.',
  ],
  whatILearned: [
    'How to design a narrative game with branching storylines.',
    'How to implement decision systems that affect the game outcome.',
  ],
  createdAt: new Date('2025-08-01'),
  finishedAt: new Date('2025-09-02'),
};

export const FEATURED_PROJECTS: Project[] = [
  YuukoGamesProject,
  USignalsProject,
  MastersArenaProject,
  {
    ...TheForbiddenDoorProject,
    class: 'large',
  },
  {
    ...VeintiCuatroHorasAntesDelApocalipsisProject,
    class: 'large',
  },
];

export const ALL_PROJECTS: Project[] = [
  YuukoGamesProject,
  TheForbiddenDoorProject,
  USignalsProject,
  VeintiCuatroHorasAntesDelApocalipsisProject,
  MastersArenaProject,
  EndlessDungeonProject,
  DragThemOutIntoSpaceProject,
  SmokeFighterProject,
  ASCIIShaderProject,
  AngryStewardessProject,
  CataBotProject,
  PraeliaProject,
  AimDemoProject,
];
