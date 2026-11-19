# HyPlant website

Company website for HyPlant (autodosing hidroponik). Next.js 15 (App Router), TypeScript, plain CSS. No other libraries.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Where things live

| Path | What |
|---|---|
| `lib/content.ts` | All copy and data: sensors, notifications, features, screenshots, plants, contact placeholders |
| `components/` | Page sections (Hero, HowItWorks, Notifications, Sections) |
| `app/globals.css` | Design tokens and styles. Colors match `iOS-app/DesignSystem/Theme.swift` in the Berkelompok repo |
| `public/img/` | Logo and plant photos copied from the app's `Assets.xcassets`, plus real app screenshots |

## Before going live

- Fill `[EMAIL]`, `[LOKASI]`, `[INSTAGRAM]` in `lib/content.ts` (`contact`).
- Screenshots in `public/img/screens/` come from the app on branch `pairing-link` (commit `4ccd1e2`), run with sample data. Retake them when the app UI changes.

## Deploy to Vercel

Option A, from this folder: `npx vercel` (log in, accept defaults), then `npx vercel --prod`.

Option B: push this folder to a GitHub repo, then on vercel.com choose **Add New → Project**, import the repo, and keep the detected Next.js settings.

The scroll animations use CSS scroll-driven animations (Chrome, Edge, Safari 26+). Other browsers show the finished hero without the animation.
