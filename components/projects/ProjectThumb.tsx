"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "../../lib/projects";
import useReducedMotion from "../../lib/useReducedMotion";

/* Resolves once the window `load` event has fired, so thumbnails never
   compete with the hero for bandwidth on first paint. */
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

/**
 * Row thumbnail: skeleton until the page has loaded, then the stored
 * screenshot (or an mShots capture of the live URL) fades in. Projects with a
 * `video` play it muted and looping while the row is near the viewport.
 */
export default function ProjectThumb({ project }: { project: Project }) {
  const ref = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pageLoaded = usePageLoaded();
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "300px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showVideo = Boolean(project.video) && pageLoaded && !reduce;

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
    project.image ?? `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.url ?? "")}?w=1440`;

  return (
    <span ref={ref} className="thumb">
      {pageLoaded && (near || imgLoaded) && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`thumb-media${imgLoaded ? " is-loaded" : ""}`}
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
          className={`thumb-media thumb-video${videoReady ? " is-loaded" : ""}`}
        />
      )}
      {!imgLoaded && <span className="thumb-skeleton" aria-hidden="true" />}
    </span>
  );
}
