"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "../../lib/projects";
import useReducedMotion from "../../lib/useReducedMotion";
import { useScrollLock } from "../../lib/useScrollLock";
import { TechList } from "../ui/TechIcon";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function primaryLabel(p: Project) {
  if (p.linkLabel) return p.linkLabel;
  if (p.video) return "Play the game";
  return "Visit site";
}

/** Demo area: recorded demo, then video, then screenshot gallery, then a single screenshot. */
function ProjectMedia({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const clip = project.demo ?? project.video;

  if (clip) {
    return (
      <video
        key={clip}
        className="pm-video"
        src={clip}
        poster={project.image}
        title={project.imageAlt}
        autoPlay={!reduce}
        muted
        loop
        playsInline
        controls
        preload="metadata"
      />
    );
  }

  if (project.gallery) {
    return (
      <div className="pm-gallery" tabIndex={0} aria-label={`${project.name} screenshots`}>
        {project.gallery.map((shot) => (
          <figure key={shot.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if (project.image) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img className="pm-image" src={project.image} alt={project.imageAlt} decoding="async" />;
  }

  return null;
}

const subscribeNoop = () => () => {};

/** True once running in the browser, so the portal never renders during SSR or hydration. */
function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

/** Project detail dialog: demo on top, write-up below. Portaled to <body> so no ancestor
 *  transform or overflow can break its fixed positioning. */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const isClient = useIsClient();

  useScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  const meta = project
    ? [project.year, project.type, project.finalProject ? "Final project" : null, project.team ?? null].filter(
        Boolean,
      )
    : [];

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="pm-overlay"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onClick={onClose}
        >
          <motion.div
            className="pm"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-labelledby="pm-title"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: reduce ? 0 : 8, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="pm-close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={17} strokeWidth={1.75} />
            </button>

            {(project.demo || project.video || project.gallery || project.image) && (
              <div className="pm-media">
                <ProjectMedia project={project} />
              </div>
            )}

            <div className="pm-body">
              <p className="pm-meta">
                <span className="status-dot" aria-hidden="true" />
                <span>{project.status}</span>
                {meta.map((m) => (
                  <span key={m as string}>
                    <span className="pm-meta-sep" aria-hidden="true">
                      ·
                    </span>
                    {m}
                  </span>
                ))}
              </p>
              <h3 id="pm-title" className="pm-title">
                {project.name}
              </h3>
              <p className="pm-role">{project.role}</p>
              {project.finalProject && <p className="pm-course">{project.finalProject}</p>}

              <p className="pm-desc">{project.desc}</p>

              <h4 className="eyebrow pm-label">Highlights</h4>
              <ul className="pm-list">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <h4 className="eyebrow pm-label">Stack</h4>
              <TechList items={project.stack} className="pm-stack" />

              <div className="pm-actions">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--solid"
                  >
                    {primaryLabel(project)}
                    <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                )}
                <button type="button" className="btn" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
