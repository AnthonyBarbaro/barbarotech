import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { CallBookingForm } from "@/components/call-booking-form";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";
import { isContactIntakeEnabled } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote or book a call for websites, remodels, and full-stack work.",
  alternates: {
    canonical: canonicalUrl("/contact/"),
  },
  keywords: withBaseKeywords([
    "contact web developer",
    "book developer call",
    "request project quote",
    "BarbaroTech contact",
  ]),
  openGraph: {
    title: `Contact | ${SITE.brand}`,
    description: "Request a quote or book a call for websites, remodels, and full-stack project work.",
    url: canonicalUrl("/contact/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${SITE.brand}`,
    description: "Request a quote or book a call for websites, remodels, and full-stack project work.",
    images: ["/og.png"],
  },
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function getValue(input: string | string[] | undefined) {
  if (Array.isArray(input)) return input[0] ?? "";
  return input ?? "";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolved = await Promise.resolve(searchParams ?? {});
  const defaultPlan = getValue(resolved.plan);
  const context = getValue(resolved.context) || defaultPlan || "General inquiry";
  const contactIntakeEnabled = isContactIntakeEnabled();

  return (
    <main className="text-slate-900">
      <section className="section-shell border-b border-slate-900/10">
        <div className="ambient-orb right-[-4rem] top-12 h-52 w-52 bg-sky-300/70" />
        <Container className="relative z-10 py-16 md:py-20">
          <Reveal className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Let&apos;s make your next project
              <br />
              <span className="text-gradient">look and perform better.</span>
            </h1>
            <p className="max-w-2xl text-slate-600">
              Share what you need built or improved. You will get a direct response with scope, timeline, and pricing guidance.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-slate-900/10">
        <Container className="py-12 md:py-14">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <Reveal>
                <Card>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold text-slate-900">Request a Quote</h2>
                      <p className="text-sm text-slate-600">
                        Fill this out and I&apos;ll reply directly. If you came from a package page, it is already prefilled.
                      </p>
                    </div>
                    {contactIntakeEnabled ? (
                      <ContactForm defaultPlan={defaultPlan} />
                    ) : (
                      <div className="rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        Contact forms are temporarily paused. For now, email
                        {" "}
                        <a className="font-semibold underline" href={`mailto:${SITE.contact.fallbackEmail}`}>
                          {SITE.contact.fallbackEmail}
                        </a>
                        {" "}
                        or call
                        {" "}
                        <a className="font-semibold underline" href={`tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`}>
                          {SITE.contact.displayPhone}
                        </a>
                        .
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={80}>
                <Card id="book-call" className="overflow-hidden">
                  <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-slate-900/10 bg-gradient-to-r from-slate-900 to-cyan-950 px-4 py-3 text-white">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold md:text-xl">Book a Call</h3>
                        <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100">
                          Built-in Scheduler
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-slate-200">
                        Choose date + time
                      </p>
                    </div>
                    {contactIntakeEnabled ? (
                      <CallBookingForm context={context} />
                    ) : (
                      <div className="rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        Call booking is temporarily unavailable. Use direct email or phone in the contact panel
                        and we can schedule manually.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            </div>

            <div className="space-y-5">
              <Reveal delay={120}>
                <Card>
                  <CardContent className="space-y-2 text-sm text-slate-600">
                    <h3 className="text-base font-semibold text-slate-900">Direct Contact</h3>
                    <p>
                      <span className="font-semibold text-slate-900">Phone:</span> {SITE.contact.displayPhone}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Email:</span> {SITE.contact.fallbackEmail}
                    </p>
                    <p className="pt-1 text-xs text-slate-500">
                      {contactIntakeEnabled
                        ? "Form submissions are delivered by email immediately and include all details you provide."
                        : "Forms are currently paused. Use phone or direct email and I will reply manually."}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={180}>
                <Card>
                  <CardContent className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-900">Typical Process</h3>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>Quick review of your goals and current setup.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>Clear scope, timeline, and quote.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>Build, review, launch, and optional support.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={240}>
                <Card>
                  <CardContent className="space-y-2 text-sm text-slate-600">
                    <h3 className="text-base font-semibold text-slate-900">What Happens After Booking</h3>
                    <ul className="space-y-1.5">
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>You receive a confirmation response by email.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>I confirm the exact slot or send the closest available time.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                        <span>We use the call to define scope, timing, and next-step recommendations.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
