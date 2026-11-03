"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useReducedMotion from "../../lib/useReducedMotion";
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

  // Keep one tree shape for both modes: swapping wrappers would remount the
  // page (and break hydration when the preference flips after first paint).
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={
            reduce
              ? { opacity: 1, transition: { duration: 0.25 } }
              : { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.45 } }
          }
          exit={reduce ? { opacity: 0, transition: { duration: 0.25 } } : { opacity: 1 }}
        >
          {children}
        </motion.div>

        {/* accent wipe panel (trailing sibling, so dropping it never remounts the page) */}
        {!reduce && (
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
        )}
      </motion.div>
    </AnimatePresence>
  );
}
