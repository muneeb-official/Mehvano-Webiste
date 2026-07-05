/** Tiny className joiner (keeps deps minimal). Filters falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Stagger delay (ms) for a cascading list — feed `index` and get an increasing
 * delay, capped so long lists don't build up a huge lag before the last item.
 * Used with <Reveal delay={stagger(i)} /> to make grids reveal one-by-one.
 */
export function stagger(index: number, step = 90, cap = 6): number {
  return Math.min(index, cap) * step;
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "June 2026". */
export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Format an ISO date as e.g. "Jun 1, 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
