import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SiteEffects } from "@/components/site-effects";
import { QuickCommandDock } from "@/components/quick-command-dock";
import { SITE } from "@/lib/site";
import { BASE_KEYWORDS, SITE_LOCALE, canonicalUrl } from "@/lib/seo";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brand} | ${SITE.owner}`,
    template: `%s | ${SITE.brand}`,
  },
  description: SITE.description,
  alternates: {
    canonical: canonicalUrl("/"),
  },
  keywords: BASE_KEYWORDS,
  category: "technology",
  creator: SITE.owner,
  publisher: SITE.brand,
  authors: [{ name: SITE.owner, url: canonicalUrl("/about/") }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: `${SITE.brand} | ${SITE.owner}`,
    description: SITE.description,
    url: canonicalUrl("/"),
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} | ${SITE.owner}`,
    description: SITE.description,
    images: ["/og.png"],
  },
  other: {
    "content-language": "en",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.brand,
    url: SITE.url,
    founder: {
      "@type": "Person",
      name: SITE.owner,
    },
    email: `mailto:${SITE.contact.fallbackEmail}`,
    telephone: SITE.contact.displayPhone,
    sameAs: SITE.socials.map((social) => social.href),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.brand,
    url: SITE.url,
    inLanguage: "en",
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
  };

  return (
    <html lang="en">
      <body className={`${space.className} ${space.variable} ${mono.variable} min-h-screen`}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteEffects />
        <div className="app-shell flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 bg-grid-light pb-24 md:pb-28">
            {children}
          </main>
          <Footer />
        </div>
        <QuickCommandDock />
      </body>
    </html>
  );
}
