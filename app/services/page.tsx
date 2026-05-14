import CinematicShell from "../components/CinematicShell";
import StagePage from "../components/StagePage";

const SERVICES = [
  { num: "01", name: "Strategy",  blurb: "Positioning, narrative architecture, audience definition. The bones." },
  { num: "02", name: "Brand",     blurb: "Identity systems — wordmark, color, type, voice. Built to last a decade." },
  { num: "03", name: "Content",   blurb: "Editorial, film, photography, social. Made in-house, made on schedule." },
  { num: "04", name: "Digital",   blurb: "Sites, campaigns, launches. Performant, beautiful, owned." },
  { num: "05", name: "Advisory",  blurb: "Quarterly retainer for founders and CMOs. Quiet counsel, sharp work." },
];

export default function ServicesPage() {
  return (
    <CinematicShell>
      <StagePage>
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[#c9bda8]">
          What we do · 03
        </p>
        <h1 className="mt-5 text-5xl font-light uppercase tracking-[0.16em] text-[#d8c28a] sm:text-7xl md:text-8xl">
          Services
        </h1>
        <p className="mt-9 max-w-[38rem] font-serif text-lg font-light leading-snug text-[#f4f1eb] sm:text-xl md:text-2xl">
          Five disciplines. One studio. We engage end-to-end or for a single deliverable — never half-measure.
        </p>

        <div className="mt-16 mb-6 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#a89678]">
          <span>Disciplines</span>
          <span className="h-px flex-1 bg-[#b89b5e]/40" />
        </div>

        <div className="border-t border-[#b89b5e]/25">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="group grid grid-cols-[60px_1fr] items-baseline gap-7 border-b border-[#b89b5e]/25 py-8 transition-colors hover:bg-gradient-to-r hover:from-[#b89b5e]/8 hover:to-transparent sm:grid-cols-[80px_1fr_1fr]"
            >
              <span className="font-serif text-2xl font-light text-[#d8c28a] sm:text-3xl">
                {s.num}
              </span>
              <h3 className="font-serif text-3xl font-light uppercase tracking-[0.08em] text-[#d8c28a] sm:text-4xl md:text-5xl">
                {s.name}
              </h3>
              <p className="mt-3 max-w-[28rem] font-serif text-[12px] font-light uppercase leading-loose tracking-[0.18em] text-[#d8d0c3] sm:mt-0 sm:col-start-3">
                {s.blurb}
              </p>
            </div>
          ))}
        </div>
      </StagePage>
    </CinematicShell>
  );
}
