"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "../../../components/motion/MagneticButton";
import Parallax from "../../../components/motion/Parallax";
import SplitText from "../../../components/motion/SplitText";
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
  SiPython,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { EASE, fadeUp, revealViewport, staggerContainer } from "../../../lib/animations";

const education = {
  degree: "B.Eng. in Computer Engineering",
  school: "Universitas Indonesia, Depok",
  period: "2024 — 2028",
  detail:
    "Engaged in academic projects, extracurricular activities, and research across computer engineering, with a focus on systems, software, and applied web technologies.",
};

const experience = [
  {
    role: "Freelance Web Developer",
    org: "Independent",
    period: "2024 — Present",
    bullets: [
      "Designed and developed sumopower.id and cloudream.id from scratch — covering UI/UX, frontend, backend, and deployment.",
      "Managed full project lifecycle: client requirements gathering, implementation, and domain/hosting setup.",
      "Delivered all projects as solo builds — owning architecture, code quality, and production-readiness end-to-end.",
    ],
  },
  {
    role: "Vice Head of Creative Marketing",
    org: "EXERCISE FTUI — Universitas Indonesia",
    period: "Feb 2025 — Present",
    bullets: [
      "Promoted from Creative Marketing Staff based on strong performance; now mentor junior staff and oversee event promotions.",
      "Lead the creative team in digital marketing strategy, content planning, copywriting, and branding campaigns.",
    ],
  },
];

const skills = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Vite", icon: SiVite },
      { name: "TypeScript", icon: SiTypescript },
      { name: "TailwindCSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "TypeScript", icon: SiTypescript },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "REST APIs", icon: null },
    ],
  },
  {
    label: "Tooling & DevOps",
    items: [
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
      { name: "Linux", icon: SiLinux },
      { name: "Vercel", icon: SiVercel },
      { name: "CI/CD", icon: null },
    ],
  },
  {
    label: "Design & Other",
    items: [
      { name: "Figma", icon: SiFigma },
      { name: "UI/UX", icon: null },
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
    ],
  },
];

function Section({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className="sec page-section"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.div variants={fadeUp}>
        <p className="mono-label mono-label--accent">{label}</p>
        <h2 className="sec-heading">{heading}</h2>
      </motion.div>
      <motion.div variants={fadeUp}>{children}</motion.div>
    </motion.section>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="page-head page-section">
        <motion.p
          className="mono-label mono-label--accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE, delay: 0.5 } }}
        >
          About — Profile
        </motion.p>
        <h1 className="display-lg" style={{ marginTop: "1rem" }}>
          <SplitText text="About" delay={0.55} />{" "}
          <SplitText text="Me" delay={0.7} />
          <span className="text-accent">.</span>
        </h1>
        <motion.p
          className="lead"
          style={{ marginTop: "1.75rem", maxWidth: "34rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.9 } }}
        >
          Engineering scalable systems at the intersection of robust backend architecture
          and striking frontend execution. Minimalist by design, maximalist in performance.
        </motion.p>
      </section>

      <Section label="Snapshot" heading="At a glance">
        <div className="about-facts">
          <article className="about-fact">
            <h3 className="mono-label">Focus</h3>
            <p>
              Next.js &amp; React ecosystem, backend architecture, and high-performance
              user interfaces.
            </p>
          </article>
          <article className="about-fact">
            <h3 className="mono-label">Education</h3>
            <p>Computer Engineering</p>
            <p className="fact-meta">Universitas Indonesia &middot; expected 2028</p>
          </article>
          <article className="about-fact">
            <h3 className="mono-label">Currently</h3>
            <p>Shipping freelance web work and exploring AI-assisted developer tooling.</p>
          </article>
        </div>
      </Section>

      <Section label="Education" heading="Where I'm learning">
        <article className="entry">
          <span className="entry-period">{education.period}</span>
          <div>
            <h3>{education.degree}</h3>
            <p className="entry-org">{education.school}</p>
            <p className="entry-detail">{education.detail}</p>
          </div>
        </article>
      </Section>

      <Section label="Experience" heading="Where I've worked">
        <div>
          {experience.map((e) => (
            <article key={e.role} className="entry">
              <span className="entry-period">{e.period}</span>
              <div>
                <h3>{e.role}</h3>
                <p className="entry-org">{e.org}</p>
                <ul className="entry-bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Projects" heading="What I've shipped">
        <div className="sec-pointer">
          <p>
            A curated set of solo-built platforms — Prime Capital Ledger, sumopower.id,
            cloudream.id, and more — spanning fintech, e-commerce, and B2B.
          </p>
          <MagneticButton href="/projects" className="btn">
            View projects
            <ArrowUpRight size={14} strokeWidth={2} />
          </MagneticButton>
        </div>
      </Section>

      <Section label="Skills" heading="Tools I work with">
        <div className="skills-grid">
          {skills.map((s, i) => (
            <Parallax key={s.label} travel={[36, -28, 44, -32][i % 4]}>
              <div className="skills-col">
                <h3 className="mono-label">{s.label}</h3>
                <ul>
                  {s.items.map((item) => (
                    <li key={item.name}>
                      {item.icon ? <item.icon /> : <span className="skill-bullet" />}
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Parallax>
          ))}
        </div>
      </Section>
    </>
  );
}
