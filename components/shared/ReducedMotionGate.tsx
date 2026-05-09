'use client'

import { useReducedMotion } from '@/lib/useReducedMotion'

interface Props {
  children: React.ReactNode
  /** Rendered instead of children when prefers-reduced-motion is active */
  fallback?: React.ReactNode
}

/**
 * Render `fallback` when the user prefers reduced motion, `children` otherwise.
 * Use this to swap animated sections for static equivalents.
 */
export default function ReducedMotionGate({ children, fallback }: Props) {
  const reduced = useReducedMotion()
  if (reduced && fallback != null) return <>{fallback}</>
  return <>{children}</>
}
