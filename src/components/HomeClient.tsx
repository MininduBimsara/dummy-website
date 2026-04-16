"use client";

import CanvasSequence from "@/components/CanvasSequence";
import ParallaxText from "@/components/ParallaxText";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main id="top" className="flex min-h-screen flex-col">
      <section className="relative flex h-[92vh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="hero-halo" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10"
        >
          <p className="mx-auto mb-4 w-fit rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
            Signature Launch Collection
          </p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            SonicWave Pro
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-2xl">
            The future of sound, engineered for movement. Precision drivers,
            adaptive noise control, and cinematic clarity.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#buy"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black hover:bg-white/90"
            >
              Pre-order Now
            </a>
            <a
              href="#features"
              className="rounded-full border border-white/30 px-7 py-3 text-sm uppercase tracking-[0.14em] text-white/85 hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-white/40">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-12 w-px bg-linear-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </section>

      <section
        id="story"
        ref={containerRef}
        className="relative w-full"
        style={{ height: "360vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <CanvasSequence progress={scrollYProgress} frameCount={162} />

          <ParallaxText
            progress={scrollYProgress}
            inputRange={[0.05, 0.15, 0.25, 0.35]}
          >
            <div className="text-center">
              <h2 className="font-display mb-4 text-5xl tracking-tight text-white md:text-7xl">
                Precision Engineering
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-white/60 md:text-2xl">
                Every component meticulously crafted for acoustic perfection.
              </p>
            </div>
          </ParallaxText>

          <ParallaxText
            progress={scrollYProgress}
            inputRange={[0.4, 0.5, 0.6, 0.7]}
          >
            <div className="mx-auto w-full max-w-6xl px-6 text-center md:text-left">
              <div className="md:w-1/2">
                <h2 className="font-display mb-4 text-5xl tracking-tight text-white md:text-7xl">
                  Aerospace Grade
                </h2>
                <p className="text-lg text-white/60 md:text-2xl">
                  Machined from solid aluminum blocks. Extremely lightweight.
                  Infinitely durable.
                </p>
              </div>
            </div>
          </ParallaxText>

          <ParallaxText
            progress={scrollYProgress}
            inputRange={[0.75, 0.85, 0.95, 1]}
            opacityRange={[0, 1, 1, 1]}
            yRange={["50px", "0px", "0px", "0px"]}
          >
            <div className="text-center">
              <h2 className="font-display mb-6 text-6xl tracking-tight text-white md:text-8xl">
                Hear it All.
              </h2>
              <a
                href="#buy"
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold tracking-wide text-black transition-transform duration-300 hover:scale-105"
              >
                Pre-order Now
              </a>
            </div>
          </ParallaxText>

          <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-black to-transparent" />
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10"
      >
        <div className="mb-12 text-center">
          <p className="text-(--color-accent) text-xs uppercase tracking-[0.18em]">
            Features
          </p>
          <h2 className="font-display mt-3 text-5xl text-white md:text-6xl">
            Built For Everyday Cinema
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <article className="site-card">
            <h3 className="font-display text-3xl text-white">Adaptive ANC</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Active noise cancellation updates in real-time to remove traffic
              rumble, chatter, and cabin roar.
            </p>
          </article>
          <article className="site-card">
            <h3 className="font-display text-3xl text-white">
              Spatial Presence
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              A 40mm dynamic driver tuned for depth and stage width, delivering
              a warm but detailed signature.
            </p>
          </article>
          <article className="site-card">
            <h3 className="font-display text-3xl text-white">
              40-Hour Battery
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Stay unplugged for days. Fast charge provides 5 hours of playback
              in 10 minutes.
            </p>
          </article>
        </div>
      </section>

      <section
        id="specs"
        className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10"
      >
        <div className="site-card overflow-x-auto">
          <h2 className="font-display text-4xl text-white md:text-5xl">
            Technical Specs
          </h2>
          <div className="mt-8 grid min-w-75 gap-4 text-sm text-white/70 md:grid-cols-2">
            <div className="spec-row">
              <span>Drivers</span>
              <span>40mm Neodymium</span>
            </div>
            <div className="spec-row">
              <span>Bluetooth</span>
              <span>5.4, Multipoint</span>
            </div>
            <div className="spec-row">
              <span>Battery Life</span>
              <span>Up to 40 hours</span>
            </div>
            <div className="spec-row">
              <span>Charging</span>
              <span>USB-C Fast Charge</span>
            </div>
            <div className="spec-row">
              <span>Weight</span>
              <span>242g</span>
            </div>
            <div className="spec-row">
              <span>Audio Codec</span>
              <span>AAC, LDAC, SBC</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="buy"
        className="mx-auto mb-8 w-full max-w-7xl px-6 pb-8 md:px-10"
      >
        <div className="site-cta">
          <h2 className="font-display text-5xl text-white md:text-6xl">
            Ready To Listen Differently?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Join the early release and get SonicWave Pro before public launch.
          </p>
          <a
            href="#top"
            className="bg-(--color-accent) mt-9 inline-flex rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black hover:brightness-110"
          >
            Reserve Your Pair
          </a>
        </div>
      </section>
    </main>
  );
}
