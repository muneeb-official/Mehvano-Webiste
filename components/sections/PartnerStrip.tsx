import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { PARTNER_LOGOS } from "@/lib/constants";

/**
 * Partner / client logo strip beneath the hero (reference layout). Renders the
 * partner names as clean text wordmarks on a white band. Swap these for real
 * licensed client logos (as <Image>) before launch — see PARTNER_LOGOS.
 */
export function PartnerStrip() {
  return (
    <div className="border-y border-line bg-paper">
      <Container size="wide" className="py-7">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:justify-between sm:gap-x-6">
          {PARTNER_LOGOS.map((name, i) => (
            <Reveal
              as="span"
              key={name}
              variant="up"
              delay={stagger(i, 70)}
              className="font-display text-xl font-bold tracking-tight text-fg-subtle/70 transition-colors hover:text-fg sm:text-2xl"
            >
              {name}
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
