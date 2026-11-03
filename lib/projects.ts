export type Project = {
  id: number;
  name: string;
  /** Live site or demo. Omit for work that has nothing to visit (e.g. lab builds). */
  url?: string;
  /** Label for the modal's primary button. Defaults to "Play the game" with a video, else "View live site". */
  linkLabel?: string;
  desc: string;
  role: string;
  type: 'Client' | 'Personal' | 'Community' | 'Academic' | 'Hackathon';
  status: 'Deployed' | 'Completed';
  year: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
  imageAlt: string;
  /** Static screenshot of the fully loaded site, served from /public. */
  image?: string;
  /** Muted looping preview the card autoplays in place of the screenshot. */
  video?: string;
  /** Screenshots shown in the modal when there is no live site or video to preview. */
  gallery?: { src: string; caption: string }[];
  /** Set for team builds; anything without it was shipped solo. */
  team?: string;
};

export const projects: Project[] = [
  {
    id: 8,
    name: 'ClariPet',
    url: 'https://claripetcare.com',
    desc: 'E-commerce platform for an Indonesian pet-care brand — grooming, hygiene, and health products for cats and dogs. Full storefront with product catalog, a guided recommendation quiz, and live payments.',
    role: 'Fullstack Development',
    type: 'Client',
    status: 'Deployed',
    year: '2026',
    stack: ['Next.js', 'React', 'Supabase', 'Midtrans', 'Cloudflare'],
    highlights: [
      'Complete commerce flow: catalog, category filtering, checkout, and Midtrans payments',
      'Supabase-backed product data, storage, and authentication',
      'Deployed on Cloudflare with a hardened CSP and security headers',
    ],
    featured: true,
    imageAlt: 'ClariPet live website preview',
  },
  {
    id: 11,
    name: 'Rimula Agents',
    url: 'https://github.com/davidalexander24/rimula-agents',
    linkLabel: 'View on GitHub',
    desc: 'AI co-pilot for skincare formulation R&D, built in 24 hours at UI Hackathon Incubate 2026 for the PT Paragon Technology and Innovation challenge. Given a product brief, it proposes the next formulas to test, estimates the chance each one meets every spec, checks them against ingredient, regulatory, and halal-sourcing rules, attaches literature and real-product evidence, and retrains after every lab result. A local Qwen3 orchestrator drives the agents, so formulation data never leaves the machine.',
    role: 'Team Lead · AI Safety & Ops',
    type: 'Hackathon',
    status: 'Completed',
    year: '2026',
    stack: ['Python', 'FastAPI', 'scikit-learn', 'Qwen3 · llama.cpp', 'React', 'TypeScript'],
    highlights: [
      'Top 10 of 30 finalist teams at UI Hackathon Incubate 2026, out of 78 teams registered',
      'Led the team and built the Guardian rule engine: ingredient limits, regulatory checks, and halal-sourcing flags on every proposed formula',
      'Built the Scout evidence agent on Europe PMC literature and Open Beauty Facts products; ran the server release, live demo, and pitch deck',
      'Gaussian-process Bayesian optimization reached an all-spec formula in a median 2 to 3 batches, 62 to 78% fewer than random search',
    ],
    featured: true,
    imageAlt: 'Rimula Agents formulation dashboard demo',
    image: '/projects/rimula-poster.jpg',
    video: '/projects/rimula.mp4',
    team: 'Team of 4 · Codingbang',
  },
  {
    id: 1,
    name: 'Prime Capital Ledger',
    url: 'https://primecapitaledger.site',
    desc: 'Platform for a capital-management firm, built to read as credible and precise — clear product storytelling, structured information, and fast page loads.',
    role: 'Design & Development',
    type: 'Client',
    status: 'Deployed',
    year: '2025',
    stack: ['Next.js', 'React', 'TailwindCSS', 'Vercel'],
    highlights: [
      'Solo build — UI/UX design, frontend, and deployment',
      'Custom domain with production hosting and SSL',
      'Performance-tuned, fully responsive across devices',
    ],
    featured: true,
    imageAlt: 'Prime Capital Ledger live website preview',
    image: '/projects/primecapitaledger.webp',
  },
  {
    id: 2,
    name: 'sumopower.id',
    url: 'https://sumopower.id',
    desc: 'E-commerce platform for an Indonesian retail brand. Owned the full project lifecycle — client requirements, UI/UX, implementation, and domain & hosting setup.',
    role: 'Fullstack Development',
    type: 'Client',
    status: 'Deployed',
    year: '2024',
    stack: ['Next.js', 'React', 'TailwindCSS'],
    highlights: [
      'Full lifecycle: client requirements → design → production',
      'Product catalog and brand pages optimized for mobile shoppers',
      'Domain, hosting, and deployment handled end to end',
    ],
    featured: true,
    imageAlt: 'Sumopower live website preview',
    image: '/projects/sumopower.webp',
  },
  {
    id: 3,
    name: 'cloudream.id',
    url: 'https://cloudream.id',
    desc: 'Company platform for a B2B cloud-services provider, designed and developed from scratch — services catalog, value-proposition pages, and lead generation.',
    role: 'Design & Development',
    type: 'Client',
    status: 'Deployed',
    year: '2024',
    stack: ['Next.js', 'React', 'TailwindCSS'],
    highlights: [
      'Designed and developed from scratch as a solo build',
      'B2B-focused information architecture and lead capture',
      'Production deployment with custom domain and hosting',
    ],
    featured: true,
    imageAlt: 'Cloudream live website preview',
    image: '/projects/cloudream.webp',
  },
  {
    id: 9,
    name: 'YuSurg',
    url: 'https://davidalexanderr.itch.io/yusurg',
    desc: '2D medical-simulation game built as the Object-Oriented Programming final project at Universitas Indonesia — players run emergency surgeries on randomized conditions while keeping patient vitals stable, backed by a Spring Boot API for progression and leaderboards.',
    role: 'Game Development',
    type: 'Academic',
    status: 'Completed',
    year: '2025',
    stack: ['Java', 'LibGDX', 'Spring Boot', 'PostgreSQL', 'JWT', 'Gradle'],
    highlights: [
      'Six design patterns in one codebase: Singleton, Factory, Observer, State, Template Method, and Command',
      'Patient vitals, difficulty-scaled illnesses, and a surgical tool system built on the four OOP pillars',
      'Spring Boot 3 REST API with JWT auth and a PostgreSQL-backed leaderboard',
    ],
    featured: true,
    imageAlt: 'YuSurg final project presentation',
    image: '/projects/yusurg-poster.jpg',
    video: '/projects/yusurg.mp4',
    team: 'Team of 4 · Kelompok 25',
  },
  {
    id: 10,
    name: 'Cisco Networking Labs',
    desc: 'Enterprise network builds from the Network Design & Management practicum at Universitas Indonesia. Each case study is a full Cisco Packet Tracer topology, designed, addressed, configured, and verified solo, from multi-area OSPF up to IPsec VPNs and Ansible-driven automation. The set also includes VLAN, inter-VLAN routing, and DHCP labs from the Computer Networks course.',
    role: 'Network Engineering',
    type: 'Academic',
    status: 'Completed',
    year: '2026',
    stack: ['Cisco IOS', 'Packet Tracer', 'OSPF', 'EIGRP', 'IPsec VPN', 'QoS', 'NetFlow', 'SNMP', 'Ansible', 'VyOS'],
    highlights: [
      'Routing: multi-area OSPFv2, OSPFv3 with SLAAC on IPv6, and EIGRP across multi-site WANs',
      'Security: static NAT, extended ACL policies, and site-to-site IPsec tunnels verified with show crypto ipsec sa',
      'WAN and traffic control: PPP and Frame Relay links, plus class-based QoS for SSH, HTTP, and voice traffic',
      'Operations: NetFlow and SNMP monitoring, an SDN network controller, and Ansible playbooks configuring VyOS routers',
    ],
    featured: true,
    imageAlt: 'Cisco Packet Tracer topology of a site-to-site IPsec VPN',
    image: '/projects/cisco-networking-labs.webp',
    gallery: [
      { src: '/projects/cisco/vpn-ipsec.webp', caption: 'Site-to-site IPsec VPN between two branches across a WAN core' },
      { src: '/projects/cisco/ospf.webp', caption: 'Six-router multi-area OSPF ring with redundant serial links' },
      { src: '/projects/cisco/nat-acl.webp', caption: 'Multi-site WAN with static NAT and DNS/DHCP services' },
      { src: '/projects/cisco/netflow.webp', caption: 'NetFlow monitoring that traces an ACL-blocked intruder' },
    ],
  },
  {
    id: 4,
    name: 'Idzhar Dwi Karya',
    url: 'https://idzhardwikarya.vercel.app',
    desc: 'Corporate profile site for a local business — services, track record, and contact, tuned for fast loads and clean presentation.',
    role: 'Design & Development',
    type: 'Client',
    status: 'Deployed',
    year: '2025',
    stack: ['Next.js', 'React', 'Vercel'],
    highlights: [
      'Corporate profile with services and contact flow',
      'Performance-focused build with clean typography',
      'Deployed and maintained on Vercel',
    ],
    featured: false,
    imageAlt: 'Idzhar Dwi Karya live website preview',
    image: '/projects/izhadwikarya.webp',
  },
  {
    id: 5,
    name: 'Fore Nico',
    url: 'https://fore-nico.vercel.app',
    desc: 'Coffee-ordering concept app modeled on a modern F&B brand — menu browsing, product detail, and a polished mobile-first interface.',
    role: 'Concept Build',
    type: 'Personal',
    status: 'Deployed',
    year: '2025',
    stack: ['Next.js', 'React', 'Vercel'],
    highlights: [
      'Concept build exploring F&B ordering UX',
      'Mobile-first interface with smooth interactions',
      'Deployed on Vercel',
    ],
    featured: false,
    imageAlt: 'Fore Nico live website preview',
    image: '/projects/fore.webp',
  },
  {
    id: 6,
    name: 'G2M Church',
    url: 'https://g2mchurch.vercel.app',
    desc: 'Website for a church community — schedules, events, and announcements presented in one clear, accessible place.',
    role: 'Design & Development',
    type: 'Community',
    status: 'Deployed',
    year: '2024',
    stack: ['Next.js', 'React', 'Vercel'],
    highlights: [
      'Community-focused structure: services, events, announcements',
      'Accessible, content-first layout',
      'Deployed on Vercel',
    ],
    featured: false,
    imageAlt: 'G2M Church live website preview',
    image: '/projects/g2mchurch.webp',
  },
  {
    id: 7,
    name: 'TaskFlow',
    url: 'https://todolistbynico.vercel.app',
    desc: 'Minimalist task manager for students — quick capture, clean lists, and a distraction-free interface.',
    role: 'Product Build',
    type: 'Personal',
    status: 'Deployed',
    year: '2024',
    stack: ['React', 'Vite', 'Vercel'],
    highlights: [
      'Built with React + Vite for instant interactions',
      'Minimal, distraction-free task UI',
      'Deployed on Vercel',
    ],
    featured: false,
    imageAlt: 'TaskFlow live website preview',
    image: '/projects/todolist.webp',
  },
];
