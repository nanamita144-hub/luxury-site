// ─────────────────────────────────────────────
//  SITE CONTENT — edit this file to update text,
//  images, and videos across every page.
//  Images go in /public/works/ or /public/team/
//  Videos go in /public/  (e.g. /showreel.mp4)
// ─────────────────────────────────────────────

export const site = {
  name: "Lov Studio",
  tagline: "Marketing Studio",
  description: "Strategy, content, and digital presence for brands that need to be seen.",
};

// ── HERO (app/page.tsx) ──────────────────────
export const hero = {
  label: "Marketing Studio · 01",
  heading: ["Lov", "Studio"],
  subheading: "Strategy, content, and digital presence for brands that need to be seen.",
  // Video file placed in /public/ — set to "" to hide
  video: "/Instalation.mov",
};

// ── ABOUT (app/about/page.tsx) ───────────────
export const about = {
  label: "Who we are · 02",
  heading: "About",
  intro: "Lov Studio is a small marketing studio. We don't ask for attention. We build the conditions for it.",
  // Optional portrait/team image placed in /public/team/
  // Set to "" to hide the image
  image: "",
  imageAlt: "Lov Studio team",
  manifesto: [
    {
      num: "01",
      title: "Presence over polish",
      body: "A brand that's loud is not a brand that's seen. We make work that lingers — work that earns the second look without asking for the first.",
    },
    {
      num: "02",
      title: "Few clients, real care",
      body: "We take on a small slate every year. We work in the open with founders and brand teams who treat marketing as a craft, not a campaign.",
    },
    {
      num: "03",
      title: "Strategy is the deliverable",
      body: "The film, the page, the post — that's the visible part. The work is the position underneath it. We start there and let the artifact follow.",
    },
    {
      num: "04",
      title: "No templates",
      body: "Nothing here is reused. Every brand we work with gets its own grammar, its own pace, its own silence.",
    },
  ],
};

// ── SERVICES (app/services/page.tsx) ─────────
export const services = {
  label: "What we do · 03",
  heading: "Services",
  intro: "Five disciplines. One studio. We engage end-to-end or for a single deliverable — never half-measure.",
  list: [
    { num: "01", name: "Strategy",  blurb: "Positioning, narrative architecture, audience definition. The bones." },
    { num: "02", name: "Brand",     blurb: "Identity systems — wordmark, color, type, voice. Built to last a decade." },
    { num: "03", name: "Content",   blurb: "Editorial, film, photography, social. Made in-house, made on schedule." },
    { num: "04", name: "Digital",   blurb: "Sites, campaigns, launches. Performant, beautiful, owned." },
    { num: "05", name: "Advisory",  blurb: "Quarterly retainer for founders and CMOs. Quiet counsel, sharp work." },
  ],
};

// ── SELECTED WORKS (app/selected-works/page.tsx)
// image: path to file in /public/works/ — e.g. "/works/maison-eleve.jpg"
// video: path to file in /public/works/ — e.g. "/works/cote-dor.mp4"
// Leave image/video as "" to use the dark gradient fallback
export const works = {
  label: "Recent · 04",
  heading: "Selected Works",
  intro: "A sample of work shipped between 2024 and 2026. Full case studies on request.",
  items: [
    { num: "01", cat: "Identity",  name: "Maison Élève",   year: "2026", image: "", video: "", gradient: "from-[#2a2218] via-[#1a1410] to-[#050505]" },
    { num: "02", cat: "Campaign",  name: "Atelier Sereno", year: "2025", image: "", video: "", gradient: "from-[#14181d] via-[#0a0d12] to-[#050505]" },
    { num: "03", cat: "Film",      name: "Côte d'Or",      year: "2025", image: "", video: "", gradient: "from-[#1f1611] via-[#2a1d12] to-[#0a0805]" },
    { num: "04", cat: "Digital",   name: "House of Lume",  year: "2025", image: "", video: "", gradient: "from-[#1e1a20] via-[#0e0c12] to-[#050505]" },
    { num: "05", cat: "Editorial", name: "Nordic Cellars", year: "2024", image: "", video: "", gradient: "from-[#2a2519] via-[#1c1810] to-[#060503]" },
    { num: "06", cat: "Strategy",  name: "Verre & Verre",  year: "2024", image: "", video: "", gradient: "from-[#181a1c] via-[#0c0e10] to-[#050505]" },
  ],
};

// ── CONTACT (app/contact/page.tsx) ───────────
export const contact = {
  label: "Speak with us · 05",
  heading: "Contact",
  intro: "Tell us about your brand. We respond to every note within two working days.",
  details: [
    { k: "Email",   v: "studio@lov.studio" },
    { k: "Press",   v: "press@lov.studio" },
    { k: "Address", v: "12 Rue de la Paix\n75002 Paris, France" },
    { k: "Hours",   v: "Mon — Fri · 10:00 — 18:00 CET" },
  ],
};
