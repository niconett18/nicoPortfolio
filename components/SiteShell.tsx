"use client";

import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import LenisProvider from "./motion/LenisProvider";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="site-shell">
        <Header />
        <main className="site-content">{children}</main>
        <Footer />
        <ChatWidget />
      </div>
    </LenisProvider>
  );
}
