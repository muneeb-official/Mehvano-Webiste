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
    "Maryland real estate agent",
    "Severn MD homes for sale",
    "Pasadena MD realtor",
    "Ellicott City homes",
    "Anne Arundel County real estate",
    "Howard County realtor",
    "what's my home worth Maryland",
  ],
  authors: [{ name: "Mehvish Aslam" }],
  creator: "Mehvish Aslam",
  alternates: { canonical: "/" },
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
  themeColor: "#06323b",
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
