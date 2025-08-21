import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  
  const { userId, priceId, mode, planLabel, quantity } = req.body

  if (!userId || !priceId || !mode) {
    return res.status(400).json({ error: 'Missing or invalid required fields' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: [
        {
          price: priceId,
          quantity: quantity || 1,
        },
      ],
      success_url: `${process.env.SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.SITE_URL}/tempnumber?canceled=true`,
      metadata: {
        user_id: String(userId),
        feature: 'temp_number',
        plan: String(planLabel ?? ''),
        credits: String(quantity || 1),
      },
    })
   
    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Checkout Error:', error)
    return res.status(500).json({ error: 'Checkout session creation failed' })
  }
}