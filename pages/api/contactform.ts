import nodemailer from 'nodemailer'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: '"Ghostible Contact" <team@ghostible.io>',
      to: 'team@ghostible.io',
      subject: `Support Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage : ${message}`,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
}
