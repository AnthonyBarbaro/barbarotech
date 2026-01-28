import Link from "next/link";
import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/20 bg-gradient-to-t from-black via-zinc-950 to-zinc-900 text-white">
      <Container className="py-8 md:py-10 text-sm flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left: brand, accent, tagline, copyright */}
        <div className="space-y-3 max-w-md">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-8 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            <span className="font-semibold tracking-tight text-white">
              {SITE.brand}
            </span>
          </div>

          <p className="text-xs md:text-sm text-white/60">
            Clean, fast sites and full‑stack apps for smoke shops, gas stations,
            liquor stores, and growing businesses that want a professional online presence.
          </p>

          <p className="text-[11px] text-white/40">
            © {new Date().getFullYear()} {SITE.owner}. All rights reserved.
          </p>
        </div>

        {/* Right: nav + socials */}
        <div className="flex flex-col gap-4 md:items-end">
          {/* Footer nav */}
          <nav className="flex flex-wrap gap-4 text-xs md:text-sm">
            <Link href="/projects" className="text-white/70 hover:text-sky-300 transition-colors">
              Projects
            </Link>
            <Link href="/pricing" className="text-white/70 hover:text-sky-300 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-white/70 hover:text-sky-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-sky-300 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Socials */}
          {SITE.socials.length > 0 && (
            <div className="flex flex-wrap gap-3 text-xs md:text-sm">
              {SITE.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-sky-300 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}

          {/* Tiny line about stack */}
          <p className="text-[11px] text-white/35">
            Built with Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  );
}
