'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MagneticButton — renders an anchor or button that subtly follows the cursor
 * (magnetic effect) and springs back on leave. Pairs with the .page-btn CSS.
 * Respects prefers-reduced-motion (disables the magnetic pull, keeps a plain
 * tap/press feedback only).
 *
 * Props:
 *  - href: render as <a> when provided, otherwise <button>
 *  - strength: max px the button shifts toward the cursor (default 14)
 *  - className: button classes (e.g. "page-btn page-btn--primary")
 *  - all other props (onClick, target, rel, aria-*, etc.) are forwarded
 */
export default function MagneticButton({
  children,
  href,
  strength = 14,
  className = 'page-btn',
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // normalise to [-strength, strength]
    const x = (relX / (rect.width / 2)) * strength;
    const y = (relY / (rect.height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const motionProps = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    animate: reduce ? {} : { x: pos.x, y: pos.y },
    transition: { type: 'spring', stiffness: 250, damping: 18, mass: 0.5 },
    whileTap: { scale: 0.95 },
    ...rest,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return <motion.button {...motionProps}>{children}</motion.button>;
}
