import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  /** Heading element level for semantics. */
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={tone === "inverse" ? "inverse" : "default"}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "text-balance text-3xl sm:text-4xl lg:text-[2.75rem]",
          tone === "inverse" ? "text-fg-inverse" : "text-fg"
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "inverse" ? "text-fg-inverse-muted" : "text-fg-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
