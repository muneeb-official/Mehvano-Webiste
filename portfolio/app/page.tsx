import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { JsonLd } from "@/components/ui/JsonLd";
import { Appear } from "@/components/portfolio/Appear";
import { PortfolioContactForm } from "@/components/portfolio/PortfolioContactForm";
import { NeighborhoodSlider } from "@/components/portfolio/NeighborhoodSlider";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { AGENT, SERVICE_AREA, PARTNER_LOGOS, stockImage } from "@/lib/constants";
import { getAllArticles, hrefFor } from "@/lib/cms";
import { FEATURED_SALES, PORTFOLIO_TESTIMONIALS } from "@/lib/portfolio";

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

/** Section shell — centered inner content column. */
const SHELL = "mx-auto w-full max-w-[1180px] px-6 sm:px-10";

/** The three entry points (reference: Buy a home / Sell my home). */
const CATEGORIES = [
  { title: "Buy a home", sub: "Luxury Listing", img: 1, href: "/services/real-estate", arrow: true },
  { title: "Sell my home", sub: "Proven Marketing", img: 2, href: "/home-value", arrow: false },
  { title: "Relocate", sub: "Exclusive Presentation", img: 3, href: "/about", arrow: false },
];

/** Compact "by the numbers" trio (reference: 15+ / 260+ / 04). */
const ABOUT_STATS = [
  { value: "15+", label: "Years of experience" },
  { value: "260+", label: "Satisfied clients" },
  { value: "04", label: "Areas covered" },
];

/**
 * Long looping "road" brush stroke (reference: bottom-left of the hero). A
 * filled closed shape so it reads as a tapered painted ribbon, not a plain line.
 */
function RoadSwoosh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 760 300" fill="none" aria-hidden className={className}>
      <path
        fill="#120d06"
        d="M2 248c168-92 300-150 470-150 128 0 214 40 214 92 0 42-56 66-128 66-64 0-108-24-108-52 0-20 22-34 58-34 6 0 11 .4 16 1-8-.4-16 0-23 2-24 6-36 18-36 32 0 22 34 38 96 38 82 0 138-30 138-82 0-64-96-108-236-108C300 133 158 191 20 274c-10 6-18-4-18-14 0-6 0-10 0-12Z"
      />
    </svg>
  );
}

/** Small angular brush mark (reference: top-right of the hero). */
function BrushMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" aria-hidden className={className}>
      <path
        fill="#120d06"
        d="M6 150C40 96 92 44 168 6c14-7 26 2 22 14-4 12-70 44-116 92-30 31-52 52-60 52-8 0-12-8-8-14Z"
      />
    </svg>
  );
}

