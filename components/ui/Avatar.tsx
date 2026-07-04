import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  /** Optional headshot path in /public. Falls back to initials if omitted. */
  src?: string;
  size?: number;
  className?: string;
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

/**
 * Circular avatar. Renders the headshot if `src` is provided, otherwise a
 * gold initials fallback so the UI is never broken while photos are pending.
 */
export function Avatar({ name, src, size = 44, className }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-gold-bright to-gold-deep font-display font-bold text-ink ring-2 ring-white/60",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
      <span className="sr-only">{name}</span>
    </span>
  );
}
