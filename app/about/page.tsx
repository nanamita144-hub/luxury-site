import CinematicShell from "../components/CinematicShell";
import StagePage from "../components/StagePage";

const MANIFESTO = [
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
];

export default function AboutPage() {
  return (
    <CinematicShell>
      <StagePage>
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[#c9bda8]">
          Who we are · 02
        </p>
        <h1 className="mt-5 text-5xl font-light uppercase tracking-[0.16em] text-[#d8c28a] sm:text-7xl md:text-8xl">
          About
        </h1>
        <p className="mt-9 max-w-[38rem] font-serif text-lg font-light leading-snug text-[#f4f1eb] sm:text-xl md:text-2xl">
          Lov Studio is a small marketing studio. We don&rsquo;t ask for attention. We build the conditions for it.
        </p>

        <div className="mt-16 mb-6 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#a89678]">
          <span>Manifesto</span>
          <span className="h-px flex-1 bg-[#b89b5e]/40" />
        </div>

        <div className="border-t border-[#b89b5e]/25">
          {MANIFESTO.map((m) => (
            <div
              key={m.num}
              className="grid grid-cols-[60px_1fr] gap-7 border-b border-[#b89b5e]/25 py-7 sm:grid-cols-[80px_1fr]"
            >
              <span className="font-serif text-2xl font-light text-[#d8c28a] sm:text-3xl">
                {m.num}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-light uppercase tracking-[0.06em] text-[#d8c28a] sm:text-3xl md:text-4xl">
                  {m.title}
                </h3>
                <p className="mt-4 max-w-[36rem] font-serif text-[13px] font-light uppercase leading-loose tracking-[0.18em] text-[#d8d0c3]">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </StagePage>
    </CinematicShell>
  );
}
