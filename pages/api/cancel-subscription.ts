import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { userId } = req.body
  let stripeStatus = '';
  const { data, error } = await supabase
    .from('profiles')
    .select('subscription_id')
    .eq('id', userId)
    .single()

  if (error || !data) return res.status(404).json({ error: 'User not found or missing subscription info' })
      

  try {
    if (data.subscription_id) {
      await stripe.subscriptions.cancel(data.subscription_id)
      stripeStatus = 'cancel';
    }
 
    const subscription = await stripe.subscriptions.retrieve(data.subscription_id)
    const endedAt = subscription.ended_at
    ? new Date(subscription.ended_at * 1000).toISOString()
    : null;

    await supabase
      .from('profiles')
      .update({
        expires_at: endedAt,
        subscription_id: null,
        subscription_status: stripeStatus,
      })
      .eq('id', userId)

    return res.status(200).json({ success: true })
    
  } catch (err) {
    console.error('Cancel error:', err)
    return res.status(500).json({ error: 'Failed to cancel subscription' })
  }
}
