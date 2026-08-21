import Image from "next/image";
import { PORTFOLIO_SITES } from "@/data/portfolio-sites";

function BeltSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="portfolio-belt-sequence" aria-hidden={duplicate || undefined}>
      {PORTFOLIO_SITES.map((site, index) => (
        <a
          key={`${duplicate ? "duplicate" : "primary"}-${site.href}`}
          href={site.href}
          target="_blank"
          rel="noreferrer"
          className={`portfolio-belt-item portfolio-belt-item--${site.surface}`}
          aria-label={duplicate ? undefined : `Visit ${site.name} live website`}
          tabIndex={duplicate ? -1 : undefined}
        >
          <Image
            src={site.logo}
            alt={duplicate ? "" : site.logoAlt}
            width={site.mark === "square" ? 160 : 260}
            height={site.mark === "square" ? 160 : 100}
            priority={!duplicate && index < 4}
            className={`portfolio-client-logo portfolio-client-logo--${site.mark}`}
          />
          <span className="portfolio-belt-name">{site.name}</span>
          <span className="portfolio-belt-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export function PortfolioLogoBelt() {
  return (
    <div className="portfolio-belt-shell">
      <div className="portfolio-board-status">
        <span>Selected live work / click any logo</span>
        <span aria-hidden="true">Live transmission</span>
      </div>
      <div className="portfolio-belt-viewport">
        <div className="portfolio-belt-track">
          <BeltSequence />
          <BeltSequence duplicate />
        </div>
      </div>
    </div>
  );
}
