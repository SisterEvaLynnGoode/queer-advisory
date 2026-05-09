# Queer Advisory — Fremont High School website

Production-ready Next.js 15 site for the Queer Advisory Program.
Primary CTA: enrollment inquiry form at `#inquire`.

---

## Running locally

```bash
cd queer-advisory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

```bash
npx vercel
```

Or connect the repo to Vercel and it will deploy automatically on push.

Remove the `robots: { index: false, follow: false }` line from `app/layout.tsx`
when you're ready for the site to be indexed publicly.

---

## Hero video files

Before the site looks right you need three files in `public/hero/`:

| File | How to get it |
|---|---|
| `queer_friendly_school_scrub.mp4` | Run `prep_scrub_video.bat` on the source video |
| `queer_friendly_school_scrub.webm` | Same — the bat file should produce both |
| `queer_friendly_school_poster.jpg` | A single frame from the video (first frame or a representative moment) |

The site works without them (it shows the poster placeholder), but the scrub
won't play until the files are in place.

---

## Wiring up real form submissions (Resend)

1. `npm install resend`
2. Create a free account at [resend.com](https://resend.com) and get an API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   RESEND_TO_EMAIL=tgbedwards@gmail.com
   ```
4. Follow the commented-out code in `app/api/inquire/route.ts`

Until then, submissions are logged to the server console (`npm run dev` terminal).

---

## {{ NEEDS }} — content still required

Search the codebase for `{{ NEEDS` to find every placeholder. Summary:

| What's needed | Where |
|---|---|
| 3 testimonials with explicit permission to publish | `content/copy.ts` → `testimonials` array, then they auto-render in `Testimonials.tsx` |
| Answer to "Do you work with religious families?" FAQ | `content/copy.ts` → `families.faqs[2].a` |
| Enrollment process details | `content/copy.ts` → `families.faqs[4].a` |
| Hero video files (see above) | `public/hero/` |

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Styles | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Icons | lucide-react |
| Fonts | Fraunces · Inter · JetBrains Mono (self-hosted via next/font) |
| Form email | Stubbed → Resend (see above) |
| Deploy target | Vercel |

**Privacy:** No analytics, no third-party tracking pixels, no CDN font requests.
The form does not write to localStorage or retain data client-side.

---

## File structure

```
app/
  layout.tsx          Root layout — fonts, providers, metadata
  page.tsx            Page composition — imports all section components
  globals.css         Tailwind v4 + design tokens + base styles
  api/inquire/route.ts  POST handler (stubbed → Resend)
components/
  hero/ScrubVideoHero.tsx   Scroll-scrubbed video hero + four text overlays
  about/WhatWeAre.tsx       Section 02
  programs/ProgramGrid.tsx  Section 03
  voices/Testimonials.tsx   Section 04
  families/FamiliesFAQ.tsx  Section 05
  inquiry/InquiryForm.tsx   Section 06
  layout/Footer.tsx         Section 07
  layout/SkipLink.tsx       Accessibility skip link
  shared/LenisProvider.tsx  Smooth scroll + GSAP ticker wiring
  shared/ReducedMotionGate.tsx  Swap animated/static based on OS preference
lib/
  gsap.ts             Single GSAP plugin registration point
  useReducedMotion.ts Hook — respects prefers-reduced-motion
  useInView.ts        Hook — IntersectionObserver for scroll-in animations
  scrollScrubVideo.ts Video scrub + overlay animation logic
content/
  copy.ts             All site copy in one place — edit here
public/
  hero/               Video files (add manually — see above)
```
