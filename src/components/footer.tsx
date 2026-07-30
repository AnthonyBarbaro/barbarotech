import Link from "next/link";
import { Container } from "@/components/container";
import { FooterCta } from "@/components/footer-cta";
import { getSetupFeePromotionText, setupFeePromotion } from "@/data/pricing";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About Anthony" },
  { href: "/contact/", label: "Contact" },
];

export function Footer() {
  const phoneHref = `tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`;

  return (
    <footer className="relative border-t border-cyan-200/15 bg-[#02060b]">
      <Container className="py-10 md:py-14">
        <FooterCta />

        <div className="grid gap-10 border-b border-cyan-200/12 py-10 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label={`${SITE.brand} home`}>
              <span className="signal-node" aria-hidden="true" />
              <span className="text-lg font-extrabold tracking-[-0.025em] text-white">
                Barbaro<span className="text-cyan-300">Tech</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Anthony Barbaro&apos;s solo web studio for conversion-focused websites, stores,
              and custom web applications.
            </p>
            {setupFeePromotion.enabled ? (
              <p className="mt-4 max-w-md font-mono text-xs leading-6 text-cyan-200">
                {setupFeePromotion.label}: {getSetupFeePromotionText()}. Monthly care is unchanged.
              </p>
            ) : null}
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-3 text-sm font-bold text-white">Explore</p>
            <div className="grid gap-2">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="min-h-8 text-sm text-slate-400 transition-colors hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <p className="mb-3 text-sm font-bold text-white">Direct line</p>
            <div className="grid gap-3 text-sm">
              <a href={phoneHref} className="signal-link w-fit">
                {SITE.contact.displayPhone}
              </a>
              <a href={`mailto:${SITE.contact.fallbackEmail}`} className="signal-link w-fit break-all">
                {SITE.contact.fallbackEmail}
              </a>
              {SITE.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="signal-link w-fit"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 font-mono text-[10px] leading-5 tracking-[0.04em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.owner}. BarbaroTech is a personal brand and solo studio.
          </p>
          <p>Websites / stores / custom software</p>
        </div>
      </Container>
    </footer>
  );
}
