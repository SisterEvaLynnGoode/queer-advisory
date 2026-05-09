import { about } from '@/content/copy'

export default function WhatWeAre() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad max-w-7xl mx-auto"
    >
      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

        {/* Left: headline */}
        <div>
          <p className="eyebrow mb-4">{about.eyebrow}</p>
          <h2
            id="about-heading"
            className="font-heading text-cream leading-[1.05]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {about.headline}
          </h2>
        </div>

        {/* Right: body copy */}
        <div className="flex flex-col gap-5">
          {about.paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-body text-cream/80 text-[1.05rem] leading-[1.75]"
            >
              {para}
            </p>
          ))}

          <div className="mt-6">
            <a
              href="#inquire"
              className="
                inline-block font-body font-medium text-sm
                bg-coral text-ink
                px-6 py-3 rounded
                hover:bg-coral/85 transition-colors
                focus-visible:outline-coral
              "
            >
              Inquire about enrollment →
            </a>
          </div>
        </div>
      </div>

      {/* ── Stat tiles ────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded overflow-hidden"
        role="list"
        aria-label="Program statistics"
      >
        {about.stats.map((stat) => (
          <div
            key={stat.label}
            role="listitem"
            className="bg-card flex flex-col items-center justify-center text-center py-10 px-6"
          >
            <span
              className="font-heading text-coral"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {stat.value}
            </span>
            <span className="font-body text-cream/55 text-sm mt-2 leading-snug max-w-[12ch]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
