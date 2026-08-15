"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import MagneticButton from "../motion/MagneticButton";
import ProjectsShowcase from "./ProjectsShowcase";
import { EASE, modalContentStagger, modalItem, modalPanel } from "../../lib/animations";
import { projects, type Project } from "../../lib/projects";
import { useScrollLock } from "../../lib/useScrollLock";

const PAGE_WIDTH = 1440;
const PAGE_HEIGHT = 1200;

function domainOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function typeBadgeClass(type: Project["type"]): string {
  return type === "Client" ? "type-badge type-badge--client" : "type-badge";
}

/* Scaled live-site iframe inside the modal only. */
function ModalPreview({ url, title }: { url: string; title: string }) {
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
        width: "100%",
        height: PAGE_HEIGHT * scale,
        overflow: "hidden",
        position: "relative",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <iframe
          src={url}
          title={title}
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
          sandbox="allow-scripts allow-forms allow-popups"
        />
      </div>
      {!loaded && <div className="project-card-iframe-loading" />}
    </div>
  );
}

export default function ProjectsSection({ standalone = false }: { standalone?: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const clientCount = projects.filter((p) => p.type === "Client").length;

  useScrollLock(Boolean(selectedProject));

  useEffect(() => {
    if (!selectedProject) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject]);

  return (
    <>
      <div id="projects" className="page-section">
        {standalone ? (
          <section className="page-head page-section">
            <motion.p
              className="mono-label mono-label--accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE, delay: 0.4 } }}
            >
              Selected Work
            </motion.p>
            <motion.h1
              className="display-lg"
              style={{ marginTop: "1rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.5 } }}
            >
              Projects<span className="text-accent">.</span>
            </motion.h1>
            <motion.p
              className="lead"
              style={{ marginTop: "1.5rem", maxWidth: "36rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.7 } }}
            >
              Production work for real clients alongside self-initiated builds — every project
              designed, developed, and deployed end to end.
            </motion.p>
            <motion.p
              className="mono-label projects-head-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.85 } }}
            >
              {projects.length} projects · {clientCount} client builds · all shipped solo
            </motion.p>
          </section>
        ) : (
          <motion.div
            className="sec-inline-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="mono-label mono-label--accent">Selected Work</p>
            <h2 className="sec-heading">
              Projects<span className="text-accent">.</span>
            </h2>
            <p className="mono-label projects-head-meta">
              {projects.length} projects · {clientCount} client builds · all shipped solo
            </p>
          </motion.div>
        )}

        <section className="projects-block projects-block--showcase page-section">
          {standalone && (
            <div className="projects-block-head">
              <h2 className="mono-label mono-label--accent">All Projects</h2>
            </div>
          )}
          <ProjectsShowcase items={projects} onOpen={setSelectedProject} />
        </section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            className="project-modal-overlay"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              variants={modalPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="project-modal-preview">
                <div className="project-modal-chrome">
                  <span className="chrome-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chrome-url"
                    title={`Visit ${selectedProject.name} live website`}
                  >
                    {domainOf(selectedProject.url)}
                  </a>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chrome-open"
                    aria-label={`Open ${selectedProject.name} in new tab`}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
                <div className="project-modal-preview-scroll" data-lenis-prevent>
                  <ModalPreview url={selectedProject.url} title={selectedProject.imageAlt} />
                </div>
              </div>

              <motion.div
                className="project-modal-body"
                data-lenis-prevent
                variants={modalContentStagger}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={modalItem} className="badge-row">
                  <span className={typeBadgeClass(selectedProject.type)}>{selectedProject.type}</span>
                  <span className="mono-label">{selectedProject.year}</span>
                </motion.div>
                <motion.h3 variants={modalItem} id="project-modal-title" className="project-modal-title">
                  {selectedProject.name}
                </motion.h3>
                <motion.p variants={modalItem} className="mono-label mono-label--accent">
                  {selectedProject.role}
                </motion.p>
                <motion.p variants={modalItem} className="project-modal-desc">
                  {selectedProject.desc}
                </motion.p>
                <motion.div variants={modalItem} className="project-modal-section">
                  <p className="mono-label project-modal-section-label">Highlights</p>
                  <ul className="modal-highlights">
                    {selectedProject.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={modalItem} className="project-modal-section">
                  <p className="mono-label project-modal-section-label">Stack</p>
                  <ul className="chip-row" aria-label="Tech stack">
                    {selectedProject.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={modalItem} className="project-modal-actions">
                  <MagneticButton
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--accent"
                  >
                    View live site
                    <ExternalLink size={14} />
                  </MagneticButton>
                  <MagneticButton type="button" className="btn" onClick={() => setSelectedProject(null)}>
                    Close
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
