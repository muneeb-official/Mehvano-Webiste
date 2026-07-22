/**
 * TYPOGRAPHY — single source of truth for the site's fonts.
 *
 * To change a typeface everywhere, swap the next/font import + config here.
 * These expose CSS variables that globals.css maps to --font-display /
 * --font-body, which every component consumes via `font-display` / `font-body`.
 *
 *   Display (headings): Archivo  -> --font-archivo
 *   Body (UI / copy):   Inter    -> --font-inter
 */
import { Archivo, Inter, Playfair_Display } from "next/font/google";

export const fontDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Elegant high-contrast serif — used ONLY on the /portfolio page hero + section
 * titles (via the `.pf-serif` utility in globals.css), matching the reference
 * design. Does not affect the rest of the site's Archivo display type.
 */
export const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

/** Convenience: apply all font variables to <html>. */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontSerif.variable}`;
