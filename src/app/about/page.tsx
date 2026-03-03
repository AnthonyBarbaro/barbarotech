import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/site";
import { canonicalUrl, estimateWordCount, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Anthony Barbaro",
  description:
    "About Anthony Barbaro, software engineer focused on AI-powered automation, modern websites, and full-stack business systems.",
  alternates: {
    canonical: canonicalUrl("/about/"),
  },
  keywords: withBaseKeywords([
    "about Anthony Barbaro",
    "AI automation engineer",
    "software engineer profile",
    "San Diego developer",
  ]),
  openGraph: {
    title: `About ${SITE.owner} | ${SITE.brand}`,
    description:
      "Learn about Anthony Barbaro's AI automation, full-stack engineering, and modern web delivery experience.",
    url: canonicalUrl("/about/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE.owner} | ${SITE.brand}`,
    description:
      "Learn about Anthony Barbaro's AI automation, full-stack engineering, and modern web delivery experience.",
    images: ["/og.png"],
  },
};

const linkedinHref =
  SITE.socials.find((social) => social.label.toLowerCase().includes("linkedin"))?.href ||
  "https://www.linkedin.com";

const HIGHLIGHTS = [
  {
    label: "Primary Focus",
    value: "AI automation + high-converting web systems",
  },
  {
    label: "Based In",
    value: "San Diego, California",
  },
  {
    label: "Delivery Style",
    value: "Fast execution with production-quality standards",
  },
  {
    label: "Best Known For",
    value: "Turning manual workflows into AI-assisted systems",
  },
];

const AI_EXPERTISE = [
  {
    title: "AI Workflow Automation",
    detail:
      "Designing workflows where AI reduces repetitive operations, improves data handling, and shortens response loops.",
  },
  {
    title: "AI-Enhanced Internal Tools",
    detail:
      "Building internal dashboards and tooling that combine clean UX with practical AI assistance for teams.",
  },
  {
    title: "Data + API Integrations",
    detail:
      "Connecting AI workflows to CRM, inventory, Google, and backend systems so outputs are actually usable in operations.",
  },
  {
    title: "Practical AI Delivery",
    detail:
      "Shipping AI features in a focused way: stable, measurable, and tied to business outcomes instead of hype.",
  },
];

const STACK = {
  aiAndAutomation: ["Python", "Workflow automation", "API orchestration", "Prompt-driven process tooling"],
  frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "REST APIs", "Authentication", "SQL / PostgreSQL"],
  deployment: ["Vercel", "AWS", "GitHub Actions", "Monitoring and QA"],
};

const EXPERIENCE = [
  {
    title: "Admin & Developer",
    company: "Hilife Group",
    period: "June 2024 - Present",
    bullets: [
      "Built and maintained internal systems tied to POS and inventory operations.",
      "Automated recurring reporting and reduced manual coordination overhead.",
      "Owned issue triage, reliability fixes, and feature delivery across business workflows.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Marcus & Millichap",
    period: "Oct 2022 - May 2023",
    bullets: [
      "Shipped CRM and data workflow automation using Python and APIs.",
      "Improved data consistency and removed repetitive manual process steps.",
      "Delivered production-facing internal tools with practical team adoption.",
    ],
  },
];

const ABOUT_WORD_COUNT = estimateWordCount([
  ...HIGHLIGHTS.map((item) => `${item.label} ${item.value}`),
  ...AI_EXPERTISE.map((item) => `${item.title} ${item.detail}`),
  ...EXPERIENCE.flatMap((item) => [item.title, item.company, ...item.bullets]),
  ...Object.values(STACK).flat(),
]);

export default function AboutPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl("/about/"),
    name: `About ${SITE.owner}`,
    inLanguage: "en",
    wordCount: ABOUT_WORD_COUNT,
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    mainEntity: {
      "@type": "Person",
      name: SITE.owner,
      url: canonicalUrl("/about/"),
      sameAs: SITE.socials.map((social) => social.href),
      knowsAbout: [
        "AI automation",
        "full-stack web development",
        "software engineering",
        "workflow optimization",
      ],
    },
  };

  return (
    <main className="text-slate-900">
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb left-[-4rem] top-14 h-48 w-48 bg-sky-300/75" />
        <Container className="relative z-10 py-16 md:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge>Software Engineer</Badge>
                <Badge>AI + Automation Focus</Badge>
                <Badge>Full-Stack Delivery</Badge>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">About</p>
                <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                  I design and ship systems
                  <br />
                  <span className="text-gradient">where AI and engineering drive real outcomes.</span>
                </h1>
                <p className="max-w-2xl text-slate-600">
                  I&apos;m {SITE.owner}. I build modern websites, automation pipelines, and internal tools with
                  a strong emphasis on clarity, speed, and maintainable architecture.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects/">View Projects</ButtonLink>
                <ButtonLink href={linkedinHref} variant="secondary">
                  LinkedIn Profile
                </ButtonLink>
                <ButtonLink href="/contact/" variant="ghost">
                  Work With Me
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="glass-panel rounded-3xl p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-900/10">
                  <Image
                    src={SITE.assets.headshot}
                    alt={`${SITE.owner} headshot`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-3 rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Professional Profile</p>
                  <p className="mt-1 text-sm text-slate-600">
                    View experience, endorsements, and background details directly on LinkedIn.
                  </p>
                  <ButtonLink href={linkedinHref} variant="secondary" className="mt-3 w-full">
                    Open LinkedIn
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((item, idx) => (
              <Reveal key={item.label} delay={idx * 70}>
                <div className="glass-panel h-full rounded-2xl px-4 py-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{item.label}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{item.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          <Reveal className="mb-7 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">AI Expertise</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Where I apply AI in real projects</h2>
            <p className="max-w-2xl text-slate-600">
              I focus on practical AI implementation for business operations, not abstract demos.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {AI_EXPERTISE.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 70}>
                <Card className="h-full">
                  <CardContent className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          <Reveal className="mb-8 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Experience</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Recent delivery experience</h2>
          </Reveal>

          <div className="space-y-5">
            {EXPERIENCE.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 90}>
                <Card>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.company}</p>
                      </div>
                      <span className="rounded-full border border-slate-900/10 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {item.period}
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-14 md:py-16">
          <Reveal className="mb-8 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Core Stack</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Tools I use to ship quickly</h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(STACK).map(([category, items], idx) => (
              <Reveal key={category} delay={idx * 70}>
                <Card className="h-full">
                  <CardContent className="space-y-3">
                    <h3 className="text-base font-semibold capitalize text-slate-900">
                      {category.replace(/([A-Z])/g, " $1")}
                    </h3>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell">
        <Container className="py-14 md:py-16">
          <Reveal>
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Let&apos;s Build</p>
                  <h3 className="text-2xl font-semibold md:text-3xl">
                    Need a developer with AI + full-stack execution skills?
                  </h3>
                  <p className="max-w-2xl text-slate-600">
                    I can help with websites, automations, internal tools, and scalable product systems.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/contact/">Start a Conversation</ButtonLink>
                  <ButtonLink href={linkedinHref} variant="secondary">
                    Connect on LinkedIn
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
