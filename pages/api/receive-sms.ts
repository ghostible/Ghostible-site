import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const to = req.body.To || req.query.To
  const from = req.body.From || req.query.From
  const body = req.body.Body || req.query.Body

  if (!to || !from || !body) {
    console.error('Missing SMS fields')
    return res.status(400).send('Missing SMS fields')
  }

  const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('temp_number', to)
      .single();

    if (!profile) {
      console.error('No matching user for phone number:', to);
      return res.status(404).send('User not found for this phone number');
    }

  //console.log('req', req);
  
  const { error } = await supabase.from('sms_messages').insert({
    phone_number: to,
    from_number: from,
    message: body,
    received_at: new Date().toISOString(),
    user_id: profile.id,
  });

  if (error) {
    console.error('Supabase insert error:', error)
    return res.status(500).send('Failed to save SMS')
  }

  // Respond with TwiML so Twilio doesn't retry
  res.setHeader('Content-Type', 'text/xml')
  res.status(200).send('<Response></Response>')
}