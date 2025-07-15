import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import twilio from 'twilio'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const twilioClient = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH!)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'] as string
  const buf = await buffer(req)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ Webhook signature verification failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    } else {
      console.error('❌ Unknown webhook error:', err)
      return res.status(400).send('Unknown webhook error')
    }
  }

  console.log('✅ Webhook received:', event.type)

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    console.log('📦 Full PaymentIntent:', JSON.stringify(paymentIntent, null, 2))

    const metadata = paymentIntent.metadata || {}
    const userId = metadata.user_id
    const feature = metadata.feature

    if (!userId || feature !== 'temp_number') {
      console.warn('⚠️ Missing user_id or unsupported feature in metadata:', metadata)
      return res.status(200).end()
    }

    let tempNumber
    try {
      const number = await twilioClient.incomingPhoneNumbers.create({
        phoneNumber: '+15005550006',
        smsUrl: 'https://yourdomain.com/api/receive-sms',
      })
      tempNumber = number.phoneNumber
      console.log('📲 Twilio number assigned:', tempNumber)
    } catch (error) {
      console.error('❌ Twilio error:', error)
      return res.status(500).send('Twilio assignment failed')
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ temp_number: tempNumber })
        .eq('id', userId)

      if (error) {
        console.error('❌ Supabase update error:', error)
        return res.status(500).send('Supabase update failed')
      }

      console.log(`✅ Supabase profile updated for user ${userId}`)
    } catch (e) {
      console.error('❌ Unexpected Supabase error:', e)
      return res.status(500).send('Unexpected Supabase failure')
    }
  }

  res.status(200).send('Webhook handled')
}