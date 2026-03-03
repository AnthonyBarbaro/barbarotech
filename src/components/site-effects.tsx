"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const supportsFinePointer = window.matchMedia("(pointer: fine)");

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight * 0.18;
    let rafCursor = 0;

    const updateCursor = () => {
      root.style.setProperty("--cursor-x", `${cursorX}px`);
      root.style.setProperty("--cursor-y", `${cursorY}px`);
      rafCursor = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion.matches || !supportsFinePointer.matches) return;
      cursorX = event.clientX;
      cursorY = event.clientY;
      if (!rafCursor) rafCursor = window.requestAnimationFrame(updateCursor);
    };

    const updateScrollProgress = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      const progress = max === 0 ? 0 : Math.min(window.scrollY / max, 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    updateCursor();
    updateScrollProgress();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      if (rafCursor) window.cancelAnimationFrame(rafCursor);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <>
      <div className="site-effects" aria-hidden>
        <div className="site-aura" />
        <div className="site-grid" />
        <div className="site-grain" />
      </div>
      <div className="scroll-progress" aria-hidden />
    </>
  );
}
