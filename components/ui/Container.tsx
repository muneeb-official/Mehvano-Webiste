import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Narrower measure for long-form reading. */
  size?: "default" | "prose" | "wide";
  as?: ElementType;
};

// Site content spans 90% of the viewport (centered), capped on ultra-wide
// screens. `prose` stays narrow for comfortable long-form reading.
const sizes = {
  default: "max-w-[1728px]",
  prose: "max-w-3xl",
  wide: "max-w-[1728px]",
};

export function Container({ children, className, size = "default", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-[90%]", sizes[size], className)}>
      {children}
    </Tag>
  );
}
