"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import useMediaQuery from "../../lib/useMediaQuery";

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance, e.g. to call scrollTo() for anchor nav. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Smooth inertia scrolling for the whole document.
 * Disabled entirely under prefers-reduced-motion.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (isReducedMotion) return;

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
    setLenisInstance(lenis);

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
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [isReducedMotion]);

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

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}
