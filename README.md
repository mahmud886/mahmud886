# Iqbal Mahmud — Portfolio

Personal site of Iqbal Mahmud, Software Engineer — live at [mahmud886.vercel.app](https://mahmud886.vercel.app).

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · React Three Fiber.

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

The previous version of the site is preserved on the `legacy-v2` branch.
