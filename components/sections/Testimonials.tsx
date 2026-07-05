import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

type TestimonialsProps = {
  items: Testimonial[];
};

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((t, idx) => (
        <Reveal key={t.name} variant="up" delay={stagger(idx)} className="h-full">
          <Card tone="paper" className="flex h-full flex-col gap-4">
            <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <p className="flex-1 text-[0.95rem] leading-relaxed text-fg">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3 border-t border-line pt-4">
              <Avatar name={t.name} size={40} />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-fg">{t.name}</p>
                <p className="text-xs text-fg-subtle">{t.detail}</p>
              </div>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
