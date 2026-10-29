import type { Metadata } from "next";
import { ProjectCollection } from "@/components/project-collection";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PORTFOLIO_SITES } from "@/data/portfolio-sites";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PROJECTS_DESCRIPTION =
  "Explore live websites, ecommerce storefronts, and custom platforms designed and built by Anthony Barbaro.";

export const metadata: Metadata = {
  title: "Website Portfolio & Live Projects",
  description: PROJECTS_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/projects/") },
  keywords: withBaseKeywords([
    "web design portfolio San Diego",
    "website development portfolio",
    "ecommerce website portfolio",
    "custom web platform examples",
    "BarbaroTech projects",
  ]),
  openGraph: {
    title: `Website Portfolio & Live Projects | ${SITE.brand}`,
    description: PROJECTS_DESCRIPTION,
    url: canonicalUrl("/projects/"),
    siteName: SITE.brand,
    images: [{ url: SITE.assets.socialImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website Portfolio & Live Projects | ${SITE.brand}`,
    description: PROJECTS_DESCRIPTION,
    images: [SITE.assets.socialImage],
  },
};

export default function ProjectsPage() {
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl("/projects/")}#portfolio`,
    name: `Website Portfolio & Live Projects | ${SITE.brand}`,
    description: PROJECTS_DESCRIPTION,
    url: canonicalUrl("/projects/"),
    author: { "@id": `${SITE.url}/about/#person` },
    hasPart: PORTFOLIO_SITES.map((site) => ({
      "@type": "WebSite",
      name: site.name,
      description: site.summary,
      url: site.href,
    })),
  };

  return (
    <main className="projects-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />

      <section className="projects-hero" aria-labelledby="projects-heading">
        <Container className="portfolio-container projects-hero-grid">
          <Reveal>
            <p className="projects-kicker">The live collection</p>
            <h1 id="projects-heading">Websites built for real businesses.</h1>
          </Reveal>
          <Reveal delay={90} className="projects-hero-copy">
            <p>
              Restaurants, storefronts, and service businesses. Browse by what you need,
              then open the real website and explore it for yourself.
            </p>
            <div>
              <ButtonLink href="#live-sites-heading">
                Browse live websites <span aria-hidden="true">↓</span>
              </ButtonLink>
              <ButtonLink href="/pricing/" variant="secondary">Explore pricing</ButtonLink>
            </div>
          </Reveal>
        </Container>
        <div className="projects-hero-signal" aria-hidden="true"><span /></div>
      </section>

      <section className="projects-live" aria-labelledby="live-sites-heading">
        <Container className="portfolio-container py-20 lg:py-28">
          <Reveal className="projects-section-heading">
            <p>Hosted projects only</p>
            <h2 id="live-sites-heading">Find your kind of website.</h2>
            <p>Filter the collection, search a name, or open a live site in a new tab.</p>
          </Reveal>

          <ProjectCollection />
        </Container>
      </section>

      <section className="projects-close" aria-labelledby="projects-close-heading">
        <Container className="portfolio-container projects-close-grid py-20 lg:py-28">
          <Reveal>
            <p>What would yours look like?</p>
            <h2 id="projects-close-heading">See a custom direction before you commit.</h2>
          </Reveal>
          <Reveal delay={90}>
            <p>
              Share the business, the customer, and the goal. I&apos;ll build something you can
              see. If you do not want to move forward, it costs nothing.
            </p>
            <div>
              <ButtonLink href="/contact/?context=Free%20custom%20website%20demo" className="projects-close-button">
                Request a free demo <span aria-hidden="true">↗</span>
              </ButtonLink>
              <ButtonLink href="/pricing/" variant="ghost">View pricing</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
