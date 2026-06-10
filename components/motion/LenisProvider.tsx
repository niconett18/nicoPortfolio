"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth inertia scrolling for the whole document.
 * Disabled entirely under prefers-reduced-motion.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Let Lenis manage the overflow classes properly
      smoothWheel: true,
    });

    let rafId = requestAnimationFrame(function loop(time: number) {
      if (document.documentElement.classList.contains("modal-open")) {
        // Pause Lenis without stopping the RAF loop entirely
        lenis.stop();
      } else {
        lenis.start();
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
