import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { BlogCard } from "@/components/blog-card";
import { TutorialCodeBlock } from "@/components/tutorial-code-block";
import { BLOG_POSTS, blogReadingMinutes, formatBlogDate, getBlogPost } from "@/data/blog";
import { canonicalUrl, withBaseKeywords } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};
  const url = canonicalUrl(`/blog/${post.slug}/`);
  return {
    title: post.title, description: post.excerpt, alternates: { canonical: url },
    keywords: withBaseKeywords([post.category, post.title]),
    openGraph: { title: post.title, description: post.excerpt, type: "article", url, siteName: SITE.brand, publishedTime: post.publishedAt, authors: [SITE.owner], images: [{ url: post.image, alt: post.imageAlt }] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const articleLabel = post.tutorial
    ? post.tutorial.lesson !== undefined
      ? `From first file to live website · Lesson ${post.tutorial.lesson}`
      : post.tutorial.label ?? "Step-by-step guide"
    : post.category;
  const relatedPosts = [
    ...(post.relatedSlugs ?? []).flatMap((slug) => {
      const related = getBlogPost(slug);
      return related && related.slug !== post.slug ? [related] : [];
    }),
    ...BLOG_POSTS.filter((candidate) => candidate.slug !== post.slug && !post.relatedSlugs?.includes(candidate.slug)),
  ].slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt,
    datePublished: post.publishedAt, dateModified: post.publishedAt,
    image: new URL(post.image, SITE.url).href, mainEntityOfPage: canonicalUrl(`/blog/${post.slug}/`),
    author: { "@type": "Person", "@id": `${SITE.url}/about/#person`, name: SITE.owner, url: canonicalUrl("/about/") },
    publisher: { "@type": "Person", name: SITE.owner }, articleSection: post.category, inLanguage: "en-US",
  };
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") }, { "@type": "ListItem", position: 2, name: "Blog", item: canonicalUrl("/blog/") }, { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl(`/blog/${post.slug}/`) }],
  };
  return (
    <main className="journal-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]) }} />
      <article>
        <header className="article-header"><Container className="portfolio-container">
          <nav aria-label="Breadcrumb" className="article-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span><span>{post.category}</span></nav>
          <p className="section-label">{articleLabel}</p><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p>
          <div className="article-byline"><Image src={SITE.assets.headshot} alt="" width={44} height={44} /><span>By <Link href="/about/">Anthony Barbaro</Link></span><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time><span>{blogReadingMinutes(post)} min read</span></div>
          <Image className={`article-cover${post.tutorial ? " article-cover--tutorial" : ""}`} src={post.image} alt={post.imageAlt} width={post.tutorial ? 1600 : 1440} height={post.tutorial ? 800 : 1000} sizes="(max-width: 1000px) 100vw, 1100px" priority />
        </Container></header>
        <Container className="portfolio-container article-layout">
          <aside className={`article-toc${post.tutorial ? " article-toc--tutorial" : ""}`}>
            <nav aria-label="In this article"><p>In this article</p>{post.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<Link className="portfolio-text-link" href="/blog/">All articles ↗</Link></nav>
            {post.tutorial ? <details className="tutorial-mobile-toc"><summary>Steps in this guide <span aria-hidden="true">+</span></summary><nav aria-label="Guide steps">{post.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav></details> : null}
          </aside>
          <div className="article-body"><p className="article-intro">{post.intro}</p>
            {post.tutorial ? (
              <div className="tutorial-overview">
                <p className="tutorial-level">{post.tutorial.level}</p>
                <h2>What you will learn</h2>
                <ul>{post.tutorial.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                <h3>Before you start</h3>
                <ul>{post.tutorial.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="tutorial-checked">Instructions checked against the linked official documentation on {formatBlogDate(post.tutorial.checkedAt)}. Interface labels and account access can change.</p>
              </div>
            ) : null}
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.table ? (
                  <div className="tutorial-table" tabIndex={0} role="region" aria-label={section.table.caption}>
                    <table>
                      <caption>{section.table.caption}</caption>
                      <thead><tr>{section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.detail}</td></tr>)}</tbody>
                    </table>
                  </div>
                ) : null}
                {section.points ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
                {section.codeBlocks?.map((block) => <TutorialCodeBlock key={block.label} {...block} />)}
                {section.image ? (
                  <figure className="tutorial-figure">
                    <a href={section.image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${section.image.alt}`}>
                      <Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} style={{ maxWidth: section.image.width, marginInline: "auto" }} sizes="(max-width: 720px) 100vw, 760px" />
                    </a>
                    <figcaption>{section.image.caption}{section.image.source ? <> <a href={section.image.source.href} target="_blank" rel="noreferrer">{section.image.source.label} ↗</a></> : null}</figcaption>
                  </figure>
                ) : null}
                {section.checkpoint ? <div className="tutorial-checkpoint"><strong>Check your progress</strong><p>{section.checkpoint}</p></div> : null}
                {section.resources ? <ul className="tutorial-resources" aria-label={`Resources for ${section.title}`}>{section.resources.map((resource) => <li key={resource.href}><a href={resource.href}>{resource.label} <span aria-hidden="true">↗</span></a></li>)}</ul> : null}
              </section>
            ))}
            {post.sources ? <section className="tutorial-sources" aria-labelledby="sources-heading"><h2 id="sources-heading">Official references</h2><p>Use these pages for current platform details and updates to the interfaces shown in this guide.</p><ul>{post.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul></section> : null}
            <div className="article-next"><h2>Put the idea into practice.</h2>{post.links.map((link) => <Link key={link.href} className="portfolio-text-link" href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>)}</div>
          </div>
        </Container>
      </article>
      <section className="article-related" aria-labelledby="related-articles-heading"><Container className="portfolio-container py-16 lg:py-24"><h2 id="related-articles-heading">Keep reading.</h2><div className="blog-grid blog-grid--two">{relatedPosts.map((related) => <BlogCard key={related.slug} post={related} />)}</div></Container></section>
    </main>
  );
}
