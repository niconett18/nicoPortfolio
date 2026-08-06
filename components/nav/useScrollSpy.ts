"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section id is currently centered in the viewport.
 * `setActiveOptimistic` lets a nav click set the target immediately and
 * suppress IntersectionObserver updates while the programmatic scroll is
 * still sweeping through intermediate sections, avoiding nav-highlight strobe.
 */
export function useScrollSpy(ids: readonly string[], enabled: boolean) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const suppressUntilRef = useRef(0);

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (performance.now() < suppressUntilRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled, ids]);

  const setActiveOptimistic = (id: string, suppressMs = 1200) => {
    setActiveId(id);
    suppressUntilRef.current = performance.now() + suppressMs;
  };

  return { activeId, setActiveOptimistic };
}
