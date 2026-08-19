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
import { Archivo, Inter } from "next/font/google";

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
 * NOTE: the Playfair Display serif that used to live here was portfolio-only
 * (the `.pf-serif` utility). It moved out with the rest of the portfolio, so
 * the live site no longer pays for that font request — see portfolio/README.md
 * to restore it alongside portfolio/portfolio.css.
 */

/** Convenience: apply all font variables to <html>. */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
