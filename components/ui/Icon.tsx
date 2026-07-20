import type { SVGProps } from "react";

/**
 * Inline SVG icon set (no icon-font/library dependency).
 * Usage: <Icon name="arrow-up-right" className="h-4 w-4" />
 */
export type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-left"
  | "check"
  | "spark"
  | "map-pin"
  | "phone"
  | "mail"
  | "home"
  | "chart"
  | "clock"
  | "shield"
  | "star"
  | "menu"
  | "close"
  | "chevron-down"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "quote"
  // Service icons
  | "heart-pulse"
  | "stethoscope"
  | "cpu"
  | "code"
  | "briefcase"
  | "users"
  | "layers"
  | "megaphone"
  | "sparkles"
  | "building"
  | "wrench"
  | "globe";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-up-right": <path d="M7 17 17 7M9 7h8v8" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 18l-6-6 6-6" />,
  check: <path d="m5 13 4 4L19 7" />,
  spark: (
    <path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z" />
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8.3 10.3a12 12 0 0 0 5.4 5.4l1.4-1.5c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7M6 10v9h12v-9" />,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6l-7-3Z" />,
  star: (
    <path d="M12 3.5 14.6 9l6 .5-4.6 4 1.4 5.9L12 16.3 6.6 19.4 8 13.5l-4.6-4 6-.5L12 3.5Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8.5H16V5.6c-.7-.1-1.4-.1-2.1-.1-2 0-3.4 1.2-3.4 3.5v2H8v3h2.5V21h3v-7h2.3l.4-3h-2.7V9.2c0-.5.3-.7.9-.7Z" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7 10v7M7 7.2v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
    </>
  ),
  quote: <path d="M9 7H5v5h3v5H4M19 7h-4v5h3v5h-4" />,
  "heart-pulse": (
    <>
      <path d="M12 20s-7-4.35-9.5-8.5C.9 8.8 2.2 5.5 5.3 5.1 7 4.9 8.6 5.8 9.4 7.2 10.2 5.8 11.8 4.9 13.5 5.1c3.1.4 4.4 3.7 2.8 6.4-.5.8-1.2 1.6-2 2.4" />
      <path d="M2.8 12.5h3l1.5-3 2.2 5 1.6-3.5 1 1.5h3.1" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M5 3v5a4 4 0 0 0 8 0V3" />
      <path d="M9 15a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
      <circle cx="18" cy="10" r="2.5" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
    </>
  ),
  code: <path d="m9 8-5 4 5 4M15 8l5 4-5 4M13 5l-2 14" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 20a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" />,
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M15 8a4 4 0 0 1 0 8M7 14v4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z" />
      <path d="M19 14c.2 1.5.6 1.9 2 2.1-1.4.2-1.8.6-2 2.1-.2-1.5-.6-1.9-2-2.1 1.4-.2 1.8-.6 2-2.1Z" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3" />
    </>
  ),
  wrench: <path d="M15.5 4a4.5 4.5 0 0 0-5.9 5.9l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6A4.5 4.5 0 0 0 20 8.5L17 11.5 14.5 9 17.5 6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
