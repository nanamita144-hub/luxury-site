import { getDesign } from "@/lib/content";

const SERIF_MAP: Record<string, string> = {
  cormorant: "var(--font-cormorant)",
  playfair: "var(--font-playfair)",
  "dm-serif": "var(--font-cormorant)",
  baskerville: "var(--font-baskerville)",
  lora: "var(--font-lora)",
};

const SANS_MAP: Record<string, string> = {
  raleway: "var(--font-raleway)",
  montserrat: "var(--font-montserrat)",
  inter: "var(--font-inter)",
  jost: "var(--font-jost)",
  "dm-sans": "var(--font-dm-sans)",
};

export async function ThemeVars() {
  try {
    const design = await getDesign();
    if (!design) return null;

    const serif = SERIF_MAP[design.serifFont] ?? "var(--font-cormorant)";
    const sans = SANS_MAP[design.sansFont] ?? "var(--font-raleway)";

    const css = `
:root {
  --background: ${design.colorBackground};
  --foreground: ${design.colorLinen};
  --gold: ${design.colorGold};
  --gold-deep: color-mix(in srgb, ${design.colorGold} 70%, black);
  --gold-light: ${design.colorGoldLight};
  --gold-soft: ${design.colorGoldSoft};
  --gold-mist: ${design.colorGoldMist};
  --linen: ${design.colorLinen};
  --font-serif: ${serif}, Georgia, serif;
  --font-sans: ${sans}, sans-serif;
}
`.trim();

    return <style dangerouslySetInnerHTML={{ __html: css }} />;
  } catch {
    return null;
  }
}
