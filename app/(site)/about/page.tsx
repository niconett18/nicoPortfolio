'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Folder, GraduationCap, Wrench } from 'lucide-react';
import {
  SiNextdotjs,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiFramer,
  SiLinux,
  SiVercel,
  SiFigma,
  SiC,
  SiCplusplus,
  SiPython
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../../lib/animations';

const education = {
  degree: 'B.Eng. in Computer Engineering',
  school: 'Universitas Indonesia, Depok',
  period: '2024 — 2028',
  detail:
    'Engaged in academic projects, extracurricular activities, and research across computer engineering, with a focus on systems, software, and applied web technologies.'
};

const experience = [
  {
    role: 'Freelance Web Developer',
    org: 'Independent',
    period: '2024 — Present',
    bullets: [
      'Designed and developed sumopower.id and cloudream.id from scratch — covering UI/UX, frontend, backend, and deployment.',
      'Managed full project lifecycle: client requirements gathering, implementation, and domain/hosting setup.',
      'Delivered all projects as solo builds — owning architecture, code quality, and production-readiness end-to-end.'
    ]
  },
  {
    role: 'Vice Head of Creative Marketing',
    org: 'EXERCISE FTUI — Universitas Indonesia',
    period: 'Feb 2025 — Present',
    bullets: [
      'Promoted from Creative Marketing Staff based on strong performance; now mentor junior staff and oversee event promotions.',
      'Lead the creative team in digital marketing strategy, content planning, copywriting, and branding campaigns.'
    ]
  }
];

const skills = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'Vite', icon: SiVite },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'TailwindCSS', icon: SiTailwindcss },
      { name: 'Framer Motion', icon: SiFramer }
    ]
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'REST APIs', icon: null }
    ]
  },
  {
    label: 'Tooling & DevOps',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'Docker', icon: SiDocker },
      { name: 'Linux', icon: SiLinux },
      { name: 'Vercel', icon: SiVercel },
      { name: 'CI/CD', icon: null }
    ]
  },
  {
    label: 'Design & Other',
    items: [
      { name: 'Figma', icon: SiFigma },
      { name: 'UI/UX', icon: null },
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: FaJava }
    ]
  }
];

export default function AboutPage() {
  return (
    <div className="page-stack">
      {/* ===== Header ===== */}
      <section className="page-section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="page-header-block"
        >
          <motion.p variants={fadeUp} className="page-eyebrow">
             About
          </motion.p>
          <motion.h1 variants={fadeUp} className="page-heading page-heading--large">
            About <span className="text-gradient serif-accent">me.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="page-intro">
            Engineering scalable systems at the intersection of robust backend architecture and
            striking frontend execution. Minimalist by design, maximalist in performance.
          </motion.p>
        </motion.div>

        {/* Quick cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="about-cards"
        >
          <motion.article variants={fadeUp} className="about-card">
            <span className="about-card-index">01</span>
            <h3>Focus</h3>
            <p>
              Next.js &amp; React ecosystem, backend architecture, and high-performance user
              interfaces.
            </p>
          </motion.article>
          <motion.article variants={fadeUp} className="about-card">
            <span className="about-card-index">02</span>
            <h3>Education</h3>
            <p>Computer Engineering</p>
            <p className="about-card-meta">Universitas Indonesia &middot; expected 2028</p>
          </motion.article>
          <motion.article variants={fadeUp} className="about-card">
            <span className="about-card-index">03</span>
            <h3>Currently</h3>
            <p>Shipping freelance web work and exploring AI-assisted developer tooling.</p>
          </motion.article>
        </motion.div>
      </section>

      {/* ===== Education ===== */}
      <CVSection eyebrow="Education" heading="Where I'm learning" icon={GraduationCap}>
        <motion.article variants={fadeUp} className="cv-entry">
          <div className="cv-entry-head">
            <div>
              <h3>{education.degree}</h3>
              <p className="cv-entry-meta">{education.school}</p>
            </div>
            <span className="cv-entry-period">{education.period}</span>
          </div>
          <p className="cv-entry-detail">{education.detail}</p>
        </motion.article>
      </CVSection>

      {/* ===== Experience ===== */}
      <CVSection eyebrow="Experience" heading="Where I've worked" icon={Briefcase}>
        <div className="cv-timeline">
          {experience.map((e) => (
            <motion.article key={e.role} variants={fadeUp} className="cv-timeline-row">
              <div className="cv-timeline-marker">
                <span className="cv-timeline-dot" />
                <span className="cv-timeline-line" />
              </div>
              <div className="cv-timeline-body">
                <div className="cv-entry-head">
                  <div>
                    <h3>{e.role}</h3>
                    <p className="cv-entry-meta">{e.org}</p>
                  </div>
                  <span className="cv-entry-period">{e.period}</span>
                </div>
                <ul className="cv-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </CVSection>

      {/* ===== Projects pointer ===== */}
      <CVSection eyebrow="Projects" heading="What I've shipped" icon={Folder}>
        <motion.div variants={fadeUp} className="about-projects-pointer">
          <p>
            A curated set of solo-built platforms — Prime Capital Ledger, sumopower.id,
            cloudream.id, and more — spanning fintech, e-commerce, and B2B.
          </p>
          <a href="/projects" className="page-btn page-btn--ghost">
            View projects
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </motion.div>
      </CVSection>

      {/* ===== Skills ===== */}
      <CVSection eyebrow="Technical Skills" heading="Tools I work with" icon={Wrench}>
        <div className="cv-skills-grid">
          {skills.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="cv-skills-col">
              <h3>{s.label}</h3>
              <ul>
                {s.items.map((item) => (
                  <li key={item.name} className="cv-skill-item">
                    {item.icon ? <item.icon /> : <span className="cv-skill-bullet" />}
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CVSection>
    </div>
  );
}

/* ---------------- helpers ---------------- */
type IconType = React.ComponentType<{ size?: number; strokeWidth?: number }>;

function CVSection({
  eyebrow,
  heading,
  icon: Icon,
  children
}: {
  eyebrow: string;
  heading: string;
  icon?: IconType;
  children: React.ReactNode;
}) {
  return (
    <section className="page-section page-section--border">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.p variants={fadeUp} className="page-eyebrow">
          {eyebrow}
        </motion.p>
        <motion.h2 variants={fadeUp} className="cv-section-heading">
          {Icon && (
            <span className="cv-section-icon">
              <Icon size={18} strokeWidth={1.8} />
            </span>
          )}
          {heading}
        </motion.h2>
        {children}
      </motion.div>
    </section>
  );
}
