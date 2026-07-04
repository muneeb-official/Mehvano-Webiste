import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "gold" | "outline" | "ghost" | "glass" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-full transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Solid dark — the primary CTA (matches "View Details" in the reference)
  primary:
    "bg-ink text-fg-inverse hover:bg-charcoal shadow-card hover:shadow-lift focus-visible:outline-gold",
  gold: "bg-gold-bright text-ink hover:bg-gold shadow-card hover:shadow-lift focus-visible:outline-ink",
  // Light pill on dark surfaces (matches "Start Exploring")
  light:
    "bg-paper text-ink hover:bg-cream shadow-card hover:-translate-y-0.5 focus-visible:outline-gold",
  outline:
    "border border-line-strong text-fg hover:border-ink hover:bg-paper focus-visible:outline-gold",
  ghost: "text-fg hover:bg-sand focus-visible:outline-gold",
  glass: "glass text-fg-inverse hover:bg-white/20 focus-visible:outline-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Trailing icon; "arrow-up-right" mirrors the reference CTA. */
  icon?: IconName;
  /** Render the trailing icon inside a contrasting circle (reference style). */
  iconCircle?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };
type ButtonAsLink = CommonProps & {
  href: string;
  /** Force external behavior; auto-detected for http(s) links otherwise. */
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon, iconCircle } = props;

  const iconEl = icon ? (
    iconCircle ? (
      <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-gold-bright text-ink">
        <Icon name={icon} className="h-4 w-4" />
      </span>
    ) : (
      <Icon
        name={icon}
        className="h-[1.1em] w-[1.1em] transition-transform duration-200 group-hover/btn:translate-x-0.5"
      />
    )
  ) : null;

  const classes = cn(base, variants[variant], sizes[size], iconCircle && "pr-1.5", className);
  const content = (
    <>
      {children}
      {iconEl}
    </>
  );

  if (props.href !== undefined) {
    const isExternal = props.external ?? /^https?:\/\//.test(props.href);
    if (isExternal) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    icon: _i,
    iconCircle: _ic,
    href: _h,
    ...buttonProps
  } = props;

  return (
    <button className={classes} type={buttonProps.type ?? "button"} {...buttonProps}>
      {content}
    </button>
  );
}
