'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // On touch/mobile devices the OS already provides smooth momentum scroll.
    // Running Lenis on top intercepts touch events and conflicts with native
    // scroll, causing jank on the video scrub. ScrollTrigger reads native
    // scroll events fine without Lenis.
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches
    if (isTouchPrimary) return

    // Reduced-motion users also skip Lenis — no smooth override needed.
    if (prefersReduced) return

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [prefersReduced])

  return <>{children}</>
}
