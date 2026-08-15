"use client";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "../motion/MagneticButton";
import Parallax from "../motion/Parallax";
import SplitText from "../motion/SplitText";
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
import ScrollReveal from "../motion/ScrollReveal";
import ScrollHighlight from "../motion/ScrollHighlight";

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
      "Designed and developed ClariPet, sumopower.id, and cloudream.id from scratch — covering UI/UX, frontend, backend, and deployment.",
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

/**
 * One block in the scrolling column. Each holds roughly a screen so it
 * arrives on its own while the heading beside it stays pinned.
 */
function Feature({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal className="about-feature" yOffset={50}>
      <p className="mono-label mono-label--accent">{label}</p>
      <h3 className="about-feature-heading">
        <SplitText text={heading} mode="words" inView stagger={0.07} duration={1.1} />
      </h3>
      <div>{children}</div>
    </ScrollReveal>
  );
}

export default function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const title = (
    <>
      <SplitText text="About Me" mode="words" inView stagger={0.07} duration={1.1} />
      <span className="text-accent">.</span>
    </>
  );

  return (
    <div id="about" className="page-section about-why">
      {/* Holds its place while the column beside it scrolls past. */}
      <div className="about-sticky">
        <p className="mono-label mono-label--accent">About — Profile</p>
        {standalone ? (
          <h1 className="sec-rule-heading">{title}</h1>
        ) : (
          <h2 className="sec-rule-heading">{title}</h2>
        )}
        <p className="about-sticky-lead">
          Engineering scalable systems at the intersection of robust backend architecture and
          striking frontend execution. Minimalist by design, maximalist in performance.
        </p>
      </div>

      <div className="about-flow">
        <Feature label="Snapshot" heading="At a glance">
          <div className="about-facts">
            <ScrollHighlight>
              <article className="about-fact">
                <h4 className="mono-label">Focus</h4>
                <p>
                  Next.js &amp; React ecosystem, backend architecture, and high-performance
                  user interfaces.
                </p>
              </article>
            </ScrollHighlight>
            <ScrollHighlight>
              <article className="about-fact">
                <h4 className="mono-label">Education</h4>
                <p>Computer Engineering</p>
                <p className="fact-meta">Universitas Indonesia &middot; expected 2028</p>
              </article>
            </ScrollHighlight>
            <ScrollHighlight>
              <article className="about-fact">
                <h4 className="mono-label">Currently</h4>
                <p>Shipping freelance web work and exploring AI-assisted developer tooling.</p>
              </article>
            </ScrollHighlight>
          </div>
        </Feature>

        <Feature label="Education" heading="Where I'm learning">
          <article className="entry">
            <span className="entry-period">{education.period}</span>
            <div>
              <h4>{education.degree}</h4>
              <p className="entry-org">{education.school}</p>
              <p className="entry-detail">{education.detail}</p>
            </div>
          </article>
        </Feature>

        <Feature label="Experience" heading="Where I've worked">
          <div>
            {experience.map((e) => (
              <ScrollHighlight key={e.role}>
                <article className="entry">
                  <span className="entry-period">{e.period}</span>
                  <div>
                    <h4>{e.role}</h4>
                    <p className="entry-org">{e.org}</p>
                    <ul className="entry-bullets">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollHighlight>
            ))}
          </div>
        </Feature>

        {standalone && (
          <Feature label="Projects" heading="What I've shipped">
            <div className="sec-pointer">
              <p>
                A curated set of solo-built platforms — ClariPet, Prime Capital Ledger,
                sumopower.id, and more — spanning pet-care commerce, fintech, and B2B.
              </p>
              <MagneticButton href="/projects" className="btn">
                View projects
                <ArrowUpRight size={14} strokeWidth={2} />
              </MagneticButton>
            </div>
          </Feature>
        )}

        <Feature label="Skills" heading="Tools I work with">
          <div className="skills-grid">
            {skills.map((s, i) => (
              <Parallax key={s.label} travel={[36, -28, 44, -32][i % 4]}>
                <div className="skills-col">
                  <h4 className="mono-label">{s.label}</h4>
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
        </Feature>
      </div>
    </div>
  );
}
