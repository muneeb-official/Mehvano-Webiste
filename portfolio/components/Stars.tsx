import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type StarsProps = {
  /** Filled stars out of 5. */
  count?: number;
  className?: string;
  /** Tailwind size classes for each star. */
  size?: string;
};

/** Warm amber star rating row (matches the reference's gold stars). */
export function Stars({ count = 5, className, size = "h-4 w-4" }: StarsProps) {
  return (
    <span
      className={cn("inline-flex gap-0.5 text-amber-500", className)}
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          className={cn(size, i < count ? "fill-amber-500" : "fill-none opacity-30")}
        />
      ))}
    </span>
  );
}
