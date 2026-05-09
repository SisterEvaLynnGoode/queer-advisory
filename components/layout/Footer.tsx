import { site, footer } from '@/content/copy'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="border-t border-white/[0.06] mt-0"
    >
      {/* ── Three-column grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* Col 1: Brand */}
        <div className="flex flex-col gap-3">
          <span
            className="font-heading text-cream"
            style={{ fontSize: '1.6rem' }}
          >
            {site.name}
          </span>
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-cream/40">
            {footer.tagline}
          </span>
        </div>

        {/* Col 2: Nav */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-3">
            {footer.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-sm text-cream/55 hover:text-teal transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3: Contact */}
        <address className="font-body not-italic flex flex-col gap-2">
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-cream/30 mb-1">
            Contact
          </span>
          <span className="text-sm text-cream/65">{site.lead.name}</span>
          <span className="text-sm text-cream/65">{site.lead.title}</span>
          <span className="text-sm text-cream/65">{site.school}</span>
          <a
            href={`mailto:${site.lead.email}`}
            className="text-sm text-teal hover:text-teal/75 transition-colors mt-1"
          >
            {site.lead.email}
          </a>
        </address>
      </div>

      {/* ── Bottom strip ──────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.05em] text-cream/30">
            © {year} {site.name} · {site.school} · {site.district}
          </p>
          <p className="font-mono text-[11px] tracking-[0.05em] text-cream/30">
            {footer.privacy}
          </p>
        </div>
      </div>
    </footer>
  )
}
