"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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

  const y = useTransform(scrollYProgress, [0, 1], [travel / 2, -travel / 2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}
