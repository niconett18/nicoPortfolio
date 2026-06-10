"use client";

import Header from "./Header";
import Footer from "./Footer";
import LenisProvider from "./motion/LenisProvider";
import PageTransition from "./motion/PageTransition";
import Aurora from "./Aurora";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="site-shell">
        <Aurora colorStops={["#3b5bff", "#3b5bff", "#3b5bff"]} speed={0.5} amplitude={1.2} blend={0.6} />
        <Header />

        <main className="site-content" style={{ position: "relative", zIndex: 1 }}>
          <PageTransition>
            {children}
            <Footer />
          </PageTransition>
        </main>

        <div className="grain" aria-hidden="true" />
      </div>
    </LenisProvider>
  );
}
