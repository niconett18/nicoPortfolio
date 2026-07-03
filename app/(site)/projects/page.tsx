"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { ContainerScroll } from "../../../components/ui/container-scroll-animation";
import MagneticButton from "../../../components/motion/MagneticButton";
import {
  EASE,
  modalContentStagger,
  modalItem,
  modalPanel,
  popIn,
  staggerContainer,
} from "../../../lib/animations";
import { projects, type Project } from "../../../lib/projects";

const PAGE_WIDTH = 1440;
const PAGE_HEIGHT = 1200;

function domainOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function typeBadgeClass(type: Project["type"]): string {
  return type === "Client" ? "type-badge type-badge--client" : "type-badge";
}

/* Lazy-loaded preview: static screenshot image for fast project cards. */
function GridPreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!visible) {
    return <div ref={containerRef} className="project-shot project-shot--placeholder" />;
  }

  return (
    <div ref={containerRef} className="project-shot">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1440`}
        alt={title}
        onLoad={() => setLoaded(true)}
        className="project-shot-img"
      />
      {!loaded && <div className="project-card-iframe-loading" />}
    </div>
  );
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

function ProjectContainer({
  project,
  index,
  compact = false,
  onOpen,
}: {
  project: Project;
  index: number;
  compact?: boolean;
  onOpen: () => void;
}) {
  const titleContent = (
    <div className="project-scroll-info">
      <div className="project-scroll-kicker">
        <span className="project-scroll-index">{String(index + 1).padStart(2, "0")}</span>
        <span className={typeBadgeClass(project.type)}>{project.type}</span>
        <span className="mono-label">{project.year}</span>
      </div>

      <div className="project-scroll-title-row">
        <h3 className={compact ? "project-card-heading" : "featured-title"}>{project.name}</h3>
        <span className="project-card-icon" aria-hidden="true">
          <ArrowUpRight size={compact ? 18 : 22} />
        </span>
      </div>

      <p className={compact ? "project-card-desc" : "featured-desc"}>{project.desc}</p>

      <ul className="chip-row" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>

      {!compact && (
        <div className="featured-actions">
          <MagneticButton type="button" className="btn btn--accent" onClick={onOpen}>
            View details
            <ArrowUpRight size={14} strokeWidth={2} />
          </MagneticButton>
          <MagneticButton href={project.url} target="_blank" rel="noopener noreferrer" className="btn">
            Live site
            <ExternalLink size={13} />
          </MagneticButton>
        </div>
      )}
    </div>
  );

  const previewContent = (
    <button
      type="button"
      className="project-scroll-preview"
      onClick={onOpen}
      aria-label={`Open ${project.name} details`}
    >
      <GridPreview url={project.url} title={project.imageAlt} />
      <span className="project-scroll-preview-label">View details</span>
    </button>
  );

  if (compact) {
    return (
      <motion.article
        className="project-scroll-item project-scroll-item--compact"
        variants={popIn}
      >
        <div className="container-scroll-shell project-scroll-container--compact">
          <div className="container-scroll-stage">
            <div className="container-scroll-header project-scroll-header">
              {titleContent}
            </div>
            <div className="container-scroll-card project-scroll-card">
              <div className="container-scroll-content project-scroll-card-content">
                {previewContent}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="project-scroll-item"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <ContainerScroll
        className="project-scroll-container"
        headerClassName="project-scroll-header"
        cardClassName="project-scroll-card"
        contentClassName="project-scroll-card-content"
        titleComponent={titleContent}
      >
        {previewContent}
      </ContainerScroll>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const clientCount = projects.filter((p) => p.type === "Client").length;

  useEffect(() => {
    if (selectedProject) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [selectedProject]);

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

      <section className="projects-block page-section">
        <div className="projects-block-head">
          <h2 className="mono-label mono-label--accent">All Projects</h2>
        </div>
        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {projects.map((project, i) => (
            <ProjectContainer
              key={project.id}
              project={project}
              index={i}
              compact
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
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
                <div className="project-modal-chrome" aria-hidden="true">
                  <span className="chrome-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="chrome-url">{domainOf(selectedProject.url)}</span>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chrome-open"
                    tabIndex={-1}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
                <div className="project-modal-preview-scroll">
                  <ModalPreview url={selectedProject.url} title={selectedProject.imageAlt} />
                </div>
              </div>

              <motion.div
                className="project-modal-body"
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
