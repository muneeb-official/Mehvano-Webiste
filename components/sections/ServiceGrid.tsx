import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { SERVICES, serviceHref, type Service } from "@/lib/services";

type ServiceGridProps = {
  /** Which services to show; defaults to all. */
  items?: Service[];
  columns?: 2 | 3;
  /** Show the offering bullets under each card (detail-rich). */
  showBullets?: boolean;
};

const cols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * The core services grid — clickable cards, each linking to its detail page
 * (or the real-estate funnel via `externalHref`). Shared by the home page and
 * the /services overview.
 */
export function ServiceGrid({ items = SERVICES, columns = 3, showBullets = true }: ServiceGridProps) {
  return (
    <div className={`grid gap-5 ${cols[columns]}`}>
      {items.map((s, i) => (
        <Reveal key={s.slug} variant="up" delay={stagger(i)} className="h-full">
          <Card href={serviceHref(s)} tone="gradient" className="group tilt-card flex h-full flex-col gap-4" data-cursor="view">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/70 text-gold-deep shadow-sm transition-colors group-hover:bg-ink group-hover:text-fg-inverse">
              <Icon name={s.icon} className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-fg">{s.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.tagline}</p>
            </div>

            {showBullets ? (
              <ul className="flex flex-col gap-2 text-sm text-fg-muted">
                {s.offerings.slice(0, 3).map((o) => (
                  <li key={o.title} className="flex gap-2.5">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                    {o.title}
                  </li>
                ))}
              </ul>
            ) : null}

            <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-fg transition-colors group-hover:text-gold-deep">
              {s.ctaLabel ?? "Learn more"}
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
