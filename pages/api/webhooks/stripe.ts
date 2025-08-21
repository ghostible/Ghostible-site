import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export const config = {
  api: { bodyParser: false }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed')
  }

  const sig = req.headers['stripe-signature'] as string
  let event: Stripe.Event

  try {
    const buf = await buffer(req)
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('❌ Webhook verification failed:', err)
    return res.status(400).send(`Webhook Error`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata || {}

    const userId = metadata.user_id
    const feature = metadata.feature
    const plan = metadata.plan
    const credits = Number(metadata.credits || 0)

    if (!userId || feature !== 'temp_number' || !plan) {
      console.warn('⚠️ Missing or invalid metadata. Skipping.')
      return res.status(200).end()
    }

    try {
      // 👉 CASE 1: Add-On Credits
      if (plan === 'Add-On Credits') {
        if (credits > 0) {
          const { error } = await supabase.rpc('increment_credits', {
            uid: userId,
            amount: credits,
          })
          if (error) {
            console.error('❌ Supabase increment_credits error:', error)
            return res.status(500).send('Supabase credits update failed')
          }
          console.log(`✅ Added ${credits} credits to user ${userId}`)
        }
        return res.status(200).send('Addon credits handled')
      }

      // 👉 CASE 2: Subscription / One-Time Pass
      const subscriptionId = session.subscription as string | null
      const expiresAt = new Date()
      let subscriptionCredit = '0'

      if (plan === 'Weekly Pass') {
        expiresAt.setDate(expiresAt.getDate() + 7)
        subscriptionCredit = '7'
      } else if (plan === 'Monthly Pass') {
        expiresAt.setMonth(expiresAt.getMonth() + 1)
        subscriptionCredit = '30'
      } else if (plan === 'One-Time Pass') {
        expiresAt.setMinutes(expiresAt.getMinutes() + 20)
        subscriptionCredit = '1'

        // increment 1 credit for one-time plan
        const { error } = await supabase.rpc('increment_credits', {
          uid: userId,
          amount: 1,
        })
        if (error) {
          console.error('❌ Supabase increment_credits (One-Time Pass) error:', error)
        }
      } else {
        console.warn(`⚠️ Unknown plan duration: ${plan}`)
      }

      // update profile row
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_id: subscriptionId,
          plan,
          expires_at: expiresAt.toISOString(),
          subscription_status: 'Active',
          subscription_credit: subscriptionCredit,
          subscription_TotalCredit: subscriptionCredit,
        })
        .eq('id', userId)

      if (error) {
        console.error('❌ Supabase update error:', error)
        return res.status(500).send('Supabase update failed')
      }

      console.log(`✅ Subscription updated for user ${userId}`)
    } catch (err) {
      console.error('❌ Unexpected error:', err)
      return res.status(500).send('Unexpected error')
    }
  }

  return res.status(200).send('Webhook handled')
}