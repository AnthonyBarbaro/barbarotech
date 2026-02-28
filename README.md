# BarbaroTech

Production marketing + portfolio website for BarbaroTech.

Built with Next.js App Router, TypeScript, and Tailwind CSS, and configured for static export deployment.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 3
- ESLint 9

## What This Site Includes

- Marketing pages: Home, Projects, Pricing, About, Contact
- Dynamic project case studies: `/projects/[slug]` (generated at build time)
- Data-driven content from local TypeScript files
- Contact and call booking forms that open prefilled `mailto:` links
- SEO metadata + Open Graph tags + JSON-LD on project pages

## Requirements

- Node.js 20+
- npm

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_TEXT_EMAIL=6195362504@vtext.com
```

3. Run the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment Variables

- `NEXT_PUBLIC_TEXT_EMAIL`
  - Used by "Text for a Quote" CTAs on Pricing and Projects pages.
  - Example: `6195362504@vtext.com`

Note: other contact fields (phone, fallback email, social links) are configured in `src/lib/site.ts`.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build (also generates static export in `out/`)
- `npm run start` - run Next production server
- `npm run lint` - run lint checks

## Project Structure

```text
src/
  app/                 # route pages and layout
  components/          # UI and feature components
  data/                # pricing/projects/industry content
  lib/                 # site config + utilities
public/                # static assets and project images
```

## Content Maintenance

- Global site identity and contact info: `src/lib/site.ts`
- Pricing cards/plans: `src/data/pricing.ts`
- Project cards and case study fields: `src/data/projects.ts`
- Industry-focused content: `src/data/industries.ts`
- Route-level page copy:
  - `src/app/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/pricing/page.tsx`
  - `src/app/projects/page.tsx`
  - `src/app/contact/page.tsx`

## Build + Deployment

This repo is configured for static export in `next.config.ts`:

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`

Build output is written to `out/`:

```bash
npm run build
```

Deploy the `out/` directory to any static host or CDN (S3 + CloudFront, Netlify, Vercel static hosting, etc).

## Notes

- Contact forms are client-side and rely on the visitor's email client via `mailto:`.
- If quote CTA links open without a recipient, check `NEXT_PUBLIC_TEXT_EMAIL` in `.env.local`.
