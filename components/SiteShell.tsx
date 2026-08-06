"use client";

import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import LenisProvider from "./motion/LenisProvider";
import PageTransition from "./motion/PageTransition";
import Aurora from "./Aurora";
import Scroll3DElement from "./motion/Scroll3DElement";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="site-shell">
        <Aurora colorStops={["#3b5bff", "#3b5bff", "#3b5bff"]} speed={0.5} amplitude={1.2} blend={0.6} />
        <Scroll3DElement />
        <Header />

        <main className="site-content" style={{ position: "relative", zIndex: 1 }}>
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </main>

        <ChatWidget />

        <div className="grain" aria-hidden="true" />
      </div>
    </LenisProvider>
  );
}
