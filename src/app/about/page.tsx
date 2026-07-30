import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Anthony Barbaro",
  description:
    "Meet Anthony Barbaro, the independent developer behind BarbaroTech. Work directly with one builder from the first conversation through launch and ongoing care.",
  alternates: {
    canonical: canonicalUrl("/about/"),
  },
  keywords: withBaseKeywords([
    "about Anthony Barbaro",
    "independent web developer",
    "San Diego web developer",
    "solo website studio",
    "BarbaroTech",
  ]),
  openGraph: {
    title: `About ${SITE.owner} | ${SITE.brand}`,
    description:
      "Work directly with Anthony Barbaro on websites, stores, automation, and practical business software.",
    url: canonicalUrl("/about/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE.owner} | ${SITE.brand}`,
    description:
      "Work directly with Anthony Barbaro on websites, stores, automation, and practical business software.",
    images: ["/og.png"],
  },
};

const DIRECT_ADVANTAGES = [
  {
    title: "One point of contact",
    detail:
      "You talk directly with the person planning, designing, and building the work.",
  },
  {
    title: "Connected decisions",
    detail:
      "Your message, design, technology, and next steps are shaped together instead of passed between teams.",
  },
  {
    title: "Care after launch",
    detail:
      "I stay responsible for hosting, maintenance, and practical improvements after the website goes live.",
  },
];

const PROCESS = [
  {
    title: "Start with the goal",
    detail:
      "Tell me what you need, what is not working, and what a successful launch should change.",
  },
  {
    title: "Build the clearest version",
    detail:
      "I recommend the right package, define the scope, and handle the design and development.",
  },
  {
    title: "Launch with support",
    detail:
      "We test the important paths, launch the site, and keep it maintained through the care plan.",
  },
];

const EXPERIENCE = [
  {
    role: "Admin & Developer",
    company: "Hilife Group",
    period: "June 2024–Present",
    proof:
      "Operational systems connected to POS, inventory, reporting, and day-to-day team workflows.",
  },
  {
    role: "Software Engineering Intern",
    company: "Marcus & Millichap",
    period: "October 2022–May 2023",
    proof:
      "CRM and data-workflow automation built with Python and APIs for internal operations.",
  },
];

export default function AboutPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl("/about/"),
    name: `About ${SITE.owner}`,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
      alternateName: SITE.brand,
      url: canonicalUrl("/about/"),
    },
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE.url}/about/#person`,
      name: SITE.owner,
      url: canonicalUrl("/about/"),
      sameAs: SITE.socials.map((social) => social.href),
      knowsAbout: [
        "website design and development",
        "ecommerce development",
        "software engineering",
        "workflow automation",
        "business systems",
      ],
    },
  };

  return (
    <main className="signal-page">
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <section className="signal-hero">
        <Container className="relative z-10 grid items-center gap-12 py-16 md:py-24 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-12 lg:gap-8">
          <div className="space-y-7 lg:col-span-7">
            <p className="signal-kicker">Anthony Barbaro · BarbaroTech</p>
            <div className="space-y-5">
              <h1 className="display-title max-w-[13ch] text-balance">
                Your website stays clear because the process stays direct.
              </h1>
              <p className="signal-copy max-w-[62ch] text-lg md:text-xl">
                I&apos;m Anthony, the independent developer behind BarbaroTech. You work
                directly with me from the first conversation through design, development,
                launch, and ongoing care.
              </p>
            </div>

            <ButtonLink href="/contact/?intent=quote" className="signal-cta min-h-11">
              Request a quote
            </ButtonLink>

            <div className="signal-rule max-w-xl" />
            <ul className="flex flex-wrap gap-2" aria-label="Studio details">
              <li className="signal-chip">Solo studio</li>
              <li className="signal-chip">San Diego, California</li>
              <li className="signal-chip">Websites, stores, and software</li>
            </ul>
          </div>

          <figure className="signal-panel-strong relative overflow-hidden p-3 sm:p-4 lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#02060b]">
              <Image
                src={SITE.assets.headshot}
                alt={`${SITE.owner}, the developer behind BarbaroTech`}
                fill
                className="object-cover"
                priority
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#02060b] to-transparent"
                aria-hidden="true"
              />
            </div>
            <figcaption className="relative -mt-10 px-3 pb-3 sm:px-5">
              <p className="text-sm font-semibold text-cyan-200">
                One accountable builder
              </p>
              <p className="mt-2 max-w-[36ch] text-sm leading-6 text-slate-300">
                No account manager, handoff, or mystery about who is doing the work.
              </p>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="signal-section border-y border-cyan-100/10">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-4">
            <h2 className="section-title max-w-[11ch] text-balance">
              Why work directly with me?
            </h2>
            <p className="signal-copy max-w-[48ch]">
              Small-business projects move faster when the person giving advice is also
              responsible for the final result.
            </p>
          </div>

          <dl className="signal-rail overflow-hidden rounded-2xl border border-cyan-100/10 lg:col-span-7 lg:col-start-6">
            {DIRECT_ADVANTAGES.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-b border-cyan-100/10 p-6 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:p-7"
              >
                <dt className="text-lg font-semibold text-cyan-50">{item.title}</dt>
                <dd className="text-sm leading-7 text-slate-300">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-3xl space-y-4">
            <h2 className="section-title text-balance">
              A simple path from idea to launch.
            </h2>
            <p className="signal-copy">
              You do not need to know every feature before reaching out. We start with the
              business goal and shape the right build from there.
            </p>
          </div>

          <ol className="signal-rail grid overflow-hidden rounded-2xl border border-cyan-100/10 md:grid-cols-3">
            {PROCESS.map((item, index) => (
              <li
                key={item.title}
                className="border-b border-cyan-100/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/30 text-sm font-semibold text-cyan-200"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="mt-7 text-xl font-semibold text-cyan-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="signal-section border-y border-cyan-100/10">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-4">
            <h2 className="section-title max-w-[10ch] text-balance">
              Real technical experience behind the offer.
            </h2>
            <p className="signal-copy max-w-[48ch]">
              BarbaroTech combines customer-facing website work with hands-on experience
              building the operational systems businesses rely on.
            </p>
            <Link
              href="/projects/"
              className="signal-link inline-flex min-h-11 items-center text-sm font-semibold"
            >
              See selected projects →
            </Link>
          </div>

          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            {EXPERIENCE.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="border-b border-cyan-100/10 pb-8 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-50">{item.role}</h3>
                    <p className="mt-1 text-sm font-semibold text-cyan-200">
                      {item.company}
                    </p>
                  </div>
                  <span className="signal-chip shrink-0">{item.period}</span>
                </div>
                <p className="mt-4 max-w-[62ch] text-sm leading-7 text-slate-300">
                  {item.proof}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="signal-section">
        <Container className="py-16 md:py-24">
          <div className="signal-panel-strong grid gap-8 p-7 md:p-10 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-8">
              <h2 className="section-title max-w-[17ch] text-balance">
                Bring me the goal. I&apos;ll help define the right build.
              </h2>
              <p className="signal-copy max-w-[62ch]">
                Share what you need, what is not working, and the timeline you have in
                mind. I&apos;ll reply directly with the clearest next step.
              </p>
            </div>
            <div className="lg:col-span-4">
              <ButtonLink
                href="/contact/?intent=quote"
                className="signal-cta min-h-11 w-full"
              >
                Request a quote
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
