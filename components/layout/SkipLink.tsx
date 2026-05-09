export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed top-3 left-3 z-[9999]
        bg-coral text-ink
        px-4 py-2 rounded text-sm font-semibold
        focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-ink
      "
    >
      Skip to main content
    </a>
  )
}
