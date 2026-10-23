# Portfolio — development notes

> The repo root README is my GitHub profile. This file documents the portfolio site that lives in the same repo.

Personal site of Iqbal Mahmud, Software Engineer — live at [mahmud886.vercel.app](https://mahmud886.vercel.app).

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP. No WebGL — canvas 2D only, static-first and fast.

## Develop

```bash
npm install
npm run dev
```

## Content

Everything on the site — profile, experience, projects, resume — lives in `src/lib/data.ts`:
`saas` (the four featured products), `projects` (client work), `lab` (side products with screens) and
`building` (smaller work in progress). Each case study's screens live in `public/images/projects/<slug>/N.webp`
and are labelled in `data.ts` with `shots(slug, labels)`.

## Motion

Everything that moves (halftone field, sculpture, marquees, ticker) honours one switch: the
Pause/Play pill. The choice is stored in `localStorage` and seeded before paint from
`prefers-reduced-motion`, see `src/lib/motion.ts` and the pre-paint script in `layout.tsx`.

## SEO and share images

- Metadata, keywords and JSON-LD (Person, WebSite, ProfilePage, CreativeWork, BreadcrumbList) live in `src/lib/seo.ts`.
- Every page has a canonical URL; blog copies point theirs at the Medium original.
- Share cards are drawn by `src/lib/og/render.tsx` (next/og) from the `opengraph-image.tsx` / `twitter-image.tsx`
  files beside each page. Fonts are static, Latin-subset TTFs in `src/lib/og/fonts` (OFL); screens are JPEGs in
  `src/lib/og/shots`. After adding a project, drop its first screen there as `<slug>.jpg`.

## Resume PDF

`public/iqbal_mahmud_7_years.pdf` is rendered from `/resume` with headless Chrome. After changing resume content:

```bash
npm run build && npm run resume:pdf
```

On Linux, point it at Chrome: `CHROME_PATH=/path/to/chrome npm run resume:pdf`. The resume prints with static
Inter Tight instances (`src/app/resume/fonts`) so the PDF embeds TrueType fonts that every ATS can read.

## Versions

| Branch | Design |
|---|---|
| `claude/compassionate-sagan-y1w8q1` | v5 Monochrome: black & white, full-width wordmark, time-aware "Hello." / "Bye.", halftone dot field, pinned work reel, line sculpture, stacked process deck, grain, cursor badges, Pause motion |
| `v4-engineer` | Engineer's blueprint: light/dark, live terminal, git-log experience, ⌘K palette |
| `eclipse-bg` | v3 futuristic site with the pixel-art eclipse / video background |
| `master` | v3 futuristic site (GSAP + 3D blob) |
| `legacy-v2` | The previous site |
