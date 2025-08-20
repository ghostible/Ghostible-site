import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query; // rentId from your rented_numbers table
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing id" });
  }

  try {
    const apiKey = process.env.SMS_ACTIVATE_API_KEY!;
    const url = `https://api.sms-activate.ae/stubs/handler_api.php?api_key=${apiKey}&action=getStatusV2&id=${id}`;

    const resp = await fetch(url);
    const data = await resp.json();

    //console.log('datassss', resp);
    // Always return the same structure so UI won’t break
    const normalized = {
      sms: data.sms ?? { dateTime: null, code: null, text: null },
      verificationType: data.verificationType ?? null,
      call: data.call ?? { from: null, text: null, code: null, dateTime: null, url: null, parsingCount: 0 },
    };

    return res.status(200).json(normalized);
  } catch (err) {
    console.error("get-status error:", err);
    return res.status(500).json({ error: "Failed to fetch status" });
  }
}
