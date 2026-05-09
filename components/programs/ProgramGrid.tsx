import {
  Users,
  ShoppingBag,
  BookOpen,
  Heart,
  MapPin,
  FileText,
  type LucideProps,
} from 'lucide-react'
import { programs } from '@/content/copy'

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Users,
  ShoppingBag,
  BookOpen,
  Heart,
  MapPin,
  FileText,
}

export default function ProgramGrid() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="section-pad max-w-7xl mx-auto"
    >
      <p className="eyebrow mb-4">What students actually get</p>
      <h2
        id="programs-heading"
        className="font-heading text-cream leading-[1.05] mb-16"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        What students actually get.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded overflow-hidden">
        {programs.map((program) => {
          const Icon = ICON_MAP[program.icon] ?? FileText
          return (
            <article
              key={program.id}
              className="bg-card p-8 flex flex-col gap-5"
              aria-label={program.title}
            >
              <div className="text-teal" aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h3
                className="font-heading text-cream leading-snug"
                style={{ fontSize: '1.35rem' }}
              >
                {program.title}
              </h3>
              <p className="font-body text-cream/65 text-[0.93rem] leading-[1.7]">
                {program.body}
              </p>
            </article>
          )
        })}
      </div>

      <div className="mt-12 text-center">
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
          Ask us anything about these programs →
        </a>
      </div>
    </section>
  )
}
