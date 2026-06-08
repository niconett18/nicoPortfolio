'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { revealUp, popIn, revealLeft, revealRight, revealViewport } from '../lib/animations';

const VARIANTS = {
  up: revealUp,
  pop: popIn,
  left: revealLeft,
  right: revealRight,
};

/**
 * Scroll-reveal wrapper. Animates its children into view once when scrolled to.
 * Respects prefers-reduced-motion (renders statically).
 *
 * Props:
 *  - variant: 'up' | 'pop' | 'left' | 'right'  (default 'up')
 *  - as: element/tag to render (default motion.div)
 *  - delay: extra delay in seconds
 *  - amount: viewport visibility threshold (default 0.25)
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  amount,
  className,
  as = 'div',
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const v = VARIANTS[variant] || revealUp;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...revealViewport, ...(amount != null ? { amount } : {}) }}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
