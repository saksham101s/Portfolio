# Saksham Upreti — Portfolio

"Vector Space" portfolio: a 3D embedding-particle hero, a ⌘K search over the site with similarity scores, and projects shown as retrieved results.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Edit content

All text, links and projects live in **`src/data/portfolio.ts`**. To add a project's links, set `github` / `demo` on it — the buttons appear automatically.
Replace `public/Saksham_Upreti_Resume.pdf` to update the downloadable resume.

## Deploy (Vercel)

1. Push this repo to GitHub and import it at vercel.com/new (framework is auto-detected).
2. Add env var `NEXT_PUBLIC_SITE_URL` = your final URL (used for SEO, sitemap and the social preview image).

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · React Three Fiber (custom GLSL shader) · Motion · Lenis · cmdk
