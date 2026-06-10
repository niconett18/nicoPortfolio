"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/animations";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
};

function routeLabel(pathname: string): string {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment ?? "Home";
}

/**
 * Route transitions: an accent panel wipes up over the outgoing page,
 * the incoming page name flashes in mono type, then the panel exits upward
 * revealing the new page. Reduced motion gets a plain cross-fade.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE, delay: 0.45 },
          }}
          exit={{ opacity: 1 }}
        >
          {children}
        </motion.div>

        {/* accent wipe panel */}
        <motion.div
          className="wipe"
          initial={{ y: "0%" }}
          animate={{ y: "-100%", transition: { duration: 0.7, ease: EASE, delay: 0.25 } }}
          exit={{ y: ["100%", "0%"], transition: { duration: 0.5, ease: EASE } }}
        >
          <motion.span
            className="wipe-label"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0 }}
          >
            {routeLabel(pathname)}
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
