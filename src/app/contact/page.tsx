import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { CallBookingForm } from "@/components/call-booking-form";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
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
    description: "Request a quote or book a call for websites, custom software, remodels, and full-stack project work.",
    url: canonicalUrl("/contact/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${SITE.brand}`,
    description: "Request a quote or book a call for websites, custom software, remodels, and full-stack project work.",
    images: ["/og.png"],
  },
};

export default function ContactPage() {
  const contactIntakeEnabled = isContactIntakeEnabled();
  const formFallback = (
    <div className="rounded-xl border border-cyan-100/15 bg-[#07111d] px-4 py-3 text-sm text-slate-300">
      Loading form…
    </div>
  );

  return (
    <main className="signal-page">
      <section className="signal-hero">
        <Container className="relative z-10 grid min-h-[calc(82svh-5rem)] items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="space-y-7 lg:col-span-7">
            <p className="signal-kicker">Contact Anthony directly</p>
            <div className="space-y-5">
              <h1 className="display-title max-w-[12ch]">
                Bring me the problem. Leave with a clear next step.
              </h1>
              <p className="signal-copy max-w-[62ch] text-lg md:text-xl">
                Share what you need built or improved. I&apos;ll reply directly with scope, timeline, and pricing guidance.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#request-quote" className="signal-cta min-h-11">
                Request a Quote
              </ButtonLink>
              <ButtonLink
                href="#book-call"
                variant="secondary"
                className="min-h-11 !border-cyan-200/25 !bg-[#07111d] !text-cyan-50 !shadow-none hover:!border-cyan-200/50"
              >
                Book a Call
              </ButtonLink>
              <ButtonLink
                href="/pricing/"
                variant="ghost"
                className="min-h-11 !border-transparent !bg-transparent !text-sky-200 hover:!bg-cyan-300/10 hover:!text-cyan-50"
              >
                Compare Pricing
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <aside className="signal-panel-strong relative overflow-hidden p-6 md:p-7" aria-labelledby="direct-contact-title">
              <div className="mb-8 flex items-center gap-3" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.75)]" />
                <span className="h-px flex-1 bg-cyan-100/20" />
                <span className="text-xs font-semibold text-cyan-200">Direct line</span>
              </div>
              <h2 id="direct-contact-title" className="text-2xl font-semibold text-cyan-50">
                No sales maze.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Prefer not to use a form? Email or call me directly. You&apos;ll be talking with the person doing the work.
              </p>
              <address className="mt-7 space-y-1 not-italic">
                <a
                  href={`mailto:${SITE.contact.fallbackEmail}`}
                  className="signal-link flex min-h-11 items-center text-base font-semibold"
                >
                  {SITE.contact.fallbackEmail}
                </a>
                <a
                  href={`tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`}
                  className="signal-link flex min-h-11 items-center text-base font-semibold"
                >
                  {SITE.contact.displayPhone}
                </a>
              </address>
              <p className="mt-5 border-t border-cyan-100/10 pt-5 text-xs leading-6 text-slate-400">
                {contactIntakeEnabled
                  ? "Form submissions are delivered by email immediately and include all details you provide."
                  : "Forms are currently paused. Use phone or direct email and I will reply manually."}
              </p>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section id="request-quote" className="signal-section scroll-mt-20 border-t border-cyan-100/10">
        <Container>
          <Reveal className="mb-10 max-w-3xl space-y-4">
            <h2 className="section-title">Start with the project.</h2>
            <p className="signal-copy">
              Tell me what should change and what success looks like. If you arrived from a package page, your selection
              is already prefilled.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-8">
              <div className="signal-panel-strong overflow-hidden p-2 sm:p-3">
                <div className="flex flex-col gap-2 px-3 pb-5 pt-3 sm:flex-row sm:items-end sm:justify-between sm:px-5">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-50">Request a Quote</h3>
                    <p className="mt-1 text-sm text-slate-300">The details below help me make the first reply useful.</p>
                  </div>
                  <span className="signal-chip self-start sm:self-auto">Reply from Anthony</span>
                </div>
                <div className="rounded-xl border border-cyan-100/10 bg-[#02060b]/70 p-4 text-slate-100 sm:p-6">
                  {contactIntakeEnabled ? (
                    <Suspense fallback={formFallback}>
                      <ContactForm />
                    </Suspense>
                  ) : (
                    <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                      Contact forms are temporarily paused. For now, email{" "}
                      <a className="font-semibold underline" href={`mailto:${SITE.contact.fallbackEmail}`}>
                        {SITE.contact.fallbackEmail}
                      </a>{" "}
                      or call{" "}
                      <a
                        className="font-semibold underline"
                        href={`tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`}
                      >
                        {SITE.contact.displayPhone}
                      </a>
                      .
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-4">
              <aside className="signal-panel p-6" aria-labelledby="starting-points-title">
                <h3 id="starting-points-title" className="text-xl font-semibold text-cyan-50">
                  You do not need the exact package.
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Pick the closest option in the form—or choose “Not sure yet.” I&apos;ll match
                  the project to the right starting point.
                </p>
                <div className="mt-6 border-y border-cyan-100/10">
                  {[
                    "What your business does",
                    "What the website should help visitors do",
                    "Any must-have pages or tools",
                    "Your preferred launch timing",
                  ].map((item) => (
                    <p key={item} className="py-3 text-sm leading-6 text-slate-400">
                      {item}
                    </p>
                  ))}
                </div>
                <ButtonLink href="/pricing/" variant="secondary" className="mt-6 w-full">
                  View simple pricing
                </ButtonLink>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="signal-section border-y border-cyan-100/10">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <h2 className="section-title max-w-[10ch]">A straight line from idea to launch.</h2>
            <p className="signal-copy mt-5">
              You always know what happens next, whether you start with a quote or a call.
            </p>
          </Reveal>

          <div className="signal-rail grid overflow-hidden rounded-2xl border border-cyan-100/10 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
            <Reveal className="border-b border-cyan-100/10 p-6 md:border-b-0 md:border-r md:p-8">
              <h3 className="text-lg font-semibold text-cyan-50">Typical Process</h3>
              <ol className="mt-6 space-y-5">
                {[
                  "Quick review of your goals and current setup.",
                  "Clear scope, timeline, and quote.",
                  "Build, review, launch, and monthly care.",
                ].map((step, idx) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-slate-300">
                    <span className="text-sm font-semibold text-cyan-200">{idx + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={80} className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-cyan-50">What Happens After Booking</h3>
              <ol className="mt-6 space-y-5">
                {[
                  "You receive a confirmation response by email.",
                  "I confirm the exact slot or send the closest available time.",
                  "The call defines scope, timing, and next-step recommendations.",
                ].map((step, idx) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-slate-300">
                    <span className="text-sm font-semibold text-cyan-200">{idx + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="book-call" className="signal-section scroll-mt-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="space-y-5 lg:col-span-4">
            <h2 className="section-title max-w-[9ch]">Pick a time that works.</h2>
            <p className="signal-copy max-w-[48ch]">
              Choose a date, timezone, and call format. I&apos;ll confirm the exact slot or send the closest available time.
            </p>
            <div className="signal-rule max-w-40" />
            <p className="text-sm leading-6 text-slate-300">
              Need to schedule manually? Email{" "}
              <a className="signal-link font-semibold" href={`mailto:${SITE.contact.fallbackEmail}`}>
                {SITE.contact.fallbackEmail}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <div className="signal-panel-strong overflow-hidden p-2 sm:p-3">
              <div className="flex flex-col gap-2 px-3 pb-5 pt-3 sm:flex-row sm:items-end sm:justify-between sm:px-5">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-50">Book a Call</h3>
                  <p className="mt-1 text-sm text-slate-300">Choose date, time, and meeting type.</p>
                </div>
                <span className="signal-chip self-start sm:self-auto">Call request</span>
              </div>
              <div className="rounded-xl border border-cyan-100/10 bg-[#02060b]/70 p-4 text-slate-100 sm:p-6">
                {contactIntakeEnabled ? (
                  <Suspense fallback={formFallback}>
                    <CallBookingForm />
                  </Suspense>
                ) : (
                  <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
                    Call booking is temporarily unavailable. Use direct email or phone in the contact panel and I can
                    schedule it manually.
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
