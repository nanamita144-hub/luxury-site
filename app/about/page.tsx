import Image from "next/image";
import CinematicShell from "../components/CinematicShell";
import StagePage from "../components/StagePage";
import { getAbout } from "@/lib/content";

export default async function AboutPage() {
  const about = await getAbout();
  if (!about) return null;

  return (
    <CinematicShell>
      <StagePage>
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[#c9bda8]">
          Who we are · 02
        </p>
        <h1 className="mt-5 text-5xl font-light uppercase tracking-[0.16em] text-[#d8c28a] sm:text-7xl md:text-8xl">
          {about.heading}
        </h1>
        <p className="mt-9 max-w-[38rem] font-serif text-lg font-light leading-snug text-[#f4f1eb] sm:text-xl md:text-2xl">
          {about.intro}
        </p>

        {about.image && (
          <div className="mt-12 w-full max-w-2xl overflow-hidden border border-[#b89b5e]/20">
            <Image
              src={about.image}
              alt="Studio"
              width={900}
              height={600}
              className="w-full object-cover brightness-75"
            />
          </div>
        )}

        <div className="mt-16 mb-6 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#a89678]">
          <span>Manifesto</span>
          <span className="h-px flex-1 bg-[#b89b5e]/40" />
        </div>

        <div className="border-t border-[#b89b5e]/25">
          {about.manifesto.map((m) => (
            <div
              key={m.num}
              className="grid grid-cols-[60px_1fr] gap-7 border-b border-[#b89b5e]/25 py-7 sm:grid-cols-[80px_1fr]"
            >
              <span className="font-serif text-2xl font-light text-[#d8c28a] sm:text-3xl">{m.num}</span>
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
