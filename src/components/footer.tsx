import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container className="py-10 text-sm text-white/70">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="text-white/90 font-medium">{SITE.brand}</div>
            <div>© {new Date().getFullYear()} {SITE.owner}. All rights reserved.</div>
          </div>

          <div className="flex flex-wrap gap-4">
            {SITE.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white"
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
