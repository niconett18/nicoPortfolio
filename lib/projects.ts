export type Project = {
  id: number;
  name: string;
  url: string;
  desc: string;
  role: string;
  type: 'Client' | 'Personal' | 'Community';
  year: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: 'Prime Capital Ledger',
    url: 'https://primecapitaledger.site',
    desc: 'Platform for a capital-management firm, built to read as credible and precise — clear product storytelling, structured information, and fast page loads.',
    role: 'Design & Development',
    type: 'Client',
    year: '2025',
    stack: ['Next.js', 'React', 'TailwindCSS', 'Vercel'],
    highlights: [
      'Solo build — UI/UX design, frontend, and deployment',
      'Custom domain with production hosting and SSL',
      'Performance-tuned, fully responsive across devices',
    ],
    featured: true,
    imageAlt: 'Prime Capital Ledger live website preview',
  },
  {
    id: 2,
    name: 'sumopower.id',
    url: 'https://sumopower.id',
    desc: 'E-commerce platform for an Indonesian retail brand. Owned the full project lifecycle — client requirements, UI/UX, implementation, and domain & hosting setup.',
    role: 'Fullstack Development',
    type: 'Client',
    year: '2024',
    stack: ['Next.js', 'React', 'TailwindCSS'],
    highlights: [
      'Full lifecycle: client requirements → design → production',
      'Product catalog and brand pages optimized for mobile shoppers',
      'Domain, hosting, and deployment handled end to end',
    ],
    featured: true,
    imageAlt: 'Sumopower live website preview',
  },
  {
    id: 3,
    name: 'cloudream.id',
    url: 'https://cloudream.id',
    desc: 'Company platform for a B2B cloud-services provider, designed and developed from scratch — services catalog, value-proposition pages, and lead generation.',
    role: 'Design & Development',
    type: 'Client',
    year: '2024',
    stack: ['Next.js', 'React', 'TailwindCSS'],
    highlights: [
      'Designed and developed from scratch as a solo build',
      'B2B-focused information architecture and lead capture',
      'Production deployment with custom domain and hosting',
    ],
    featured: true,
    imageAlt: 'Cloudream live website preview',
  },
  {
    id: 4,
    name: 'Idzhar Dwi Karya',
    url: 'https://idzhardwikarya.vercel.app',
    desc: 'Corporate profile site for a local business — services, track record, and contact, tuned for fast loads and clean presentation.',
    role: 'Design & Development',
    type: 'Client',
    year: '2025',
    stack: ['Next.js', 'React', 'Vercel'],
    highlights: [
      'Corporate profile with services and contact flow',
      'Performance-focused build with clean typography',
      'Deployed and maintained on Vercel',
    ],
    featured: false,
    imageAlt: 'Idzhar Dwi Karya live website preview',
  },
  {
    id: 5,
    name: 'Fore Nico',
    url: 'https://fore-nico.vercel.app',
    desc: 'Coffee-ordering concept app modeled on a modern F&B brand — menu browsing, product detail, and a polished mobile-first interface.',
    role: 'Concept Build',
    type: 'Personal',
    year: '2025',
    stack: ['Next.js', 'React', 'Vercel'],
    highlights: [
      'Concept build exploring F&B ordering UX',
      'Mobile-first interface with smooth interactions',
      'Deployed on Vercel',
    ],
    featured: false,
    imageAlt: 'Fore Nico live website preview',
  },
  {
    id: 6,
    name: 'G2M Church',
    url: 'https://g2mchurch.vercel.app',
    desc: 'Website for a church community — schedules, events, and announcements presented in one clear, accessible place.',
    role: 'Design & Development',
    type: 'Community',
    year: '2024',
    stack: ['Next.js', 'React', 'Vercel'],
    highlights: [
      'Community-focused structure: services, events, announcements',
      'Accessible, content-first layout',
      'Deployed on Vercel',
    ],
    featured: false,
    imageAlt: 'G2M Church live website preview',
  },
  {
    id: 7,
    name: 'TaskFlow',
    url: 'https://todolistbynico.vercel.app',
    desc: 'Minimalist task manager for students — quick capture, clean lists, and a distraction-free interface.',
    role: 'Product Build',
    type: 'Personal',
    year: '2024',
    stack: ['React', 'Vite', 'Vercel'],
    highlights: [
      'Built with React + Vite for instant interactions',
      'Minimal, distraction-free task UI',
      'Deployed on Vercel',
    ],
    featured: false,
    imageAlt: 'TaskFlow live website preview',
  },
];
