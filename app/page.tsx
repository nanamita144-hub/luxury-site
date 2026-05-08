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
      <section onMouseMove={handleMouseMove} className="relative min-h-[100svh] w-full overflow-hidden bg-black md:min-h-screen">
        <motion.video
          style={{ x: bgX, y: bgY, scale: 1.12 }}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/window.svg"
        >
          <source src="/Instalation.mp4" type="video/mp4" />
          <source src="/Instalation.mov" type="video/quicktime" />
        </motion.video>

        <div className="pointer-events-none absolute inset-0 z-10 bg-black/55" />
        <motion.div style={{ background: reveal }} className="pointer-events-none absolute inset-0 z-20 mix-blend-screen" />

        <motion.div style={{ x: fogX, y: fogY }} animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.18, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -left-80 -top-80 z-30 h-[700px] w-[700px] rounded-full bg-white/20 blur-[150px] sm:-left-64 sm:-top-64 sm:h-[850px] sm:w-[850px] sm:blur-[180px]" />
        <motion.div animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.1, 0.95, 1.1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-72 -top-52 z-30 h-[620px] w-[620px] rounded-full bg-white/15 blur-[130px] sm:-right-64 sm:-top-40 sm:h-[760px] sm:w-[760px] sm:blur-[170px]" />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -bottom-72 -left-40 z-30 h-[680px] w-[900px] rounded-full bg-[#b89b5e]/20 blur-[150px] sm:left-20 sm:h-[800px] sm:w-[1100px] sm:blur-[190px]" />
        <div className="pointer-events-none absolute inset-3 z-40 border border-[#b89b5e]/40 sm:inset-4 md:inset-8" />

        <motion.div style={{ x: textX, y: textY }} className="relative z-50 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-24 text-center md:h-screen md:min-h-0 md:px-6 md:pb-16 md:pt-28">
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#c9bda8] sm:mb-6 sm:text-xs sm:tracking-[0.45em]">Marketing Studio</p>
          <h1 className="text-[2.2rem] font-light uppercase tracking-[0.12em] text-[#d8c28a] sm:text-5xl sm:tracking-[0.16em] md:text-8xl lg:text-9xl">Lov Studio</h1>
          <p className="mt-6 max-w-[18rem] text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#d8d0c3] sm:mt-8 sm:max-w-xl sm:text-xs sm:leading-loose sm:tracking-[0.18em] md:text-base">Strategy, content, and digital presence for brands that need to be seen.</p>
        </motion.div>

        <a href="#section-two" className="pointer-events-auto absolute bottom-6 left-1/2 z-[160] flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-[9px] uppercase tracking-[0.35em] text-[#d8c28a] transition-opacity hover:opacity-80 sm:bottom-8 sm:text-[10px] sm:tracking-[0.4em]">
          <span>Scroll</span>
          <span className="text-6xl leading-none">⌄</span>
        </a>
      </section>

      <section id="section-two" className="flex min-h-[100svh] items-center justify-center bg-[#050505] px-5 sm:px-6 md:px-20">
        <div className="max-w-5xl text-center">
          <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-[#a89678] sm:mb-10 sm:text-xs sm:tracking-[0.45em]">Built for presence</p>
          <h2 className="text-2xl font-light leading-tight tracking-wide sm:text-3xl md:text-7xl">We create the kind of marketing that makes a brand impossible to ignore.</h2>
        </div>
      </section>
    </CinematicShell>
  );
}
