'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { families } from '@/content/copy'

function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-white/[0.08]">
      <button
        id={id}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-start justify-between gap-6
          py-6 text-left
          font-body text-cream font-medium text-[1rem] leading-snug
          hover:text-coral transition-colors
          focus-visible:outline-coral focus-visible:outline-offset-2
        "
      >
        <span>{question}</span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`flex-shrink-0 mt-0.5 text-cream/40 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        hidden={!open}
        className="pb-6"
      >
        <p className="font-body text-cream/65 text-[0.95rem] leading-[1.75]">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FamiliesFAQ() {
  return (
    <section
      id="families"
      aria-labelledby="families-heading"
      className="section-pad max-w-7xl mx-auto"
    >
      {/* ── Two-column ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left */}
        <div>
          <p className="eyebrow mb-4">{families.eyebrow}</p>
          <h2
            id="families-heading"
            className="font-heading text-cream leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {families.headline}
          </h2>
          <p className="font-body text-cream/70 text-[1.05rem] leading-[1.75] max-w-[40ch]">
            {families.intro}
          </p>
          <div className="mt-10">
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
              Start a conversation →
            </a>
          </div>
        </div>

        {/* Right: FAQ accordion */}
        <div>
          <div role="list" aria-label="Frequently asked questions">
            {families.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.q}
                answer={faq.a}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
