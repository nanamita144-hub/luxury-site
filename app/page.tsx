"use client";

import "./hero.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Slide data ──────────────────────────────────────────────────────────────
const slides = [
  { w1: "Every",   w2: "frame",   w3: "tells a story.",  cat: "Construction", pill: 3 },
  { w1: "Real",    w2: "spaces.", w3: "Real moments.",   cat: "Real estate",  pill: 1 },
  { w1: "We make", w2: "people",  w3: "stop scrolling.", cat: "Events",       pill: 0 },
  { w1: "Every",   w2: "product", w3: "needs a voice.",  cat: "Products",     pill: 2 },
] as const;

const PILL_LABELS = ["Events", "Real estate", "Products", "Construction"];

// ── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  const [videoReady, setVideoReady] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activePill, setActivePill] = useState(3); // Construction = slide 0
  const [catName, setCatName]       = useState("Construction");
  const [catOpacity, setCatOpacity] = useState(1);
  const [cNum, setCNum]             = useState("01");
  const [litCells, setLitCells]     = useState<number[]>([]);

  // Direct DOM refs for word animation (avoids React batching on rapid state changes)
  const w1Ref  = useRef<HTMLSpanElement>(null);
  const w2Ref  = useRef<HTMLSpanElement>(null);
  const w3Ref  = useRef<HTMLSpanElement>(null);
  const curRef = useRef(0);

  function randomCells(): number[] {
    return [...Array(6).keys()].sort(() => Math.random() - 0.5).slice(0, 2);
  }

  function animIn(s: (typeof slides)[number], idx: number) {
    // Reset classes + update text
    [w1Ref, w2Ref, w3Ref].forEach(r => r.current?.classList.remove("out", "in"));
    if (w1Ref.current) w1Ref.current.textContent = s.w1;
    if (w2Ref.current) w2Ref.current.textContent = s.w2;
    if (w3Ref.current) w3Ref.current.textContent = s.w3;

    // Trigger "in" on next paint so CSS transition fires
    requestAnimationFrame(() => {
      w1Ref.current?.classList.add("in");
      setTimeout(() => w2Ref.current?.classList.add("in"), 115);
      setTimeout(() => w3Ref.current?.classList.add("in"), 215);
    });

    setActivePill(s.pill);
    setCNum(String(idx + 1).padStart(2, "0"));
    setCatOpacity(0);
    setTimeout(() => { setCatName(s.cat); setCatOpacity(1); }, 420);
    setLitCells(randomCells());
  }

  // Initial animate-in
  useEffect(() => {
    const t = setTimeout(() => animIn(slides[0], 0), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Slide rotation — every 4.2 s
  useEffect(() => {
    const interval = setInterval(() => {
      w1Ref.current?.classList.add("out");
      setTimeout(() => w2Ref.current?.classList.add("out"), 55);
      setTimeout(() => w3Ref.current?.classList.add("out"), 110);

      setTimeout(() => {
        const next = (curRef.current + 1) % slides.length;
        curRef.current = next;
        animIn(slides[next], next);
      }, 500);
    }, 4200);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock scroll while hero is mounted
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="hero">

      {/* ── VIDEO — replace /your-video.mp4 with your actual file ─────────── */}
      <video
        className={`hero-video${videoReady ? " ready" : ""}`}
        src="/your-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
      />

      <div className="hero-fallback" />

      {/* ── Grid overlay ──────────────────────────────────────────────────── */}
      <div className="grid-overlay">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`gc${litCells.includes(i) ? " lit" : ""}`} />
        ))}
      </div>

      <div className="overlay" />
      <div className="vignette" />
      <div className="grain" />
      <div className="frame-l" />
      <div className="frame-r" />

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className="hero-nav">
        <Link className="nav-logo" href="/">Lov Studio</Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/services">Services</Link>
          <Link className="nav-link" href="/selected-works">Selected works</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile nav drawer ─────────────────────────────────────────────── */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          Close
        </button>
        {(
          [
            ["Home",           "/"],
            ["About",          "/about"],
            ["Services",       "/services"],
            ["Selected works", "/selected-works"],
          ] as const
        ).map(([label, href]) => (
          <Link
            key={href}
            className="mobile-nav-link"
            href={href}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="content">
        <p className="sup-label">Marketing Studio</p>

        {/* 3-line rotating tagline */}
        <div className="tagline-block">
          <span className="tl-row row-1"><span ref={w1Ref} className="tl-word" /></span>
          <span className="tl-row row-2"><span ref={w2Ref} className="tl-word" /></span>
          <span className="tl-row row-3"><span ref={w3Ref} className="tl-word" /></span>
        </div>

        <p className="sub-label">
          Strategy, content &amp; digital presence<br />
          for brands that need to be seen.
        </p>

        {/* Category pills */}
        <div className="pills">
          {PILL_LABELS.map((label, i) => (
            <span key={i} className={`pill${activePill === i ? " glow" : ""}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom-left counter ───────────────────────────────────────────── */}
      <div className="counter">
        <span>{cNum}</span>
        <span className="counter-faint"> / 04</span>
      </div>

      {/* ── Bottom-right category label ───────────────────────────────────── */}
      <div className="cat-label">
        <span className="cat-label-small">Currently</span>
        <span
          className="cat-label-big"
          style={{ transition: "opacity 0.5s ease", opacity: catOpacity }}
        >
          {catName}
        </span>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div className="scroll-btn">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-chevron" />
      </div>

    </section>
  );
}
