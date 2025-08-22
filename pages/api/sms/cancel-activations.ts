import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { rentId, dbId } = req.body;
  if (!rentId || !dbId ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1️⃣ Call SMS-Activate API
    const resp = await fetch(
      `https://api.sms-activate.ae/stubs/handler_api.php?api_key=${process.env.SMS_ACTIVATE_API_KEY}&action=setStatus&status=8&id=${rentId}`
    );
    const text = await resp.text();
    if (text === "ACCESS_CANCEL") {
      const { error: deleteErr } = await supabase
        .from("rented_numbers")
        .delete()
        .eq("id", dbId);

      if (deleteErr) throw deleteErr;

      return res.status(200).json({ success: true, message: "Number canceled successfully" });
    }

    if (text === "EARLY_CANCEL_DENIED") {
      return res.status(400).json({ error: "Cannot cancel within the first 2 minutes" });
    }

    return res.status(400).json({ error: "SMS-Activate error", raw: text });
  } catch (err) {
    console.error("Delete number error:", err);
    return res.status(500).json({ error: "Server error deleting number" });
  }
}