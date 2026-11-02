import Image from "next/image";
import Link from "next/link";
import { blogReadingMinutes, formatBlogDate, type BlogPost } from "@/data/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}/`} className={`blog-card-image${post.tutorial ? " blog-card-image--tutorial" : ""}`} tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" width={1440} height={1000} sizes="(max-width: 720px) 100vw, 33vw" />
        <span>{post.category}</span>
      </Link>
      <div className="blog-card-meta"><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time><span>{blogReadingMinutes(post)} min read</span></div>
      <h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <Link className="portfolio-text-link" href={`/blog/${post.slug}/`}>Read article <span aria-hidden="true">↗</span><span className="sr-only">: {post.title}</span></Link>
    </article>
  );
}
