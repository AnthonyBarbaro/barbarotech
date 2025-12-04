import Link from "next/link";
import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/80 backdrop-blur">
      <Container className="py-8 text-sm text-white/70 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left: brand + mini tagline + copyright */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-white" />
            <span className="font-semibold text-white">{SITE.brand}</span>
          </div>

          <p className="text-xs text-white/60 max-w-md">
            Clean, fast sites and full-stack apps for smoke shops, gas stations,
            liquor stores, and more.
          </p>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {SITE.owner}. All rights reserved.
          </p>
        </div>

        {/* Right: footer nav + socials */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          {/* Footer nav links (mirrors main nav) */}
          <div className="flex flex-wrap gap-4 text-xs md:text-sm">
            <Link href="/projects" className="text-white/70 hover:text-white">
              Projects
            </Link>
            <Link href="/pricing" className="text-white/70 hover:text-white">
              Pricing
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-white">
              Contact
            </Link>
          </div>

          {/* Social links from SITE.socials */}
          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            {SITE.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
