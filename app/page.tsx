import ScrubVideoHero from '@/components/hero/ScrubVideoHero'
import WhatWeAre from '@/components/about/WhatWeAre'
import ProgramGrid from '@/components/programs/ProgramGrid'
import Testimonials from '@/components/voices/Testimonials'
import FamiliesFAQ from '@/components/families/FamiliesFAQ'
import InquiryForm from '@/components/inquiry/InquiryForm'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main id="main-content">
      {/* 01 — Hero: scroll-scrubbed video */}
      <ScrubVideoHero />

      {/* 02 — What this is */}
      <WhatWeAre />

      {/* 03 — What students actually get */}
      <ProgramGrid />

      {/* 04 — Voices */}
      <Testimonials />

      {/* 05 — For families */}
      <FamiliesFAQ />

      {/* 06 — Inquiry form */}
      <InquiryForm />

      {/* 07 — Footer */}
      <Footer />
    </main>
  )
}
