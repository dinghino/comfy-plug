import nodemailer, { Transporter } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/sendmail-transport'

type TransporterType = 'gmail' | 'office365'

function getGenericTransporter() {
  return nodemailer.createTransport({
    host: process.env.CONTACT_MAIL_HOST,
    port: +(process.env.CONTACT_MAIL_PORT || 587),
    auth: {
      pass: process.env.CONTACT_MAIL_PASS,
      user: process.env.CONTACT_MAIL_USER,
    },
  })
}

function getGmailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      pass: process.env.CONTACT_MAIL_PASS,
      user: process.env.CONTACT_MAIL_USER,
    },
  })
}

export const getTransporter = (): Transporter => {
  switch (process.env.CONTACT_MAIL_TRANSPORTER as TransporterType) {
    case 'office365':
      return getGenericTransporter()
    case 'gmail':
      return getGmailTransporter()
    default:
      return getGenericTransporter()
  }
}

type Options = {
  from: string
  subject: string
  html: string
  replyTo?: string
  // } & Exclude<Parameters<typeof transporter.sendMail>[0], 'to'>
} & Exclude<MailOptions, 'to'>

/**
 * Backend function that actually sends emails
 * @param opts Options to send the email
 */
export const sendMail = async (opts: Options) => {
  const transporter = getTransporter()

  const mailOptions: MailOptions = {
    to: process.env.CONTACT_MAIL_TO,
    ...opts,
  }

  await transporter.sendMail(mailOptions)
}
