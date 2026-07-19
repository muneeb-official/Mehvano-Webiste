"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { stockImage } from "@/lib/constants";
import type { Sale } from "@/lib/portfolio";

type ProjectGalleryProps = {
  sales: Sale[];
  /** Where each project links. */
  href?: string;
};

/**
 * "Latest projects" gallery — large rounded photo cards in a 2-up grid, with a
 * circular "View" bubble that follows the cursor across the grid (desktop).
 */
export function ProjectGallery({ sales, href = "/contact" }: ProjectGalleryProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const bubble = bubbleRef.current;
    const area = areaRef.current;
    if (!bubble || !area) return;
    const rect = area.getBoundingClientRect();
    bubble.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px) translate(-50%, -50%)`;
  };

  return (
    <div ref={areaRef} className="relative" onMouseMove={onMove}>
      <div
        ref={bubbleRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-20 hidden h-20 w-20 place-items-center rounded-full bg-black text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white transition-opacity duration-200 lg:grid",
          active ? "opacity-100" : "opacity-0"
        )}
      >
        View
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {sales.map((sale, i) => (
          <Link
            key={`${sale.zip}-${i}`}
            href={href}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="group block lg:cursor-none"
          >
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <Image
                src={stockImage(i)}
                alt={`${sale.name} — ${sale.neighborhood}, MD ${sale.zip}`}
                width={760}
                height={560}
                sizes="(max-width: 640px) 90vw, 44vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur">
                {sale.status} · {sale.price}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-bold text-black">{sale.name}</p>
                <p className="text-sm text-neutral-500">
                  {sale.neighborhood}, MD · {sale.beds} bd / {sale.baths} ba
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                {sale.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
