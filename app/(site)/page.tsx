import HashScrollHandler from "../../components/nav/HashScrollHandler";
import HeroSection from "../../components/sections/HeroSection";
import AboutSection from "../../components/sections/AboutSection";
import ExperienceSection from "../../components/sections/ExperienceSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import ContactSection from "../../components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
