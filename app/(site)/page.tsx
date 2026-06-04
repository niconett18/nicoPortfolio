'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, lineReveal } from '../../lib/animations';
import portraitSrc from '../../assets/portrait.png';
import ChatSection from '../../components/ChatSection';

export default function HomePage() {
  return (
    <>
      <section className="page-section page-hero">
        <motion.div className="page-hero-grid">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="page-hero-copy"
          >
            <motion.p variants={fadeUp} className="page-eyebrow">
              Fullstack Developer
            </motion.p>
            <div className="overflow-hidden mb-1">
              <motion.h1 variants={lineReveal} className="page-title page-title--primary">
                Nicholas
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.h1 variants={lineReveal} className="page-title text-gradient">
                <span className="serif-accent">Edmund.</span>
              </motion.h1>
            </div>
            <motion.p variants={fadeUp} className="page-lead">
              Computer Engineering student at Universitas Indonesia, building sharp,
              high-performance web applications with precision engineering and modern tooling.
            </motion.p>
            <motion.div variants={fadeUp} className="page-hero-actions">
              <a href="/projects" className="page-btn page-btn--primary">
                View projects
              </a>
              <a href="/contact" className="page-btn page-btn--ghost">
                Get in touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="hero-portrait"
          >
            <div className="hero-portrait-halo" aria-hidden="true" />
            <div className="hero-portrait-grid" aria-hidden="true" />

            <motion.div
              className="hero-portrait-figure"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={portraitSrc}
                alt="Portrait of Nicholas Edmund Tanaka"
                priority
                placeholder="blur"
                quality={85}
                className="hero-portrait-img"
                sizes="(min-width: 1024px) 32rem, (min-width: 640px) 22rem, 60vw"
              />
              <div className="hero-portrait-shadow" aria-hidden="true" />
            </motion.div>

            <span className="hero-portrait-bracket hero-portrait-bracket--tl" aria-hidden="true" />
            <span className="hero-portrait-bracket hero-portrait-bracket--tr" aria-hidden="true" />
            <span className="hero-portrait-bracket hero-portrait-bracket--bl" aria-hidden="true" />
            <span className="hero-portrait-bracket hero-portrait-bracket--br" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </section>
      <ChatSection />
    </>
  );
}
