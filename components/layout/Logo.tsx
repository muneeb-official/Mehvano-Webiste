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
 * Mehvano brand mark — the "wing" only (no wordmark). Cross-fades two artworks
 * by `tone`:
 *   - default  → original navy / royal-blue / grey wing (for LIGHT backgrounds)
 *   - inverse  → bright wing: white top feather, light-blue middle, brighter
 *                light-blue bottom (for the DARK footer)
 */
export function Logo({ tone = "default", className, href = "/" }: LogoProps) {
  const inverse = tone === "inverse";
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center", className)}
      aria-label={`${SITE.brand} — home`}
    >
      <span className="relative block h-16 w-[3.9rem] shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-[4.3rem]">
        {/* Light-background wing (original colours) */}
        <Image
          src="/mehvano-wing.png"
          alt="Mehvano"
          width={434}
          height={291}
          priority
          className={cn(
            "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300",
            inverse ? "opacity-0" : "opacity-100"
          )}
        />
        {/* Dark-background wing (bright ramp) */}
        <Image
          src="/mehvano-wing-dark.png"
          alt=""
          aria-hidden
          width={434}
          height={291}
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
