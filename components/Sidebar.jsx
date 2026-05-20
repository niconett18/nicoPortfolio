'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FolderKanban, Home, Mail, UserRound, X } from 'lucide-react';
import { SiGithub, SiInstagram } from 'react-icons/si';
import './Sidebar.css';

const NAV = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: UserRound },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/cv', label: 'CV', icon: FileText }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          closeMobile();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <button
        type="button"
        className={`sidebar-mobile-trigger ${mobileOpen ? 'sidebar-mobile-trigger--open' : ''}`}
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-sidebar"
      >
        <span className="sidebar-mobile-trigger-icon" aria-hidden="true">
          <motion.span
            className="sidebar-mobile-trigger-line"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="sidebar-mobile-trigger-line"
            animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0.5 : 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          />
          <motion.span
            className="sidebar-mobile-trigger-line"
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            aria-label="Close menu"
          />
        )}
      </AnimatePresence>

      <motion.aside
        id="mobile-sidebar"
        className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}
        initial={false}
      >
        <motion.div
          className="sidebar-inner"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="sidebar-brand" layout>
            <Link href="/" onClick={closeMobile} className="sidebar-logo">
              <span className="sidebar-logo-text">
                Nicholas Edmund Tanaka
              </span>
            </Link>
            <button
              type="button"
              className="sidebar-close"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </motion.div>

          <nav className="sidebar-nav">
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={`sidebar-link ${active ? 'sidebar-link--active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <item.icon className="sidebar-link-icon" size={16} strokeWidth={1.8} aria-hidden="true" />
                    <span className="sidebar-link-label">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <p className="sidebar-status">
              <span className="sidebar-status-dot" />
              Available for work
            </p>
            <motion.div className="sidebar-socials">
              <a
                href="https://github.com/niconett18"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-social"
              >
                <SiGithub size={16} />
              </a>
              <a
                href="https://www.instagram.com/niconet18/"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-social"
              >
                <SiInstagram size={16} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="sidebar-rail">
          <motion.div
            className="sidebar-rail-fill"
            animate={{
              height: `${((NAV.findIndex((n) => isActive(n.href)) + 1) / NAV.length) * 100}%`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </motion.aside>
    </>
  );
}
