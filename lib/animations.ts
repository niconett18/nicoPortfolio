export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 90, damping: 20, mass: 0.8 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 }
  }
};

export const lineReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18, mass: 0.8 }
  }
};

export const pageEnter = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 22, mass: 0.7 }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18, ease: 'easeIn' as const } }
};

export const modalContentStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 }
  }
};

/* ===== Scroll-reveal + pop variants (ui-ux-pro-max §7) ===== */

// General scroll-into-view reveal. Pair with whileInView + viewport once.
export const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 85, damping: 20, mass: 0.85 }
  }
};

// Pop-in: subtle scale + lift, spring physics for a natural "pop".
export const popIn = {
  hidden: { opacity: 0, scale: 0.92, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 220, damping: 18, mass: 0.7 }
  }
};

// Container that staggers children entering on scroll.
export const revealStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

// Directional reveals for alternating / horizontal layouts.
export const revealLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 85, damping: 20, mass: 0.85 }
  }
};

export const revealRight = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 85, damping: 20, mass: 0.85 }
  }
};

// Default viewport config for scroll reveals.
export const revealViewport = { once: true, amount: 0.25 } as const;

// Reusable hover/tap interaction for buttons & cards (pairs with CSS).
export const interactiveHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
} as const;