export default function PortfolioPage() {
  const posts = getAllArticles().slice(0, 3);
  const [heroSale] = FEATURED_SALES;
  const sliderSales = FEATURED_SALES.slice(0, 4);

  return (
    <div className="pf-cream">
      {/* =====================================================================
       *  1 — HERO (amber, serif headline, agent cutout, listing card)
       * =================================================================== */}
      <section className="pf-amber relative overflow-hidden pt-24 text-white sm:pt-28">
        {/* Decorative brush marks — small angular stroke top-right, long looping
            road bottom-left (matching the reference). */}
        <BrushMark className="pointer-events-none absolute right-0 top-4 hidden h-32 w-40 lg:block" />
        <RoadSwoosh className="pointer-events-none absolute -bottom-4 left-[-2%] hidden h-[300px] w-[620px] lg:block" />

        <div className={cn(SHELL, "relative min-h-[660px]")}>
          {/* Left — headline + trust + logos */}
          <div className="relative z-10 max-w-3xl pt-6">
            <Appear
              as="h1"
              variant="up"
              className="pf-serif text-[2.75rem] font-semibold leading-[0.95] tracking-tight text-white sm:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              <span className="block whitespace-nowrap">More Than a Realtor</span>
              <span className="block whitespace-nowrap">— Your Advocate</span>
            </Appear>

            <Appear variant="fade" delay={120} className="mt-8 max-w-sm text-[0.95rem] font-medium leading-relaxed text-black/85">
              With over 120+ successful transactions and 5-star reviews, I help you
              navigate the market with confidence — from the first showing to final
              closing.
            </Appear>

            {/* Partner / recognition logo strip (styled text wordmarks) */}
            <Appear variant="fade" delay={220} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              {PARTNER_LOGOS.slice(0, 4).map((logo, i) => (
                <span
                  key={logo}
                  className={cn(
                    "flex items-center gap-2 text-lg tracking-tight text-black/55",
                    i === 1 ? "pf-serif italic" : "font-display font-bold"
                  )}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-black/45" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-black/45" />
                  </span>
                  {logo}
                </span>
              ))}
            </Appear>
          </div>

          {/* Right — agent portrait cutout. The source art is on a pure-white
              background; `mix-blend-multiply` keys that white out against the
              amber (white × amber = amber) so it reads as a seamless cutout. */}
          <div className="pointer-events-none absolute bottom-0 right-[-2%] hidden w-[52%] justify-end lg:flex">
            <Appear variant="fade" delay={100} className="relative">
              <Image
                src="/agent/agent.jpg"
                alt={`${AGENT.name}, ${AGENT.role}`}
                width={720}
                height={880}
                priority
                sizes="52vw"
                className="h-[680px] w-auto object-contain object-bottom mix-blend-multiply"
              />
            </Appear>
          </div>

          {/* Floating "free consultation" ellipse badge (overlaps agent, lower-left) */}
          <span className="absolute bottom-[300px] right-[36%] z-30 hidden -rotate-[8deg] items-center justify-center rounded-[50%] border border-[#e9c67a]/70 bg-white px-8 py-4 text-center shadow-xl lg:flex">
            <span className="leading-snug">
              <span className="pf-serif pf-gold-text block text-lg font-bold italic">
                {AGENT.name}
              </span>
              <span className="block text-sm font-bold text-black">Free Consultation</span>
            </span>
          </span>

          {/* Featured-listing card, bottom-right */}
          <Appear
            variant="up"
            delay={200}
            className="relative z-10 ml-auto mt-10 max-w-[560px] translate-y-16 lg:mt-0"
          >
            <div className="rounded-t-[1.5rem] bg-white p-5 pb-0 shadow-2xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="pf-serif max-w-[58%] text-xl font-semibold leading-snug text-black">
                  Striking Design in this {heroSale.neighborhood} Home
                </h3>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-50"
                >
                  View Listing
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e9c67a] text-black transition-transform group-hover:rotate-45">
                    <Icon name="arrow-up-right" className="h-4 w-4" />
                  </span>
                </Link>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-[1.1rem]">
                <Image src={stockImage(0)} alt={heroSale.name} fill priority sizes="560px" className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-[#e9c67a] px-4 py-1.5 text-sm font-bold text-black">
                  {heroSale.price}
                </span>
              </div>
            </div>
          </Appear>
        </div>
      </section>

      {/* =====================================================================
       *  2 — CATEGORY CARDS (arched images, label over image)
       * =================================================================== */}
      <section className={cn(SHELL, "pb-16 pt-24 sm:pb-24 sm:pt-28")}>
        <div className="grid gap-8 sm:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Appear key={c.title} variant="up" delay={i * 100}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem]">
                  <Image
                    src={stockImage(c.img)}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Soft fade at the bottom so the labels stay readable. */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/45 to-transparent" aria-hidden />
                  {c.arrow ? (
                    <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                      <Icon name="arrow-up-right" className="h-6 w-6" />
                    </span>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-center text-white">
                    <p className="text-xs font-medium">{c.sub}</p>
                    <h3 className="pf-serif mt-0.5 text-2xl font-bold sm:text-3xl">{c.title}</h3>
                  </div>
                </div>
              </Link>
            </Appear>
          ))}
        </div>
      </section>

      {/* =====================================================================
       *  3 — ABOUT (dark block, arched portrait, stat trio)
       * =================================================================== */}
      <section className="pf-ink text-white">
        <div className={cn(SHELL, "grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16")}>
          {/* Full cutout (transparent PNG) floating on the dark block — no frame. */}
          <Appear variant="scale" className="flex justify-center">
            <Image
              src="/agent/agent-cutout.png"
              alt={`${AGENT.name}, ${AGENT.role}`}
              width={480}
              height={694}
              sizes="(max-width: 1024px) 80vw, 32vw"
              className="h-auto w-full max-w-sm object-contain"
            />
          </Appear>

          <div className="flex flex-col gap-6">
            <Appear variant="fade" className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c07f16]" aria-hidden />
              <span className="pf-gold-text text-sm font-bold uppercase tracking-[0.14em]">About</span>
            </Appear>
            <Appear as="h2" variant="up" delay={80} className="pf-serif text-4xl font-bold tracking-tight sm:text-5xl">
              {AGENT.name}
            </Appear>
            <Appear variant="fade" delay={140} className="max-w-xl text-[0.95rem] leading-relaxed text-white/70">
              {AGENT.bio} With complete transparency and a flawless-service standard, I
              help buyers and sellers move with clarity across Anne Arundel and Howard
              County.
            </Appear>

            <Appear variant="up" delay={200} className="mt-6 grid grid-cols-3 gap-6">
              {ABOUT_STATS.map((s) => (
                <div key={s.label}>
                  <p className="pf-serif text-4xl font-bold text-white sm:text-5xl">{s.value}</p>
                  <p className="mt-2 text-xs leading-snug text-white/55">{s.label}</p>
                </div>
              ))}
            </Appear>
          </div>
        </div>
      </section>

      {/* =====================================================================
       *  4 — PRESS & MEDIA (image mosaic + center feature card)
       * =================================================================== */}
      <section className={cn(SHELL, "py-20 sm:py-28")}>
        <Appear variant="up" className="mb-14">
          <span className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#c07f16]" aria-hidden />
            <span className="pf-gold-text text-sm font-bold uppercase tracking-[0.14em]">As seen on</span>
          </span>
          <h2 className="pf-serif mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Press &amp; Media
          </h2>
        </Appear>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Left column: wide image + portrait */}
          <div className="flex flex-col gap-4">
            <Appear variant="scale" className="overflow-hidden rounded-[1.5rem]">
              <Image src={stockImage(1)} alt="Recent interior" width={480} height={300} sizes="30vw" className="aspect-[8/5] w-full object-cover" />
            </Appear>
            <Appear variant="scale" delay={120} className="overflow-hidden rounded-[1.5rem]">
              <Image src="/agent/agent.jpg" alt={AGENT.name} width={480} height={520} sizes="30vw" className="aspect-[4/5] w-full object-cover" />
            </Appear>
          </div>

          {/* Center feature card */}
          <Appear variant="up" delay={80} className="relative flex flex-col justify-end self-center overflow-hidden rounded-[1.5rem]">
            <Image src={stockImage(3)} alt="" width={480} height={480} sizes="30vw" className="aspect-square w-full object-cover" aria-hidden />
            <div className="absolute inset-0 bg-black/45" aria-hidden />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e9c67a] text-black">
              <Icon name="arrow-up-right" className="h-6 w-6" />
            </span>
            <div className="relative p-6 text-center text-white">
              <h3 className="pf-serif text-xl font-bold">Variety Magazine</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Featured for hyperlocal expertise across Severn, Pasadena, and Ellicott
                City — and a client-first approach to every move.
              </p>
            </div>
          </Appear>

          {/* Right column: two stacked images */}
          <div className="flex flex-col gap-4">
            <Appear variant="scale" delay={160} className="overflow-hidden rounded-[1.5rem]">
              <Image src={stockImage(0)} alt="Recent listing exterior" width={480} height={320} sizes="30vw" className="aspect-[8/5] w-full object-cover" />
            </Appear>
            <Appear variant="scale" delay={200} className="overflow-hidden rounded-[1.5rem]">
              <Image src={stockImage(4)} alt="Recent listing exterior" width={480} height={320} sizes="30vw" className="aspect-[8/5] w-full object-cover" />
            </Appear>
          </div>
        </div>
      </section>

      {/* =====================================================================
       *  5 — NEIGHBORHOODS (dark block, listing slider)
       * =================================================================== */}
      <section className="pf-ink text-white">
        <div className={cn(SHELL, "py-20 sm:py-28")}>
          <Appear variant="up" className="mb-14 text-center">
            <span className="pf-gold-text text-sm font-bold uppercase tracking-[0.14em]">All property</span>
            <h2 className="pf-serif mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Neighborhoods</h2>
          </Appear>
          <NeighborhoodSlider sales={sliderSales} />
        </div>
      </section>

      {/* =====================================================================
       *  6 — BLOGS & ARTICLES (1 big left + 2 stacked right, live CMS)
       * =================================================================== */}
      <section className={cn(SHELL, "py-20 sm:py-28")}>
        <Appear variant="up" className="mb-14 text-center">
          <span className="pf-gold-text text-sm font-bold uppercase tracking-[0.14em]">Latest news</span>
          <h2 className="pf-serif mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Our Blogs &amp; Articles
          </h2>
        </Appear>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Feature (first) post */}
          {posts[0] ? (
            <Appear variant="up">
              <Link href={hrefFor(posts[0])} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={stockImage(1)}
                    alt={posts[0].title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>{formatDate(posts[0].updated)}</span>
                    <span aria-hidden>·</span>
                    <span>{posts[0].readMinutes} min read</span>
                  </div>
                  <h3 className="pf-serif mt-3 text-2xl font-bold leading-snug text-black">{posts[0].title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">{posts[0].description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black">
                    View Blog
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e9c67a] text-black">
                      <Icon name="arrow-up-right" className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              </Link>
            </Appear>
          ) : null}

          {/* Two stacked posts */}
          <div className="flex flex-col gap-6">
            {posts.slice(1, 3).map((post, i) => (
              <Appear key={post.slug} variant="up" delay={(i + 1) * 90} className="flex-1">
                <Link href={hrefFor(post)} className="group flex h-full gap-5 overflow-hidden rounded-[1.5rem] bg-white p-4">
                  <div className="relative aspect-square w-2/5 shrink-0 overflow-hidden rounded-[1.1rem]">
                    <Image
                      src={stockImage(i + 2)}
                      alt={post.title}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center py-2 pr-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{formatDate(post.updated)}</span>
                      <span aria-hidden>·</span>
                      <span>{post.readMinutes} min read</span>
                    </div>
                    <h3 className="pf-serif mt-2 text-lg font-bold leading-snug text-black">{post.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-500">{post.description}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-black">
                      View Blog
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e9c67a] text-black">
                        <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Appear>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       *  7 — OUR CLIENTS SAY (testimonial card masonry)
       * =================================================================== */}
      <section className={cn(SHELL, "pb-20 sm:pb-28")}>
        <Appear variant="up" className="mb-14 text-center">
          <h2 className="pf-serif text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Our Clients Say
          </h2>
        </Appear>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => {
            const t = PORTFOLIO_TESTIMONIALS[i % PORTFOLIO_TESTIMONIALS.length];
            const handle = "@" + t.name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10);
            return (
              <Appear
                key={i}
                variant="up"
                delay={(i % 4) * 70}
                className={cn("h-full", i % 2 === 1 && "lg:mt-8")}
              >
                <figure className="flex h-full flex-col gap-3 rounded-[1.25rem] border border-neutral-200 bg-white p-5">
                  <figcaption className="flex items-center gap-3">
                    <Avatar name={t.name} size={40} />
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate text-sm font-bold text-black">{t.name}</p>
                      <p className="truncate text-xs text-neutral-400">{handle}</p>
                    </div>
                    <Icon name="facebook" className="h-4 w-4 text-[#1877f2]" />
                  </figcaption>
                  <blockquote className="text-sm leading-relaxed text-neutral-600">{t.quote}</blockquote>
                  <p className="mt-auto text-sm font-semibold text-[#e0533b]">
                    #{t.detail.split(" ")[0].replace(/[^A-Za-z]/g, "").toLowerCase() || "review"}
                  </p>
                </figure>
              </Appear>
            );
          })}
        </div>
        <p className="mt-10 text-center text-xs text-neutral-400">
          Placeholder reviews — replace with real, verifiable Google reviews before launch.
        </p>
      </section>

      {/* =====================================================================
       *  8 — CONTACT (amber, portrait + form)
       * =================================================================== */}
      <section className="pf-amber relative overflow-hidden text-white">
        <RoadSwoosh className="pointer-events-none absolute bottom-0 left-[4%] hidden h-56 w-[520px] lg:block" />
        <div className={cn(SHELL, "relative grid items-end gap-10 pt-16 sm:pt-20 lg:grid-cols-2 lg:gap-16")}>
          {/* Portrait + contact bubble */}
          <div className="relative">
            <Image
              src="/agent/agent.jpg"
              alt={`${AGENT.name}, ${AGENT.role}`}
              width={520}
              height={640}
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="mx-auto h-[440px] w-auto object-contain object-bottom mix-blend-multiply sm:h-[520px]"
            />
            <div className="absolute bottom-16 right-0 flex flex-col gap-2.5 rounded-2xl bg-white p-5 text-sm shadow-xl">
              <a href={AGENT.emailHref} className="flex items-center gap-3 font-medium text-black hover:text-[#c07f16]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f3ede2] text-[#c07f16]">
                  <Icon name="mail" className="h-4 w-4" />
                </span>
                {AGENT.email}
              </a>
            </div>
          </div>

          {/* Form */}
          <Appear variant="up" delay={100} className="flex flex-col justify-center pb-16 sm:pb-20">
            <h2 className="pf-serif text-3xl font-bold tracking-tight sm:text-4xl">Let&rsquo;s start your move</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-black/75">
              Tell me what you need — buying, selling, or relocating — and I&rsquo;ll get
              back to you fast, usually within minutes.
            </p>
            <div className="mt-8">
              <PortfolioContactForm />
            </div>
          </Appear>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </div>
  );
}
