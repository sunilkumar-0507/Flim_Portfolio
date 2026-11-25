# N. Jhaishankar — Filmmaker Portfolio

React + TypeScript + Vite + Tailwind CSS v4, with Framer Motion, GSAP ScrollTrigger and Lenis smooth scroll.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Deploy (Vercel)

Import the folder/repo in Vercel. It detects Vite automatically: build `npm run build`, output `dist`.

## Editing content — everything lives in `src/data/`

| File | What it controls |
|---|---|
| `site.ts` | Name, tagline, hero image/video, portraits, contact, WhatsApp, Instagram/YouTube links, profile (education, languages…) |
| `films.ts` | Selected filmography (title, role, category, optional `year`, `poster`, `description`, `link`) |
| `shortFilms.ts` | YouTube short films. Any URL form works (`youtu.be/…`, `/shorts/…`, `watch?v=…`). Set `format: "vertical"` for 9:16 Shorts, `"horizontal"` for 16:9 videos. Add objects to add films. |
| `acting.ts` | Acting credits (optional `image`, optional `clip` YouTube URL) and writing section |
| `experience.ts` | Timeline entries and awards (add more awards to the array) |

## Adding real images

Put files in `public/images/` (folders `posters/`, `portraits/`, `stills/` exist) and reference them from the data files with a leading slash, e.g.

```ts
poster: "/images/posters/karuvarai.jpg"
heroImage: "/images/hero.jpg"
portrait: "/images/portraits/jhaishankar.jpg"
```

Until an image is set, a designed placeholder poster/portrait is shown. Recommended sizes: posters 1000×1500 (2:3), portrait 1200×1500, hero 2400×1350, compressed to WebP/JPG under ~400 KB.

## Social links

`site.social.instagram` and `site.social.youtube` are empty, so the buttons show "Soon" and are disabled (no broken links). Paste the profile URLs to activate them.
