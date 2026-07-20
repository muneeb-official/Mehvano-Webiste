import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { IMPACT_STATS } from "@/lib/constants";

type Stat = { value: string; label: string };

type StatTrioProps = {
  items?: readonly Stat[];
};

/**
 * Big impact-number band (reference §"90% / 180+ / 10K+"). Oversized display
 * figures with a quiet label, divided by vertical rules on desktop.
 */
export function StatTrio({ items = IMPACT_STATS }: StatTrioProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
      {items.map((s, i) => (
        <Reveal
          key={s.label}
          variant="up"
          delay={stagger(i)}
          className="flex flex-col gap-1 sm:px-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-line"
        >
          <span className="font-display text-5xl font-bold tracking-tight text-fg sm:text-6xl">
            {s.value}
          </span>
          <span className="text-sm text-fg-muted sm:text-base">{s.label}</span>
        </Reveal>
      ))}
    </div>
  );
}
