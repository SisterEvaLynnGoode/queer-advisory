'use client'

import { useState, useId } from 'react'
import { inquiry } from '@/content/copy'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const uid = useId()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('server error')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please email us directly at tgbedwards@gmail.com.')
    }
  }

  const fieldClass =
    'w-full bg-card border border-white/10 rounded px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-teal transition-colors'
  const labelClass = 'block font-mono text-[11px] tracking-[0.1em] uppercase text-cream/50 mb-2'
  const errorClass = 'text-coral text-xs mt-1'

  return (
    <section
      id="inquire"
      aria-labelledby="inquire-heading"
      className="section-pad-sm"
    >
      <div className="max-w-[540px] mx-auto px-6 text-center">

        <p className="eyebrow mb-4">{inquiry.eyebrow}</p>
        <h2
          id="inquire-heading"
          className="font-heading text-cream leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {inquiry.headline}
        </h2>
        <p className="font-body text-cream/60 text-sm mb-10">
          {inquiry.subhead}
        </p>

        {status === 'success' ? (
          <div
            role="alert"
            className="bg-teal/10 border border-teal/30 text-teal rounded px-6 py-8 text-left"
          >
            <p className="font-heading text-xl mb-2">We got your message.</p>
            <p className="font-body text-sm text-cream/70 leading-relaxed">
              We'll read it and be in touch within three school days. Thank you
              for reaching out.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="text-left flex flex-col gap-6"
            aria-label="Enrollment inquiry form"
          >
            {/* Your name */}
            <div>
              <label htmlFor={`${uid}-name`} className={labelClass}>
                Your name
              </label>
              <input
                id={`${uid}-name`}
                name="yourName"
                type="text"
                autoComplete="name"
                required
                className={fieldClass}
                placeholder="First and last name"
                aria-required="true"
              />
            </div>

            {/* Relationship */}
            <div>
              <label htmlFor={`${uid}-relationship`} className={labelClass}>
                Your relationship to the student
              </label>
              <select
                id={`${uid}-relationship`}
                name="relationship"
                required
                className={`${fieldClass} appearance-none`}
                aria-required="true"
                defaultValue=""
              >
                <option value="" disabled>Select one</option>
                <option value="parent-guardian">Parent or guardian</option>
                <option value="student">I'm the student</option>
                <option value="educator">Educator or counselor</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor={`${uid}-email`} className={labelClass}>
                Email <span className="text-coral" aria-hidden="true">*</span>
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClass}
                placeholder="you@example.com"
                aria-required="true"
              />
            </div>

            {/* Phone — optional */}
            <div>
              <label htmlFor={`${uid}-phone`} className={labelClass}>
                Phone <span className="text-cream/30">(optional)</span>
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                placeholder="(510) 555-0100"
              />
            </div>

            {/* Student name + pronouns — optional */}
            <div>
              <label htmlFor={`${uid}-student`} className={labelClass}>
                Student's first name and pronouns, if you'd like to share{' '}
                <span className="text-cream/30">(optional)</span>
              </label>
              <p className="font-body text-cream/35 text-xs mb-2 leading-snug">
                Optional. Share only what you're ready to.
              </p>
              <input
                id={`${uid}-student`}
                name="studentNamePronouns"
                type="text"
                className={fieldClass}
                placeholder="e.g., Jordan, they/them"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor={`${uid}-message`} className={labelClass}>
                What you'd like us to know{' '}
                <span className="text-coral" aria-hidden="true">*</span>
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                required
                rows={5}
                className={`${fieldClass} resize-none`}
                placeholder="Tell us a little about your situation, what you're looking for, any questions you have..."
                aria-required="true"
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p
                role="alert"
                id={`${uid}-error`}
                className={errorClass}
                aria-live="polite"
              >
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="
                w-full bg-coral text-ink
                font-body font-medium text-sm
                py-4 rounded
                hover:bg-coral/85 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                focus-visible:outline-coral focus-visible:outline-offset-2
              "
            >
              {status === 'loading' ? 'Sending…' : inquiry.submitLabel}
            </button>

            {/* Privacy note */}
            <p className="font-mono text-[11px] tracking-[0.05em] text-cream/30 text-center leading-relaxed">
              {inquiry.privacy}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
