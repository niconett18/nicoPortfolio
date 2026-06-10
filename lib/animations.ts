/**
 * One easing language for the whole site (expo-like).
 * Durations: 0.6–1s for reveals, 0.3s for hovers.
 * Springs are reserved for the cursor and magnetic effects only.
 */
export const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Line mask reveal — pair with an overflow-hidden parent. */
export const lineReveal = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Card entrance — slight rise + scale settle. */
export const popIn = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const modalContentStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.12 },
  },
};

/** Modal child items — tighter travel and timing than page-level fadeUp. */
export const modalItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Centered dialog entrance — springy scale-up; quick eased exit. */
export const modalPanel = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    transition: { duration: 0.22, ease: EASE },
  },
};

export const revealViewport = { once: true, amount: 0.2 } as const;
