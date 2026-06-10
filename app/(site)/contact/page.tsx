"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "../../../lib/animations";
import SplitText from "../../../components/motion/SplitText";

function JakartaTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time || "--:--"} WIB</span>;
}

export default function ContactPage() {
  return (
    <div className="contact-wrap page-section">
      <section className="contact-main">
        <motion.p
          className="mono-label mono-label--accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE, delay: 0.5 } }}
        >
          Contact — Open to work
        </motion.p>

        <h1 className="display-lg" style={{ marginTop: "1rem" }}>
          <SplitText text="Let's build" delay={0.55} mode="words" />
          <br />
          <SplitText text="something" delay={0.7} mode="words" />{" "}
          <span className="text-outline">
            <SplitText text="exceptional" delay={0.8} mode="words" />
          </span>
          <span className="text-accent">.</span>
        </h1>

        <motion.p
          className="lead"
          style={{ marginTop: "1.75rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.95 } }}
        >
          Open to collaborations, internships, and interesting product work. Drop a line —
          I usually reply within a day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 1.1 } }}
        >
          <a href="mailto:nicholasedmund18@gmail.com" className="contact-email">
            nicholasedmund18@gmail.com
          </a>
        </motion.div>
      </section>

      <motion.section
        className="contact-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, ease: EASE, delay: 1.25 } }}
      >
        <div className="contact-meta-cell">
          <h3 className="mono-label">Location</h3>
          <p>Jakarta, Indonesia</p>
          <p style={{ color: "var(--ink-faint)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            <JakartaTime />
          </p>
        </div>
        <div className="contact-meta-cell">
          <h3 className="mono-label">Socials</h3>
          <div className="contact-meta-links">
            <a href="https://github.com/niconett18" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a
              href="https://www.instagram.com/niconet18/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>
        </div>
        <div className="contact-meta-cell">
          <h3 className="mono-label">Status</h3>
          <p className="status-chip">
            <span className="status-chip-dot" aria-hidden="true" />
            Available for freelance &amp; internships
          </p>
        </div>
      </motion.section>
    </div>
  );
}
