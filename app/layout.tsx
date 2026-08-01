import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, realEstateAgentSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brand} — ${SITE.tagline}`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.description,
  applicationName: SITE.brand,
  keywords: [
    "Maryland services company",
    "medical and nursing staffing Maryland",
    "home health care Maryland",
    "AI services Maryland",
    "AI automation for small business",
    "Maryland real estate agent",
    "IT and software development Maryland",
    "business consulting LLC formation Maryland",
    "digital marketing agency Maryland",
  ],
  authors: [{ name: SITE.brand }],
  creator: SITE.brand,
  alternates: { canonical: "/" },
  // Adaptive favicon: the Mehvano "wing" mark — navy on light tabs, white on
  // dark tabs. /favicon.ico stays as the default for legacy direct requests.
  icons: {
    icon: [
      { url: "/icon.png", media: "(prefers-color-scheme: light)", sizes: "32x32", type: "image/png" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#131720",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        {/* Marks JS as available so the homepage panel-deck slideshow engages
            (see globals.css). Without it, panels fall back to a normal stack. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-fg-inverse"
        >
          Skip to content
        </a>
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema(), realEstateAgentSchema()]} />
      </body>
    </html>
  );
}
