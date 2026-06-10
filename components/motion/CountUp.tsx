"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/animations";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Zero-pads to this many digits (e.g. 2 → "07"). */
  pad?: number;
};

/** Counts from 0 to `to` only once the element scrolls into view. */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
  pad = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  // Under reduced motion, skip the animation and render the target directly.
  const shown = reduce ? to : value;
  const display = pad > 0 ? String(shown).padStart(pad, "0") : String(shown);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
