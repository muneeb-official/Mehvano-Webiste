import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type LogoProps = {
  tone?: "default" | "inverse";
  className?: string;
  href?: string;
};

/**
 * Mehvano brand mark — the full logo (wing + "mehvano" wordmark). Cross-fades
 * two artworks by `tone`:
 *   - default  → navy wing + navy wordmark (for LIGHT backgrounds, e.g. navbar)
 *   - inverse  → bright wing + white wordmark (for the DARK footer)
 */
export function Logo({ tone = "default", className, href = "/" }: LogoProps) {
  const inverse = tone === "inverse";
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center", className)}
      aria-label={`${SITE.brand} — home`}
    >
      <span className="relative block h-12 w-[7.3rem] shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-[8.6rem]">
        {/* Light-background logo (navy wing + navy wordmark) */}
        <Image
          src="/mehvano-flat1.png"
          alt="Mehvano"
          width={775}
          height={508}
          priority
          className={cn(
            "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
            inverse ? "opacity-0" : "opacity-100"
          )}
        />
        {/* Dark-background logo (bright wing + white wordmark) */}
        <Image
          src="/mehvano-flat1-dark.png"
          alt=""
          aria-hidden
          width={775}
          height={508}
          priority
          className={cn(
            "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
            inverse ? "opacity-100" : "opacity-0"
          )}
        />
      </span>
    </Link>
  );
}
