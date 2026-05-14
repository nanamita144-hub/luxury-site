"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

export default function StagePage({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const innerX = useTransform(mouseX, [-700, 700], [-14, 14]);
  const innerY = useTransform(mouseY, [-700, 700], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505]"
    >
      <div className="pointer-events-none absolute inset-3 z-10 border border-[#b89b5e]/40 sm:inset-4 md:inset-8" />
      <motion.div
        style={{ x: innerX, y: innerY }}
        className="relative z-20 mx-auto max-w-[1100px] px-7 pt-32 pb-24 sm:px-12 sm:pt-36 sm:pb-28"
      >
        {children}
      </motion.div>
    </section>
  );
}
