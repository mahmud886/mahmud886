# Portfolio — development notes

> The repo root README is my GitHub profile. This file documents the portfolio site that lives in the same repo.

Personal site of Iqbal Mahmud, Software Engineer — live at [mahmud886.vercel.app](https://mahmud886.vercel.app).

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP. No WebGL — static-first and fast.

## Develop

```bash
npm install
npm run dev
```

## Content

Everything on the site — profile, experience, projects, resume — lives in `src/lib/data.ts`.

## Resume PDF

`public/iqbal_mahmud_7_years.pdf` is rendered from `/resume` with headless Chrome. After changing resume content:

```bash
npm run build && npm run resume:pdf
```

## Versions

| Branch | Design |
|---|---|
| `v5-bento` | Bento: glassy tiles, aurora, spotlight hover, project cards that expand into a modal (motion) |
| `v4-engineer` | Engineer's blueprint: light/dark, live terminal, git-log experience, ⌘K palette |
| `eclipse-bg` | v3 futuristic site with the pixel-art eclipse / video background |
| `master` | Live site |
| `legacy-v3` | v3 futuristic site (GSAP + 3D blob) |
| `legacy-v2` | The previous site |
