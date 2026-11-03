"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { socials, profile } from "../lib/profile";
import { useScrollLock } from "../lib/useScrollLock";
import { useLenis } from "./motion/LenisProvider";
import { scrollToSection } from "./nav/scrollToSection";
import { useScrollSpy } from "./nav/useScrollSpy";
import JakartaClock from "./ui/JakartaClock";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const;

const CONNECT_ID = "contact";
const SECTION_IDS = ["hero", ...NAV.map((item) => item.id), CONNECT_ID];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const onHome = pathname === "/";
  const { activeId, setActiveOptimistic } = useScrollSpy(SECTION_IDS, onHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pendingScrollRef = useRef<string | null>(null);

  useScrollLock(menuOpen);

  const hrefFor = (id: string) => {
    if (!onHome) return id === "hero" ? "/" : `/#${id}`;
    return `#${id}`;
  };

  const isActive = (id: string) =>
    onHome ? activeId === id : pathname.startsWith(`/${id}`);

  const goToSection = (id: string) => {
    setActiveOptimistic(id);
    scrollToSection(lenis, id);
    history.replaceState(null, "", id === "hero" ? "/" : `#${id}`);
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (!onHome) return; // let next/link handle cross-route navigation
    e.preventDefault();
    goToSection(id);
  };

  const closeMenu = (id?: string) => {
    if (id) pendingScrollRef.current = id;
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) return;
    const id = pendingScrollRef.current;
    if (!id) return;
    pendingScrollRef.current = null;
    // Wait for the scroll lock's MutationObserver to release Lenis before scrolling.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (onHome) {
          goToSection(id);
        } else {
          window.location.href = id === "hero" ? "/" : `/#${id}`;
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /** Same-page anchor on home, a route link everywhere else. */
  const navAnchor = (id: string, className: string, label: string) => {
    const active = isActive(id);
    const props = {
      className: `${className}${active ? " is-active" : ""}`,
      "aria-current": active ? ("page" as const) : undefined,
    };
    return onHome ? (
      <a key={id} href={hrefFor(id)} onClick={(e) => handleNavClick(e, id)} {...props}>
        {label}
      </a>
    ) : (
      <Link key={id} href={hrefFor(id)} {...props}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="header-inner">
          {onHome ? (
            <a
              href="#hero"
              className="header-clock"
              onClick={(e) => handleNavClick(e, "hero")}
              aria-label={`${profile.name}, back to top`}
            >
              <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
              <JakartaClock className="clock" />
            </a>
          ) : (
            <Link href="/" className="header-clock" aria-label={`${profile.name}, home`}>
              <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
              <JakartaClock className="clock" />
            </Link>
          )}

          <nav className="header-nav" aria-label="Main navigation">
            {NAV.map((item) => navAnchor(item.id, "nav-link", item.label))}
            {navAnchor(CONNECT_ID, "nav-connect", "Connect")}
          </nav>

          <button
            type="button"
            className="menu-trigger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <nav className="menu-nav" aria-label="Mobile navigation">
              {[...NAV, { id: CONNECT_ID, label: "Connect" }].map((item, i) => {
                const active = isActive(item.id);
                return (
                  <motion.a
                    key={item.id}
                    href={hrefFor(item.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu(item.id);
                    }}
                    className={`menu-link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: EASE_OUT, delay: 0.05 + i * 0.04 },
                    }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>

            <div className="menu-foot">
              <span className="status">
                <span className="status-dot" aria-hidden="true" />
                {profile.status}
              </span>
              <span className="menu-foot-links">
                {socials
                  .filter((s) => s.label !== "Email")
                  .map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ))}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
