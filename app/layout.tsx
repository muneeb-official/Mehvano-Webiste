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
  // Adaptive favicon: black "M" on light tabs, white "M" on dark tabs.
  // /favicon.ico (black) also serves as the default for direct requests.
  icons: {
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon-dark.ico", media: "(prefers-color-scheme: dark)", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
    ],
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
