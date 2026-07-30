"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  once?: boolean;
};

export function Reveal({
  className,
  delay = 0,
  once = true,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;

    const bounds = node.getBoundingClientRect();
    const isTallContent = bounds.height > window.innerHeight * 1.25;
    const isInitiallyVisible =
      bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;

    node.classList.add("is-reveal-ready");
    if (isInitiallyVisible) node.classList.add("is-visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (once) observer.unobserve(entry.target);
          return;
        }
        if (!once) entry.target.classList.remove("is-visible");
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: isTallContent ? 0.04 : 0.18,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          ...style,
          ["--reveal-delay" as string]: `${delay}ms`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
