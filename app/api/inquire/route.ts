import { NextRequest, NextResponse } from 'next/server'

// Stubbed POST handler — logs submissions and returns 200.
//
// To wire up real email with Resend:
//   1. npm install resend
//   2. Add RESEND_API_KEY to .env.local  (get one at https://resend.com)
//   3. Add RESEND_TO_EMAIL=tgbedwards@gmail.com to .env.local
//   4. Replace the stub below with:
//
//      import { Resend } from 'resend'
//      const resend = new Resend(process.env.RESEND_API_KEY)
//
//      await resend.emails.send({
//        from: 'Queer Advisory <noreply@yourdomain.com>',
//        to: process.env.RESEND_TO_EMAIL!,
//        subject: `New inquiry from ${data.yourName}`,
//        text: JSON.stringify(data, null, 2),
//      })
//
//   Docs: https://resend.com/docs/send-with-nextjs

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Basic validation
    if (!data.email || !data.message) {
      return NextResponse.json(
        { error: 'email and message are required' },
        { status: 400 }
      )
    }

    // Stub: log to server console
    console.log('[inquire] New inquiry submission:', {
      yourName: data.yourName ?? '(not provided)',
      relationship: data.relationship ?? '(not provided)',
      email: data.email,
      phone: data.phone ?? '(not provided)',
      studentNamePronouns: data.studentNamePronouns ?? '(not provided)',
      message: data.message,
      receivedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }
}
