/**
 * Profile content shared by the About, Experience and Contact sections.
 * Copy here is Nico's own; edit it in one place.
 */

export const profile = {
  name: "Nicholas Edmund Tanaka",
  shortName: "Nicholas Edmund",
  title: "Fullstack Developer",
  subtitle: "Fullstack Developer & Computer Engineering Student",
  location: "Jakarta, Indonesia",
  email: "nicholasedmund18@gmail.com",
  status: "Available for freelance & internships",
};

export const about = {
  headline: "Minimalist by design.",
  headlineMuted: "Maximalist in performance.",
  lead:
    "Computer Engineering student at Universitas Indonesia, building sharp, high-performance web applications with precision engineering and modern tooling.",
  body:
    "Engineering scalable systems at the intersection of robust backend architecture and striking frontend execution.",
  facts: [
    {
      label: "Focus",
      value: "Next.js & React ecosystem, backend architecture, and high-performance user interfaces.",
    },
    {
      label: "Education",
      value: "Computer Engineering",
      meta: "Universitas Indonesia · expected 2028",
    },
    {
      label: "Currently",
      value: "Shipping freelance web work and exploring AI-assisted developer tooling.",
    },
  ],
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  /** Year shown in the timeline gutter. */
  startYear: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Freelance Web Developer",
    org: "Independent",
    period: "2024 — Present",
    startYear: "2024",
    bullets: [
      "Designed and developed ClariPet, sumopower.id, and cloudream.id from scratch — covering UI/UX, frontend, backend, and deployment.",
      "Managed full project lifecycle: client requirements gathering, implementation, and domain/hosting setup.",
      "Delivered all projects as solo builds — owning architecture, code quality, and production-readiness end-to-end.",
    ],
  },
  {
    role: "Vice Head of Creative Marketing",
    org: "EXERCISE FTUI — Universitas Indonesia",
    period: "Feb 2025 — Present",
    startYear: "2025",
    bullets: [
      "Promoted from Creative Marketing Staff based on strong performance; now mentor junior staff and oversee event promotions.",
      "Lead the creative team in digital marketing strategy, content planning, copywriting, and branding campaigns.",
    ],
  },
];

export const education = {
  degree: "B.Eng. in Computer Engineering",
  school: "Universitas Indonesia, Depok",
  period: "2024 — 2028",
  current: true,
  detail:
    "Engaged in academic projects, extracurricular activities, and research across computer engineering, with a focus on systems, software, and applied web technologies.",
};

export const skillGroups = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Vite", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "TypeScript", "PostgreSQL", "REST APIs"],
  },
  {
    label: "Tooling & DevOps",
    items: ["Git", "Docker", "Linux", "Vercel", "CI/CD"],
  },
  {
    label: "Design & Other",
    items: ["Figma", "UI/UX", "C", "C++", "Python", "Java"],
  },
];

export const socials = [
  { label: "Email", value: "nicholasedmund18@gmail.com", href: "mailto:nicholasedmund18@gmail.com" },
  { label: "GitHub", value: "github.com/niconett18", href: "https://github.com/niconett18" },
  { label: "Instagram", value: "instagram.com/niconet18", href: "https://www.instagram.com/niconet18/" },
] as const;
