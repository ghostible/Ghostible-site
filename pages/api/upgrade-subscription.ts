import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { userId, planId } = req.body;

  const { data, error } = await supabase
    .from('profiles')
    .select('subscription_id')
    .eq('id', userId)
    .single()
    
  if (error || !data) return res.status(404).json({ error: 'User not found or missing subscription info' })

  try {
    // Fetch the subscription to get the subscription item ID
    const subscription = await stripe.subscriptions.retrieve(data.subscription_id);
    const subscriptionItemId = subscription.items.data[0].id;

    // Update subscription with the new price
    const updated = await stripe.subscriptions.update(data.subscription_id, {
      items: [
        {
          id: subscriptionItemId,
          price: planId,
        },
      ],
      proration_behavior: 'create_prorations', // or 'none'
    });

    // Fetch the new price details
    const newPrice = await stripe.prices.retrieve(planId)
    const interval = newPrice.recurring?.interval || 'month'
    const count = newPrice.recurring?.interval_count || 1
    //const planLabel = `${count} ${interval}${count > 1 ? 's' : ''}`
    let planLabel: string;
    if (!newPrice.recurring) {
      planLabel = "One-Time Pass";
    } else if (newPrice.recurring.interval === "week") {
      planLabel = "Weekly Pass";
    } else if (newPrice.recurring.interval === "month") {
      planLabel = "Monthly Pass";
    } else {
      planLabel = `${count} ${interval}${count > 1 ? "s" : ""}`;
    }

    const currentPeriodEnd = updated.items.data[0].current_period_end
      ? new Date(updated.items.data[0].current_period_end * 1000).toISOString()
      : null

    await supabase
      .from('profiles')
      .update({
        expires_at: currentPeriodEnd,
        plan: planLabel,
      })
      .eq('id', userId)

    return res.status(200).json({ success: true, subscription: updated });
  } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(400).json({ error: err.message });
        } else {
            console.error('Unexpected error:', err);
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}
