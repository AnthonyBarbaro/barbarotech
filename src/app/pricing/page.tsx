import { Container } from "@/components/container";
import { PRICING } from "@/data/pricing";
import { PricingCard } from "@/components/pricing-card";

export const metadata = {
  title: "Pricing | BarbaroTech",
  description:
    "Transparent pricing for websites, local business pages, and full-stack backend apps. One-time builds or monthly support options.",
};

export default function PricingPage() {
  return (
    <main className="bg-white text-black">
      {/* HEADER */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Pricing
          </h1>
          <p className="text-black/70 max-w-2xl text-sm md:text-base">
            Simple, transparent pricing for websites and backend applications.
            Choose one-time builds or monthly support for updates & maintenance.
          </p>
        </Container>
      </section>

      {/* STATIC WEBSITE PACKAGES */}
      <section className="border-b border-black/10 bg-zinc-50">
        <Container className="py-14 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">
              Static Websites
            </h2>
            <p className="text-black/70 max-w-2xl text-sm">
              Fast, modern websites optimized for smoke shops, liquor stores,
              gas stations, and general service businesses.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING.staticWebsites.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </Container>
      </section>

      {/* BACKEND PACKAGES */}
      <section className="border-b border-black/10 bg-white">
        <Container className="py-14 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black">
              Backend / Full-Stack Apps
            </h2>
            <p className="text-black/70 max-w-2xl text-sm">
              For businesses that need functionality — logins, databases,
              dashboards, admin tools, automation, APIs, and recurring updates.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {PRICING.backendWebsites.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="pt-4">
            <p className="text-center text-black/60 text-xs md:text-sm">
              * Final pricing depends on features, integrations, and timeline.{" "}
              You’ll get a clear written quote before any work starts.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <Container className="py-14">
          <div className="rounded-2xl border border-black/10 bg-zinc-50 p-8 md:p-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-black">
                Not sure which package fits?
              </h3>
              <p className="text-black/70 text-sm">
                Tell me your business type + what you&apos;re trying to build.
                I’ll respond with the best plan and a clean quote.
              </p>
            </div>

            <a
              href={`mailto:${process.env.NEXT_PUBLIC_TEXT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-black text-white hover:bg-black/90 text-sm font-medium shadow-sm transition"
            >
              Text for a Quote →
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
