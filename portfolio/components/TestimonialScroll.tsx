"use client";

import { useRef } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "./Stars";
import type { PortfolioTestimonial } from "@/lib/portfolio";

/** Horizontal, snap-scrolling testimonial rail with prev/next controls. */
export function TestimonialScroll({ items }: { items: PortfolioTestimonial[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * (rail.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {items.map((t) => (
          <figure
            key={t.name}
            className="flex shrink-0 basis-[86%] snap-start flex-col rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-7 sm:basis-[440px]"
          >
            <Stars count={5} />
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-black">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-200 pt-5">
              <Avatar name={t.name} size={44} />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-black">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.detail}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous testimonials"
          className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 text-black transition-colors hover:bg-neutral-100"
        >
          <Icon name="arrow-left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next testimonials"
          className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 text-black transition-colors hover:bg-neutral-100"
        >
          <Icon name="arrow-right" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
