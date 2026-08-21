import type { Metadata } from "next";
import { Suspense } from "react";
import { CallBookingForm } from "@/components/call-booking-form";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { isContactIntakeEnabled } from "@/lib/flags";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";
import { SITE } from "@/lib/site";

const CONTACT_DESCRIPTION =
  "Request a free custom website demo from BarbaroTech. See a tailored direction for your business before deciding whether to move forward.";

export const metadata: Metadata = {
  title: "Free Custom Website Demo",
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/contact/") },
  keywords: withBaseKeywords([
    "free custom website demo",
    "custom website design San Diego",
    "contact web developer",
    "website design consultation",
    "BarbaroTech contact",
  ]),
  openGraph: {
    title: `Free Custom Website Demo | ${SITE.brand}`,
    description: CONTACT_DESCRIPTION,
    url: canonicalUrl("/contact/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Custom Website Demo | ${SITE.brand}`,
    description: CONTACT_DESCRIPTION,
    images: ["/og.png"],
  },
};

const DEMO_INCLUDES = [
  "A direction shaped around your business and customer",
  "A real interface you can see and respond to",
  "No charge if you decide not to continue",
];

const USEFUL_DETAILS = [
  "What the business sells or provides",
  "Who the website needs to reach",
  "What visitors should do next",
  "What is not working on the current site",
];

export default function ContactPage() {
  const contactIntakeEnabled = isContactIntakeEnabled();
  const phoneHref = `tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`;
  const formFallback = <div className="contact-form-loading">Loading the secure form…</div>;
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${canonicalUrl("/contact/")}#contact-page`,
    url: canonicalUrl("/contact/"),
    name: `Free Custom Website Demo | ${SITE.brand}`,
    description: CONTACT_DESCRIPTION,
    mainEntity: { "@id": `${SITE.url}/about/#person` },
  };

  return (
    <main className="contact-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />

      <section className="contact-hero" aria-labelledby="contact-heading">
        <Container className="portfolio-container contact-hero-grid">
          <Reveal className="contact-hero-copy">
            <p className="contact-kicker">Free custom website demo</p>
            <h1 id="contact-heading">Show me the business. I&apos;ll show you what&apos;s possible.</h1>
            <p>
              I&apos;ll build a completely custom first direction for your website. See the
              idea before you commit. If you do not want to move forward, it costs nothing.
            </p>
            <div className="contact-actions">
              <ButtonLink href="#request-demo">Request your free demo <span aria-hidden="true">↗</span></ButtonLink>
              <ButtonLink href="#book-call" variant="secondary">Book a call</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={100} className="contact-promise" aria-labelledby="demo-includes-heading">
            <div className="contact-promise-signal" aria-hidden="true"><span /></div>
            <p>What you get</p>
            <h2 id="demo-includes-heading">Something made for you, not a recycled mockup.</h2>
            <div>
              {DEMO_INCLUDES.map((item) => <span key={item}>{item}</span>)}
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="request-demo" className="contact-section scroll-mt-24" aria-labelledby="request-demo-heading">
        <Container className="portfolio-container contact-request-grid">
          <Reveal className="contact-form-shell">
            <header>
              <p>Start here</p>
              <h2 id="request-demo-heading">Request your custom demo.</h2>
              <p>A little context helps me make the first direction specific to your business.</p>
            </header>
            <div className="contact-form-surface">
              {contactIntakeEnabled ? (
                <Suspense fallback={formFallback}><ContactForm /></Suspense>
              ) : (
                <div className="contact-form-notice">
                  The form is temporarily paused. Email{" "}
                  <a href={`mailto:${SITE.contact.fallbackEmail}`}>{SITE.contact.fallbackEmail}</a>{" "}
                  or call <a href={phoneHref}>{SITE.contact.displayPhone}</a>.
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={100} className="contact-side">
            <aside aria-labelledby="helpful-heading">
              <p>Helpful details</p>
              <h2 id="helpful-heading">You do not need a polished brief.</h2>
              <div className="contact-detail-list">
                {USEFUL_DETAILS.map((item) => <span key={item}>{item}</span>)}
              </div>
            </aside>

            <aside className="contact-direct" aria-labelledby="direct-heading">
              <p>Contact Anthony directly</p>
              <h2 id="direct-heading">No sales handoff.</h2>
              <address>
                <a href={`mailto:${SITE.contact.fallbackEmail}`}>{SITE.contact.fallbackEmail}</a>
                <a href={phoneHref}>{SITE.contact.displayPhone}</a>
              </address>
              <p>
                {contactIntakeEnabled
                  ? "Your request goes directly to the person designing and building the work."
                  : "Use direct email or phone while forms are paused."}
              </p>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section id="book-call" className="contact-section contact-call scroll-mt-24" aria-labelledby="book-call-heading">
        <Container className="portfolio-container contact-call-grid">
          <Reveal className="contact-call-copy">
            <p>Prefer to talk first?</p>
            <h2 id="book-call-heading">Choose a time that works.</h2>
            <p>
              Pick a date, timezone, and call format. I&apos;ll confirm the requested slot or
              send the closest available time.
            </p>
            <a href={`mailto:${SITE.contact.fallbackEmail}`}>Schedule by email <span aria-hidden="true">↗</span></a>
          </Reveal>

          <Reveal delay={100} className="contact-form-shell contact-call-form">
            <header>
              <p>Direct planning call</p>
              <h3>Book a call with Anthony.</h3>
            </header>
            <div className="contact-form-surface">
              {contactIntakeEnabled ? (
                <Suspense fallback={formFallback}>
                  <CallBookingForm context="Free custom website demo" />
                </Suspense>
              ) : (
                <div className="contact-form-notice">
                  Call booking is temporarily paused. Email{" "}
                  <a href={`mailto:${SITE.contact.fallbackEmail}`}>{SITE.contact.fallbackEmail}</a>{" "}
                  to schedule manually.
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
