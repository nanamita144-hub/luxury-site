"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import CinematicShell from "./components/CinematicShell";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-700, 700], [-35, 35]);
  const bgY = useTransform(mouseY, [-700, 700], [-20, 20]);
  const textX = useTransform(mouseX, [-700, 700], [12, -12]);
  const textY = useTransform(mouseY, [-700, 700], [8, -8]);
  const fogX = useTransform(mouseX, [-700, 700], [-120, 120]);
  const fogY = useTransform(mouseY, [-700, 700], [-80, 80]);

  const reveal = useTransform([mouseX, mouseY], ([x, y]) => `radial-gradient(circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.12) 170px, rgba(0,0,0,0.28) 380px, rgba(0,0,0,0.88) 850px)`);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <CinematicShell>
      <section onMouseMove={handleMouseMove} className="relative h-screen w-full overflow-hidden bg-black">
        <motion.video
          style={{ x: bgX, y: bgY, scale: 1.12 }}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Instalation.mov" />
        </motion.video>

        <div className="absolute inset-0 z-10 bg-black/55" />
        <motion.div style={{ background: reveal }} className="pointer-events-none absolute inset-0 z-20 mix-blend-screen" />

        <motion.div style={{ x: fogX, y: fogY }} animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.18, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -left-64 -top-64 z-30 h-[850px] w-[850px] rounded-full bg-white/20 blur-[180px]" />
        <motion.div animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.1, 0.95, 1.1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-64 -top-40 z-30 h-[760px] w-[760px] rounded-full bg-white/15 blur-[170px]" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -bottom-72 left-20 z-30 h-[800px] w-[1100px] rounded-full bg-[#b89b5e]/20 blur-[190px]" />
        <div className="pointer-events-none absolute inset-4 z-40 border border-[#b89b5e]/40 md:inset-8" />

        <motion.div style={{ x: textX, y: textY }} className="relative z-50 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#c9bda8]">Marketing Studio</p>
          <h1 className="text-5xl font-light uppercase tracking-[0.18em] text-[#d8c28a] md:text-8xl lg:text-9xl">Lov Studio</h1>
          <p className="mt-8 max-w-xl text-xs uppercase leading-loose tracking-[0.18em] text-[#d8d0c3] md:text-base">Strategy, content, and digital presence for brands that need to be seen.</p>
        </motion.div>

        <a href="#section-two" className="absolute bottom-8 left-1/2 z-[100] flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-[10px] uppercase tracking-[0.4em] text-[#d8c28a] transition-opacity hover:opacity-80">
          <span>Scroll</span>
          <span className="text-6xl leading-none">⌄</span>
        </a>
      </section>

      <section id="section-two" className="flex min-h-screen items-center justify-center bg-[#050505] px-6 md:px-20">
        <div className="max-w-5xl text-center">
          <p className="mb-10 text-xs uppercase tracking-[0.45em] text-[#a89678]">Built for presence</p>
          <h2 className="text-3xl font-light leading-tight tracking-wide md:text-7xl">We create the kind of marketing that makes a brand impossible to ignore.</h2>
        </div>
      </section>
    </CinematicShell>
  );
}
