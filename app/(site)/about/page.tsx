import type { Metadata } from "next";
import AboutSection from "../../../components/sections/AboutSection";
import ExperienceSection from "../../../components/sections/ExperienceSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fullstack Developer and Computer Engineering student at Universitas Indonesia — background, education, experience, and skills.",
  alternates: { canonical: "/" },
};

export default function AboutPage() {
  return (
    <>
      <AboutSection standalone />
      <ExperienceSection />
    </>
  );
}
