# BarbaroTech

Production marketing and portfolio website for BarbaroTech.

Built with Next.js App Router, TypeScript, React, and Tailwind CSS. The public site is intended to stay static-friendly, with direct phone/email fallbacks available on the contact page.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 3
- ESLint 9
- Nodemailer for optional local/server form delivery

## What This Site Includes

- Marketing pages: Home, Services, Projects, Pricing, About, Contact
- Dynamic project case studies: `/projects/[slug]`
- Dynamic service landing pages: `/services/[slug]`
- Five template-aligned website starting packages plus custom software
- Required monthly care, simple payment terms, pricing FAQ, and quote CTAs
- Data-driven content from local TypeScript files
- Responsive UI components, reveal animations, SEO metadata, Open Graph tags, and JSON-LD
- Contact page with direct phone/email fallback and optional form components

## Requirements

- Node.js 20+
- npm

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

Optional local form testing can use `.env.local` with SMTP settings and `CONTACT_INTAKE_ENABLED=true`. Production contact behavior should remain static-friendly unless a static-compatible form provider is intentionally configured.

## Scripts

- `npm run dev` - start local development server
- `npm run typecheck` - run TypeScript checks
- `npm run lint` - run lint checks
- `npm run build` - production build
- `npm run build:static` - static site build
- `npm run start` - run Next production server

## Project Structure

```text
src/
  app/                 # route pages and layout
  app/api/             # optional local/server form endpoints
  components/          # UI and feature components
  data/                # pricing/projects/service/industry content
  lib/                 # site config, SEO helpers, form/email utilities
public/                # static assets and project images
```

## Pricing Maintenance

Edit all productized pricing content in `src/data/pricing.ts`.

- Flash sale setup-fee discounts are controlled by `setupFeePromotion.percentOff`.
- Website package groups are exported as `pricingPackageGroups`, with one public starting package per real template.
- Standard add-on ranges remain in `pricingAddOns` as quote-time references and are not rendered on the public pricing page.
- Monthly care copy is exported as `monthlyCareIncludes`; each package carries its required monthly price.
- Payment terms are exported as `paymentTerms`.
- Third-party platform cost notes are exported as `platformCostNotes`.
- Pricing FAQ content is exported as `pricingFaqs`.

Plan slugs connect to quote links through `pricingQuoteHref(planSlug)`, which creates `/contact/?plan=<plan-slug>` links. The contact form resolves plan slugs through `getPlanLabelFromParam()` and the contact options in `src/data/contact.ts`.

Third-party platform, app, hosting, SMS, email, and payment-processing costs are separate from BarbaroTech setup pricing and monthly care unless explicitly scoped into a quote.

## Content Maintenance

- Global site identity and contact info: `src/lib/site.ts`
- Pricing packages, add-ons, care plans, terms, and FAQ: `src/data/pricing.ts`
- Contact plan options and booking slots: `src/data/contact.ts`
- Project cards and case study fields: `src/data/projects.ts`
- Service landing page content: `src/data/services.ts`
- Industry-focused content: `src/data/industries.ts`
- Route-level page copy:
  - `src/app/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/pricing/page.tsx`
  - `src/app/projects/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/contact/page.tsx`

## Build Notes

- `trailingSlash: true`
- `images.unoptimized: true`
- Keep public frontend configuration limited to `NEXT_PUBLIC_*` values.
- Do not add secrets to frontend code.
- Keep production contact and quote flows compatible with static hosting unless the hosting plan intentionally changes.
