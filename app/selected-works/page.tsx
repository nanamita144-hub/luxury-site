import Image from "next/image";
import CinematicShell from "../components/CinematicShell";
import StagePage from "../components/StagePage";
import { getWorks } from "@/lib/content";

const GRADIENTS: Record<string, string> = {
  "01": "from-[#2a2218] via-[#1a1410] to-[#050505]",
  "02": "from-[#14181d] via-[#0a0d12] to-[#050505]",
  "03": "from-[#1f1611] via-[#2a1d12] to-[#0a0805]",
  "04": "from-[#1e1a20] via-[#0e0c12] to-[#050505]",
  "05": "from-[#2a2519] via-[#1c1810] to-[#060503]",
  "06": "from-[#181a1c] via-[#0c0e10] to-[#050505]",
};

export default async function SelectedWorksPage() {
  const works = await getWorks();

  return (
    <CinematicShell>
      <StagePage>
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[#c9bda8]">
          Recent · 04
        </p>
        <h1 className="mt-5 text-4xl font-light uppercase tracking-[0.12em] text-[#d8c28a] sm:text-6xl md:text-8xl">
          Selected Works
        </h1>
        <p className="mt-9 max-w-[38rem] font-serif text-lg font-light leading-snug text-[#f4f1eb] sm:text-xl md:text-2xl">
          A sample of work shipped between 2024 and 2026. Full case studies on request.
        </p>

        <div className="mt-16 mb-9 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#a89678]">
          <span>Six of many</span>
          <span className="h-px flex-1 bg-[#b89b5e]/40" />
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <article
              key={w!.num}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-[#b89b5e]/20 bg-[#0a0a0a] transition-colors hover:border-[#b89b5e]/55"
            >
              {w!.video ? (
                <video
                  src={`/works/${w!.video}`}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.55] transition-all duration-700 group-hover:brightness-[0.78] group-hover:scale-105"
                />
              ) : w!.image ? (
                <Image
                  src={w!.image}
                  alt={w!.name}
                  fill
                  className="object-cover brightness-[0.55] transition-all duration-700 group-hover:brightness-[0.78] group-hover:scale-105"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[w!.num] ?? GRADIENTS["01"]} brightness-[0.55] saturate-75 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.78]`} />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <span className="absolute left-4 top-3.5 font-serif text-xs uppercase tracking-[0.2em] text-[#d8c28a]">/{w!.num}</span>
              <span className="absolute right-4 top-3.5 font-sans text-[10px] uppercase tracking-[0.35em] text-[#c9bda8]">{w!.year}</span>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#c9bda8]">{w!.cat}</p>
                <p className="mt-2 font-serif text-xl font-light uppercase tracking-[0.1em] text-[#d8c28a] sm:text-2xl">{w!.name}</p>
              </div>
            </article>
          ))}
        </div>
      </StagePage>
    </CinematicShell>
  );
}
