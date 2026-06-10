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
      // Let Lenis manage the overflow classes properly
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Observe modal open class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isOpen = document.documentElement.classList.contains("modal-open");
          if (isOpen) {
             lenisRef.current?.stop();
          } else {
             lenisRef.current?.start();
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
