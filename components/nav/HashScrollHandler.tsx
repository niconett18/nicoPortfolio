"use client";

import { useEffect } from "react";
import { useLenis } from "../motion/LenisProvider";
import { scrollToSection } from "./scrollToSection";

/** Lands on the right section for /#id deep links and browser back/forward. */
export default function HashScrollHandler() {
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        scrollToSection(lenis, hash, { immediate: true });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // Only run once per Lenis-availability change, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scrollToSection(lenis, hash, { immediate: true });
      } else {
        lenis?.scrollTo(0, { immediate: true });
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [lenis]);

  return null;
}
