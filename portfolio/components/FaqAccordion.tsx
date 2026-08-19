"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PortfolioFaq } from "@/lib/portfolio";

type FaqAccordionProps = {
  items: PortfolioFaq[];
  categories: readonly string[];
};

/** Black FAQ block — category filter pills + a plus/minus accordion. */
export function FaqAccordion({ items, categories }: FaqAccordionProps) {
  const [category, setCategory] = useState<string>(categories[0]);
  const [open, setOpen] = useState<number | null>(0);

  const filtered = items.filter((i) => i.category === category);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setOpen(0);
            }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
              c === category
                ? "bg-white text-black"
                : "border border-white/20 text-white/70 hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/12">
        {filtered.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-base font-semibold text-white sm:text-lg">
                  {item.question}
                </span>
                <span className="relative h-4 w-4 shrink-0" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full bg-white" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded-full bg-white transition-all duration-300",
                      isOpen && "rotate-90 opacity-0"
                    )}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 pr-8 leading-relaxed text-white/60">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
