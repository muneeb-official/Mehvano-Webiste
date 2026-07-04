import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "gold" | "inverse" | "outline";
};

const tones = {
  neutral: "bg-sand text-fg-muted",
  gold: "bg-gold-bright/20 text-gold-deep",
  inverse: "bg-white/10 text-fg-inverse",
  outline: "border border-line-strong text-fg-muted",
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
