"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  /** Renders an <a> when provided, otherwise a <button>. */
  href?: string;
  /** Max px the element shifts toward the cursor. */
  strength?: number;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
  "data-cursor"?: string;
};

/**
 * Magnetic hover: the element subtly pulls toward the cursor and springs
 * back on leave. The spring here is intentional — springs are reserved for
 * cursor/magnetic effects in this design system.
 */
export default function MagneticButton({
  children,
  href,
  strength = 12,
  className = "btn",
  ...rest
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({
      x: (relX / (rect.width / 2)) * strength,
      y: (relY / (rect.height / 2)) * strength,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const motionProps = {
    className,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    animate: reduce ? undefined : { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 250, damping: 18, mass: 0.5 },
    whileTap: { scale: 0.96 },
    ...rest,
  };

  if (href) {
    return (
      <motion.a
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(node) => {
        ref.current = node;
      }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
