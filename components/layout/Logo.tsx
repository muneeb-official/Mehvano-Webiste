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
 * Brand mark: the Mehvano "M" logo + "ehvano" wordmark (reads "Mehvano").
 * Both the white (for dark backgrounds) and black (for light) logos are rendered
 * and cross-faded by `tone`, so the header's transparent↔solid swap is seamless.
 */
export function Logo({ tone = "default", className, href = "/" }: LogoProps) {
  const inverse = tone === "inverse";
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1 font-display", className)}
      aria-label={`${SITE.brand} — home`}
    >
      <span className="relative block h-22 w-22 shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/Mehvano_logo_in_white.png"
          alt=""
          aria-hidden
          width={850}
          height={850}
          priority
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
            inverse ? "opacity-100" : "opacity-0"
          )}
        />
        <Image
          src="/Mehvano_logo_in_black.png"
          alt="Mehvano"
          width={850}
          height={850}
          priority
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
            inverse ? "opacity-0" : "opacity-100"
          )}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "-ml-4 text-lg font-extrabold tracking-tight",
            inverse ? "text-fg-inverse" : "text-fg"
          )}
        >
          ehvano
          <span className="text-gold">.</span>
        </span>
      </span>
    </Link>
  );
}
