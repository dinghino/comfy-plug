'use server'

import { type ContactFormData } from '@/lib/schemas'
import { sendMail } from '@/lib/mailer'
import { render } from '@react-email/render'
import { WaitlistEmail } from '@/emails/waitlist-email'

type ActionResult = {
  success: boolean
  message: string
}

export async function submitWaitlistForm(data: ContactFormData): Promise<ActionResult> {
  try {
    // Generate email HTML from React component
    const emailHtml = await render(WaitlistEmail({ data }))

    // Send email
    await sendMail({
      from: process.env.CONTACT_MAIL_USER,
      subject: `New Waitlist Signup - ${data.role}`,
      html: emailHtml,
      replyTo: data.email,
    })

    return {
      success: true,
      message: 'Successfully joined the waitlist! We\'ll be in touch soon.',
    }
  } catch (error) {
    console.error('Waitlist submission error:', error)

    if (error instanceof Error) {
      // Email sending errors
      if (error.message.includes('Invalid login') || error.message.includes('Authentication')) {
        return {
          success: false,
          message: 'Email service configuration error. Please contact support.',
        }
      }
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}
