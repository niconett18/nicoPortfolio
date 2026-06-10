"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SiGithub, SiInstagram } from "react-icons/si";

function JakartaClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mono-label footer-clock" suppressHydrationWarning>
      {time || "--:--:--"} WIB
    </span>
  );
}

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Wordmark slides into place as the footer scrolls into view.
  const { scrollYProgress } = useScroll({
    target: wordmarkRef,
    offset: ["start end", "end end"],
  });
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  return (
    <footer className="footer">
      <div ref={wordmarkRef} className="footer-wordmark">
        <motion.span
          className="footer-wordmark-text"
          style={reduce ? undefined : { x: wordmarkX, opacity: wordmarkOpacity }}
        >
          Nicholas Edmund
        </motion.span>
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          <span className="mono-label">
            © {new Date().getFullYear()} Nicholas Edmund Tanaka
          </span>
          <span className="mono-label">Fullstack Developer — Universitas Indonesia</span>
        </div>

        <div className="footer-col">
          <a href="https://github.com/niconett18" target="_blank" rel="noopener noreferrer">
            <SiGithub size={13} />
            GitHub
          </a>
          <a
            href="https://www.instagram.com/niconet18/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiInstagram size={13} />
            Instagram
          </a>
          <a href="mailto:nicholasedmund18@gmail.com">Email</a>
        </div>

        <div className="footer-col" style={{ alignItems: "flex-end", textAlign: "right" }}>
          <span className="mono-label">Jakarta, Indonesia</span>
          <span className="mono-label">6.2088° S / 106.8456° E</span>
          <JakartaClock />
        </div>
      </div>
    </footer>
  );
}
