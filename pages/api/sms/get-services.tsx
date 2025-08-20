import { NextApiRequest, NextApiResponse } from "next";

interface SmsService {
  code: string;
  name: string;
}

interface SmsActivateResponse {
  services: Record<string, { code: string; name: string }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.SMS_ACTIVATE_API_KEY!;
    const response = await fetch(
      `https://api.sms-activate.ae/stubs/handler_api.php?api_key=${apiKey}&action=getServicesList`
    );

    const text = await response.text();
    let data: SmsActivateResponse;

    try {
      data = JSON.parse(text) as SmsActivateResponse;
    } catch {
      return res.status(500).json({ status: "error", error: "Invalid response from sms-activate" });
    }

    // ✅ Properly typed
    const services: SmsService[] = Object.entries(data.services).map(([code, val]) => ({
      code: val.code,
      name: val.name || code,
    }));

    return res.status(200).json({ status: "success", services });
  } catch (err) {
    console.error("Service fetch error:", err);
    return res.status(500).json({ status: "error", error: "Failed to fetch services" });
  }
}
