"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset in px (how far elements rise from). */
  yOffset?: number;
  /** Delay multiplier for staggered siblings. */
  delay?: number;
  /** Which axis to reveal from: 'bottom' (default), 'left', 'right'. */
  direction?: "bottom" | "left" | "right";
  /** Optional scale-up effect (like lenis.dev card zoom). */
  scale?: boolean;
}

/**
 * Scroll-linked reveal component inspired by lenis.dev.
 * Elements fade in + slide up as they enter the viewport,
 * driven directly by scroll position for a connected feel.
 */
export default function ScrollReveal({
  children,
  className = "",
  yOffset = 60,
  delay = 0,
  direction = "bottom",
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Track when element enters viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 65%"],
  });

  // Y transform
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : (direction === "bottom" ? yOffset : 0), 0]
  );

  // X transform for horizontal reveals
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [
      reduce ? 0 : (direction === "left" ? -60 : direction === "right" ? 60 : 0),
      0,
    ]
  );

  // Opacity
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Optional scale
  const scaleVal = useTransform(scrollYProgress, [0, 1], [scale ? 0.92 : 1, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: translateY,
        x: translateX,
        opacity,
        scale: scaleVal,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
