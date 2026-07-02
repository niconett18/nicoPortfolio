"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Smooth inertia scrolling for the whole document.
 * Disabled entirely under prefers-reduced-motion.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function loop(time: number) {
      if (!document.documentElement.classList.contains("modal-open")) {
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(loop);
    });

    requestAnimationFrame(() => {
      lenis.stop();
      requestAnimationFrame(() => lenis.start());
    });

    document.documentElement.classList.remove("modal-open");

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isOpen = document.documentElement.classList.contains("modal-open");
      if (isOpen) {
        lenisRef.current?.stop();
      } else {
        lenisRef.current?.start();
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      lenisRef.current?.resize();
    });
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  return <>{children}</>;
}
