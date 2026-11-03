"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { openChat } from "../../lib/chatEvents";
import { profile, socials } from "../../lib/profile";
import FadeIn from "../motion/FadeIn";
import JakartaClock from "../ui/JakartaClock";

const ICONS = {
  Email: Mail,
  GitHub: SiGithub,
  Instagram: SiInstagram,
} as const;

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the link still works.
    }
  };

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={copied ? "Copied" : "Copy"}
    >
      {copied ? <Check size={15} strokeWidth={1.75} /> : <Copy size={15} strokeWidth={1.75} />}
    </button>
  );
}

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="contact" className="section section--contact">
      <div className="container contact-grid">
        <FadeIn className="contact-main">
          <Heading className="sec-title">Let&apos;s Connect</Heading>
          <p className="contact-lead">
            Open to collaborations, internships, and interesting product work. Drop a line — I
            usually reply within a day.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="btn btn--solid">
              <Mail size={15} strokeWidth={1.75} aria-hidden="true" />
              Send an Email
            </a>
            <button type="button" className="btn btn--ghost" onClick={openChat}>
              <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
              Ask my AI assistant
            </button>
          </div>
          <p className="contact-where">
            <span className="status">
              <span className="status-dot" aria-hidden="true" />
              {profile.status}
            </span>
            <span className="contact-where-sep" aria-hidden="true">·</span>
            <span>
              {profile.location}, <JakartaClock className="clock clock--inline" />
            </span>
          </p>
        </FadeIn>

        <FadeIn className="contact-links" delay={0.08}>
          <ul>
            {socials.map((s) => {
              const Icon = ICONS[s.label];
              return (
                <li key={s.label} className="contact-link">
                  <Icon className="contact-link-icon" aria-hidden="true" />
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {s.value}
                  </a>
                  <CopyButton value={s.value} label={s.label} />
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
