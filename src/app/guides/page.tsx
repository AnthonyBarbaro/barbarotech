/*
THESIS: The guide library is a decision desk, not a keyword archive or equal-card blog grid.
OWN-WORLD: Signal-black reading planes, cyan rails, cool-white type, and compact decision labels.
STORY: Find the business decision you are facing, open one practical worksheet, and leave with a clearer next step.
FIRST VIEWPORT: A concise promise and three decision paths establish the library before the full guide index begins.
FORM: Decision Desk, candidate three in the Read surface set; signal ff8b52a7. Grouped rails replace a chronological feed.
*/
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { GUIDE_CATEGORIES, GUIDES } from "@/data/guides";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Website Planning Guides",
  description:
    "Practical website planning guides for choosing a developer, comparing proposals, budgeting, preparing content, protecting ownership, and deciding when to redesign.",
  alternates: {
    canonical: canonicalUrl("/guides/"),
  },
  keywords: withBaseKeywords([
    "website planning guides",
    "hire web developer guide",
    "website project checklist",
    "small business website advice",
  ]),
  openGraph: {
    title: `Website Planning Guides | ${SITE.brand}`,
    description:
      "Decision-focused guides and checklists for planning, buying, and maintaining a business website.",
    url: canonicalUrl("/guides/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website Planning Guides | ${SITE.brand}`,
    description:
      "Decision-focused guides and checklists for planning, buying, and maintaining a business website.",
    images: ["/og.png"],
  },
};

const GUIDE_GROUPS = GUIDE_CATEGORIES.map((category) => ({
  category,
  id: category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  guides: GUIDES.filter((guide) => guide.category === category).sort(
    (a, b) => a.priority - b.priority
  ),
}));

export default function GuidesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BarbaroTech Website Planning Guides",
    itemListElement: GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: canonicalUrl(`/guides/${guide.slug}/`),
    })),
  };

  return (
    <main className="signal-page">
      <Script
        id="guides-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="signal-hero border-b border-cyan-100/10">
        <Container className="relative z-10 grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-8">
            <p className="signal-kicker">Website decision desk</p>
            <h1 className="display-title mt-6 max-w-[14ch] text-balance">
              Make the website decision before buying the website.
            </h1>
            <p className="signal-copy mt-7 max-w-3xl text-base md:text-lg">
              Practical checklists for choosing a web partner, planning a realistic project, and
              protecting the accounts and systems your business depends on.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <nav className="signal-panel-strong p-6 sm:p-7" aria-label="Guide categories">
              <p className="text-sm font-semibold text-cyan-50">Choose a decision path</p>
              <ul className="mt-5 divide-y divide-cyan-100/10 border-y border-cyan-100/10">
                {GUIDE_GROUPS.map((group) => (
                  <li key={group.id}>
                    <Link
                      href={`#${group.id}`}
                      className="signal-link flex min-h-12 items-center justify-between gap-4 py-3 text-sm font-semibold"
                    >
                      {group.category}
                      <span aria-hidden="true">↓</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </Container>
      </section>

      {GUIDE_GROUPS.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className="signal-section scroll-mt-24 border-b border-cyan-100/10"
          aria-labelledby={`${group.id}-title`}
        >
          <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
            <Reveal className="lg:col-span-4">
              <p className="signal-kicker">Decision path</p>
              <h2 id={`${group.id}-title`} className="section-title mt-5 text-balance">
                {group.category}
              </h2>
              <p className="signal-copy mt-6 max-w-sm text-sm md:text-base">
                {groupIndex === 0
                  ? "Evaluate fit, evidence, working model, and risk before selecting a provider."
                  : groupIndex === 1
                    ? "Turn business needs into a scope, budget, schedule, and approval process."
                    : "Keep control of the website, recurring costs, and future redesign decisions."}
              </p>
            </Reveal>

            <div className="signal-rail border-y border-cyan-100/10 lg:col-span-8">
              {group.guides.map((guide, index) => (
                <Reveal
                  key={guide.slug}
                  delay={index * 65}
                  className="border-b border-cyan-100/10 last:border-b-0"
                >
                  <Link
                    href={`/guides/${guide.slug}/`}
                    className="group grid min-h-40 gap-5 py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:px-2 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10"
                  >
                    <span>
                      <span className="text-xl font-bold text-cyan-50 md:text-2xl">
                        {guide.title}
                      </span>
                      <span className="signal-copy mt-3 block text-sm md:text-base">
                        {guide.description}
                      </span>
                    </span>
                    <span className="signal-link inline-flex min-h-11 items-center gap-2 py-2 font-semibold">
                      Read guide
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="signal-section">
        <Container className="py-16 md:py-24">
          <Reveal>
            <div className="signal-panel-strong grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:p-10">
              <div className="lg:col-span-8">
                <p className="text-sm font-semibold text-cyan-200">Need project-specific advice?</p>
                <h2 className="section-title mt-4 max-w-3xl text-balance">
                  Bring the checklist into a real scope conversation.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                <Link href="/contact/?context=Website%20planning%20question" className="signal-cta min-h-11">
                  Ask Anthony
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/services/"
                  className="signal-link inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-100/20 px-5 py-2.5"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
