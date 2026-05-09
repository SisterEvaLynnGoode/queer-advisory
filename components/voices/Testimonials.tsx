import { testimonials } from '@/content/copy'

const groups = [
  {
    label: 'On creating a safe haven',
    range: [0, 3] as [number, number],
  },
  {
    label: 'On supportive staff & relationships',
    range: [3, 6] as [number, number],
  },
  {
    label: 'On personal growth & belonging',
    range: [6, 9] as [number, number],
  },
  {
    label: 'On the school\'s unique impact',
    range: [9, 10] as [number, number],
  },
]

export default function Testimonials() {
  const hasTestimonials = testimonials.length > 0

  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      className="section-pad max-w-7xl mx-auto"
    >
      <p className="eyebrow mb-4">Voices</p>
      <h2
        id="voices-heading"
        className="font-heading text-cream leading-[1.05] mb-20"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        In their own words.
      </h2>

      {hasTestimonials ? (
        <div className="flex flex-col gap-20">
          {groups.map((group) => {
            const slice = testimonials.slice(group.range[0], group.range[1])
            if (slice.length === 0) return null
            return (
              <div key={group.label}>
                {/* Group label */}
                <p className="eyebrow mb-10">{group.label}</p>

                {/* Quotes — 2-up on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {slice.map((t, i) => (
                    <figure key={i} className="flex flex-col gap-4">
                      <blockquote>
                        <p
                          className="font-heading italic text-cream leading-relaxed"
                          style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}
                        >
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </blockquote>
                      <figcaption className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/45">
                        {t.attribution}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-14 max-w-3xl">
          {[1, 2, 3].map((n) => (
            <figure key={n}>
              <blockquote>
                <p
                  className="font-heading italic text-coral/40"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                >
                  {`{{ NEEDS: testimonial ${n} — quote from a student, family, or community partner, with explicit permission to publish }}`}
                </p>
              </blockquote>
              <figcaption className="mt-4 font-mono text-[11px] tracking-[0.12em] uppercase text-cream/30">
                {`{{ NEEDS: attribution ${n} }}`}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="mt-16">
        <a
          href="#inquire"
          className="
            inline-block font-body font-medium text-sm
            border border-cream/20 text-cream
            px-6 py-3 rounded
            hover:border-coral hover:text-coral transition-colors
            focus-visible:outline-coral
          "
        >
          Reach out and add your story →
        </a>
      </div>
    </section>
  )
}
