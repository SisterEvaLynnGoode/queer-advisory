'use client'

// Single registration point for GSAP plugins.
// Import from here — never call gsap.registerPlugin() elsewhere.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
