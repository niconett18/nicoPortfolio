"use client";

import useMediaQuery from "./useMediaQuery";

/**
 * Hydration-safe prefers-reduced-motion. framer-motion's own hook reads
 * matchMedia during the first client render, so it disagrees with the server
 * (which can't know the preference) and breaks hydration for any component
 * that branches on it. This returns false on the server and during hydration,
 * then switches to the real preference right after.
 */
export default function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
