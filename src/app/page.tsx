import { Container } from "@/components/container";
import { SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LinkedInBadge } from "@/components/LinkedInBadge";

const SERVICES = [
  { label: "Static Websites", detail: "Ultra-fast brochure sites with clean design, SEO structure, and clear CTAs." },
  { label: "Smoke Shops", detail: "Menu/brands, age-gate options, promos, hours + map, built for mobile conversions." },
  { label: "Gas Stations", detail: "Service blocks, fuel options, promos, multi-location support if needed." },
  { label: "Liquor Stores", detail: "Premium look, featured picks, special order inquiries, local SEO layout." },
  { label: "Backend / Server Apps", detail: "Auth, dashboards, admin tools, APIs, hosted on Vercel with monitoring." },
  { label: "Maintenance Plans", detail: "Monthly updates, content edits, and support so your site stays sharp." },
];

const SKILLS = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
  backend: ["Node.js", "REST APIs", "Authentication", "PostgreSQL / SQL", "Prisma or ORM-based data"],
  tooling: ["Git & GitHub", "Vercel", "Linux / CLI", "Performance & Lighthouse", "SEO & analytics basics"],
};

const BANNER_SERVICES = [
  "Static sites for local businesses",
  "Shopify & ecommerce upgrades",
  "Existing website remodels",
  "Backend dashboards & tools",
  "Local SEO‑ready layouts",
  "Ongoing maintenance & support",
];

export default function Home() {
  return (
    <main className="bg-transparent">
      {/* TOP SERVICE BANNER */}
      <section className="border-b border-black/10 bg-gradient-to-r from-black via-sky-950 to-black text-white">
        <Container className="py-2.5 flex flex-wrap items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-sky-400 motion-safe:animate-pulse" />
            <span className="font-medium">
              Available for freelance & contract work
            </span>
          </div>

          <div className="flex-1 min-w-[220px]">
            <div className="service-ticker">
              <div className="service-ticker-track">
                {BANNER_SERVICES.map((text, idx) => (
                  <span
                    key={`a-${idx}`}
                    className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] md:text-xs"
                  >
                    {text}
                  </span>
                ))}
                {BANNER_SERVICES.map((text, idx) => (
                  <span
                    key={`b-${idx}`}
                    className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] md:text-xs"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HERO */}
      <section className="border-b border-black/10 bg-gradient-to-b from-white via-sky-50 to-zinc-50">
        <Container className="py-16 md:py-20 grid gap-10 items-center md:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-6 motion-safe:animate-fade-up">
            <div className="flex flex-wrap gap-2">
              <Badge>Black & White</Badge>
              <Badge>SEO-first</Badge>
              <Badge>Fast inquiries (vtext)</Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-black">
                {SITE.headline}
              </h1>

              {/* subtle accent line under heading */}
              <div className="h-px w-28 bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />

              {/* small “resume” intro line */}
              <p className="text-sm font-medium text-black/70">
                {SITE.owner} — Software developer focused on clean, production‑ready
                Next.js, TypeScript, and modern UI for real businesses.
              </p>
            </div>

            <p className="text-black/70 max-w-xl">
              I build modern websites that load fast, look premium, and turn visitors into customers.
              Need backend features? I can build full‑stack apps hosted on Vercel with monthly support options.
            </p>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects">View Projects</ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                Pricing
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Get a quote →
              </ButtonLink>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-sm text-black/60">
              <div>
                <span className="font-medium text-black">Speed:</span>{" "}
                Lighthouse‑friendly builds
              </div>
              <div>
                <span className="font-medium text-black">UX:</span>{" "}
                clean layouts + CTAs
              </div>
              <div>
                <span className="font-medium text-black">Support:</span>{" "}
                one‑time or monthly
              </div>
            </div>
          </div>

          <div className="motion-safe:animate-fade-in">
            <div className="relative w-full max-w-sm mx-auto">
              {/* glow */}
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-200/60 via-zinc-200/80 to-transparent blur-xl" />

              <div className="relative rounded-2xl border border-black/10 bg-black shadow-lg p-3 flex justify-center">
                <LinkedInBadge />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES (CLIENT FACING) */}
      <section className="border-b border-black/10 bg-zinc-50">
        <Container className="py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">What BarbaroTech builds</h2>
            <p className="text-black/70 max-w-2xl">
              Clear packages for local businesses — plus scalable backend builds when you need real functionality.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {SERVICES.map((s) => (
              <Card
                key={s.label}
                className="bg-white border border-black/5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-sky-300/70"
              >
                <CardContent className="p-6 space-y-2">
                  <div className="text-sm font-semibold text-black">{s.label}</div>
                  <div className="text-sm text-black/70">{s.detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SKILLS / STACK (RESUME-STYLE) */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">Skills & Stack</h2>
          <p className="text-black/70 max-w-2xl text-sm">
              A modern JavaScript stack focused on shipping maintainable, production‑ready code for the web.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white border border-black/5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 space-y-3">
                <div className="text-sm font-semibold text-black">Frontend</div>
                <ul className="space-y-1.5 text-sm text-black/70">
                  {SKILLS.frontend.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 space-y-3">
                <div className="text-sm font-semibold text-black">Backend</div>
                <ul className="space-y-1.5 text-sm text-black/70">
                  {SKILLS.backend.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black/5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 space-y-3">
                <div className="text-sm font-semibold text-black">Tooling & Ops</div>
                <ul className="space-y-1.5 text-sm text-black/70">
                  {SKILLS.tooling.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-white via-sky-50 to-white">
        <Container className="py-12">
          <div className="rounded-2xl border border-black/10 bg-white/85 backdrop-blur p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-sm">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-black">Want a clean quote fast?</h3>
              <p className="text-black/70">
                Tell me your business type and what you want built. I’ll respond with the best‑fit package and next steps.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ButtonLink href="/pricing">View pricing</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get a quote →
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
