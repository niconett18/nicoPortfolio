"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked opacity highlight — like lenis.dev's text focus effect.
 * Text starts dimmed (opacity 0.15) and brightens to full opacity as it
 * scrolls into the center of the viewport, then dims again as it leaves.
 */
export default function ScrollHighlight({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "p" | "span" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });

  // Fade from dimmed → bright as element enters center of viewport
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    reduce ? [1, 1, 1, 1] : [0.12, 1, 1, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [20, 0]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
