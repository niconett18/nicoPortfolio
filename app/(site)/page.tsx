"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "../../lib/animations";
import portraitSrc from "../../assets/portrait.png";
import ChatSection from "../../components/ChatSection";
import MagneticButton from "../../components/motion/MagneticButton";
import SplitText from "../../components/motion/SplitText";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Portrait drifts down slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <>
      <section ref={heroRef} className="hero page-section">
        <motion.div
          className="hero-meta-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE, delay: 0.4 } }}
        >
          <span className="mono-label">Fullstack Developer</span>
          <span className="mono-label status-chip">
            <span className="status-chip-dot" aria-hidden="true" />
            Available for work
          </span>
        </motion.div>

        <div className="hero-grid">
          <h1 className="hero-name-block">
            <span className="display-xl" style={{ display: "block" }}>
              <SplitText text="Nicholas" delay={0.5} />
            </span>
            <span className="display-xl hero-name-line2" style={{ display: "block" }}>
              <SplitText text="Edmund" delay={0.7} />
              <span className="text-accent">.</span>
            </span>
          </h1>

          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.9, ease: EASE, delay: 0.35 },
            }}
            style={reduce ? undefined : { y: portraitY }}
          >
            <div className="hero-portrait-frame">
              <Image
                src={portraitSrc}
                alt="Portrait of Nicholas Edmund Tanaka"
                priority
                placeholder="blur"
                quality={85}
                className="hero-portrait-img"
                sizes="(min-width: 820px) 24rem, 18rem"
              />
              <span className="hero-portrait-caption mono-label">Portrait — JKT, ID</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.95 } }}
        >
          <p className="lead">
            Computer Engineering student at Universitas Indonesia, building sharp,
            high-performance web applications with precision engineering and modern tooling.
          </p>
          <div className="hero-actions">
            <MagneticButton href="/projects" className="btn btn--accent">
              View projects
              <ArrowUpRight size={14} strokeWidth={2} />
            </MagneticButton>
            <MagneticButton href="/contact" className="btn">
              Get in touch
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      <ChatSection />
    </>
  );
}
