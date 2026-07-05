import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  children?: ReactNode;
};

/** Compact inner-page header band (light), sits below the fixed header. */
export function PageHeader({ eyebrow, title, description, crumbs, align = "left", children }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-cream pt-28 sm:pt-32">
      <Container className="pb-12 sm:pb-16">
        {crumbs ? <Breadcrumbs items={crumbs} className="mb-6" /> : null}
        <Reveal variant="up" className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-fg sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{description}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
