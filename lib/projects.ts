export type Project = {
  id: number;
  name: string;
  url: string;
  desc: string;
  role: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: 'Prime Capital Ledger',
    url: 'https://primecapitaledger.site',
    desc: 'Financial platform delivering a sleek, trust-driven interface for capital management.',
    role: 'Web Development',
    imageAlt: 'Prime Capital Ledger live website preview'
  },
  {
    id: 2,
    name: 'sumopower.id',
    url: 'https://sumopower.id',
    desc: 'Commercial e-commerce platform architected for speed and seamless UX.',
    role: 'Web Development',
    imageAlt: 'Sumopower live website preview'
  },
  {
    id: 3,
    name: 'cloudream.id',
    url: 'https://cloudream.id',
    desc: 'B2B digital platform offering robust enterprise cloud solutions.',
    role: 'Web Development',
    imageAlt: 'Cloudream live website preview'
  },
  {
    id: 4,
    name: 'Fore Nico',
    url: 'https://fore-nico.vercel.app',
    desc: 'An innovative web project showcasing modern capabilities and clean architecture.',
    role: 'Web Development',
    imageAlt: 'Fore Nico live website preview'
  },
  {
    id: 5,
    name: 'G2M Church',
    url: 'https://g2mchurch.vercel.app',
    desc: 'Digital platform engineered for community engagement, offering a seamless user journey.',
    role: 'Web Development',
    imageAlt: 'G2M Church live website preview'
  },
  {
    id: 6,
    name: 'To-Do List by Nico',
    url: 'https://todolistbynico.vercel.app',
    desc: 'A high-performance productivity application emphasizing minimalist UX and solid state management.',
    role: 'Web Development',
    imageAlt: 'To-Do List by Nico live website preview'
  },
  {
    id: 7,
    name: 'Idzhar Dwi Karya',
    url: 'https://idzhardwikarya.vercel.app',
    desc: 'Corporate landing interface built with precision, delivering optimal performance and aesthetics.',
    role: 'Web Development',
    imageAlt: 'Idzhar Dwi Karya live website preview'
  }
];
