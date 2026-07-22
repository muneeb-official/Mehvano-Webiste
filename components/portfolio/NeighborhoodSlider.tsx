"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { stockImage } from "@/lib/constants";
import type { Sale } from "@/lib/portfolio";

/**
 * Neighborhoods listing slider (reference layout): text-left / image-right cards
 * with a D-shaped image edge, gold price pill, and round prev/next controls.
 * A horizontal snap-rail keeps it fully usable with JS off (just scrolls).
 */
export function NeighborhoodSlider({ sales }: { sales: Sale[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {sales.map((s, i) => (
          <div
            key={s.name}
            className="flex shrink-0 basis-full snap-start overflow-hidden rounded-[1.5rem] bg-white text-black md:basis-[calc(50%-0.75rem)]"
          >
            <div className="flex min-w-0 flex-1 flex-col justify-between p-6">
              <div>
                <span className="mb-3 inline-block rounded-lg bg-[#e9c67a] px-3 py-1 text-sm font-bold text-black">
                  {s.price}
                </span>
                <h3 className="font-display text-xl font-bold leading-snug">{s.name}</h3>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <Icon name="map-pin" className="h-4 w-4 text-[#c07f16]" />
                    {s.neighborhood}, MD {s.zip}
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="home" className="h-4 w-4 text-[#c07f16]" />
                    {s.beds} Bedroom
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="h-4 w-4 text-[#c07f16]" />
                    {s.baths} Bath
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="layers" className="h-4 w-4 text-[#c07f16]" />
                    {s.sqft} sqft
                  </li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-50"
              >
                View Listing
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e9c67a] text-black transition-transform group-hover:rotate-45">
                  <Icon name="arrow-up-right" className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="relative w-2/5 shrink-0 overflow-hidden rounded-l-[3rem]">
              <Image src={stockImage(i)} alt={s.name} fill sizes="240px" className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous properties"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
        >
          <Icon name="arrow-left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next properties"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
        >
          <Icon name="arrow-right" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
