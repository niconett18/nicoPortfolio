"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub, SiInstagram } from "react-icons/si";
import { EASE } from "../lib/animations";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <Link href="/" className="header-brand">
          <span className="header-brand-dot" aria-hidden="true" />
          <span className="header-brand-text">Nicholas Edmund Tanaka</span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="flip">
                  <span className="flip-inner" data-text={item.label}>
                    {item.label}
                  </span>
                </span>
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
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="menu-nav" aria-label="Mobile navigation">
              {NAV.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`menu-link ${active ? "menu-link--active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
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
