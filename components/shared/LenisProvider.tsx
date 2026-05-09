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
    if (prefersReduced) {
      // No smooth scroll when the user has requested reduced motion.
      // ScrollTrigger still works — it falls back to native scroll events.
      return
    }

    const lenis = new Lenis()

    // Wire Lenis to GSAP's ticker so ScrollTrigger stays in sync
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
