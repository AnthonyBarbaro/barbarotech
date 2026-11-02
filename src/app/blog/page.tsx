/* Read surface: the established navy/ice identity becomes a quiet, image-led journal.
   The article title and excerpt lead; categories, dates, and reading times aid scanning. */
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { BlogCard } from "@/components/blog-card";
import { BLOG_POSTS } from "@/data/blog";
import { SITE } from "@/lib/site";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";

const description = "Set up WSL and VS Code, start coding with Codex and GitHub, then deploy your first website with Railway. Illustrated guides by Anthony Barbaro.";

export const metadata: Metadata = {
  title: "Learn to Code: VS Code, Codex, GitHub & Railway Guides",
  description,
  alternates: { canonical: canonicalUrl("/blog/") },
  keywords: withBaseKeywords(["WSL VS Code setup guide", "VS Code Codex setup guide", "GitHub tutorial for beginners", "deploy website Railway", "learn to code", "Shopify development blog"]),
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
          <div className="journal-hero-grid"><h1>Learn to build.<br />Then put it online.</h1><div><p>Start with your first file. Learn the tools, understand the code, and publish something real with illustrated guides from Anthony Barbaro.</p><Link className="portfolio-text-link" href="/blog/set-up-vscode-codex-github/">Start the beginner series <span aria-hidden="true">↗</span></Link></div></div>
          <nav className="journal-topic-links" aria-label="Explore blog topics"><a href="#start-learning">Beginner learning path ↓</a><a href="#articles">All articles ↓</a><Link href="/guides/">Website planning guides ↗</Link></nav>
        </Container>
      </section>
      <section id="start-learning" className="learning-path scroll-mt-24" aria-labelledby="learning-path-heading">
        <Container className="portfolio-container py-16 lg:py-20">
          <h2 id="learning-path-heading">From your first file to a live website.</h2>
          <p>Two connected lessons. One small project you can understand, change, and publish.</p>
          <p className="learning-environment-link">On Windows? <Link href="/blog/install-wsl-vscode-linux/">Set up WSL and VS Code first <span aria-hidden="true">↗</span></Link></p>
          <ol>{BLOG_POSTS.filter((post) => post.tutorial?.lesson !== undefined).map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}/`}><span>Lesson {post.tutorial?.lesson}</span><strong>{post.title}</strong><span>{blogLessonAction(post.tutorial?.lesson)} <span aria-hidden="true">↗</span></span></Link></li>)}</ol>
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

function blogLessonAction(lesson: number | undefined): string {
  return lesson === 1 ? "Set up and start coding" : "Take your website online";
}
