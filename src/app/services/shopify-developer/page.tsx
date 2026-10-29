/* Persuade surface in the existing Signal identity: a clear service promise beside
   a real storefront, then scope, live proof, process, and future theme releases. */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { LiveProjectCard } from "@/components/live-project-card";
import { PORTFOLIO_SITES } from "@/data/portfolio-sites";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

const description = "San Diego Shopify developer Anthony Barbaro builds custom Liquid themes, redesigns storefronts, and improves mobile shopping. Explore live work and discuss your store.";
const url = canonicalUrl("/services/shopify-developer/");
const shopifyProjects = PORTFOLIO_SITES.filter((site) => ["Sour Chamoy Bites", "Goso Gummies"].includes(site.name));
const services = [
  { title: "Custom Shopify themes", text: "A storefront designed around your brand and catalog, built in Liquid with reusable sections and a practical editing experience." },
  { title: "Theme customization & redesign", text: "Keep what works. Improve the homepage, navigation, collections, product pages, and cart where the current theme gets in the way." },
  { title: "Mobile shopping experience", text: "Clear product choices, readable details, usable menus, and touch-friendly interactions across the route to checkout." },
  { title: "Custom sections & integrations", text: "Add the sections and store connections your business needs, with scope based on the theme, apps, and tools you already use." },
  { title: "Storefront performance & SEO", text: "Review storefront assets, page structure, metadata, and navigation. Prioritize practical improvements around your store's actual content." },
  { title: "Headless Shopify development", text: "For a store that needs a separate custom frontend, plan a Next.js storefront connected to Shopify. Start by deciding whether that extra complexity is useful." },
];
const faqs = [
  { question: "Can you improve my existing Shopify theme?", answer: "Yes. A review of your current theme and shopping flow helps decide whether focused edits, custom sections, or a full redesign are the right scope. You do not need to replace the entire store to start a conversation." },
  { question: "Do you build custom Liquid themes?", answer: "Yes. Custom Shopify Liquid and theme work is part of the service. Sour Chamoy Bites and Goso Gummies are live examples you can explore below." },
  { question: "How much does Shopify development cost?", answer: "The scope depends on your theme, catalog, integrations, and whether you need a focused improvement or a new storefront. The pricing page provides online-store starting points; I confirm the project quote before work begins. Shopify subscriptions, paid themes, apps, and platform fees are separate unless included in the scope." },
  { question: "Can I buy a BarbaroTech theme yet?", answer: "Reusable theme releases are planned. There are no public theme downloads or Theme Store listings available here yet. Custom theme development is available now; contact me if you want to hear about future releases." },
  { question: "Are you based in San Diego?", answer: "Yes. I am Anthony Barbaro, an independent web and Shopify developer based in San Diego, California. I work directly with local businesses and remote clients." },
];

export const metadata: Metadata = {
  title: "Shopify Developer San Diego | Custom Themes & Store Redesigns",
  description, alternates: { canonical: url },
  keywords: withBaseKeywords(["Shopify developer San Diego", "custom Shopify theme developer", "Shopify Liquid developer", "Shopify theme development", "Shopify store redesign", "freelance Shopify developer"]),
  openGraph: { title: "Shopify Development by Anthony Barbaro", description, url, siteName: SITE.brand, type: "website", images: [{ url: "/projects/sour-chamoy-bites.jpg" }] },
  twitter: { card: "summary_large_image", title: "Shopify Developer San Diego", description, images: ["/projects/sour-chamoy-bites.jpg"] },
};

