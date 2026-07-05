import { Container } from "@/components/ui/Container";
import { PARTNERS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

/** Compliance/trust strip (mirrors the reference partner bar). */
export function TrustBar() {
  return (
    <div className="border-y border-line bg-cream">
      <Container size="wide" className="py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Reveal variant="fade" className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-subtle">
            Licensed · Local · Accountable
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((p, i) => (
              <Reveal
                as="span"
                key={p}
                variant="up"
                delay={stagger(i, 70)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-fg-muted"
              >
                <Icon name="shield" className="h-4 w-4 text-gold-deep" />
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
