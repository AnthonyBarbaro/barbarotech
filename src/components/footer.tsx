import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Footer() {
  const phoneHref = `tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`;

  return (
    <footer className="border-t border-slate-900/10 bg-white/75 backdrop-blur-xl">
      <Container className="py-10 text-sm">
        <div className="glass-panel rounded-3xl border border-slate-900/12 p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <span className="inline-flex h-2 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                <span className="text-base font-semibold tracking-tight">{SITE.brand}</span>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Structured websites and full-stack systems with speed, clarity, and long-term maintainability.
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="/contact/" variant="primary">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/projects/" variant="secondary">
                  Browse Work
                </ButtonLink>
              </div>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} {SITE.owner}. All rights reserved.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Navigation</p>
                <nav className="grid gap-2 text-sm">
                  {FOOTER_LINKS.map((item) => (
                    <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-slate-900">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Connect</p>
                <div className="grid gap-2 text-sm">
                  <a href={phoneHref} className="text-slate-600 transition hover:text-slate-900">
                    {SITE.contact.displayPhone}
                  </a>
                  <a href={`mailto:${SITE.contact.fallbackEmail}`} className="text-slate-600 transition hover:text-slate-900">
                    {SITE.contact.fallbackEmail}
                  </a>
                </div>
                {SITE.socials.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                    {SITE.socials.map((social) => (
                      <a key={social.href} href={social.href} target="_blank" rel="noreferrer" className="transition hover:text-sky-700">
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