export default function ShopifyDeveloperPage() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Service", name: "Shopify Theme Development & Store Redesign", serviceType: "Shopify development", description, url, provider: { "@type": "Person", "@id": `${SITE.url}/about/#person`, name: SITE.owner }, areaServed: [{ "@type": "City", name: "San Diego" }, { "@type": "Country", name: "United States" }] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") }, { "@type": "ListItem", position: 2, name: "Services", item: canonicalUrl("/services/") }, { "@type": "ListItem", position: 3, name: "Shopify Developer", item: url }] },
  ];
  return (
    <main className="shopify-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="shopify-hero" aria-labelledby="shopify-heading">
        <Container className="portfolio-container">
          <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services/">Services</Link><span aria-hidden="true">/</span><span>Shopify</span></nav>
          <div className="shopify-hero-grid"><div><p className="section-label">Independent Shopify developer · San Diego</p><h1 id="shopify-heading">A store that feels<br />like your brand.<br /><span>Built for the way<br />people shop.</span></h1><p>Custom Shopify themes, storefront redesigns, and thoughtful mobile experiences. I&apos;m Anthony Barbaro, and you work directly with me from the first idea to launch.</p>
            <div className="shopify-hero-actions"><ButtonLink href="/contact/?context=Shopify%20development">Let&apos;s talk about your store <span aria-hidden="true">↗</span></ButtonLink><a className="portfolio-text-link" href="#shopify-work">See the live work ↓</a></div>
          </div>
          <div className="shopify-hero-proof"><a href="https://sourchamoybites.com/" target="_blank" rel="noreferrer" aria-label="Explore Sour Chamoy Bites live Shopify website"><span className="shopify-proof-top"><span>Custom Liquid theme</span><span>Live website ↗</span></span><Image src="/projects/sour-chamoy-bites.jpg" alt="Sour Chamoy Bites custom Shopify theme homepage" width={1440} height={1000} sizes="(max-width: 900px) 100vw, 50vw" priority /></a><p><strong>Sour Chamoy Bites</strong><span>Brand-led design. Native Shopify storefront.</span></p></div>
          </div>
          <nav className="shopify-section-nav" aria-label="On this page"><a href="#shopify-services">What I can help with ↓</a><a href="#shopify-work">Live Shopify work ↓</a><a href="#theme-releases">Future theme releases ↓</a><a href="#shopify-faq">Questions ↓</a></nav>
        </Container>
      </section>
      <section id="shopify-services" className="shopify-scope scroll-mt-24" aria-labelledby="scope-heading"><Container className="portfolio-container py-20 lg:py-28">
        <header className="work-introduction"><div><p className="section-label">Start where your store needs it</p><h2 id="scope-heading">From one custom section<br />to a whole new storefront.</h2></div><p>A clear scope comes first. Share your store, what works, and where customers get stuck. I&apos;ll help identify a useful starting point.</p></header>
        <div className="shopify-service-list">{services.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
      </Container></section>
      <section id="shopify-work" className="shopify-work scroll-mt-24" aria-labelledby="shopify-work-heading"><Container className="portfolio-container py-20 lg:py-28"><header className="work-introduction"><div><p className="section-label">Explore the actual stores</p><h2 id="shopify-work-heading">Custom work.<br />Out in the world.</h2></div><p>Different brands, different starting points. Open the live storefronts and read about the scope behind each build.</p></header><div className="live-project-grid home-live-projects">{shopifyProjects.map((site) => <LiveProjectCard key={site.href} site={site} />)}</div></Container></section>
      <section id="theme-releases" className="theme-releases scroll-mt-24" aria-labelledby="themes-heading"><Container className="portfolio-container theme-releases-grid py-20 lg:py-28"><div><p className="theme-status">Planned releases</p><h2 id="themes-heading">Themes with a point of view.<br />A collection in the making.</h2></div><div><p>I&apos;m planning reusable Shopify themes that bring the same care to more stores. Public releases and downloads will appear here when they are ready.</p><p>Need something for your store today? Custom theme development and theme improvements are available now.</p><div><ButtonLink href="/contact/?context=Future%20Shopify%20theme%20releases">Ask about future themes <span aria-hidden="true">↗</span></ButtonLink><a href="#shopify-services">Explore custom work ↑</a></div></div></Container></section>
      <section id="shopify-faq" className="shopify-faq scroll-mt-24" aria-labelledby="shopify-faq-heading"><Container className="portfolio-container py-20 lg:py-28"><div className="work-introduction"><div><p className="section-label">Before we build</p><h2 id="shopify-faq-heading">Good questions.<br />Straight answers.</h2></div><Link className="portfolio-text-link" href="/pricing/#ecommerce-stores">View online-store starting prices ↗</Link></div><div className="shopify-faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></Container></section>
      <section className="shopify-close"><Container className="portfolio-container py-16 lg:py-24"><div><h2>Let&apos;s make your store<br />a better place to shop.</h2><p>Send your URL and the changes you have in mind. I&apos;ll help turn them into a clear next step.</p></div><ButtonLink href="/contact/?context=Shopify%20development">Talk Shopify with Anthony <span aria-hidden="true">↗</span></ButtonLink></Container></section>
    </main>
  );
}
