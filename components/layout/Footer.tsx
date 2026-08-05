import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { COMPANY, FOOTER_NAV, LEGAL, SITE, SOCIALS } from "@/lib/constants";

const socialIcon: Record<string, IconName> = {
  Instagram: "instagram",
  Facebook: "facebook",
  LinkedIn: "linkedin",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-fg-inverse">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + contact */}
          <div className="flex flex-col gap-6">
            <Logo tone="inverse" />
            <p className="max-w-sm text-sm leading-relaxed text-fg-inverse-muted">
              {SITE.description}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2.5 text-fg-inverse-muted transition-colors hover:text-fg-inverse">
                <Icon name="phone" className="h-4 w-4 text-gold-bright" />
                {COMPANY.phone}
              </a>
              <a href={COMPANY.emailHref} className="inline-flex items-center gap-2.5 text-fg-inverse-muted transition-colors hover:text-fg-inverse">
                <Icon name="mail" className="h-4 w-4 text-gold-bright" />
                {COMPANY.email}
              </a>
              <span className="inline-flex items-center gap-2.5 text-fg-inverse-muted">
                <Icon name="map-pin" className="h-4 w-4 text-gold-bright" />
                {COMPANY.addressLocality}, {COMPANY.addressRegion} · Serving all of Maryland
              </span>
            </div>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-fg-inverse-muted transition-colors hover:border-gold-bright hover:text-gold-bright"
                >
                  <Icon name={socialIcon[s.label] ?? "arrow-up-right"} className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-fg-inverse-muted/70">
              © {year} {COMPANY.legalName}. All rights reserved.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_NAV.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-inverse-muted">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-fg-inverse-muted transition-colors hover:text-fg-inverse"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal / compliance */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-xs leading-relaxed text-fg-inverse-muted/80">
            <p>
              {LEGAL.companyLine} WhatsApp Business ID: {COMPANY.whatsappBusinessId}.
            </p>
            {/* Real-estate compliance lines hidden while that division is offline. */}
            <p>{LEGAL.disclaimer}</p>
            <div className="flex flex-col justify-between gap-2 pt-2 sm:flex-row">
              <span>
                © {year} {SITE.brand}. All rights reserved.
              </span>
              <span className="flex gap-4">
                <Link href="/contact" className="hover:text-fg-inverse">
                  Contact
                </Link>
                <Link href="/about" className="hover:text-fg-inverse">
                  About
                </Link>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
