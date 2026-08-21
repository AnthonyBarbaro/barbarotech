"use client";

import { useEffect, useRef, useState } from "react";
import { PricingCard } from "@/components/pricing-card";
import type { PricingPackage } from "@/data/pricing";
import { cn } from "@/lib/utils";

type PackageDeckItem = {
  id: string;
  plan: PricingPackage;
};

export function PricingPackageDeck({ items }: { items: PackageDeckItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;
    const updateActiveCard = () => {
      frameId = 0;
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const bounds = item.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveCard);
    };

    updateActiveCard();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const showCard = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), items.length - 1);
    const item = itemRefs.current[nextIndex];
    if (!item) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollTo({
      left: item.offsetLeft - ((trackRef.current?.clientWidth ?? item.clientWidth) - item.clientWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(nextIndex);
  };

  if (items.length === 0) return null;

  return (
    <div
      className="pricing-package-deck"
      role="region"
      aria-roledescription="carousel"
      aria-label="Website packages"
    >
      <div className="pricing-deck-intro" aria-hidden="true">
        <span>Swipe to compare packages</span>
        <span>More options are waiting behind this card</span>
      </div>

      <div
        ref={trackRef}
        className="pricing-package-track"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showCard(activeIndex - 1);
          else if (event.key === "ArrowRight") showCard(activeIndex + 1);
          else if (event.key === "Home") showCard(0);
          else if (event.key === "End") showCard(items.length - 1);
          else return;
          event.preventDefault();
        }}
      >
        {items.map(({ id, plan }, index) => (
          <div
            key={id}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            id={id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${plan.name} package`}
            className={cn("pricing-package-item scroll-mt-28", index === activeIndex && "is-active")}
          >
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>

      <div className="pricing-deck-controls">
        <button
          type="button"
          onClick={() => showCard(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Show previous website package"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="pricing-deck-dots" aria-label="Choose a website package">
          {items.map(({ id, plan }, index) => (
            <button
              key={id}
              type="button"
              className={cn(index === activeIndex && "is-active")}
              onClick={() => showCard(index)}
              aria-label={`Show ${plan.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => showCard(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          aria-label="Show next website package"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Viewing {items[activeIndex]?.plan.name}
      </p>
    </div>
  );
}
