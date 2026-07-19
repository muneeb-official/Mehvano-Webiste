import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  /** "dark" = black pill (on light bg); "light" = white pill (on dark bg). */
  tone?: "dark" | "light";
  icon?: IconName;
  className?: string;
};

/**
 * The Artego signature CTA — a solid pill next to a detached round arrow button
 * that rotates on hover. Handles internal, external, tel:, and mailto: links.
 */
export function PillButton({
  href,
  children,
  tone = "dark",
  icon = "arrow-up-right",
  className,
}: PillButtonProps) {
  const isHttp = /^https?:\/\//.test(href);
  const isExternal = isHttp || href.startsWith("mailto:") || href.startsWith("tel:");

  const pill = cn(
    "inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold tracking-tight transition-colors",
    tone === "dark"
      ? "bg-black text-white group-hover/pill:bg-neutral-800"
      : "bg-white text-black group-hover/pill:bg-neutral-200"
  );
  const circle = cn(
    "grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-out group-hover/pill:rotate-45",
    tone === "dark" ? "bg-black text-white" : "bg-white text-black"
  );

  const inner = (
    <>
      <span className={pill}>{children}</span>
      <span className={circle}>
        <Icon name={icon} className="h-5 w-5" />
      </span>
    </>
  );

  const classes = cn("group/pill inline-flex items-center gap-2.5", className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
