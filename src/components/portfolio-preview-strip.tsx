import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_SITES } from "@/data/portfolio-sites";

const PREVIEW_SITES = PORTFOLIO_SITES.flatMap((site) =>
  site.image ? [{ ...site, image: site.image }] : []
);

export function PortfolioPreviewStrip() {
  return (
    <section
      id="work"
      className="hero-work-previews scroll-mt-24"
      aria-label="Live website previews"
    >
      <div className="hero-preview-grid">
        {PREVIEW_SITES.map((site) => (
          <a
            key={site.href}
            href={site.href}
            target="_blank"
            rel="noreferrer"
            className="hero-preview"
            aria-label={`Visit ${site.name} (opens in a new tab)`}
          >
            <Image
              src={site.image}
              alt={`${site.name} website preview`}
              width={1440}
              height={1000}
              sizes="(max-width: 640px) 85vw, (max-width: 1050px) 50vw, 20vw"
            />
            <span>
              <strong>{site.name}</strong>
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
      <div className="hero-preview-more">
        <Link href="/projects/">View all live work <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
