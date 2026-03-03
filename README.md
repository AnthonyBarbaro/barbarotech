# BarbaroTech

Production marketing and portfolio website for BarbaroTech.

Built with Next.js App Router, TypeScript, and Tailwind CSS, with server-side form delivery using Nodemailer.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 3
- ESLint 9
- Nodemailer

## What This Site Includes

- Marketing pages: Home, Projects, Pricing, About, Contact
- Dynamic project case studies: `/projects/[slug]` (generated at build time)
- Data-driven content from local TypeScript files
- Animated, simplified UI across all pages
- Working contact form API (`/api/contact`) with SMTP delivery
- Working call-request form API (`/api/call-request`) with SMTP delivery
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
# Public (optional)
NEXT_PUBLIC_TEXT_EMAIL=6195362504@vtext.com

# SMTP (required for forms)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# Form routing
CONTACT_FROM=BarbaroTech Contact <no-reply@barbaro.tech>
CONTACT_TO=anthony@barbaro.tech
CALL_TO=anthony@barbaro.tech
```

3. Run the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment Variables

- `NEXT_PUBLIC_TEXT_EMAIL`
  - Optional public contact target for CTA links.
  - Example: `6195362504@vtext.com`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
  - Required to send contact and call form submissions.
- `CONTACT_FROM`
  - Sender shown on outgoing form emails.
- `CONTACT_TO`
  - Recipient for quote request submissions.
- `CALL_TO`
  - Recipient for call request submissions (falls back to `CONTACT_TO`).

Note: other contact fields (phone, fallback email, social links) are configured in `src/lib/site.ts`.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run start` - run Next production server
- `npm run lint` - run lint checks

## Project Structure

```text
src/
  app/                 # route pages and layout
  app/api/             # contact + call-request API routes
  components/          # UI and feature components
  data/                # pricing/projects/industry content
  lib/                 # site config + email utilities
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
- Form email templates + send logic:
  - `src/app/api/contact/route.ts`
  - `src/app/api/call-request/route.ts`
  - `src/lib/email.ts`

## Build + Deployment

This repo uses a Next.js server runtime (needed for API form routes):

- `trailingSlash: true`
- `images.unoptimized: true`

Deploy to a platform that supports Next.js server functions (for example Vercel, or a Node-hosted Next.js runtime).

## Notes

- If SMTP env vars are missing, form submissions will fail with a server error.
- Use `.env.example` as the baseline for local and production configuration.
