import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Narrower measure for long-form reading. */
  size?: "default" | "prose" | "wide";
  as?: ElementType;
};

const sizes = {
  default: "max-w-6xl",
  prose: "max-w-3xl",
  wide: "max-w-7xl",
};

export function Container({ children, className, size = "default", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </Tag>
  );
}
