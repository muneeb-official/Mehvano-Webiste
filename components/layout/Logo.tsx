import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type LogoProps = {
  tone?: "default" | "inverse";
  className?: string;
  href?: string;
};

/** Brand mark: a gold diamond spark + wordmark (mirrors the reference logo). */
export function Logo({ tone = "default", className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5 font-display", className)}
      aria-label={`${SITE.brand} — home`}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-12",
          tone === "inverse" ? "bg-paper text-ink" : "bg-ink text-paper"
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M12 2c.6 5 2 6.4 7 7-5 .6-6.4 2-7 7-.6-5-2-6.4-7-7 5-.6 6.4-2 7-7Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-extrabold tracking-tight",
            tone === "inverse" ? "text-fg-inverse" : "text-fg"
          )}
        >
          {SITE.brandShort}
          <span className="text-gold">.</span>
        </span>
        <span
          className={cn(
            "text-[0.62rem] font-semibold uppercase tracking-[0.22em]",
            tone === "inverse" ? "text-fg-inverse-muted" : "text-fg-subtle"
          )}
        >
          Realty
        </span>
      </span>
    </Link>
  );
}
