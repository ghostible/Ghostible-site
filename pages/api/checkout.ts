import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
//import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: '2025-06-30.basil',
})

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  
  //console.log('req.bodysss', req.body);
  
  const { userId, priceId, plan } = req.body

  if (!userId || !priceId || !plan || typeof plan !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid required fields' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SITE_URL}/tempnumber?success=true`,
      cancel_url: `${process.env.SITE_URL}/tempnumber?canceled=true`,
      metadata: {
        user_id: String(userId),
        feature: 'temp_number',
        plan: String(plan),
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Checkout Error:', error)
    return res.status(500).json({ error: 'Checkout session creation failed' })
  }
}