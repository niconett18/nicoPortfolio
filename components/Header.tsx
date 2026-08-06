"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub, SiInstagram } from "react-icons/si";
import { EASE } from "../lib/animations";
import { useScrollLock } from "../lib/useScrollLock";
import { useLenis } from "./motion/LenisProvider";
import { scrollToSection } from "./nav/scrollToSection";
import { useScrollSpy } from "./nav/useScrollSpy";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = NAV.map((item) => item.id);

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
    onHome ? activeId === id : id !== "hero" && pathname.startsWith(`/${id}`);

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
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

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        {onHome ? (
          <a
            href="#hero"
            className="header-brand"
            onClick={(e) => handleNavClick(e, "hero")}
          >
            <span className="header-brand-dot" aria-hidden="true" />
            <span className="header-brand-text">Nicholas Edmund Tanaka</span>
          </a>
        ) : (
          <Link href="/" className="header-brand">
            <span className="header-brand-dot" aria-hidden="true" />
            <span className="header-brand-text">Nicholas Edmund Tanaka</span>
          </Link>
        )}

        <nav className="header-nav" aria-label="Main navigation">
          {NAV.map((item) => {
            const active = isActive(item.id);
            const href = hrefFor(item.id);
            const content = (
              <span className="flip">
                <span className="flip-inner" data-text={item.label}>
                  {item.label}
                </span>
              </span>
            );
            return onHome ? (
              <a
                key={item.id}
                href={href}
                className={`nav-link ${active ? "nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {content}
              </a>
            ) : (
              <Link
                key={item.id}
                href={href}
                className={`nav-link ${active ? "nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {content}
              </Link>
            );
          })}
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
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="menu-overlay"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="menu-nav" aria-label="Mobile navigation">
              {NAV.map((item, i) => {
                const active = isActive(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  >
                    <a
                      href={hrefFor(item.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMenu(item.id);
                      }}
                      className={`menu-link ${active ? "menu-link--active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              className="menu-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.45 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <span className="mono-label status-chip">
                <span className="status-chip-dot" aria-hidden="true" />
                Available for work
              </span>
              <span style={{ display: "flex", gap: "1.25rem" }}>
                <a
                  href="https://github.com/niconett18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label"
                >
                  <SiGithub size={14} style={{ marginRight: "0.4rem", display: "inline" }} />
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/niconet18/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label"
                >
                  <SiInstagram size={14} style={{ marginRight: "0.4rem", display: "inline" }} />
                  Instagram
                </a>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
