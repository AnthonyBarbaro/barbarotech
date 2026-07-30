"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";

export function FooterCta() {
  const pathname = usePathname() ?? "/";

  if (pathname !== "/") return null;

  return (
    <div className="signal-cta px-6 py-8 md:px-9 md:py-10">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="signal-kicker">Your next step</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl md:text-5xl">
            One conversation away from a clearer website plan.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            Tell me what you are building or what is not working. I&apos;ll reply directly with
            the clearest package, care plan, timeline, and next step.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <ButtonLink href="/contact/?intent=quote">Request a quote</ButtonLink>
          <ButtonLink href="/contact/#book-call" variant="secondary">
            Book a call
          </ButtonLink>
          <ButtonLink href="/pricing/" variant="secondary">
            Compare pricing
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
