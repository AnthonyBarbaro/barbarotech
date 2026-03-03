import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Websites, AI Automation & Full-Stack Development",
  description:
    "BarbaroTech builds high-performance websites, AI-driven automation, and full-stack systems for growing businesses.",
  alternates: {
    canonical: canonicalUrl("/"),
  },
  keywords: withBaseKeywords([
    "AI workflows",
    "web design and development",
    "business website developer",
    "automation systems",
    "freelance web developer",
    "AI automation freelancer",
  ]),
  openGraph: {
    title: `${SITE.brand} | ${SITE.owner}`,
    description:
      "High-performance websites, AI automation, and full-stack business systems built for measurable outcomes.",
    url: canonicalUrl("/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} | ${SITE.owner}`,
    description:
      "High-performance websites, AI automation, and full-stack business systems built for measurable outcomes.",
    images: ["/og.png"],
  },
};

const BANNER_SERVICES = [
  "Websites for local businesses",
  "Shopify and ecommerce enhancements",
  "Platform migrations",
  "Backend dashboards and internal tools",
  "SEO-focused rebuilds",
  "Monthly maintenance and support",
];

const SERVICES = [
  {
    title: "Launch-Ready Websites",
    detail: "Conversion-first websites with clear messaging, structured content, and strong technical SEO.",
  },
  {
    title: "Full-Stack Product Builds",
    detail: "Business systems, internal tools, and APIs designed for reliability and future growth.",
  },
  {
    title: "Remodels for Existing Sites",
    detail: "Improve speed, content hierarchy, and UI quality without replacing your full stack.",
  },
  {
    title: "Ongoing Iteration",
    detail: "Monthly support for fixes, feature upgrades, optimization, and design evolution.",
  },
];

const PROCESS = [
  { step: "01", title: "Align", detail: "Define goals, constraints, and milestones before code starts." },
  { step: "02", title: "Ship", detail: "Design, implement, QA, and launch with clear communication." },
  { step: "03", title: "Scale", detail: "Optimize based on usage data and roadmap priorities." },
];

const HERO_METRICS = [
  { label: "Delivery Style", value: "Lean + Structured" },
  { label: "Quality Bar", value: "Production Ready" },
  { label: "Stack", value: "Next.js + Full-Stack" },
  { label: "Engagement", value: "Build + Ongoing" },
];

const WORKFLOW_SIGNALS = [
  { label: "Architecture", width: "93%" },
  { label: "Performance", width: "96%" },
  { label: "UX Clarity", width: "91%" },
  { label: "Conversion Flow", width: "89%" },
];

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured).slice(0, 3);

export default function HomePage() {
  return (
    <main className="text-slate-900">
      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb left-[-5rem] top-10 h-48 w-48 bg-sky-300/70" />
        <div className="ambient-orb ambient-orb--slow right-[-6rem] top-24 h-56 w-56 bg-blue-300/60" />

        <Container className="relative z-10 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <Reveal className="space-y-8">
              <div className="flex flex-wrap gap-2">
                <Badge>Organized Execution</Badge>
                <Badge>Minimal Interfaces</Badge>
                <Badge>Ambitious Delivery</Badge>
              </div>

              <div className="max-w-4xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  BarbaroTech
                </p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                  Precise structure.
                  <br />
                  Serious outcomes.
                  <br />
                  <span className="text-gradient">Zero unnecessary clutter.</span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                  {SITE.owner} builds high-impact websites and full-stack systems for growing businesses.
                  Every screen is intentional, fast, and designed to move users to action.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/services/" variant="ghost">
                  Freelance Services
                </ButtonLink>
                <ButtonLink href="/projects/">View Projects</ButtonLink>
                <ButtonLink href="/contact/" variant="secondary">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/pricing/" variant="ghost">
                  Explore Pricing
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="glass-panel rounded-3xl border border-slate-900/12 p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-2 border-b border-slate-900/10 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Build Operations</p>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                    Active
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {HERO_METRICS.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{metric.label}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">{metric.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {WORKFLOW_SIGNALS.map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                        <span>{item.label}</span>
                        <span>{item.width}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full border border-slate-900/10 bg-white">
                        <div className="shimmer-line h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-10 rounded-2xl border border-slate-900/12 bg-slate-950 px-4 py-3 text-white md:px-5">
            <div className="ticker">
              <div className="ticker-track">
                {BANNER_SERVICES.map((service, idx) => (
                  <span
                    key={`service-primary-${idx}`}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs md:text-sm"
                  >
                    {service}
                  </span>
                ))}
                {BANNER_SERVICES.map((service, idx) => (
                  <span
                    key={`service-secondary-${idx}`}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs md:text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          <Reveal className="mb-8 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Featured Work
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">Shipped systems with measurable impact.</h2>
            <p className="max-w-2xl text-slate-600">
              Real projects for real businesses. Designed to perform fast, stay maintainable, and scale without chaos.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Reveal className="mb-8 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  What I Build
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">High standards. Minimal surface area.</h2>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {SERVICES.map((service, idx) => (
                  <Reveal key={service.title} delay={idx * 80}>
                    <Card className="h-full">
                      <CardContent className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-600">{service.detail}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal className="mb-8 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Process</p>
                <h2 className="text-3xl font-semibold md:text-4xl">Simple, but strict.</h2>
              </Reveal>

              <div className="space-y-3">
                {PROCESS.map((item, idx) => (
                  <Reveal key={item.step} delay={idx * 90}>
                    <Card className="h-full">
                      <CardContent className="space-y-3">
                        <div className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {item.step}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.detail}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <div className="ambient-orb left-[20%] bottom-[-4rem] h-44 w-44 bg-sky-300/70" />
        <Container className="relative z-10 py-14 md:py-16">
          <Reveal>
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Next Step
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    Want your platform to look this intentional?
                  </h3>
                  <p className="max-w-2xl text-slate-600">
                    Send your goals and current setup. You will get a clear roadmap, realistic timeline, and scoped quote.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact/">Contact</ButtonLink>
                  <ButtonLink href="/projects/" variant="secondary">
                    View More Work
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
