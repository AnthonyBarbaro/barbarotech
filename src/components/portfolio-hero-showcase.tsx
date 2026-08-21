"use client";

import { useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";

type PortfolioHeroShowcaseProps = {
  starterSetupPrice: string;
  starterMonthlyPrice: string;
};

type HeroSlide = {
  id: string;
  tab: string;
  kicker: string;
  headline: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  note: string;
};

function getHeroSlides(starterSetupPrice: string, starterMonthlyPrice: string): HeroSlide[] {
  return [
    {
      id: "free-demo",
      tab: "Free demo",
      kicker: "Free custom demo available",
      headline: "See your new website before you pay.",
      description:
        "I’ll build a completely custom direction for your business so you can see the idea first. If you do not want to move forward, it costs nothing.",
      primary: { label: "Get a free demo", href: "/contact/?context=Free%20custom%20website%20demo" },
      secondary: { label: "Explore project types", href: "#work" },
      note: "Live websites, stores, and custom platforms.",
    },
    {
      id: "pricing",
      tab: "Pricing",
      kicker: "Clear starting prices",
      headline: `Website launches from ${starterSetupPrice}.`,
      description:
        `See the setup price and ongoing care separately before the build begins. Starter care begins at ${starterMonthlyPrice}.`,
      primary: { label: "Explore pricing", href: "/pricing/" },
      secondary: { label: "Ask a question", href: "/contact/?context=Pricing%20question" },
      note: "Clear scope, launch cost, and monthly care.",
    },
    {
      id: "static",
      tab: "Static option",
      kicker: "Fast and low-maintenance",
      headline: "Need something simple? Start static.",
      description:
        "A focused static website gives a business a fast, secure home online without unnecessary software or a complicated editing system.",
      primary: { label: "Explore the static option", href: "/pricing/#business-websites" },
      secondary: { label: "See a free demo", href: "/contact/?context=Static%20website%20demo" },
      note: "A clean launch path for service businesses and local brands.",
    },
    {
      id: "care-offer",
      tab: "Care offer",
      kicker: "Select client offer",
      headline: "Your first two months of care are free.",
      description:
        "Select new clients receive their first two months of monthly website care at no charge after launch.",
      primary: { label: "Ask about the offer", href: "/contact/?context=First%20two%20months%20of%20care%20free" },
      secondary: { label: "Compare care plans", href: "/pricing/#monthly-care" },
      note: "Limited to select new projects and confirmed in the project scope.",
    },
    {
      id: "cms",
      tab: "CMS add-on",
      kicker: "Optional content control",
      headline: "Want to edit the site? Add a CMS.",
      description:
        "Add a content management system for $100 per month when you need a straightforward way to update approved site content after launch.",
      primary: { label: "Add a CMS option", href: "/contact/?context=CMS%20add-on" },
      secondary: { label: "View all add-ons", href: "/pricing/#add-ons" },
      note: "The monthly CMS add-on covers the approved content types and editing workflow in your scope.",
    },
  ];
}

export function PortfolioHeroShowcase({
  starterSetupPrice,
  starterMonthlyPrice,
}: PortfolioHeroShowcaseProps) {
  const slides = getHeroSlides(starterSetupPrice, starterMonthlyPrice);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeSlide = slides[activeIndex] ?? slides[0];

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;

    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    if (Math.abs(horizontalDistance) < 48 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return;

    if (horizontalDistance < 0) showNext();
    else showPrevious();
  };

  return (
    <div
      className="portfolio-hero-rotator"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={{ display: "grid" }}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className="portfolio-hero-grid portfolio-hero-slide"
              style={{
                gridArea: "1 / 1",
                visibility: isActive ? "visible" : "hidden",
                pointerEvents: isActive ? "auto" : "none",
                animation: isActive ? undefined : "none",
              }}
            >
              <div className="portfolio-intro">
                <div className="portfolio-availability">
                  <span aria-hidden="true" />
                  {slide.kicker}
                </div>

                <h1
                  id={isActive ? "portfolio-heading" : undefined}
                  className="portfolio-display"
                >
                  {slide.headline}
                </h1>
              </div>

              <div className="portfolio-hero-copy">
                <p className="portfolio-lede">{slide.description}</p>

                <div className="portfolio-actions">
                  <ButtonLink href={slide.primary.href}>
                    {slide.primary.label} <span aria-hidden="true">↗</span>
                  </ButtonLink>
                  <ButtonLink
                    href={slide.secondary.href}
                    variant="ghost"
                    className="portfolio-slide-secondary"
                  >
                    {slide.secondary.label} <span aria-hidden="true">↗</span>
                  </ButtonLink>
                </div>

                <p className="portfolio-proof-note">{slide.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="portfolio-scanline">
        <span key={activeSlide.id} aria-hidden="true" onAnimationIteration={showNext} />
        <div className="portfolio-slide-controls">
          <div className="portfolio-slide-tabs" role="tablist" aria-label="Homepage messages">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                {slide.tab}
              </button>
            ))}
          </div>
          <div className="portfolio-slide-arrows" aria-label="Hero slide controls">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous message"
            >
              ←
            </button>
            <button type="button" onClick={showNext} aria-label="Show next message">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
