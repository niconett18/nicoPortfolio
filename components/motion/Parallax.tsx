"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useReducedMotion from "../../lib/useReducedMotion";

type ParallaxProps = {
  children: React.ReactNode;
  /** Total parallax travel in px across the element's scroll range. */
  travel?: number;
  /** Adds a slight scale-up as the element scrolls. */
  scaleTo?: number;
  className?: string;
};

/**
 * Scroll parallax: the wrapped element translates slower than the page
 * (transform-only) with an optional subtle scale. Inert under reduced motion.
 */
export default function Parallax({
  children,
  travel = 60,
  scaleTo = 1,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduced motion flattens the ranges instead of swapping to a plain <div>:
  // the ref must stay attached or useScroll throws "Target ref is defined
  // but not hydrated".
  const half = reduce ? 0 : travel / 2;
  const y = useTransform(scrollYProgress, [0, 1], [half, -half]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : scaleTo]);

  return (
    <motion.div ref={ref} className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}
