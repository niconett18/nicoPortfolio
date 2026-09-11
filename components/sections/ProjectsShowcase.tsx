"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/projects";
import useMediaQuery from "../../lib/useMediaQuery";

/* Resolves once the window `load` event has fired, so card media never
   competes with the hero for bandwidth on first paint. */
function subscribeToLoad(onStoreChange: () => void) {
  window.addEventListener("load", onStoreChange);
  return () => window.removeEventListener("load", onStoreChange);
}

function usePageLoaded() {
  return useSyncExternalStore(
    subscribeToLoad,
    () => document.readyState === "complete",
    () => false,
  );
}

/* Card media: skeleton until the page has fully loaded, then the static
   screenshot fades in. Projects with a `video` autoplay it muted and looping
   while the card is near the viewport, and pause it once it scrolls away.
   Projects without a stored screenshot fall back to mShots. */
function CardMedia({ project }: { project: Project }) {
  const ref = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pageLoaded = usePageLoaded();
  const [near, setNear] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Wide horizontal root margin so cards load before the track slides them in.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "200px 800px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showVideo = Boolean(project.video) && pageLoaded && !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (near) {
      // Autoplay can still be refused (e.g. data saver); the poster stays up.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [near, showVideo]);

  const src =
    project.image ?? `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.url)}?w=1440`;

  return (
    <span ref={ref} className="showcase-card-media-inner">
      {pageLoaded && (near || imgLoaded) && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={project.imageAlt}
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`showcase-card-img${imgLoaded ? " is-loaded" : ""}`}
        />
      )}
      {showVideo && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => setVideoReady(true)}
          className={`showcase-card-img showcase-card-video${videoReady ? " is-loaded" : ""}`}
        />
      )}
      {!imgLoaded && <span className="showcase-card-skeleton" />}
    </span>
  );
}

function ShowcaseCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="showcase-card">
      <button
        type="button"
        className="showcase-card-media"
        onClick={onOpen}
        aria-label={`Open ${project.name} details`}
      >
        <CardMedia project={project} />
        <span className="showcase-card-badge">{project.status}</span>
        <span className="showcase-card-arrow" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </button>

      <div className="showcase-card-inner">
        <button type="button" className="showcase-card-title" onClick={onOpen}>
          {project.name}
        </button>
        <div className="showcase-card-credits">
          <span>{project.role}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Pinned horizontal track: the section sticks to the viewport while vertical
 * scroll drives the card row leftward, then releases into the next section.
 *
 * Below 800px (and under reduced motion) CSS turns the same markup into a
 * plain vertical column — the track then measures no wider than its container,
 * so `distance` is 0 and the transform is a no-op.
 */
export default function ProjectsShowcase({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (project: Project) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const metrics = useRef({ start: 0, end: 0, distance: 0 });

  const { scrollY } = useScroll();
  // Bumped after every re-measure so the transform recomputes without a scroll.
  const measureTick = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      const inner = track?.parentElement;
      if (!wrapper || !track || !inner) return;

      const rect = wrapper.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const innerH = inner.getBoundingClientRect().height;
      const stickyTop = (window.innerHeight - innerH) / 2;

      metrics.current = {
        start: top - stickyTop,
        end: top + rect.height - stickyTop - innerH,
        distance: Math.max(0, track.scrollWidth - inner.clientWidth),
      };
      measureTick.set(measureTick.get() + 1);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length, measureTick]);

  const x = useTransform([scrollY, measureTick], ([scroll]: number[]) => {
    const { start, end, distance } = metrics.current;
    if (distance <= 0 || end <= start) return 0;
    const progress = Math.min(1, Math.max(0, (scroll - start) / (end - start)));
    return -progress * distance;
  });

  return (
    <div
      ref={wrapperRef}
      className="showcase-wrapper"
      style={{ "--sc-count": items.length } as React.CSSProperties}
    >
      <div className="showcase-inner">
        <motion.div ref={trackRef} className="showcase-track" style={{ x }}>
          {items.map((project) => (
            <ShowcaseCard key={project.id} project={project} onOpen={() => onOpen(project)} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
