import { getDesign } from "@/lib/content";

const SERIF_MAP: Record<string, string> = {
  cormorant: "var(--font-serif)",
  playfair: "var(--font-playfair)",
  baskerville: "var(--font-baskerville)",
  lora: "var(--font-lora)",
};

const SANS_MAP: Record<string, string> = {
  raleway: "var(--font-sans)",
  montserrat: "var(--font-montserrat)",
  inter: "var(--font-inter)",
  jost: "var(--font-jost)",
  "dm-sans": "var(--font-dm-sans)",
};

export async function ThemeVars() {
  try {
    const design = await getDesign();
    if (!design) return null;

    const serifOverride = SERIF_MAP[design.serifFont];
    const sansOverride = SANS_MAP[design.sansFont];

    const lines: string[] = [
      `--background: ${design.colorBackground};`,
      `--foreground: ${design.colorLinen};`,
      `--gold: ${design.colorGold};`,
      `--gold-light: ${design.colorGoldLight};`,
      `--gold-soft: ${design.colorGoldSoft};`,
      `--gold-mist: ${design.colorGoldMist};`,
      `--linen: ${design.colorLinen};`,
    ];

    // Only override fonts if the user picked something other than the default
    if (serifOverride && design.serifFont !== "cormorant") {
      lines.push(`--font-serif: ${serifOverride}, Georgia, serif;`);
    }
    if (sansOverride && design.sansFont !== "raleway") {
      lines.push(`--font-sans: ${sansOverride}, sans-serif;`);
    }

    const css = `:root { ${lines.join(" ")} }`;
    return <style dangerouslySetInnerHTML={{ __html: css }} />;
  } catch {
    return null;
  }
}
