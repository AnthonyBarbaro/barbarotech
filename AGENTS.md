# AGENTS.md

## Project
BarbaroTech marketing site plus new Client Portal and Admin dashboard.

## Commands
- Install: npm install
- Lint: npm run lint
- Build: npm run build

## Current phase
Start with Phase 1 only unless explicitly told otherwise:
- Static dashboard shell
- Portal/admin routes
- Reusable UI components
- Mock data only
- No real auth, billing, database, or AWS integration yet

## Important constraints
- barbaro.tech remains static on S3 + CloudFront.
- Do not use Next route handlers for production API behavior.
- Do not build custom auth screens.
- Do not build custom payment forms.
- Do not expose secrets in frontend code.
- Do not add real DATABASE_URL, Stripe keys, AWS keys, or Cognito secrets to the repo.
- Frontend may only use NEXT_PUBLIC_* variables.
- Client-facing language should say “client,” “request,” “care plan,” “retainer,” “billing,” and “next step.”
- Avoid “ticket,” “issue,” “customer,” and generic SaaS/helpdesk language in client-facing UI.

## Done means
- npm run lint passes
- npm run build passes
- New UI is responsive
- Static build contains no private client data or secrets
- Code is organized into reusable components
- Changed files are summarized after the task