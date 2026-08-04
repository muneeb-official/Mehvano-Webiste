import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Turns the whole card into a link with hover lift. */
  href?: string;
  tone?: "paper" | "cream" | "sand" | "ink" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  /** Custom-cursor hint (e.g. "view" | "open") — read by CustomCursor. */
  "data-cursor"?: string;
};

const tones = {
  paper: "bg-paper border border-line",
  cream: "bg-cream border border-line",
  sand: "bg-sand border border-line-strong/60",
  ink: "bg-ink text-fg-inverse border border-white/10",
  glass: "glass text-fg-inverse",
};

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-8 sm:p-10",
};

export function Card({
  children,
  className,
  href,
  tone = "paper",
  padding = "md",
  interactive,
  "data-cursor": dataCursor,
}: CardProps) {
  const classes = cn(
    "rounded-2xl transition-all duration-300 ease-out",
    tones[tone],
    paddings[padding],
    (href || interactive) &&
      "hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1",
    className
  );

  if (href) {
    return (
      <Link href={href} data-cursor={dataCursor} className={cn(classes, "block focus:outline-none")}>
        {children}
      </Link>
    );
  }
  return <div data-cursor={dataCursor} className={classes}>{children}</div>;
}
