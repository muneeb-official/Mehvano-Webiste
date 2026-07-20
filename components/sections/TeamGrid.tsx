import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";
import { TEAM, type TeamMember } from "@/lib/constants";

type TeamGridProps = {
  items?: TeamMember[];
};

const SOCIALS: IconName[] = ["linkedin", "instagram", "facebook", "mail"];

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]?.toUpperCase()).join("");

/**
 * "Meet the People" grid (reference §"Meet the People Behind the Innovation").
 * A tinted portrait tile with a social overlay on hover, then name + role.
 */
export function TeamGrid({ items = TEAM }: TeamGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m, i) => (
        <Reveal key={`${m.name}-${i}`} variant="up" delay={stagger(i)}>
          <div className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-sand to-sand-deep">
              {/* Portrait or initials fallback */}
              <span className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-gold-deep/60">
                {initials(m.name)}
              </span>
              {/* Social overlay slides up on hover */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-ink/85 py-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                {SOCIALS.map((s) => (
                  <span
                    key={s}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/80"
                    aria-hidden
                  >
                    <Icon name={s} className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 font-display text-lg font-semibold text-fg">{m.name}</p>
            <p className="text-sm text-fg-subtle">{m.role}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
