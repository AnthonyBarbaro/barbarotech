import Link from "next/link";
import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/guides/", label: "Guides" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Footer() {
  const phoneHref = `tel:${SITE.contact.displayPhone.replace(/[^0-9+]/g, "")}`;

  return (
    <footer className="portfolio-footer">
      <Container className="portfolio-container py-10 lg:py-12">
        <div className="portfolio-footer-top">
          <Link href="/" className="portfolio-footer-mark" aria-label={`${SITE.brand} home`}>
            <strong>BarbaroTech</strong>
          </Link>

          <nav aria-label="Footer navigation">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="portfolio-footer-contact">
            <a href={`mailto:${SITE.contact.fallbackEmail}`}>{SITE.contact.fallbackEmail}</a>
            <a href={phoneHref}>{SITE.contact.displayPhone}</a>
            {SITE.socials.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer">
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="portfolio-footer-bottom">
          <p>© {new Date().getFullYear()} {SITE.owner}. Independent designer and developer.</p>
          <p>San Diego, California / Working worldwide</p>
        </div>
      </Container>
    </footer>
  );
}
