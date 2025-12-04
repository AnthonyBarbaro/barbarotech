import { Container } from "@/components/container";
import { SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  { label: "Static Websites", detail: "Ultra-fast brochure sites with clean design, SEO structure, and clear CTAs." },
  { label: "Smoke Shops", detail: "Menu/brands, age-gate options, promos, hours + map, built for mobile conversions." },
  { label: "Gas Stations", detail: "Service blocks, fuel options, promos, multi-location support if needed." },
  { label: "Liquor Stores", detail: "Premium look, featured picks, special order inquiries, local SEO layout." },
  { label: "Backend / Server Apps", detail: "Auth, dashboards, admin tools, APIs, hosted on Vercel with monitoring." },
  { label: "Maintenance Plans", detail: "Monthly updates, content edits, and support so your site stays sharp." },
];

export default function Home() {
  return (
    <main className="bg-transparent">
      {/* HERO */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-16 md:py-20 grid gap-10 items-center md:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-6 motion-safe:animate-fade-up">
            <div className="flex flex-wrap gap-2">
              <Badge>Black & White</Badge>
              <Badge>SEO-first</Badge>
              <Badge>Fast inquiries (vtext)</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-black">
              {SITE.headline}
            </h1>

            <p className="text-black/70 max-w-xl">
              I build modern websites that load fast, look premium, and turn visitors into customers.
              Need backend features? I can build full-stack apps hosted on Vercel with monthly support options.
            </p>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects">View Projects</ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                Pricing
              </ButtonLink>
              <ButtonLink href="/contact?ref=home" variant="ghost">
              Get a quote →
            </ButtonLink>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-sm text-black/60">
              <div><span className="font-medium text-black">Speed:</span> Lighthouse-friendly builds</div>
              <div><span className="font-medium text-black">UX:</span> clean layouts + CTAs</div>
              <div><span className="font-medium text-black">Support:</span> one-time or monthly</div>
            </div>
          </div>

          <div className="motion-safe:animate-fade-in">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm">
              <Image
                src={SITE.assets.headshot}
                alt={`${SITE.owner} headshot`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
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
              <Card key={s.label} className="bg-white">
                <CardContent className="p-6 space-y-2">
                  <div className="text-sm font-semibold text-black">{s.label}</div>
                  <div className="text-sm text-black/70">{s.detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <Container className="py-12">
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-black">Want a clean quote fast?</h3>
              <p className="text-black/70">
                Text me your business type + what you want built, and I’ll respond with the best-fit package.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ButtonLink href="/pricing">View pricing</ButtonLink>
              <ButtonLink href="/contact?ref=home" variant="secondary">
              Get a quote →
            </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
