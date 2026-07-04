import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type ImagePlaceholderProps = {
  /** Real image path in /public. If omitted, a designed gradient shows instead. */
  src?: string;
  alt: string;
  label?: string;
  icon?: IconName;
  className?: string;
  /** Deterministic gradient variation. */
  variant?: 0 | 1 | 2 | 3;
  rounded?: string;
  priority?: boolean;
};

const gradients = [
  "from-graphite via-charcoal to-ink",
  "from-[#5b4f3d] via-[#3c352b] to-[#211d17]",
  "from-[#6b5a3f] via-[#4a4133] to-[#211d17]",
  "from-[#3a4a4d] via-[#2b3335] to-[#16130e]",
];

/**
 * A designed media frame. Shows a real photo when `src` is set; otherwise a
 * tasteful gradient with an icon + label — so listing/card layouts look
 * intentional before photography is added.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  icon = "home",
  className,
  variant = 0,
  rounded = "rounded-2xl",
  priority,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", rounded, className)}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority={priority} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        gradients[variant],
        rounded,
        className
      )}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(120%_80%_at_75%_20%,rgba(242,181,60,0.35),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-2 text-center text-white/70">
        <Icon name={icon} className="h-8 w-8" />
        {label ? (
          <span className="max-w-[80%] text-xs font-medium uppercase tracking-[0.16em]">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
