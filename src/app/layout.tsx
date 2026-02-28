import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/site";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brand} | ${SITE.owner}`,
    template: `%s | ${SITE.brand}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.brand} | ${SITE.owner}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.brand,
    images: [{ url: "/og.png" }],
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white`}>
        <Navbar />
        <Script
          src="https://platform.linkedin.com/badges/js/profile.js"
          strategy="afterInteractive"
        />
        {/* Only the content area gets the grid background */}
        <main className="flex-1 bg-grid-light">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
