import type { Metadata } from "next";
import {
  Geist_Mono,
  Cormorant_Garamond,
  Raleway,
  Playfair_Display,
  Libre_Baskerville,
  Lora,
  Montserrat,
  Inter,
  Jost,
  DM_Sans,
} from "next/font/google";
import "./globals.css";
import { ThemeVars } from "./components/ThemeVars";

// Primary fonts — same variable names as original so all existing CSS still works
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});
const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Extra fonts loaded for the Design & Branding switcher in /keystatic
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lov Studio — Marketing Studio",
  description:
    "Strategy, content, and digital presence for brands that need to be seen.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    cormorant.variable,
    raleway.variable,
    geistMono.variable,
    playfair.variable,
    baskerville.variable,
    lora.variable,
    montserrat.variable,
    inter.variable,
    jost.variable,
    dmSans.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <head>
        <ThemeVars />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
