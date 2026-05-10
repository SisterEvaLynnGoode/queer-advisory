'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { initScrollScrub } from '@/lib/scrollScrubVideo'
import { ScrollTrigger } from '@/lib/gsap'
import { hero } from '@/content/copy'

// True on iPhone/iPad — needed for the preload workaround below.
function isIOS() {
  return (
    typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
  )
}

export default function ScrubVideoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)
  const o1 = useRef<HTMLDivElement>(null)
  const o2 = useRef<HTMLDivElement>(null)
  const o3 = useRef<HTMLDivElement>(null)
  const o4 = useRef<HTMLDivElement>(null)

  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const video   = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    if (prefersReduced) {
      video.loop = true
      video.play().catch(() => {})
      if (o1.current) {
        o1.current.style.opacity  = '1'
        o1.current.style.transform = 'none'
      }
      return
    }

    const overlays = {
      o1: o1.current,
      o2: o2.current,
      o3: o3.current,
      o4: o4.current,
    }

    let cleanup: (() => void) | undefined

    function startScrub() {
      cleanup = initScrollScrub(video!, section!, overlays)
    }

    // ── Preload ─────────────────────────────────────────────────────────────
    // iOS Safari ignores preload="auto" and keeps the video in a suspended
    // state until the user taps. A brief play→pause puts it in "paused" state,
    // which allows currentTime to be set immediately during scroll.
    video.preload = 'auto'
    if (isIOS()) {
      video.play()
        .then(() => {
          video.pause()
          video.currentTime = 0
        })
        .catch(() => {
          // Autoplay blocked — the all-keyframe MP4 will still scrub,
          // just with a slight delay on the very first seek.
        })
    } else {
      video.load()
    }

    if (video.readyState >= 1) {
      startScrub()
    } else {
      video.addEventListener('loadedmetadata', startScrub, { once: true })
    }

    // ── ScrollTrigger refresh on resize / orientation change ────────────────
    // Mobile browsers resize when the address bar appears/disappears.
    // ScrollTrigger needs to recalculate start/end positions each time.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh, { passive: true })
    window.addEventListener('orientationchange', () => setTimeout(refresh, 300), { passive: true })

    return () => {
      cleanup?.()
      video.removeEventListener('loadedmetadata', startScrub)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('orientationchange', refresh)
    }
  }, [prefersReduced])

  const overlayBase =
    'absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6 transition-none'

  return (
    // h-scrub-outer = 400vh with 400svh override (globals.css).
    // svh uses the stable small viewport height, so the scroll track is
    // consistent regardless of whether the mobile browser chrome is visible.
    <section
      ref={sectionRef}
      aria-label="Queer Advisory Program — introduction"
      className={prefersReduced ? 'h-real-screen' : 'h-scrub-outer'}
    >
      {/* h-real-screen = 100vh with 100svh override */}
      <div className="sticky top-0 h-real-screen overflow-hidden">

        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          poster="/hero/queer_friendly_school_poster.jpg"
          aria-hidden="true"
        >
          {/* webm first for Chrome/Firefox; Safari falls through to mp4 */}
          <source src="/hero/queer_friendly_school_scrub.webm" type="video/webm" />
          <source src="/hero/queer_friendly_school_scrub.mp4"  type="video/mp4"  />
        </video>

        {/* Bottom-fade gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(to top, rgba(14,15,17,0.85) 0%, rgba(14,15,17,0.3) 40%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* ── Top nav ─────────────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-20">
          <span
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/60"
            aria-label="Queer Advisory at Fremont High School"
          >
            {hero.navLabel}
          </span>
          <a
            href="#inquire"
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-coral hover:text-coral/75 transition-colors"
          >
            {hero.inquireCta}
          </a>
        </div>

        {/* ── Overlay 1: 0–25% ────────────────────────────────────────── */}
        <div
          ref={o1}
          className={overlayBase}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          aria-hidden="true"
        >
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/50 mb-5">
            {hero.eyebrow}
          </span>
          <h1
            className="font-heading text-cream leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 6.5rem)', maxWidth: '18ch' }}
          >
            {hero.headline}
          </h1>
        </div>

        {/* ── Overlay 2: 25–50% ───────────────────────────────────────── */}
        <div
          ref={o2}
          className={overlayBase}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          aria-hidden="true"
        >
          <p
            className="font-heading italic text-cream leading-snug"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3.5rem)', maxWidth: '20ch' }}
          >
            {hero.overlay2}
          </p>
        </div>

        {/* ── Overlay 3: 50–75% ───────────────────────────────────────── */}
        <div
          ref={o3}
          className={overlayBase}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          aria-hidden="true"
        >
          <p
            className="font-heading text-cream leading-relaxed whitespace-pre-line"
            style={{ fontSize: 'clamp(1.3rem, 4vw, 3rem)', maxWidth: '22ch' }}
          >
            {hero.overlay3}
          </p>
        </div>

        {/* ── Overlay 4: 75–100% ──────────────────────────────────────── */}
        <div
          ref={o4}
          className={overlayBase}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          aria-hidden="true"
        >
          <p
            className="font-heading italic text-cream mb-8"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 2.25rem)' }}
          >
            {hero.overlay4}
          </p>
          <div className="flex flex-col items-center gap-1" aria-hidden="true">
            <div className="w-px h-10 bg-cream/40" />
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-cream/60 animate-bounce"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
