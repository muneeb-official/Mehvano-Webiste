import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

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
}: SectionProps) {
  return (
    <Tag id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {container ? <Container size={container}>{children}</Container> : children}
    </Tag>
  );
}
