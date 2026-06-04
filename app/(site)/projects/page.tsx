'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { projects, type Project } from '../../../lib/projects';
import { fadeUp, staggerContainer } from '../../../lib/animations';

const PAGE_WIDTH = 1440;
const PAGE_HEIGHT = 1200;

function GridThumbnail({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgSrc = `https://image.thum.io/get/width/1440/${url}`;

  return (
    <div style={{ width: '100%', position: 'relative', overflow: 'hidden', background: 'var(--bg-elevated)' }}>
      <img
        src={imgSrc}
        alt={title}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      {!loaded && <div className="project-card-iframe-loading" />}
    </div>
  );
}

function DrawerPreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateScale = () => setScale(el.clientWidth / PAGE_WIDTH);
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: PAGE_HEIGHT * scale,
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg-elevated)',
      }}
    >
      <div
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <iframe
          src={url}
          title={title}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none',
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
      {!loaded && <div className="project-card-iframe-loading" />}
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <div className="page-stack">
      <section className="page-section">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="page-header-block"
        >
          <motion.p variants={fadeUp} className="page-eyebrow">
             Projects
          </motion.p>
          <motion.h1 variants={fadeUp} className="page-heading">
            Selected work
          </motion.h1>
          <motion.p variants={fadeUp} className="page-intro">
            A curated set of shipped products with measurable impact, prioritized for clarity and
            speed across devices.
          </motion.p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              onClick={() => setSelectedProject(project)}
              className="project-card"
            >
              <div className="project-card-image">
                <GridThumbnail url={project.url} title={project.imageAlt} />
              </div>
              <div className="project-card-body">
                <p className="project-card-role">{project.role}</p>
                <div className="project-card-title-row">
                  <h3>{project.name}</h3>
                  <span className="project-card-icon">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <p className="project-card-desc">{project.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <React.Fragment key={selectedProject.id}>
            <motion.div
              className="project-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="project-drawer"
              initial={isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: '100%' } : { x: '100%' }}
              transition={
                isMobile
                  ? { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                  : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="project-drawer-handle" />
              <div className="project-drawer-image">
                <DrawerPreview url={selectedProject.url} title={selectedProject.imageAlt} />
              </div>
              <div className="project-drawer-body">
                <button
                  type="button"
                  className="project-drawer-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <p className="project-drawer-role">{selectedProject.role}</p>
                <h3 className="project-drawer-title">{selectedProject.name}</h3>
                <p className="project-drawer-desc">{selectedProject.desc}</p>
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-btn page-btn--primary"
                >
                  View live site
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}
