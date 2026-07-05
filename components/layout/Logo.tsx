import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type LogoProps = {
  tone?: "default" | "inverse";
  className?: string;
  href?: string;
};

/** Brand mark: the Mehvano "M" logo + "ehvano" wordmark (reads "Mehvano"). */
export function Logo({ tone = "default", className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1 font-display", className)}
      aria-label={`${SITE.brand} — home`}
    >
      <Image
        src="/Mehvano_logo.png"
        alt="Mehvano"
        width={483}
        height={516}
        priority
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "-ml-0.5 text-lg font-extrabold tracking-tight",
            tone === "inverse" ? "text-fg-inverse" : "text-fg"
          )}
        >
          ehvano
          <span className="text-gold">.</span>
        </span>
        
      </span>
    </Link>
  );
}
