'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  Briefcase,
  Folder,
  Wrench,
  ArrowUpRight
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import {
  SiNextdotjs,
  SiReact,
  SiVite,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiLinux,
  SiVercel,
  SiFigma,
  SiC,
  SiCplusplus,
  SiPython
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../../../lib/animations';

const CV_FILE = '/NicholasEdmund_CV.pdf';
const CV_DRIVE_URL =
  'https://drive.google.com/file/d/12HYUh6De3GSBDCG1L2MWQh2BJkggmP0_/view';

const contactItems = [
  { icon: MapPin, label: 'Jakarta, Indonesia', href: null },
  { icon: Phone, label: '+62 821 1224 8933', href: 'tel:+6282112248933' },
  { icon: Mail, label: 'nicholasedmund18@gmail.com', href: 'mailto:nicholasedmund18@gmail.com' },
  { icon: Globe, label: 'niconet.site', href: 'https://niconet.site' },
  { icon: SiGithub, label: 'github.com/niconett18', href: 'https://github.com/niconett18' }
];

const education = {
  degree: 'B.Eng. in Computer Engineering',
  school: 'Universitas Indonesia, Depok',
  period: 'Aug 2024 — Jun 2028',
  gpa: '3.56 / 4.00',
  languages: 'Bahasa Indonesia (Native) · English (Professional)',
  detail:
    'Actively engaged in academic projects, extracurricular activities, and research in computer engineering.'
};

const projects = [
  {
    name: 'Prime Capital Ledger',
    domain: 'primecapitaledger.site',
    href: 'https://primecapitaledger.site',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL'],
    description:
      'Solo-built financial platform with a trust-driven UI for capital management — designed for institutional clarity with refined typography, performant data views, and a polished interaction layer.'
  },
  {
    name: 'sumopower.id',
    domain: 'sumopower.id',
    href: 'https://sumopower.id',
    stack: ['Next.js', 'React', 'TailwindCSS', 'Vercel'],
    description:
      'Commercial e-commerce platform built for speed and clean UX. Owned full lifecycle: client requirements, end-to-end development, and production deployment with custom domain.'
  },
  {
    name: 'cloudream.id',
    domain: 'cloudream.id',
    href: 'https://cloudream.id',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Vercel'],
    description:
      'B2B digital platform offering enterprise cloud solutions. Owned UI/UX, frontend architecture, and deployment — shipped from scratch as a solo build.'
  },
  {
    name: 'Idzhar Dwi Karya · G2M Church · Fore Nico · To-Do by Nico',
    domain: 'niconet.site',
    href: 'https://niconet.site',
    stack: ['Next.js', 'React', 'TailwindCSS', 'Vercel'],
    description:
      'Portfolio of shipped client and personal projects spanning corporate landing pages, community platforms, and productivity tools. All solo builds emphasizing clean architecture, performance, and minimalist UX.'
  }
];

const experience = [
  {
    role: 'Freelance Web Developer',
    org: 'Independent · Jakarta, Indonesia',
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

export default function CVPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1400);
  };

  return (
    <div className="page-stack cv-page">
      {/* ===== HEADER ===== */}
      <section className="page-section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="page-header-block"
        >
          <motion.p variants={fadeUp} className="page-eyebrow">
            05 / Curriculum Vitae
          </motion.p>
          <motion.h1 variants={fadeUp} className="page-heading page-heading--large">
            Nicholas Edmund <span className="text-gradient serif-accent">Tanaka.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="page-intro">
            Fullstack Developer · Computer Engineering @ Universitas Indonesia
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="cv-contact"
          >
            {contactItems.map((c) => (
              <motion.li key={c.label} variants={fadeUp} className="cv-contact-item">
                <c.icon size={14} strokeWidth={1.8} />
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {c.label}
                  </a>
                ) : (
                  <span>{c.label}</span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* ===== SUMMARY ===== */}
      <CVSection eyebrow="Summary" heading="A short story">
        <motion.p variants={fadeUp} className="cv-summary">
          Fullstack developer focused on shipping sharp, high-performance web applications.
          Comfortable across the stack — from backend architecture to polished frontend execution.
          <span className="cv-summary-highlight"> Minimalist by design, maximalist in performance.</span>{' '}
          Currently shipping freelance web work while exploring AI-assisted developer tooling.
        </motion.p>
      </CVSection>

      {/* ===== EDUCATION ===== */}
      <CVSection eyebrow="Education" heading="Where I'm learning" icon={GraduationCap}>
        <motion.article variants={fadeUp} className="cv-entry">
          <div className="cv-entry-head">
            <div>
              <h3>{education.degree}</h3>
              <p className="cv-entry-meta">{education.school}</p>
            </div>
            <div className="cv-entry-side">
              <span className="cv-entry-period">{education.period}</span>
              <span className="cv-entry-tag">GPA {education.gpa}</span>
            </div>
          </div>
          <p className="cv-entry-detail">{education.detail}</p>
          <p className="cv-entry-meta cv-entry-langs">{education.languages}</p>
        </motion.article>
      </CVSection>

      {/* ===== PROJECTS ===== */}
      <CVSection eyebrow="Projects" heading="What I've shipped" icon={Folder}>
        <div className="cv-projects">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              variants={fadeUp}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-project"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <span className="cv-project-index">0{i + 1}</span>
              <div className="cv-project-head">
                <h3>{p.name}</h3>
                <span className="cv-project-arrow">
                  <ArrowUpRight size={16} strokeWidth={2} />
                </span>
              </div>
              <p className="cv-project-domain">{p.domain}</p>
              <ul className="cv-project-stack">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="cv-project-desc">{p.description}</p>
            </motion.a>
          ))}
        </div>
      </CVSection>

      {/* ===== EXPERIENCE ===== */}
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

      {/* ===== SKILLS ===== */}
      <CVSection eyebrow="Technical Skills" heading="Tools I work with" icon={Wrench}>
        <div className="cv-skills-grid">
          {skills.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="cv-skills-col">
              <h3>{s.label}</h3>
              <ul>
                {s.items.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    {item.icon ? <item.icon /> : <span className="cv-skill-bullet" />}
                    <span>{item.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CVSection>

      {/* ===== DOWNLOAD CTA (at the end) ===== */}
      <section className="page-section page-section--border">
        <motion.div
          className="cv-download-block"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cv-download-glow" aria-hidden="true" />
          <div className="cv-download-text">
            <p className="page-eyebrow">Take it with you</p>
            <h2 className="cv-download-heading">
              Prefer the PDF? <span className="text-gradient serif-accent">Grab it here.</span>
            </h2>
            <p className="cv-download-sub">
              Download the file or open it on Drive — both stay current.
            </p>
          </div>
          <div className="cv-download-actions">
            <motion.a
              href={CV_FILE}
              download="NicholasEdmund_CV.pdf"
              onClick={handleDownload}
              className="page-btn page-btn--primary cv-download-btn"
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="cv-download-icon"
                animate={downloading ? { y: [0, 4, 0] } : { y: 0 }}
                transition={downloading ? { duration: 0.6, repeat: 1 } : { duration: 0.2 }}
              >
                <Download size={16} strokeWidth={2} />
              </motion.span>
              {downloading ? 'Downloading…' : 'Download CV'}
            </motion.a>
            <a
              href={CV_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="page-btn page-btn--ghost"
            >
              <ExternalLink size={15} strokeWidth={2} />
              View on Drive
            </a>
          </div>
        </motion.div>
      </section>
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
