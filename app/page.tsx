"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-700, 700], [-35, 35]);
  const bgY = useTransform(mouseY, [-700, 700], [-20, 20]);

  const textX = useTransform(mouseX, [-700, 700], [12, -12]);
  const textY = useTransform(mouseY, [-700, 700], [8, -8]);

  const fogX = useTransform(mouseX, [-700, 700], [-120, 120]);
  const fogY = useTransform(mouseY, [-700, 700], [-80, 80]);

  const reveal = useTransform([mouseX, mouseY], ([x, y]) => {
    return `radial-gradient(
      circle at calc(50% + ${x}px) calc(50% + ${y}px),
      rgba(255,255,255,0.25) 0px,
      rgba(255,255,255,0.12) 170px,
      rgba(0,0,0,0.28) 380px,
      rgba(0,0,0,0.88) 850px
    )`;
  });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function scrollDown() {
    document.getElementById("section-two")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="bg-[#050505] text-[#f4f1eb] font-serif overflow-x-hidden">
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-[999] bg-[#b89b5e]/90 text-white"
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-10 top-10 text-xs uppercase tracking-[0.4em]"
          >
            Close
          </button>

          <nav className="flex h-full flex-col justify-center px-10 text-right text-4xl font-bold uppercase leading-tight md:px-24 md:text-6xl">
            <a href="/" className="block">Home <span className="text-white/40">/01</span></a>
            <a href="/About" className="block">About <span className="text-white/40">/02</span></a>
            <a href="/services" className="block">Services <span className="text-white/40">/03</span></a>
            <a href="/portfolio" className="block">Portfolio <span className="text-white/40">/04</span></a>
            <a href="/strategy" className="block">Strategy <span className="text-white/40">/05</span></a>
            <a href="/contact" className="block">Contact <span className="text-white/40">/06</span></a>
          </nav>
        </motion.div>
      )}

      {/* HERO */}
      <section
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
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

        <motion.div
          style={{ background: reveal }}
          className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
        />

        <motion.div
          style={{ x: fogX, y: fogY }}
          animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.18, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-64 -top-64 z-30 h-[850px] w-[850px] rounded-full bg-white/20 blur-[180px]"
        />

        <motion.div
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.1, 0.95, 1.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-64 -top-40 z-30 h-[760px] w-[760px] rounded-full bg-white/15 blur-[170px]"
        />

        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-72 left-20 z-30 h-[800px] w-[1100px] rounded-full bg-[#b89b5e]/20 blur-[190px]"
        />

        <div className="pointer-events-none absolute inset-8 z-40 border border-[#b89b5e]/40" />

        {/* TOP LOGO */}
        <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-center px-8 py-8 text-[#d8c28a]">
          <p className="text-5xl font-light tracking-widest">LS</p>
        </header>

        {/* RIGHT SIDE MENU */}
        <div className="absolute right-0 top-0 z-50 flex h-full w-20 flex-col items-center justify-center border-l border-[#b89b5e]/25 text-[#d8c28a]">
          <button
            onClick={() => setMenuOpen(true)}
            className="absolute top-20 rotate-90 text-xs uppercase tracking-[0.4em]"
          >
            Menu
          </button>

          <div className="flex flex-col items-center gap-8">
            <span className="h-2 w-2 rounded-full border border-[#d8c28a]" />
            <span className="h-2 w-2 rounded-full border border-[#d8c28a]" />
            <span className="h-2 w-2 rounded-full border border-[#d8c28a]" />
            <span className="h-2 w-2 rounded-full border border-[#d8c28a]" />
          </div>

          <p className="absolute bottom-20 text-2xl">01</p>
        </div>

        {/* HERO TEXT */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative z-50 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#c9bda8]">
            Marketing Studio
          </p>

          <h1 className="text-6xl font-light uppercase tracking-[0.18em] text-[#d8c28a] md:text-8xl lg:text-9xl">
            Lov Studio
          </h1>

          <p className="mt-8 max-w-xl text-sm uppercase leading-loose tracking-[0.18em] text-[#d8d0c3] md:text-base">
            Strategy, content, and digital presence for brands that need to be seen.
          </p>
        </motion.div>

        {/* SCROLL BUTTON */}
        <button
          type="button"
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 z-[100] flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-[10px] uppercase tracking-[0.4em] text-[#d8c28a]"
        >
          <span>Scroll</span>
          <span className="text-6xl leading-none">⌄</span>
        </button>
      </section>

      {/* SECOND LANDING SECTION */}
      <section
        id="section-two"
        className="flex min-h-screen items-center justify-center bg-[#050505] px-6 md:px-20"
      >
        <div className="max-w-5xl text-center">
          <p className="mb-10 text-xs uppercase tracking-[0.45em] text-[#a89678]">
            Built for presence
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-wide md:text-7xl">
            We create the kind of marketing that makes a brand impossible to ignore.
          </h2>
        </div>
      </section>
    </main>
  );
}
