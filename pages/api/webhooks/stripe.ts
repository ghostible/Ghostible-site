import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import twilio from 'twilio'

// ⚠️ Ensure bodyParser is disabled
export const config = {
  api: { bodyParser: false }
}

// ✅ Initialize Stripe with correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil'
})

// ✅ Supabase & Twilio setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed')
  }

  const sig = req.headers['stripe-signature'] as string

  let event: Stripe.Event

  try {
    const buf = await buffer(req)

    // 🛑 DO NOT USE .toString() here!
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    console.log('✅ Event received:', event.type)
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Webhook verification failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    console.error('❌ Unknown error during webhook verification')
    return res.status(500).send('Unknown error')
  }

  // ✅ Process successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const metadata = session.metadata || {}
    const userId = metadata.user_id
    const feature = metadata.feature
    const plan = metadata.plan // 'weekly' or 'monthly'

    console.log('🔎 Metadata received:', metadata)

    if (!userId || feature !== 'temp_number' || !plan) {
      console.warn('⚠️ Missing or invalid metadata. Skipping.')
      return res.status(200).end()
    }

    try {
      // 1. Buy a real Twilio number
      // const availableNumbers = await twilioClient
      //   .availablePhoneNumbers('US')
      //   .local.list({ smsEnabled: true, limit: 1 })

      // if (availableNumbers.length === 0) {
      //   console.error('❌ No available Twilio numbers')
      //   return res.status(500).send('No numbers available')
      // }

      // const number = await twilioClient.incomingPhoneNumbers.create({
      //   phoneNumber: availableNumbers[0].phoneNumber,
      //   smsUrl: 'https://267f531da82e.ngrok-free.app/api/receive-sms',
      // })
      
      const number = await twilioClient.incomingPhoneNumbers.create({
        phoneNumber: '+15005550006',
        smsUrl: 'https://yourdomain.com/api/receive-sms',
      })

      const tempNumber = number.phoneNumber
      const phoneProvider = 'twilio'

      // 2. Calculate expiry
      const expiresAt = new Date()
      if (plan === 'week') {
        expiresAt.setDate(expiresAt.getDate() + 7)
      } else if (plan === 'month') {
        expiresAt.setMonth(expiresAt.getMonth() + 1)
      }

      // 3. Update Supabase profile
      const { error } = await supabase
        .from('profiles')
        .update({
          temp_number: tempNumber,
          phone_provider: phoneProvider,
          plan: plan,
          expires_at: expiresAt.toISOString(),
        })
        .eq('id', userId)

      if (error) {
        console.error('❌ Supabase update error:', error)
        return res.status(500).send('Supabase update failed')
      }

      console.log(`✅ Supabase profile updated for user ${userId}`)

    } catch (err) {
      console.error('❌ Unexpected error:', err)
      return res.status(500).send('Unexpected error')
    }
  }

  return res.status(200).send('Webhook handled')
}