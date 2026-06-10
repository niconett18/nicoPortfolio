"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/animations";

type SplitTextProps = {
  text: string;
  /** "chars" rises per character (hero names), "words" per word (headings). */
  mode?: "chars" | "words";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
};

/**
 * Splits text into masked words/chars and reveals them with a staggered
 * y-translate behind overflow-hidden line masks. Falls back to a plain
 * opacity fade under prefers-reduced-motion.
 */
export default function SplitText({
  text,
  mode = "chars",
  className,
  delay = 0,
  stagger = 0.028,
  duration = 0.9,
  inView = false,
}: SplitTextProps) {
  const reduce = useReducedMotion();

  const words = useMemo(() => text.split(" "), [text]);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const rise = {
    hidden: { y: "115%" },
    visible: { y: "0%", transition: { duration, ease: EASE } },
  };

  if (reduce) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        {...(inView
          ? { whileInView: { opacity: 1 }, viewport: { once: true } }
          : { animate: { opacity: 1 } })}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, amount: 0.4 } }
        : { animate: "visible" })}
      aria-label={text}
      style={{ display: "inline-block" }}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {mode === "chars" ? (
            Array.from(word).map((char, ci) => (
              <span
                key={ci}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
              >
                <motion.span variants={rise} style={{ display: "inline-block" }}>
                  {char}
                </motion.span>
              </span>
            ))
          ) : (
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
              <motion.span variants={rise} style={{ display: "inline-block" }}>
                {word}
              </motion.span>
            </span>
          )}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
