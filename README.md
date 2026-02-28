# BarbaroTech

Marketing and portfolio website for BarbaroTech, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Features

- Home, Projects, Pricing, About, and Contact pages
- Dynamic project detail routes generated at build time (`/projects/[slug]`)
- Pricing packages and project case studies driven from local data files
- Contact and call-request forms that prefill `mailto:` requests
- SEO metadata, Open Graph tags, and JSON-LD for project pages

## Prerequisites

- Node.js 20+
- npm

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_TEXT_EMAIL=6195362504@vtext.com
```

This value is used by quote CTA links on Pricing and Projects pages.

3. Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build + static export
- `npm run start` - start production server (non-export workflow)
- `npm run lint` - run ESLint

## Content Editing

- Site brand/contact/social links: `src/lib/site.ts`
- Pricing plans: `src/data/pricing.ts`
- Project cards and case-study data: `src/data/projects.ts`
- Industry content: `src/data/industries.ts`

## Build and Deploy

This project is configured for static export:

- `next.config.ts` uses `output: "export"`
- Build output is generated in `out/`

Build with:

```bash
npm run build
```

Then deploy the `out/` directory to static hosting (for example S3 + CloudFront, Netlify, or any CDN/static host).
