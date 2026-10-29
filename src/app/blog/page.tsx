/* Read surface: the established navy/ice identity becomes a quiet, image-led journal.
   The article title and excerpt lead; categories, dates, and reading times aid scanning. */
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { BlogCard } from "@/components/blog-card";
import { BLOG_POSTS } from "@/data/blog";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

const description = "Practical articles by Anthony Barbaro on Shopify theme development, business websites, and planning a better website.";

export const metadata: Metadata = {
  title: "Blog: Websites, Shopify & Behind the Build",
  description,
  alternates: { canonical: canonicalUrl("/blog/") },
  keywords: withBaseKeywords(["Shopify development blog", "website redesign advice", "small business website tips"]),
  openGraph: { title: `The BarbaroTech Blog`, description, url: canonicalUrl("/blog/"), siteName: SITE.brand, type: "website", images: [{ url: SITE.assets.socialImage }] },
  twitter: { card: "summary_large_image", title: "The BarbaroTech Blog", description, images: [SITE.assets.socialImage] },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Blog", name: "The BarbaroTech Blog", description,
    url: canonicalUrl("/blog/"), author: { "@id": `${SITE.url}/about/#person` },
    blogPost: BLOG_POSTS.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: canonicalUrl(`/blog/${post.slug}/`), datePublished: post.publishedAt, author: { "@id": `${SITE.url}/about/#person` } })),
  };
  return (
    <main className="journal-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="journal-hero">
        <Container className="portfolio-container">
          <p className="section-label">The BarbaroTech blog</p>
          <div className="journal-hero-grid"><h1>Thoughtful websites.<br />Practical notes.</h1><div><p>A look at the decisions behind better websites and Shopify stores. Written by the person doing the work.</p><Link className="portfolio-text-link" href="/about/">Meet Anthony <span aria-hidden="true">↗</span></Link></div></div>
          <nav className="journal-topic-links" aria-label="Explore blog topics"><a href="#articles">All articles ↓</a><Link href="/services/shopify-developer/">Shopify development ↗</Link><Link href="/guides/">Website planning guides ↗</Link></nav>
        </Container>
      </section>
      <section id="articles" className="journal-articles scroll-mt-24" aria-labelledby="articles-heading">
        <Container className="portfolio-container py-16 lg:py-24"><div className="journal-index-heading"><h2 id="articles-heading">Fresh from the studio.</h2><span>{BLOG_POSTS.length} articles</span></div>
          <div className="blog-grid">{BLOG_POSTS.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
          <div className="journal-contact"><div><h2>Have a project in mind?</h2><p>Put these ideas to work for your business.</p></div><Link className="portfolio-text-link" href="/contact/">Talk to Anthony <span aria-hidden="true">↗</span></Link></div>
        </Container>
      </section>
    </main>
  );
}
