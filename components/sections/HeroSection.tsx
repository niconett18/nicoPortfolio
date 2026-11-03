"use client";

import Image from "next/image";
import { ArrowUpRight, Send } from "lucide-react";
import { IoMail } from "react-icons/io5";
import { SiGithub, SiInstagram } from "react-icons/si";
import portraitSrc from "../../assets/portrait.png";
import { profile, socials } from "../../lib/profile";
import { useLenis } from "../motion/LenisProvider";
import FadeIn from "../motion/FadeIn";
import { scrollToSection } from "../nav/scrollToSection";

const SOCIAL_ICONS = { GitHub: SiGithub, Email: IoMail, Instagram: SiInstagram } as const;
const SOCIAL_ORDER = ["GitHub", "Email", "Instagram"] as const;

export default function HeroSection() {
  const lenis = useLenis();

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(lenis, id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <FadeIn onMount delay={0.05}>
            <p className="status">
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </p>
          </FadeIn>
          <FadeIn onMount delay={0.1}>
            <h1 className="hero-name">{profile.shortName}</h1>
          </FadeIn>
          <FadeIn onMount delay={0.18}>
            <p className="hero-role">{profile.subtitle}</p>
          </FadeIn>
          <FadeIn onMount delay={0.26} className="hero-actions">
            <a href="#contact" onClick={goTo("contact")} className="btn btn--solid">
              <Send size={15} strokeWidth={1.75} aria-hidden="true" />
              Get In Touch
            </a>
            <a href="#projects" onClick={goTo("projects")} className="btn">
              View Projects
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </FadeIn>
          <FadeIn onMount delay={0.32}>
            <ul className="hero-socials" aria-label="Elsewhere">
              {SOCIAL_ORDER.map((label) => {
                const link = socials.find((s) => s.label === label)!;
                const Icon = SOCIAL_ICONS[label];
                const external = link.href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={link.href}
                      aria-label={label === "Email" ? `Email ${link.value}` : `${label}: ${link.value}`}
                      title={label}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>

        <FadeIn onMount delay={0.15} className="hero-portrait">
          <Image
            src={portraitSrc}
            alt={`Portrait of ${profile.name}`}
            priority
            placeholder="blur"
            className="hero-portrait-img"
            sizes="(min-width: 900px) 22rem, 70vw"
          />
        </FadeIn>
      </div>
    </section>
  );
}
