import { gsap, ScrollTrigger } from '@/lib/gsap'

export interface ScrubOverlayRefs {
  o1: HTMLElement | null
  o2: HTMLElement | null
  o3: HTMLElement | null
  o4: HTMLElement | null
}

function showEl(el: HTMLElement | null) {
  if (!el) return
  gsap.killTweensOf(el)
  gsap.to(el, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
}

function hideEl(el: HTMLElement | null) {
  if (!el) return
  gsap.killTweensOf(el)
  gsap.to(el, { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in' })
}

function slotForProgress(progress: number): number {
  if (progress < 0.25) return 0
  if (progress < 0.5)  return 1
  if (progress < 0.75) return 2
  return 3
}

// fastSeek() has much lower overhead than setting currentTime directly in
// browsers that support it (Firefox). Falls back to currentTime everywhere else.
function seekTo(video: HTMLVideoElement, time: number) {
  if (typeof video.fastSeek === 'function') {
    video.fastSeek(time)
  } else {
    video.currentTime = time
  }
}

export function initScrollScrub(
  video: HTMLVideoElement,
  section: HTMLElement,
  overlays: ScrubOverlayRefs,
  onCleanup?: () => void
): () => void {
  const els = [overlays.o1, overlays.o2, overlays.o3, overlays.o4]
  let activeSlot = -1

  function setSlot(slot: number) {
    if (slot === activeSlot) return
    if (activeSlot >= 0) hideEl(els[activeSlot])
    showEl(els[slot])
    activeSlot = slot
  }

  // targetTime is updated on every scroll event.
  // The GSAP ticker lerps video.currentTime toward it every animation frame,
  // decoupled from scroll so motion stays fluid even between scroll events.
  let targetTime = 0

  // Lerp factor: 0.18 gives a smooth "camera with inertia" feel without
  // noticeable lag. Higher = snappier but can feel mechanical.
  const LERP = 0.18

  // Only seek when the delta is worth it — sub-millisecond differences are
  // indistinguishable and calling seek() unnecessarily wastes decode budget.
  const MIN_DELTA = 0.008

  function tick() {
    const current = video.currentTime
    const delta = targetTime - current
    if (Math.abs(delta) > MIN_DELTA) {
      seekTo(video, current + delta * LERP)
    }
  }

  // Attach to GSAP's ticker so the video update is on the same
  // animation-frame callback as Lenis and all other GSAP animations.
  gsap.ticker.add(tick)

  // Hide all overlays, then reveal slot 0
  gsap.set(els, { opacity: 0, y: 20 })
  setSlot(0)

  // Start at the beginning
  video.currentTime = 0
  targetTime = 0

  const st = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      targetTime = self.progress * (video.duration || 15)
      setSlot(slotForProgress(self.progress))
    },
  })

  return () => {
    gsap.ticker.remove(tick)
    st.kill()
    onCleanup?.()
  }
}
