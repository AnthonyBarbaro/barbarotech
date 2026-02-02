import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { CallBookingForm } from "@/components/call-booking-form";

export const metadata = {
  title: `Contact | ${SITE.brand}`,
  description:
    "Request a quote or book a call for websites, remodels, Shopify work, and full-stack apps.",
  alternates: {
    canonical: `${SITE.url}/contact/`,
  },
};
export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      {/* HEADER */}
      <section className="border-b border-black/10 bg-gradient-to-b from-white via-sky-50 to-white">
        <Container className="py-16 space-y-4">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Contact
            </h1>
            <div className="h-px w-24 bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
          </div>

          <p className="text-black/70 max-w-2xl text-sm md:text-base leading-relaxed">
            Tell me a bit about your business and what you want built or fixed. 
            I’ll reply with a clear quote and suggested next steps.
          </p>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="bg-zinc-50 border-b border-black/10">
        <Container className="py-12 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          
          {/* QUOTE FORM */}
          <Card className="bg-white border border-black/5 shadow-sm">
            <CardContent className="p-6 md:p-7 space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-semibold">Request a quote</h2>
                <p className="text-sm text-black/70">
                  The more detail you share, the faster I can give you an accurate price and timeline.
                </p>
              </div>

              {/* No searchParams — fully static */}
              <ContactForm />
            </CardContent>
          </Card>

          {/* CALL BOOKING + INFO */}
          <div className="space-y-5">
            {/* BOOK CALL */}
            <Card id="book-call" className="bg-white border border-black/5 shadow-sm">
              <CardContent className="p-5 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-black">Book a call</h3>
                  <p className="text-sm text-black/70">
                    Prefer a quick conversation? Request a Zoom or phone call 
                    and I’ll confirm the closest available time.
                  </p>
                </div>

                {/* Static — no searchParams */}
                <CallBookingForm />
              </CardContent>
            </Card>

            {/* HOW I WORK */}
            <Card className="bg-white border border-black/5 shadow-sm">
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-black">How I typically work</h3>
                <ul className="space-y-1.5 text-sm text-black/70">
                  <li>• Quick call or message to clarify what you need.</li>
                  <li>• Written scope with price range and timeline.</li>
                  <li>• Build, reviews, and deployment handled end‑to‑end.</li>
                  <li>• Optional maintenance for ongoing edits/support.</li>
                </ul>
              </CardContent>
            </Card>

            {/* DIRECT CONTACT */}
            <Card className="bg-white border border-black/5 shadow-sm">
              <CardContent className="p-5 space-y-2 text-sm text-black/70">
                <h3 className="text-sm font-semibold text-black">Direct contact</h3>

                <p>
                  <span className="font-medium">Phone:</span> {SITE.contact.displayPhone}
                </p>

                <p>
                  <span className="font-medium">Email:</span> {SITE.contact.fallbackEmail}
                </p>

                <p className="text-xs text-black/50 pt-1">
                  Quote requests go straight to my phone via vtext, 
                  and call requests email me the details so I can confirm a Zoom or phone session.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
