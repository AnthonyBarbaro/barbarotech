/*
THESIS: Let a prospect see both shipped work and a custom direction for their own business before asking them to commit.
OWN-WORLD: A restrained black interface with white type, cobalt signal light, quiet grid lines, and a continuous client-logo transmission.
STORY: Understand the free custom-demo offer, inspect live work, see the available build systems, then request a direction without risk.
FIRST VIEWPORT: A direct no-cost demo promise sits above a moving belt of clickable client identities.
FORM: A simple scanline portfolio. The animated belt carries attention; calm project rows and direct conversion copy carry trust.
*/
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { PortfolioHeroShowcase } from "@/components/portfolio-hero-showcase";
import { PortfolioLogoBelt } from "@/components/portfolio-logo-belt";
import { ButtonLink } from "@/components/ui/button";
import { PORTFOLIO_SITES } from "@/data/portfolio-sites";
import {
  getPricingPackageBySlug,
  limitedStarterOfferEnabled,
} from "@/data/pricing";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Web Design & Development Portfolio",
  description:
    "Explore live websites, storefronts, and custom platforms designed and built by Anthony Barbaro, then start your own project directly.",
  alternates: {
    canonical: canonicalUrl("/"),
  },
  keywords: withBaseKeywords([
    "web developer portfolio",
    "website design portfolio",
    "ecommerce developer",
    "small business web design",
    "custom website developer",
  ]),
  openGraph: {
    title: `${SITE.brand} | Websites built by ${SITE.owner}`,
    description:
      "Live websites and storefronts designed and built directly by Anthony Barbaro.",
    url: canonicalUrl("/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
};

const CAPABILITIES = [
  {
    title: "Static websites",
    copy: "Fast, secure business sites with clear positioning, local SEO foundations, and a focused inquiry path.",
  },
  {
    title: "Premium websites",
    copy: "Custom, content-rich websites for established businesses that need stronger positioning and a more distinctive experience.",
  },
  {
    title: "Shopify and ecommerce",
    copy: "Storefront redesigns, custom theme work, plugins, and product experiences built to browse and buy cleanly on mobile.",
  },
];

const FEATURED_BUILD_PATHS = [
  {
    eyebrow: "Menus, hours, and ordering",
    title: "Restaurant websites",
    description:
      "A mobile-first home for restaurants and cafes, built to move guests from the menu to directions, catering, or online ordering.",
    sites: PORTFOLIO_SITES.filter((site) =>
      ["Wagyu Shawarma Grill", "Golden Bagel Cafe"].includes(site.name)
    ),
  },
  {
    eyebrow: "Fast and focused",
    title: "Static websites",
    description:
      "A lightweight, low-maintenance launch for local businesses and service brands that need a clear online presence.",
    sites: PORTFOLIO_SITES.filter((site) =>
      ["PartnerSwipe", "Capital Collective"].includes(site.name)
    ),
  },
  {
    eyebrow: "Custom brand systems",
    title: "Premium websites",
    description:
      "A deeper custom build for established businesses that need stronger content, richer design, and more complex customer paths.",
    sites: PORTFOLIO_SITES.filter((site) =>
      ["Buzz Cannabis", "J. Barbaro Clothiers"].includes(site.name)
    ),
  },
  {
    eyebrow: "Improve the store",
    title: "Shopify redesigns",
    description:
      "Focused improvements for an existing Shopify store, from mobile UX and theme code to custom plugin behavior.",
    sites: PORTFOLIO_SITES.filter((site) => site.name === "Goso Gummies"),
  },
];

const CONVERSION_OUTCOMES = [
  {
    title: "A clear buying path",
    detail: "Visitors understand what you offer, what it costs, and what to do next without hunting for the answer.",
  },
  {
    title: "Stronger request quality",
    detail: "Focused calls to action and honest scope details help serious prospects start a useful conversation.",
  },
  {
    title: "Launch plus retention",
    detail: "Monthly care keeps the website supported and improving instead of slowly falling out of date.",
  },
  {
    title: "Proof before the pitch",
    detail: "Live work, clear process, and transparent terms reduce uncertainty before someone reaches out.",
  },
];

const PROCESS = [
  {
    title: "Tell me what you need",
    detail: "Share the business, the customer, and what the website needs to make easier.",
  },
  {
    title: "See a custom direction",
    detail: "I build a tailored first concept so you can react to something real before making a commitment.",
  },
  {
    title: "Move forward only if it fits",
    detail: "If you want to continue, we confirm the full scope. If you do not, the demo costs nothing.",
  },
  {
    title: "Launch and improve",
    detail: "After testing and launch, monthly care covers edits, checks, upkeep, and practical next steps.",
  },
];

const OBJECTION_HANDLERS = [
  {
    title: "Not sure which package fits?",
    detail: "Send the project details and I will recommend the closest starting point.",
  },
  {
    title: "Already have a website?",
    detail: "The scope can become a redesign, migration, care plan, or focused rebuild.",
  },
  {
    title: "Need integrations?",
    detail: "Booking, commerce, analytics, CRM, email, SMS, and provider integrations can be scoped as needed.",
  },
];

const HOME_OFFER_CONFIG = [
  {
    slug: limitedStarterOfferEnabled ? "static-starter-kit" : "static-starter",
    title: "Starter Website",
    description: "A simple template-based site with up to three pages, mobile design, basic SEO, and one inquiry path.",
  },
  {
    slug: "restaurant-website",
    title: "Restaurant Website",
    description: "A mobile-first site for menus, hours, locations, reviews, and external ordering.",
  },
  {
    slug: "booking-website",
    title: "Booking Website",
    description: "A service site with clear offers, proof, and a direct booking or appointment-request path.",
  },
  {
    slug: "online-store",
    title: "Online Store",
    description: "A Shopify or WooCommerce storefront with product discovery and hosted checkout.",
  },
  {
    slug: "premium-website",
    title: "Premium Website",
    description: "A higher-touch website with deeper strategy, visual direction, proof, and lead flow.",
  },
];

const HOME_OFFERS = HOME_OFFER_CONFIG.flatMap((offer) => {
  const plan = getPricingPackageBySlug(offer.slug);
  if (!plan) return [];

  return [{ ...offer, setupPrice: plan.setupPrice, monthlyPrice: plan.monthlyPrice, contactHref: plan.ctaHref }];
});

export default function HomePage() {
  const phoneHref = `tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`;
  const starterOffer = HOME_OFFERS[0];

  return (
    <main className="portfolio-page">
      <section className="portfolio-hero" aria-labelledby="portfolio-heading">
        <Container className="portfolio-container py-12 sm:py-16 lg:py-20">
          <PortfolioHeroShowcase
            starterSetupPrice={starterOffer?.setupPrice ?? "$399"}
            starterMonthlyPrice={starterOffer?.monthlyPrice ?? "$80/mo"}
          />
          <PortfolioLogoBelt />
        </Container>
      </section>

      <section id="work" className="portfolio-work scroll-mt-20" aria-labelledby="work-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <header className="portfolio-section-heading">
            <p>Choose a build path</p>
            <h2 id="work-heading">Start with what your business needs.</h2>
            <p>
              The moving belt shows the range. These are the clearest starting points for
              deciding what kind of website fits.
            </p>
          </header>

          <div className="portfolio-path-grid">
            {FEATURED_BUILD_PATHS.map((path) => (
              <article
                key={path.title}
                className="portfolio-path-card"
                data-example-count={path.sites.length}
              >
                <header>
                  <p>{path.eyebrow}</p>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                </header>
                <div className="portfolio-path-examples">
                  {path.sites.map((site) => (
                    <a
                      key={site.href}
                      href={site.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View the ${site.name} live website`}
                    >
                      <span className={`portfolio-path-logo portfolio-path-logo--${site.surface}`}>
                        <Image
                          src={site.logo}
                          alt={site.logoAlt}
                          width={site.mark === "square" ? 100 : 190}
                          height={site.mark === "square" ? 100 : 72}
                          className={`portfolio-client-logo portfolio-client-logo--${site.mark}`}
                        />
                      </span>
                      <span>
                        <strong>{site.name}</strong>
                        <span>View live site ↗</span>
                      </span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="portfolio-work-footer">
            <p>Want to browse every live site and read the deeper build notes?</p>
            <ButtonLink href="/projects/" variant="secondary">
              Explore the full portfolio <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="services" className="portfolio-capabilities scroll-mt-20" aria-labelledby="services-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <div className="portfolio-capabilities-head">
            <p>What I build</p>
            <h2 id="services-heading">One builder from first idea to launch.</h2>
          </div>

          <div className="portfolio-capability-list">
            {CAPABILITIES.map((capability) => (
              <article key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="portfolio-outcomes" aria-labelledby="outcomes-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <div className="portfolio-outcomes-grid">
            <header>
              <p>What the work should do</p>
              <h2 id="outcomes-heading">Turn attention into a clear next step.</h2>
              <p>
                Good design earns attention. Good structure helps the right customer act on it.
              </p>
            </header>

            <div className="portfolio-outcome-list">
              {CONVERSION_OUTCOMES.map((outcome) => (
                <article key={outcome.title}>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="packages" className="portfolio-pricing scroll-mt-20" aria-labelledby="packages-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <div className="portfolio-pricing-head">
            <div>
              <p>Simple starting prices</p>
              <h2 id="packages-heading">Pick the closest starting point.</h2>
            </div>
            <div>
              <p>
                Every package pairs a one-time setup with required monthly care. Extra pages,
                content, and integrations are added only when the project needs them.
              </p>
              <ButtonLink href="/pricing/" variant="secondary">
                Compare full pricing <span aria-hidden="true">↗</span>
              </ButtonLink>
            </div>
          </div>

          <div className="portfolio-offer-list">
            {HOME_OFFERS.map((offer) => (
              <a key={offer.slug} href={offer.contactHref} className="portfolio-offer-row">
                <span>
                  <strong>{offer.title}</strong>
                  <span>{offer.description}</span>
                </span>
                <span>
                  <strong>{offer.setupPrice}</strong>
                  <span>Required care from {offer.monthlyPrice}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="portfolio-process scroll-mt-20" aria-labelledby="process-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <div className="portfolio-process-grid">
            <div>
              <p className="portfolio-process-label">How the build moves</p>
              <h2 id="process-heading">A direct path from idea to launch.</h2>
              <div className="portfolio-process-steps">
                {PROCESS.map((item) => (
                  <article key={item.title}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="portfolio-objections" aria-labelledby="before-heading">
              <p>Before you reach out</p>
              <h3 id="before-heading">Common starting questions.</h3>
              {OBJECTION_HANDLERS.map((item) => (
                <div key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
              <div className="portfolio-objection-actions">
                <ButtonLink href="/pricing/#pricing-faq" variant="secondary">
                  Read the pricing FAQ
                </ButtonLink>
                <ButtonLink href="/contact/#book-call">Book a call</ButtonLink>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section id="about" className="portfolio-about scroll-mt-20" aria-labelledby="about-heading">
        <Container className="portfolio-container portfolio-about-grid py-20 lg:py-28">
          <div className="portfolio-portrait-wrap">
            <Image
              src={SITE.assets.headshot}
              alt="Anthony Barbaro"
              width={520}
              height={520}
              priority
              className="portfolio-portrait"
            />
            <span>Anthony Barbaro / Designer + developer</span>
          </div>

          <div>
            <p className="portfolio-about-label">Direct by design</p>
            <h2 id="about-heading">You talk to the person building the work.</h2>
            <p>
              I&apos;m Anthony, the designer and developer behind BarbaroTech. There is no handoff
              between sales, design, and development. I learn the business, make the decisions,
              build the site, and stay available after launch.
            </p>
            <a className="portfolio-text-link" href="/about/">
              More about how I work <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
      </section>

      <section className="portfolio-close" aria-labelledby="close-heading">
        <Container className="portfolio-container portfolio-close-grid py-20 lg:py-28">
          <div>
            <p>See the idea before you commit.</p>
            <h2 id="close-heading">Get your free custom demo.</h2>
          </div>
          <div>
            <p>
              Tell me what you&apos;re selling, who it needs to reach, and what the current site
              is not doing well. I&apos;ll turn that into a direction you can actually see.
            </p>
            <div className="portfolio-close-actions">
              <ButtonLink href="/contact/?context=Free%20custom%20website%20demo" className="portfolio-close-button">
                Get a free demo <span aria-hidden="true">↗</span>
              </ButtonLink>
              <a href="/contact/#book-call">Book a call</a>
              <a href="/pricing/">Compare pricing</a>
              <a href={`mailto:${SITE.contact.fallbackEmail}`}>{SITE.contact.fallbackEmail}</a>
              <a href={phoneHref}>{SITE.contact.displayPhone}</a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
