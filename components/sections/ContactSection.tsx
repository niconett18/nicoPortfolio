"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import SplitText from "../motion/SplitText";
import ScrollReveal from "../motion/ScrollReveal";
import ScrollHighlight from "../motion/ScrollHighlight";

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

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <div id="contact" className="contact-wrap page-section">
      <ScrollReveal className="contact-main" yOffset={50}>
        <motion.p variants={fadeUp} className="mono-label mono-label--accent">
          Contact — Open to work
        </motion.p>

        {standalone ? (
          <h1 className="display-lg" style={{ marginTop: "1rem" }}>
            <SplitText text="Let's build" inView mode="words" />
            <br />
            <SplitText text="something" inView mode="words" />{" "}
            <span className="text-outline">
              <SplitText text="exceptional" inView mode="words" />
            </span>
            <span className="text-accent">.</span>
          </h1>
        ) : (
          <motion.h2 variants={fadeUp} className="sec-heading" style={{ marginTop: "1rem" }}>
            Let&apos;s build something{" "}
            <span className="text-outline">exceptional</span>
            <span className="text-accent">.</span>
          </motion.h2>
        )}

        <motion.p variants={fadeUp} className="lead" style={{ marginTop: "1.75rem" }}>
          Open to collaborations, internships, and interesting product work. Drop a line —
          I usually reply within a day.
        </motion.p>

        <motion.div variants={fadeUp}>
          <a href="mailto:nicholasedmund18@gmail.com" className="contact-email">
            nicholasedmund18@gmail.com
          </a>
        </motion.div>
      </ScrollReveal>

      <ScrollReveal className="contact-meta" yOffset={40}>
        <ScrollHighlight>
          <motion.div variants={fadeUp} className="contact-meta-cell">
            <h3 className="mono-label">Location</h3>
            <p>Jakarta, Indonesia</p>
            <p style={{ color: "var(--ink-faint)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
              <JakartaTime />
            </p>
          </motion.div>
        </ScrollHighlight>
        <ScrollHighlight>
          <motion.div variants={fadeUp} className="contact-meta-cell">
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
          </motion.div>
        </ScrollHighlight>
        <ScrollHighlight>
          <motion.div variants={fadeUp} className="contact-meta-cell">
            <h3 className="mono-label">Status</h3>
            <p className="status-chip">
              <span className="status-chip-dot" aria-hidden="true" />
              Available for freelance &amp; internships
            </p>
          </motion.div>
        </ScrollHighlight>
      </ScrollReveal>
    </div>
  );
}
