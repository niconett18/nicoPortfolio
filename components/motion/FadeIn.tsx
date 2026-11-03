"use client";

import { motion } from "framer-motion";
import useReducedMotion from "../../lib/useReducedMotion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (for above-the-fold content). */
  onMount?: boolean;
  as?: "div" | "section" | "li" | "article";
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The one entrance used across the site: a short fade with a 12px rise.
 * Reduced motion keeps the fade and drops the movement.
 */
export default function FadeIn({ children, className, delay = 0, onMount = false, as = "div" }: FadeInProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const hidden = { opacity: 0, y: reduce ? 0 : 12 };
  const shown = { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay } };

  return onMount ? (
    <Tag className={className} initial={hidden} animate={shown}>
      {children}
    </Tag>
  ) : (
    <Tag
      className={className}
      initial={hidden}
      whileInView={shown}
      // Trigger as soon as any part is in view: tall blocks (e.g. the project list)
      // would otherwise stay hidden until a fraction of their full height is visible.
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </Tag>
  );
}
