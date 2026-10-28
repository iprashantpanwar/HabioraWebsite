# Habiora website

The landing page for Habiora: Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
```

## Configuration

Copy `.env.example` to `.env.local` and fill in what exists:

- `NEXT_PUBLIC_APP_STORE_URL`, `NEXT_PUBLIC_GOOGLE_PLAY_URL`: override the store listings in
  `lib/constants.ts`. A store with no listing shows a "Coming soon" badge.
- `NEXT_PUBLIC_SITE_URL`: the public origin, for canonical URLs and social cards.

## Facts on the page

Growth stages, the free tree limit, island size and the FAQ answers mirror the Habiora app's
code (its `shared/src/commonMain/.../domain/model` package). They all live in
`lib/constants.ts`, so a change in the app means a change there too.

## Layout

- `app/`: layout, page, global styles, robots/sitemap, favicon
- `components/layout/`: Navbar, Footer
- `components/sections/`: one file per page section
- `components/ui/`: shared pieces (Button, TreeIllustration, Island, AppMockup, FloatingLeaves, …)
- `design-references/`: the reference image the visual direction came from

## Deploying

`.github/workflows/deploy.yml` builds the site and publishes `out/` to GitHub Pages on every
push to `main`. One-time setup in the repo's **Settings → Pages**: set **Source** to
**GitHub Actions**, and set the custom domain to `habiora.co` (also kept in `public/CNAME`).
