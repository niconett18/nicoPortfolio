import HashScrollHandler from "../../components/nav/HashScrollHandler";
import HeroSection from "../../components/sections/HeroSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import AboutSection from "../../components/sections/AboutSection";
import ContactSection from "../../components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
