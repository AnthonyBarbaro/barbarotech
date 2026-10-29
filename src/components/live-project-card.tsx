import Image from "next/image";
import Link from "next/link";
import type { PortfolioSite } from "@/data/portfolio-sites";

export function LiveProjectCard({ site }: { site: PortfolioSite }) {
  return (
    <article className="live-project">
      <a href={site.href} target="_blank" rel="noreferrer" className="live-project-preview"
        aria-label={`Visit ${site.name} (opens in a new tab)`}>
        <span className="live-project-browser" aria-hidden="true">
          <span className="live-project-browser-dots"><i /><i /><i /></span>
          <span>{site.displayUrl}</span>
          <span>↗</span>
        </span>
        {site.image ? (
          <Image src={site.image} alt={`${site.name} website preview`} width={1440} height={1000}
            sizes="(max-width: 720px) 100vw, 50vw" className="live-project-screenshot" />
        ) : (
          <span className={`live-project-mark live-project-mark--${site.surface}`}>
            <Image src={site.logo} alt={site.logoAlt} width={280} height={150} />
          </span>
        )}
        <span className="live-project-open">Explore live website <span aria-hidden="true">↗</span></span>
      </a>
      <div className="live-project-info">
        <div><p>{site.type}</p><h3><a href={site.href} target="_blank" rel="noreferrer">{site.name} <span aria-hidden="true">↗</span></a></h3></div>
        <p>{site.summary}</p>
        {site.projectSlug ? <Link className="portfolio-text-link" href={`/projects/${site.projectSlug}/`}>About the build <span aria-hidden="true">→</span></Link> : null}
      </div>
    </article>
  );
}
