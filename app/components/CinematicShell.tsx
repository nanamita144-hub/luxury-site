"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/services", label: "Services", index: "03" },
  { href: "/selected-works", label: "Selected Works", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

export default function CinematicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentIndex = MENU_ITEMS.find((item) => item.href === pathname)?.index ?? "01";

  return (
    <main className="relative bg-[#050505] text-[#f4f1eb] font-serif overflow-x-hidden">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[999] bg-[#b89b5e]/90 text-white"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-8 text-xs uppercase tracking-[0.4em] md:right-10"
            >
              Close
            </button>

            <nav className="flex h-full flex-col justify-center gap-4 px-8 text-right text-2xl font-bold uppercase leading-tight md:px-24 md:text-6xl">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block transition-all duration-300 hover:translate-x-[-8px] hover:text-black/85"
                >
                  {item.label} <span className="text-white/40">/{item.index}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="pointer-events-none absolute left-0 top-0 z-[120] flex w-full items-center justify-center px-8 py-8 text-[#d8c28a]">
        <p className="text-4xl font-light tracking-widest md:text-5xl">LS</p>
      </header>

      <aside className="fixed right-0 top-0 z-[130] flex h-full w-16 flex-col items-center justify-center border-l border-[#b89b5e]/25 bg-black/15 text-[#d8c28a] backdrop-blur-[2px] md:w-20">
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute top-16 rotate-90 px-2 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity hover:opacity-70 md:top-20 md:text-xs"
        >
          Menu
        </button>

        <div className="flex flex-col items-center gap-7 md:gap-8">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`h-2 w-2 rounded-full border transition-all duration-300 hover:scale-125 hover:bg-[#d8c28a] ${
                pathname === item.href ? "border-[#d8c28a] bg-[#d8c28a]" : "border-[#d8c28a]/70"
              }`}
              aria-label={item.label}
            />
          ))}
        </div>

        <p className="absolute bottom-14 text-xl md:bottom-20 md:text-2xl">{currentIndex}</p>
      </aside>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pr-16 md:pr-20"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
