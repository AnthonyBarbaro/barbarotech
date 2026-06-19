# BarbaroTech

Production marketing and portfolio website for BarbaroTech.

Built with Next.js App Router, TypeScript, and Tailwind CSS, with AWS-backed form delivery for static hosting.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 3
- ESLint 9
- AWS SES
- Nodemailer local fallback

## What This Site Includes

- Marketing pages: Home, Projects, Pricing, About, Contact
- Dynamic project case studies: `/projects/[slug]` (generated at build time)
- Static Client Portal and Admin dashboard preview routes: `/portal` and `/admin`
- Data-driven content from local TypeScript files
- Animated, simplified UI across all pages
- Static contact and call-request forms that submit to API Gateway/Lambda + SES
- SEO metadata + Open Graph tags + JSON-LD on project pages

## Client Portal Stack

The portal is designed as a static frontend backed by AWS serverless APIs:

- Static frontend: S3 + CloudFront
- Auth: Cognito Managed Login (no custom login/register/payment auth screens)
- API: API Gateway HTTP API + Lambda
- Database: Railway PostgreSQL
- ORM/migrations: Drizzle
- Uploads: private S3 bucket with presigned POST uploads
- Billing: Stripe Checkout + Stripe Billing Portal
- Public forms: API Gateway/Lambda + AWS SES

Production POST/API behavior should go through API Gateway/Lambda. Do not rely on
Next.js route handlers, middleware, cookies, server actions, or server redirects for
production portal API behavior while using static export.

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
cp .env.example .env.local
```

Then update the placeholders you need:

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
- `SES_FROM_EMAIL`
  - Verified SES sender for AWS Lambda contact/call submissions.
  - Use `anthony@barbaro.tech` unless the `barbaro.tech` domain is verified in SES.

Portal backend variables are server-only and must never be exposed to frontend code:

- `DATABASE_URL`
  - Local-only Railway PostgreSQL connection string for Drizzle commands.
- `DATABASE_SECRET_ID`
  - AWS Secrets Manager secret name for the Railway PostgreSQL connection string.
  - The secret may be a raw URL or JSON containing `DATABASE_URL`.
- `DATABASE_SSM_PARAMETER_NAME`
  - Optional encrypted SSM Parameter Store fallback for the Railway PostgreSQL connection string.
- `STRIPE_SECRET_KEY`
  - Local-only Stripe secret key for API tests/development.
- `STRIPE_SECRET_ID`
  - AWS Secrets Manager secret name for Stripe values.
  - JSON format may include `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- `REQUEST_UPLOAD_BUCKET`
  - Private S3 bucket used by API Gateway/Lambda for request attachment presigned POSTs.
- `COGNITO_USER_POOL_ID`
  - User Pool used by admin invite APIs.
- `ADMIN_EMAIL`
  - Server-side admin email allowed by Lambda admin APIs.
  - Defaults to `anthony@barbaro.tech`.
- `NEXT_PUBLIC_API_BASE_URL`
  - Public API Gateway base URL for the static frontend.
- `NEXT_PUBLIC_ADMIN_EMAIL`
  - Public UI guard for the admin portal.
  - Use `anthony@barbaro.tech`.
- `NEXT_PUBLIC_COGNITO_DOMAIN`
  - Public Cognito Managed Login domain.
  - Example: `https://barbarotech-portal-dev.auth.us-west-1.amazoncognito.com`
- `NEXT_PUBLIC_COGNITO_CLIENT_ID`
  - Public Cognito app client ID for authorization-code + PKCE.
- `NEXT_PUBLIC_COGNITO_REDIRECT_URI`
  - Local example: `http://localhost:3000/auth/callback/`
  - Production example: `https://barbaro.tech/auth/callback/`
- `NEXT_PUBLIC_COGNITO_LOGOUT_URI`
  - Local example: `http://localhost:3000/`
  - Production example: `https://barbaro.tech/`

Note: other contact fields (phone, fallback email, social links) are configured in `src/lib/site.ts`.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run start` - run Next production server
- `npm run lint` - run lint checks
- `npm run test` - run backend/unit tests
- `npm run db:generate` - generate Drizzle migrations
- `npm run db:migrate` - apply Drizzle migrations using `DATABASE_URL`
- `npm run cdk:synth` - synthesize the AWS portal infrastructure

## Project Structure

```text
src/
  app/                 # route pages and layout
  app/api/             # contact + call-request API routes
  components/          # UI and feature components
  data/                # pricing/projects/industry content
  lib/                 # site config + email utilities
  server/              # portal DB schema + Lambda API handlers
