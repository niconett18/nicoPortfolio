import type { Metadata } from "next";
import ProjectsSection from "../../../components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Client and personal web projects — production e-commerce, fintech, and B2B platforms designed and built end to end.",
  alternates: { canonical: "/" },
};

export default function ProjectsPage() {
  return <ProjectsSection standalone />;
}
