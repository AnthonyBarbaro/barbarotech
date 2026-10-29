/*
THESIS: Let a prospect see both shipped work and a custom direction for their own business before asking them to commit.
OWN-WORLD: A restrained black interface with white type, cobalt signal light, and real website previews.
STORY: Understand the free custom-demo offer, inspect live work, see the available build systems, then request a direction without risk.
FIRST VIEWPORT: A direct no-cost demo promise sits above clickable previews of all hosted portfolio sites.
FORM: A simple scanline portfolio. The live work follows the offer directly, with native swipe browsing on phones.
*/
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { PortfolioHeroShowcase } from "@/components/portfolio-hero-showcase";
import { PortfolioPreviewStrip } from "@/components/portfolio-preview-strip";
import { BlogCard } from "@/components/blog-card";
import { BLOG_POSTS } from "@/data/blog";
import { ButtonLink } from "@/components/ui/button";
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
    href: "/services/small-business-web-design-san-diego/",
  },
  {
    title: "Premium websites",
    copy: "Custom, content-rich websites for established businesses that need stronger positioning and a more distinctive experience.",
    href: "/services/website-redesign-san-diego/",
  },
  {
    title: "Shopify and ecommerce",
    copy: "Storefront redesigns, custom theme work, plugins, and product experiences built to browse and buy cleanly on mobile.",
    href: "/services/shopify-developer/",
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
          <PortfolioPreviewStrip />
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
                <h3><Link href={capability.href}>{capability.title} <span aria-hidden="true">↗</span></Link></h3>
                <p>{capability.copy}</p>
              </article>
            ))}
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

      <section className="shopify-feature" aria-labelledby="home-shopify-heading">
        <Container className="portfolio-container shopify-feature-grid py-20 lg:py-24">
          <div><p className="section-label">Shopify, shaped around your brand</p><h2 id="home-shopify-heading">Your store should<br />feel like your store.</h2><p>Custom Liquid themes, thoughtful redesigns, and a buying experience that makes sense on a phone. Work directly with the developer who builds it.</p>
            <ButtonLink href="/services/shopify-developer/">Explore Shopify services <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <Link href="/services/shopify-developer/#shopify-work" className="shopify-feature-art" aria-label="Explore custom Shopify theme work for Sour Chamoy Bites">
            <span className="shopify-feature-caption"><span>Custom Shopify theme</span><span>Sour Chamoy Bites ↗</span></span>
            <Image src="/projects/sour-chamoy-bites.jpg" alt="Sour Chamoy Bites custom Shopify storefront" width={1440} height={1000} sizes="(max-width: 800px) 100vw, 50vw" />
          </Link>
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

      <section className="home-journal" aria-labelledby="home-journal-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <header className="work-introduction"><div><p className="section-label">From the blog</p><h2 id="home-journal-heading">A little insight<br />before your next build.</h2></div><div><p>Practical notes on better websites, Shopify stores, and the decisions behind the work.</p><Link className="portfolio-text-link" href="/blog/">Read all articles <span aria-hidden="true">↗</span></Link></div></header>
          <div className="blog-grid">{BLOG_POSTS.slice(0, 3).map((post) => <BlogCard key={post.slug} post={post} />)}</div>
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
