"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { WHY_CHOOSE } from "@/lib/constants";

type Item = { title: string; text: string };

type WhyChooseProps = {
  items?: readonly Item[];
};

/**
 * Light accordion (reference §"Built on Trust, Driven by Results"). First row
 * expanded by default; a chevron rotates open/closed and the body slides via
 * the grid-rows trick.
 */
export function WhyChoose({ items = WHY_CHOOSE }: WhyChooseProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.title}
            className={cn(
              "rounded-2xl border transition-colors",
              isOpen ? "border-line-strong bg-paper shadow-card" : "border-line bg-paper/60"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="font-display text-base font-semibold text-fg sm:text-lg">
                {item.title}
              </span>
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                  isOpen ? "bg-ink text-fg-inverse" : "bg-sand text-fg"
                )}
              >
                <Icon
                  name="chevron-down"
                  className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")}
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
                <p className="px-5 pb-5 pr-10 text-sm leading-relaxed text-fg-muted sm:px-6 sm:pb-6">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
