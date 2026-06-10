import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicholas-tanaka.vercel.app"), // Fallback, update with actual domain
  title: {
    default: "Nicholas Edmund Tanaka | Portfolio",
    template: "%s | Nicholas Edmund Tanaka",
  },
  description: "Fullstack Software Developer & Computer Engineering Student at Universitas Indonesia.",
  keywords: ["Nicholas Edmund Tanaka", "Portfolio", "Software Developer", "Fullstack Developer", "Computer Engineering", "Universitas Indonesia", "Next.js", "React", "TypeScript", "Web Development"],
  authors: [{ name: "Nicholas Edmund Tanaka", url: "https://github.com/nicholasedmund" }],
  creator: "Nicholas Edmund Tanaka",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Nicholas Edmund Tanaka | Portfolio",
    description: "Fullstack Software Developer & Computer Engineering Student at Universitas Indonesia.",
    siteName: "Nicholas Edmund Tanaka Portfolio",
    images: [
      {
        url: "/profile-card.jpg", // Ensure this image is in public directory
        width: 1200,
        height: 630,
        alt: "Nicholas Edmund Tanaka - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicholas Edmund Tanaka | Portfolio",
    description: "Fullstack Software Developer & Computer Engineering Student at Universitas Indonesia.",
    creator: "@yourtwitterhandle", // Optional, update if available
    images: ["/profile-card.jpg"], // Ensure this image is in public directory
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning style={{ position: "relative" }}>{children}</body>
    </html>
  );
}
