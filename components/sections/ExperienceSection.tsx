"use client";

import { useState } from "react";
import { education, experience } from "../../lib/profile";
import FadeIn from "../motion/FadeIn";
import SectionHead from "../ui/SectionHead";

type View = "compact" | "detailed";

export default function ExperienceSection() {
  const [view, setView] = useState<View>("detailed");

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead
          title="Where I've worked."
          titleMuted="And where I'm learning."
        />

        <div className="exp-grid">
          <FadeIn className="exp-journey">
            <div className="exp-bar">
              <p className="eyebrow">Professional journey</p>
              <div className="toggle" role="group" aria-label="Detail level">
                {(["compact", "detailed"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`toggle-btn${view === v ? " is-active" : ""}`}
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                  >
                    {v === "compact" ? "Compact" : "Detailed"}
                  </button>
                ))}
              </div>
            </div>

            <ol className="timeline">
              {experience.map((e) => (
                <li key={e.role} className="timeline-item">
                  <span className="timeline-year">{e.startYear}</span>
                  <div className="timeline-body">
                    <div className="timeline-head">
                      <h3 className="timeline-org">{e.org}</h3>
                    </div>
                    <div className="timeline-role">
                      <span>{e.role}</span>
                      <span className="timeline-period">{e.period}</span>
                    </div>
                    {view === "detailed" && (
                      <ul className="timeline-bullets">
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn className="exp-education" delay={0.08}>
            <p className="eyebrow">Education</p>
            <article className="edu">
              <h3 className="edu-degree">
                {education.degree}
                {education.current && <span className="edu-tag">Current</span>}
              </h3>
              <p className="edu-school">{education.school}</p>
              <p className="edu-period">{education.period}</p>
              <p className="edu-detail">{education.detail}</p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
