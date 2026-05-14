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

  const reveal = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.12) 170px, rgba(0,0,0,0.28) 380px, rgba(0,0,0,0.88) 850px)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <CinematicShell>
      <section
        onMouseMove={handleMouseMove}
        style={{ position: "relative", minHeight: "100svh", width: "100%", overflow: "hidden", background: "#000" }}
      >
        {/* VIDEO */}
        <motion.video
          style={{ x: bgX, y: bgY, scale: 1.12, position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
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

        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.55)", pointerEvents: "none" }} />

        {/* Reveal gradient */}
        <motion.div
          style={{ background: reveal, position: "absolute", inset: 0, zIndex: 2, mixBlendMode: "screen", pointerEvents: "none" }}
        />

        {/* Fog blobs */}
        <motion.div
          style={{ x: fogX, y: fogY, pointerEvents: "none", position: "absolute", left: -320, top: -320, zIndex: 3, height: 700, width: 700, borderRadius: "50%", background: "rgba(255,255,255,0.20)", filter: "blur(150px)" }}
          animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.18, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ pointerEvents: "none", position: "absolute", right: -288, top: -208, zIndex: 3, height: 620, width: 620, borderRadius: "50%", background: "rgba(255,255,255,0.15)", filter: "blur(130px)" }}
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.1, 0.95, 1.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ pointerEvents: "none", position: "absolute", bottom: -288, left: -160, zIndex: 3, height: 680, width: 900, borderRadius: "50%", background: "rgba(184,155,94,0.20)", filter: "blur(150px)" }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gold border frame */}
        <div style={{ pointerEvents: "none", position: "absolute", inset: 12, zIndex: 4, border: "1px solid rgba(184,155,94,0.40)" }} />

        {/* Hero text — pointer-events none so it never blocks clicks */}
        <motion.div
          style={{ x: textX, y: textY, pointerEvents: "none" }}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-5 text-center pt-24"
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#c9bda8] sm:mb-6 sm:text-xs sm:tracking-[0.45em]">
            Marketing Studio
          </p>
          <h1 className="text-[2.2rem] font-light uppercase tracking-[0.12em] text-[#d8c28a] sm:text-5xl sm:tracking-[0.16em] md:text-8xl lg:text-9xl">
            Lov Studio
          </h1>
          <p className="mt-6 max-w-[18rem] text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#d8d0c3] sm:mt-8 sm:max-w-xl sm:text-xs sm:leading-loose sm:tracking-[0.18em] md:text-base">
            Strategy, content, and digital presence for brands that need to be seen.
          </p>
        </motion.div>

        {/* SCROLL BUTTON — highest z, explicit pointer-events */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9000,
            pointerEvents: "auto",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
          onClick={() => {
            document.getElementById("section-two")?.scrollIntoView({ behavior: "smooth" });
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            document.getElementById("section-two")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.35em", color: "#d8c28a" }}>
            Scroll
          </span>
          <span style={{ fontSize: 40, lineHeight: 1, color: "#d8c28a" }}>⌄</span>
        </div>
      </section>

      <section
        id="section-two"
        style={{ display: "flex", minHeight: "100svh", alignItems: "center", justifyContent: "center", background: "#050505", padding: "0 20px" }}
      >
        <div style={{ maxWidth: 900, textAlign: "center" }}>
          <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-[#a89678] sm:mb-10 sm:text-xs sm:tracking-[0.45em]">
            Built for presence
          </p>
          <h2 className="text-2xl font-light leading-tight tracking-wide sm:text-3xl md:text-7xl">
            We create the kind of marketing that makes a brand impossible to ignore.
          </h2>
        </div>
      </section>
    </CinematicShell>
  );
}
