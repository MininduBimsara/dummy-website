import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SonicWave Pro",
  description:
    "SonicWave Pro official website. Premium wireless headphones with cinematic sound.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        <div
          className="absolute inset-0 -z-10 site-atmosphere"
          aria-hidden="true"
        />

        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/55 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10">
            <a
              href="#top"
              className="text-xl tracking-wide font-display text-white"
            >
              SONICWAVE
            </a>
            <nav className="hidden items-center gap-6 text-sm tracking-wide text-white/75 md:flex">
              <a href="#story" className="hover:text-white transition-colors">
                Story
              </a>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
              <a href="#specs" className="hover:text-white transition-colors">
                Specs
              </a>
            </nav>
            <a
              href="#buy"
              className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/90 hover:bg-white hover:text-black transition-colors"
            >
              Pre-order
            </a>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t border-white/10 bg-black/70">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 md:px-10">
            <div>
              <h3 className="font-display text-2xl text-white">
                SonicWave Pro
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                Crafted for listeners who want studio depth, city-proof noise
                control, and all-day comfort.
              </p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.14em] text-white/50">
                Explore
              </h4>
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <a
                  href="#story"
                  className="block hover:text-white transition-colors"
                >
                  Our Story
                </a>
                <a
                  href="#features"
                  className="block hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#specs"
                  className="block hover:text-white transition-colors"
                >
                  Technical Specs
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.14em] text-white/50">
                Contact
              </h4>
              <p className="mt-4 text-sm text-white/70">
                support@sonicwave.audio
              </p>
              <p className="mt-1 text-sm text-white/70">+1 (800) 014-2026</p>
            </div>
          </div>
          <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40 md:px-10">
            © 2026 SonicWave Audio Inc. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
