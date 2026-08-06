import type { Metadata } from "next";
import ContactSection from "../../../components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nicholas Edmund Tanaka for freelance work, internships, or collaboration.",
  alternates: { canonical: "/" },
};

export default function ContactPage() {
  return <ContactSection standalone />;
}
