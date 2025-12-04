import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { buildMailtoHref } from "@/lib/mailto";

export function Navbar() {
  const textHref = buildMailtoHref({
    to: SITE.contact.textEmail,
    subject: `${SITE.brand} inquiry`,
    body: `Name:\nBusiness:\nService Needed (Static / Backend):\nBest time to reach you:\n`,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          {SITE.brand}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-white/80 hover:text-white" href="/projects">
            Projects
          </Link>
          <Link className="text-white/80 hover:text-white" href="/pricing">
            Pricing
          </Link>
          <Link className="text-white/80 hover:text-white" href="/about">
            About
          </Link>
          <Link className="text-white/80 hover:text-white" href="/contact">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={textHref} variant="secondary">
            Text for a quote
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
