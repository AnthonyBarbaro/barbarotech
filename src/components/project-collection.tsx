"use client";

import { useState } from "react";
import { LiveProjectCard } from "@/components/live-project-card";
import { PORTFOLIO_SITES, type PortfolioSite } from "@/data/portfolio-sites";

const CATEGORIES = ["All work", "Business websites", "Restaurants", "Shopify & ecommerce"] as const;
type ProjectCategory = "All work" | PortfolioSite["category"];

export function ProjectCollection() {
  const [category, setCategory] = useState<ProjectCategory>("All work");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const sites = PORTFOLIO_SITES.filter((site) =>
    (category === "All work" || site.category === category) &&
    `${site.name} ${site.type} ${site.summary} ${site.displayUrl}`.toLowerCase().includes(normalizedQuery)
  );

  return (
    <>
      <div className="collection-tools">
        <div className="collection-filters" role="group" aria-label="Filter live projects">
          {CATEGORIES.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}<span>{item === "All work" ? PORTFOLIO_SITES.length : PORTFOLIO_SITES.filter((site) => site.category === item).length}</span>
            </button>
          ))}
        </div>
        <label className="collection-search"><span className="sr-only">Search live projects</span>
          <span aria-hidden="true">⌕</span><input type="search" value={query} placeholder="Find a project…" onChange={(event) => setQuery(event.target.value)} />
        </label>
      </div>
      <p className="collection-result-count" role="status">{sites.length} {sites.length === 1 ? "live website" : "live websites"}{category !== "All work" ? ` · ${category}` : " · Open any project to explore"}</p>
      {sites.length ? (
        <div className="live-project-grid">{sites.map((site) => <LiveProjectCard key={site.href} site={site} />)}</div>
      ) : (
        <div className="collection-empty"><h3>No projects match that search.</h3><p>Try a business name, Shopify, or restaurant.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All work"); }}>Show all live work <span aria-hidden="true">→</span></button>
        </div>
      )}
    </>
  );
}
