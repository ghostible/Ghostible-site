import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
    })

    const filtered = prices.data.filter((price) => {
      const product = price.product
      return product;
    })

    res.status(200).json(filtered)
  } catch (error) {
    console.error('Stripe price error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}