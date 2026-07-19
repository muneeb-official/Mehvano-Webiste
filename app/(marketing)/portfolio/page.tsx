import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { JsonLd } from "@/components/ui/JsonLd";
import { Appear } from "@/components/portfolio/Appear";
import { Parallax } from "@/components/portfolio/Parallax";
import { PillButton } from "@/components/portfolio/PillButton";
import { Stars } from "@/components/portfolio/Stars";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { TestimonialScroll } from "@/components/portfolio/TestimonialScroll";
import { FaqAccordion } from "@/components/portfolio/FaqAccordion";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { AGENT, SERVICE_AREA, ZIPS, stockImage } from "@/lib/constants";
import { getAllArticles, hrefFor } from "@/lib/cms";
import {
  FEATURED_SALES,
  PORTFOLIO_SERVICES,
  CREDENTIALS,
  PORTFOLIO_TESTIMONIALS,
  PORTFOLIO_FAQ,
  PORTFOLIO_FAQ_CATEGORIES,
} from "@/lib/portfolio";

export const metadata: Metadata = buildMetadata({
  title: `${AGENT.name} — Portfolio | ${AGENT.role}, Anne Arundel & Howard County, MD`,
  description:
    "The portfolio of Mehvish Aslam, REALTOR® — recent home sales, services, and results across Severn, Pasadena, and Ellicott City, Maryland.",
  path: "/portfolio",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
];

/** Shared boxed-block shell — every section floats as a rounded card on the page. */
const BLOCK = "mx-auto w-[92%] max-w-[1600px] overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]";
const marqueePhrases = [
  "Licensed Maryland REALTOR®",
  "Bright MLS member",
  "Equal Housing Opportunity",
  "Under 5-minute response",
  "Hyperlocal specialist",
  "Fort Meade & relocation",
];

export default function PortfolioPage() {
  const posts = getAllArticles().slice(0, 3);

  return (
    <div className="bg-cream">
      <div className="space-y-3 py-3">
        {/* =================================================================
         *  1 — HERO
         * =============================================================== */}
        <section
          className={cn(
            BLOCK,
            "relative isolate flex min-h-[88vh] flex-col justify-between bg-black px-6 pb-10 pt-28 text-white sm:px-10 sm:pt-32 lg:px-16 lg:pb-16"
          )}
        >
          <Image
            src="/hero/Hero.jpg"
            alt=""
            fill
            priority
            sizes="92vw"
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/45 to-black/65" aria-hidden />

          <div className="flex flex-wrap items-start justify-between gap-6">
            <Appear variant="fade" className="max-w-xs">
              <Stars count={5} />
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Thoughtful, data-driven guidance. My mission: help you move with clarity and
                confidence.
              </p>
            </Appear>
            <Appear variant="fade" delay={120} className="text-sm font-medium text-white/70">
              {ZIPS.length} ZIPs · {SERVICE_AREA.counties.length} Counties · 120+ Homes closed
            </Appear>
          </div>

          <div>
            <Appear variant="up" className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {AGENT.name} — {AGENT.role} · MD #{AGENT.licenseNumber}
            </Appear>
            <Appear
              as="h1"
              variant="up"
              delay={90}
              className="mt-5 max-w-4xl font-display text-[3.25rem] font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Homes That Fit
              <br />
              The Way You Live
            </Appear>
            <Appear variant="up" delay={200} className="mt-9">
              <PillButton href="/contact" tone="light">
                Book a call
              </PillButton>
            </Appear>
          </div>
        </section>

        {/* =================================================================
         *  2 — ABOUT
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-white px-6 py-16 sm:px-10 sm:py-24 lg:px-16")}>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="flex flex-col gap-8">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                About
              </span>
              <Appear variant="scale" className="overflow-hidden rounded-[1.75rem]">
                <Image
                  src={stockImage(2)}
                  alt="A home in the neighborhoods Mehvish serves"
                  width={620}
                  height={640}
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="aspect-[5/6] w-full object-cover"
                />
              </Appear>
            </div>

            <div className="flex flex-col justify-center">
              <Appear
                as="h2"
                variant="up"
                className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-black sm:text-4xl lg:text-[2.9rem]"
              >
                You&rsquo;re not hiring a listing.{" "}
                <span className="text-neutral-400">
                  You&rsquo;re hiring the local expert who reads Severn, Pasadena, and Ellicott City
                  block by block
                </span>{" "}
                — and makes your move feel simple.
              </Appear>

              <Appear variant="up" delay={120} className="mt-9">
                <PillButton href="/contact">Book a call</PillButton>
              </Appear>

              <Appear variant="fade" delay={200} className="mt-10 max-w-md text-sm leading-relaxed text-neutral-500">
                {AGENT.bio}
              </Appear>
            </div>
          </div>
        </section>

        {/* =================================================================
         *  3 — SERVICES (layered cards over a giant title)
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-black px-6 py-20 sm:px-10 sm:py-28 lg:px-16")}>
          <Appear variant="fade" className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                What I do
              </span>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                Services
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-relaxed text-white/55 lg:block">
              One expert, the whole move — from first tour to final signature, priced and marketed
              with real data.
            </p>
          </Appear>

          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 select-none text-center font-display text-[11rem] font-black leading-none text-white/[0.05] lg:block xl:text-[14rem]"
            >
              Services
            </span>
            <div className="relative grid gap-6 md:grid-cols-2">
              {PORTFOLIO_SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  className={cn(
                    i === 1 && "md:mt-16",
                    i === 2 && "md:-mt-8",
                    i === 3 && "md:mt-8"
                  )}
                >
                  <Appear variant={i % 2 === 0 ? "tilt-left" : "tilt-right"} delay={i * 90}>
                    <div className="flex h-full flex-col gap-4 rounded-[1.75rem] bg-white p-7 sm:p-8">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100 text-black">
                        <Icon name={s.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-black">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-neutral-600">{s.text}</p>
                      <Link
                        href={s.href}
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-black"
                      >
                        Read more
                        <Icon name="arrow-up-right" className="h-4 w-4" />
                      </Link>
                    </div>
                  </Appear>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
         *  4 — LATEST PROJECTS
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-white px-6 py-16 sm:px-10 sm:py-24 lg:px-16")}>
          <Appear variant="up" className="mb-12 flex flex-wrap items-center justify-between gap-6">
            <h2 className="font-display text-4xl font-black tracking-tight text-black sm:text-5xl">
              Latest projects
            </h2>
            <PillButton href="/contact">All projects</PillButton>
          </Appear>
          <ProjectGallery sales={FEATURED_SALES} href="/contact" />
          <p className="mt-8 text-xs text-neutral-400">
            Sample listings shown for layout. Replace with real, closed transactions (with any
            required broker/MLS attribution) before launch.
          </p>
        </section>

        {/* =================================================================
         *  5 — CREDENTIALS / AWARDS
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-black px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16")}>
          <Appear variant="fade" className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              Why clients trust me
            </span>
          </Appear>

          {/* Marquee ticker */}
          <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="pf-marquee flex w-max gap-10 whitespace-nowrap">
              {[...marqueePhrases, ...marqueePhrases].map((phrase, i) => (
                <span key={i} className="flex items-center gap-10 font-display text-2xl font-bold text-white/40 sm:text-3xl">
                  {phrase}
                  <Icon name="spark" className="h-5 w-5 text-white/25" />
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c, i) => (
              <Appear key={c.title} variant="up" delay={i * 80}>
                <div className="flex h-full flex-col items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <p className="font-display text-base font-bold text-white">{c.title}</p>
                  <p className="text-sm text-white/55">{c.sub}</p>
                </div>
              </Appear>
            ))}
          </div>
        </section>

        {/* =================================================================
         *  6 — TESTIMONIALS
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-white px-6 py-16 sm:px-10 sm:py-24 lg:px-16")}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Appear variant="up">
              <h2 className="font-display text-4xl font-black tracking-tight text-black sm:text-5xl">
                Testimonials
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
                Real words from buyers and sellers across the neighborhoods I serve.
              </p>
            </Appear>
            <Appear variant="fade" delay={120} className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {PORTFOLIO_TESTIMONIALS.map((t) => (
                  <Avatar key={t.name} name={t.name} size={40} className="ring-2 ring-white" />
                ))}
              </div>
              <span className="text-sm font-semibold leading-tight text-black">
                Happy
                <br />
                clients
              </span>
            </Appear>
          </div>
          <TestimonialScroll items={PORTFOLIO_TESTIMONIALS} />
          <p className="mt-6 text-xs text-neutral-400">
            Placeholder reviews — replace with real, verifiable Google reviews before launch.
          </p>
        </section>

        {/* =================================================================
         *  7 — FAQ
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-black px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16")}>
          <Appear variant="up" className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Frequently Asked Questions
            </h2>
          </Appear>
          <div className="mt-12">
            <FaqAccordion items={PORTFOLIO_FAQ} categories={PORTFOLIO_FAQ_CATEGORIES} />
          </div>
        </section>

        {/* =================================================================
         *  8 — REAL ESTATE BLOG (live from CMS)
         * =============================================================== */}
        <section className={cn(BLOCK, "bg-white px-6 py-16 sm:px-10 sm:py-24 lg:px-16")}>
          <Appear variant="up" className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-black tracking-tight text-black sm:text-5xl">
              Real Estate Blog
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              The latest hyperlocal guides, market reads, and buyer/seller answers for Anne Arundel
              &amp; Howard County.
            </p>
          </Appear>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <Appear key={post.slug} variant="up" delay={i * 90}>
                <Link href={hrefFor(post)} className="group block">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={stockImage(i + 1)}
                      alt={post.title}
                      width={520}
                      height={400}
                      sizes="(max-width: 768px) 90vw, 30vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-black">
                    {post.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-400">{formatDate(post.updated)}</span>
                  </div>
                </Link>
              </Appear>
            ))}
          </div>
        </section>

        {/* =================================================================
         *  9 — START CTA
         * =============================================================== */}
        <section className={cn(BLOCK, "relative bg-black px-6 py-24 text-white sm:px-10 sm:py-28 lg:px-16")}>
          <Parallax
            as="div"
            speed={-30}
            className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <Image
              src={stockImage(0)}
              alt=""
              aria-hidden
              width={220}
              height={280}
              className="w-40 rotate-[-8deg] rounded-[1.25rem] object-cover shadow-2xl xl:w-52"
            />
          </Parallax>
          <Parallax
            as="div"
            speed={30}
            className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <Image
              src={stockImage(3)}
              alt=""
              aria-hidden
              width={220}
              height={280}
              className="w-40 rotate-[8deg] rounded-[1.25rem] object-cover shadow-2xl xl:w-52"
            />
          </Parallax>

          <div className="relative mx-auto max-w-2xl text-center">
            <Appear
              as="h2"
              variant="up"
              className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl"
            >
              Start Your Move
              <br />
              With Mehvish
            </Appear>
            <Appear variant="up" delay={120} className="mt-9 flex justify-center">
              <PillButton href="/contact" tone="light">
                Get in touch
              </PillButton>
            </Appear>
            <Appear variant="fade" delay={200} className="mt-6 text-sm text-white/55">
              {AGENT.name}, {AGENT.role} · {AGENT.phone}
            </Appear>
          </div>
        </section>
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </div>
  );
}
