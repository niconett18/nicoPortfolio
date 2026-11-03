"use client";

import { useId, useState } from "react";
import { about, skillGroups } from "../../lib/profile";
import FadeIn from "../motion/FadeIn";
import SectionHead from "../ui/SectionHead";
import { TechIcon } from "../ui/TechIcon";

const ALL = "All";

/** Unique skills across every group, in first-seen order. */
const allSkills = Array.from(new Set(skillGroups.flatMap((g) => g.items)));

function SkillsBrowser() {
  const [tab, setTab] = useState(ALL);
  const baseId = useId();
  const tabs = [ALL, ...skillGroups.map((g) => g.label)];
  const items = tab === ALL ? allSkills : (skillGroups.find((g) => g.label === tab)?.items ?? []);

  return (
    <FadeIn className="skills">
      <div className="skills-head">
        <h3 className="skills-title">Tools of the trade</h3>
        <p className="skills-sub">What I reach for when building.</p>
      </div>

      <div className="tabs" role="tablist" aria-label="Skill categories">
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={tab === t}
            aria-controls={`${baseId}-panel`}
            className={`tab${tab === t ? " is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <ul
        className="skills-list"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tabs.indexOf(tab)}`}
      >
        {items.map((name) => (
          <li key={name}>
            <TechIcon name={name} className="skill-icon" />
            {name}
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}

export default function AboutSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead
          title={about.headline}
          titleMuted={about.headlineMuted}
          level={standalone ? "h1" : "h2"}
        />

        <div className="about-grid">
          <FadeIn className="about-copy">
            <p className="about-lead">{about.lead}</p>
            <p className="about-body">{about.body}</p>
          </FadeIn>

          <FadeIn className="about-aside" delay={0.08}>
            <p className="eyebrow">At a glance</p>
            <dl className="facts">
              {about.facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt>{f.label}</dt>
                  <dd>
                    {f.value}
                    {f.meta && <span className="fact-meta">{f.meta}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        <SkillsBrowser />
      </div>
    </section>
  );
}
