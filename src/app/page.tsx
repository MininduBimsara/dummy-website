"use client";

import CanvasSequence from "@/components/CanvasSequence";
import ParallaxText from "@/components/ParallaxText";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
            SonicWave Pro
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-lg mx-auto">
            The Future of Sound.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-white/40">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* 2. Scrolling Animation Sequence */}
      <section 
        ref={containerRef}
        className="relative w-full"
        style={{ height: "400vh" }} // Provides plenty of scrolling space
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Hardware Accelerated Canvas rendering sequence */}
          <CanvasSequence progress={scrollYProgress} frameCount={162} />
          
          {/* Parallax Overlays */}
          {/* Phase 1 Overlay */}
          <ParallaxText 
            progress={scrollYProgress} 
            inputRange={[0.05, 0.15, 0.25, 0.35]}
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4">
                Precision Engineering
              </h2>
              <p className="text-lg md:text-2xl text-white/60 mx-auto max-w-2xl font-light">
                Every component meticulously crafted for acoustic perfection.
              </p>
            </div>
          </ParallaxText>

          {/* Phase 2 Overlay */}
          <ParallaxText 
            progress={scrollYProgress} 
            inputRange={[0.4, 0.5, 0.6, 0.7]}
          >
            <div className="text-center md:text-left w-full max-w-6xl mx-auto px-6">
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4">
                  Aerospace Grade
                </h2>
                <p className="text-lg md:text-2xl text-white/60 font-light">
                  Machined from solid aluminum blocks. Extremely lightweight. Infinitely durable.
                </p>
              </div>
            </div>
          </ParallaxText>

          {/* Phase 3 Overlay */}
          <ParallaxText 
            progress={scrollYProgress} 
            inputRange={[0.75, 0.85, 0.95, 1]}
            opacityRange={[0, 1, 1, 1]}
            yRange={["50px", "0px", "0px", "0px"]}
          >
            <div className="text-center">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                Hear it All.
              </h2>
              <button className="px-8 py-4 bg-white text-black font-semibold tracking-wide rounded-full text-lg hover:scale-105 transition-transform duration-300">
                Pre-order Now
              </button>
            </div>
          </ParallaxText>

          {/* Subtle gradient overlay at bottom to blend into footer */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="w-full bg-[#000000] py-24 flex flex-col items-center justify-center relative z-10 border-t border-white/5">
        <div className="max-w-4xl text-center px-6">
          <h3 className="text-2xl font-bold tracking-tight text-white/90 mb-4">SonicWave</h3>
          <p className="text-white/40 mb-12 text-sm leading-relaxed">
            Experience audio without boundaries. Our active noise cancellation
            system adapts 100,000 times per second to your environment, 
            delivering pure, uninterrupted sound.
          </p>
          <div className="flex gap-8 justify-center text-sm font-medium text-white/60 mb-12">
            <a href="#" className="hover:text-white transition-colors">Acoustics</a>
            <a href="#" className="hover:text-white transition-colors">Design</a>
            <a href="#" className="hover:text-white transition-colors">Tech Specs</a>
          </div>
          <p className="text-xs text-white/20">
            © 2026 SonicWave Audio Inc. All rights reserved. Fictional Product.
          </p>
        </div>
      </footer>

    </main>
  );
}