drizzle/               # Postgres migrations
infra/                 # AWS CDK stack for portal APIs/auth/uploads
public/                # static assets and project images
```

## Content Maintenance

- Global site identity and contact info: `src/lib/site.ts`
- Pricing cards/plans: `src/data/pricing.ts`
- Project cards and case study fields: `src/data/projects.ts`
- Industry-focused content: `src/data/industries.ts`
- Portal/admin reusable UI: `src/components/portal/`
- Cognito Managed Login frontend helper: `src/lib/portal/auth-client.ts`
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

## Local Portal Testing

The Phase 1 portal/admin screens render local mock clients, retainers, requests,
and billing data. They do not require Cognito, API Gateway, Stripe, AWS, or
Railway configuration.

- `/portal` - client-facing care plan, billing, and request preview.
- `/portal/requests` - client request board.
- `/portal/requests/new` - static request submission preview.
- `/portal/billing` - hosted billing handoff preview.
- `/admin` - operations overview.
- `/admin/clients` - local client and retainer management preview.
- `/admin/requests` - local request status and next step preview.
- `/admin/billing` - local retainer and checkout handoff preview.

The frontend only receives `NEXT_PUBLIC_*` values. Railway Postgres credentials,
Stripe secrets, and AWS secrets must remain server-side when live APIs are added
in a later phase.

## Local Managed Login

Managed Login uses Cognito's hosted UI with authorization code + PKCE. There are no
custom login, register, forgot-password, or payment-authentication screens.

For local testing, configure the Cognito app client callback/logout URLs:

- Callback: `http://localhost:3000/auth/callback/`
- Logout: `http://localhost:3000/`

Then run the dev server with:

```bash
NEXT_PUBLIC_COGNITO_DOMAIN="https://your-domain.auth.us-west-1.amazoncognito.com" \
NEXT_PUBLIC_COGNITO_CLIENT_ID="your-public-app-client-id" \
NEXT_PUBLIC_COGNITO_REDIRECT_URI="http://localhost:3000/auth/callback/" \
NEXT_PUBLIC_COGNITO_LOGOUT_URI="http://localhost:3000/" \
NEXT_PUBLIC_API_BASE_URL="https://your-api-id.execute-api.us-west-1.amazonaws.com" \
NEXT_PUBLIC_ADMIN_EMAIL="anthony@barbaro.tech" \
npm run dev
```

The Managed Login button appears in the portal/admin top bar. If the env vars are
missing, it shows `Login setup needed`.

## Build + Deployment

This repo supports static export for the marketing site:

- `trailingSlash: true`
- `images.unoptimized: true`

For the portal, keep `barbaro.tech` statically hosted on S3 + CloudFront and deploy
production portal APIs through AWS API Gateway/Lambda. Railway Postgres credentials,
Stripe secrets, and tenant-specific data must stay server-side.

Before deploying the portal stack, create/import these AWS Secrets Manager secrets:

- `barbarotech/portal/database-url`
- `barbarotech/portal/stripe`

You can override secret names and allowed origin during CDK synth/deploy:

```bash
npm run cdk:synth -- \
  -c allowedOrigin=https://barbaro.tech \
  -c extraAllowedOrigins=http://localhost:3000 \
  -c adminEmail=anthony@barbaro.tech \
  -c adminCognitoSub=replace-with-anthony-cognito-sub \
  -c contactFrom=anthony@barbaro.tech \
  -c contactTo=anthony@barbaro.tech \
  -c callTo=anthony@barbaro.tech \
  -c databaseSecretName=barbarotech/portal/database-url \
  -c stripeSecretName=barbarotech/portal/stripe \
  -c localCallbackUrl=http://localhost:3000/auth/callback/ \
  -c localLogoutUrl=http://localhost:3000/
```

## Notes

- Static-hosted form submissions use API Gateway/Lambda + SES when `NEXT_PUBLIC_API_BASE_URL` is set.
- Local Next route-handler form submissions still use SMTP as a fallback if `NEXT_PUBLIC_API_BASE_URL` is not set.
- Use `.env.example` as the baseline for local and production configuration.
