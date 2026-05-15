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

type FormStatus = "idle" | "sending" | "sent" | "error";

// ── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  // ── Hero state ──
  const [videoReady, setVideoReady] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activePill, setActivePill] = useState(3);
  const [catName, setCatName]       = useState("Construction");
  const [catOpacity, setCatOpacity] = useState(1);
  const [cNum, setCNum]             = useState("01");
  const [litCells, setLitCells]     = useState<number[]>([]);

  // ── Contact form state ──
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  // ── DOM refs for word animation ──
  const w1Ref  = useRef<HTMLSpanElement>(null);
  const w2Ref  = useRef<HTMLSpanElement>(null);
  const w3Ref  = useRef<HTMLSpanElement>(null);
  const curRef = useRef(0);

  function randomCells(): number[] {
    return [...Array(6).keys()].sort(() => Math.random() - 0.5).slice(0, 2);
  }

  function animIn(s: (typeof slides)[number], idx: number) {
    [w1Ref, w2Ref, w3Ref].forEach(r => r.current?.classList.remove("out", "in"));
    if (w1Ref.current) w1Ref.current.textContent = s.w1;
    if (w2Ref.current) w2Ref.current.textContent = s.w2;
    if (w3Ref.current) w3Ref.current.textContent = s.w3;
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

  // ── Contact form submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="hero" id="hero">

        {/* VIDEO — replace /your-video.mp4 with your actual file */}
        <video
          className={`hero-video${videoReady ? " ready" : ""}`}
          src="/your-video.mp4"
          autoPlay muted loop playsInline preload="auto"
          onCanPlay={() => setVideoReady(true)}
        />
        <div className="hero-fallback" />

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

        {/* Nav */}
        <nav className="hero-nav">
          <Link className="nav-logo" href="/">Lov Studio</Link>
          <div className="nav-links">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/about">About</Link>
            <Link className="nav-link" href="/services">Services</Link>
            <Link className="nav-link" href="/selected-works">Selected works</Link>
          </div>
          <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile nav drawer */}
        <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>Close</button>
          {([
            ["Home",           "/"],
            ["About",          "/about"],
            ["Services",       "/services"],
            ["Selected works", "/selected-works"],
          ] as const).map(([label, href]) => (
            <Link key={href} className="mobile-nav-link" href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>

        {/* Main content */}
        <div className="content">
          <p className="sup-label">Marketing Studio</p>
          <div className="tagline-block">
            <span className="tl-row row-1"><span ref={w1Ref} className="tl-word" /></span>
            <span className="tl-row row-2"><span ref={w2Ref} className="tl-word" /></span>
            <span className="tl-row row-3"><span ref={w3Ref} className="tl-word" /></span>
          </div>
          <p className="sub-label">
            Strategy, content &amp; digital presence<br />
            for brands that need to be seen.
          </p>
          <div className="pills">
            {PILL_LABELS.map((label, i) => (
              <span key={i} className={`pill${activePill === i ? " glow" : ""}`}>{label}</span>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="counter">
          <span>{cNum}</span><span className="counter-faint"> / 04</span>
        </div>

        {/* Category label */}
        <div className="cat-label">
          <span className="cat-label-small">Currently</span>
          <span className="cat-label-big" style={{ transition: "opacity 0.5s ease", opacity: catOpacity }}>
            {catName}
          </span>
        </div>

        {/* Scroll button — FIX: now clickable, visible, scrolls to next section */}
        <button
          className="scroll-btn"
          onClick={() => document.getElementById("brand")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll down"
        >
          <span className="scroll-label">Scroll</span>
          <div className="scroll-chevron" />
        </button>

      </section>

      {/* ════════════════════════════════════════
          BRAND STATEMENT
      ════════════════════════════════════════ */}
      <section className="brand-section" id="brand">
        <p className="brand-eyebrow">Built for presence</p>
        <h2 className="brand-statement">
          We create the kind of marketing that makes a brand impossible to ignore.
        </h2>
        <div className="brand-divider" />
      </section>

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      <section className="contact-section" id="contact">
        <p className="contact-eyebrow">Get in touch</p>
        <h2 className="contact-heading">Let&apos;s build something</h2>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>

          <div className="contact-field">
            <label className="contact-label" htmlFor="cf-name">Name</label>
            <input
              id="cf-name"
              className="contact-input"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
            />
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="cf-email">Email</label>
            <input
              id="cf-email"
              className="contact-input"
              type="email"
              placeholder="you@yourbrand.com"
              required
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
            />
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              className="contact-textarea"
              placeholder="Tell us about your project..."
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="contact-btn"
            disabled={formStatus === "sending" || formStatus === "sent"}
          >
            {formStatus === "sending" ? "Sending..." : formStatus === "sent" ? "Sent ✓" : "Send message"}
          </button>

          {formStatus === "sent" && (
            <p className="contact-status success">
              Message received · We&apos;ll reply within two working days.
            </p>
          )}
          {formStatus === "error" && (
            <p className="contact-status error">
              Something went wrong · Please email us directly at marketing@lovstudio.ca
            </p>
          )}

        </form>

        <div className="contact-footer">
          <a className="contact-footer-email" href="mailto:marketing@lovstudio.ca">
            marketing@lovstudio.ca
          </a>
          <p className="contact-copyright">
            © {new Date().getFullYear()} Lov Studio · All rights reserved
          </p>
        </div>
      </section>
    </>
  );
}
