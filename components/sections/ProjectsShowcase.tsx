"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/projects";

/* Lazy screenshot — same mShots source the grid used, with a wide horizontal
   root margin so cards load before the track slides them into view. */
function CardShot({ url, alt }: { url: string; alt: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 800px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="showcase-card-media-inner">
      {visible && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1440`}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className="showcase-card-img"
        />
      )}
      {!loaded && <span className="showcase-card-skeleton" />}
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
        <CardShot url={project.url} alt={project.imageAlt} />
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
