import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SkipLink from '@/components/layout/SkipLink'
import LenisProvider from '@/components/shared/LenisProvider'

// Self-hosted via next/font — no Google CDN requests reach the user
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Queer Advisory — Fremont High School',
  description:
    'A daily homeroom at Fremont High School where queer and trans students come first, every day. Inquire about enrollment.',
  // Deliberately not indexed until you're ready to go public.
  // Remove this line when launching.
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SkipLink />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
