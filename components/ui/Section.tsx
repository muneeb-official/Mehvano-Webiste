import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ScrollSlide } from "./ScrollSlide";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Background treatment. */
  tone?: "cream" | "paper" | "sand" | "ink";
  /** Vertical rhythm. */
  spacing?: "sm" | "md" | "lg";
  container?: false | "default" | "prose" | "wide";
  id?: string;
  as?: ElementType;
  /**
   * Scroll-scrubbed horizontal slide-in (alternating sides down the page).
   * On by default; set false for long-read/sticky content that shouldn't move
   * (e.g. article bodies).
   */
  slide?: boolean;
};

const tones = {
  cream: "bg-cream text-fg",
  paper: "bg-paper text-fg",
  sand: "bg-sand text-fg",
  ink: "bg-ink text-fg-inverse",
};

const spacings = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
};

export function Section({
  children,
  className,
  tone = "cream",
  spacing = "md",
  container = "default",
  id,
  as: Tag = "section",
  slide = true,
}: SectionProps) {
  const content = slide ? <ScrollSlide>{children}</ScrollSlide> : children;
  return (
    <Tag id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {container ? <Container size={container}>{content}</Container> : content}
    </Tag>
  );
}
