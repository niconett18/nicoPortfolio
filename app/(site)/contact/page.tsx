'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../../lib/animations';

export default function ContactPage() {
  return (
    <section className="page-section page-contact">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="page-header-block"
      >
        <motion.p variants={fadeUp} className="page-eyebrow">
          04 / Contact
        </motion.p>
        <motion.h1 variants={fadeUp} className="page-heading page-heading--large">
          Let&apos;s build<br />
          <span className="text-gradient">something</span> exceptional.
        </motion.h1>
        <motion.p variants={fadeUp} className="page-intro">
          Open to collaborations, internships, and interesting product work. Drop a line — I usually
          reply within a day.
        </motion.p>

        <div className="contact-grid">
          <motion.a
            variants={fadeUp}
            href="mailto:nicholasedmund18@gmail.com"
            className="contact-card"
          >
            <Mail size={22} strokeWidth={1.25} />
            <div>
              <p className="contact-card-label">Email</p>
              <p className="contact-card-value">nicholasedmund18@gmail.com</p>
            </div>
            <ArrowUpRight className="contact-card-arrow" size={20} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

