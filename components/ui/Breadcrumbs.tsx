import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export type Crumb = { name: string; href: string };

type BreadcrumbsProps = {
  items: Crumb[];
  tone?: "default" | "inverse";
  className?: string;
};

export function Breadcrumbs({ items, tone = "default", className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm",
          tone === "inverse" ? "text-white/60" : "text-fg-subtle"
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span className={tone === "inverse" ? "text-white/90" : "text-fg"} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    tone === "inverse" ? "hover:text-white" : "hover:text-fg"
                  )}
                >
                  {item.name}
                </Link>
              )}
              {!last ? <Icon name="chevron-down" className="h-3.5 w-3.5 -rotate-90 opacity-50" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
