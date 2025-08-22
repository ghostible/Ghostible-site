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

  const { userId, service, country, time } = req.body;
  console.log("time", time);

  if (!userId || !service?.code || !country?.code) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Step 1: Check credits first
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("subscription_TotalCredit")
      .eq("id", userId)
      .single();

    if (profileErr) throw profileErr;
    if (!profile || profile.subscription_TotalCredit == 0) {
      return res.status(400).json({ error: "Insufficient credits" });
    }

    // Step 2: Call sms-activate API (getNumber)
    const apiKey = process.env.SMS_ACTIVATE_API_KEY!;
    const url = `https://api.sms-activate.ae/stubs/handler_api.php?api_key=${apiKey}&action=getNumber&service=${service.code}&country=${country.code}&activationType=0`;

    const resp = await fetch(url);
    const text = await resp.text();

    if (!text.startsWith("ACCESS_NUMBER")) {
      return res.status(400).json({ error: "No number available", raw: text });
    }

    const parts = text.split(":");
    const rentId = parts[1];
    const number = parts[2];

    // Step 3: Save number in Supabase with code + name
    const { error: insertErr, data: inserted } = await supabase
      .from("rented_numbers")
      .insert({
        user_id: userId,
        rent_id: rentId,
        number,
        status: "active",
        country: country.code,
        country_name: country.name,
        service: service.code,
        service_name: service.name,
      })
      .select("id, number, rent_id, service_name, country_name, status, created_at")
      .single();

    if (insertErr) throw insertErr;

    // Step 4: Decrement total credits
    const { error: creditdecrease } = await supabase.rpc("decrement_credits", {
      user_id: userId,
    });
    if (creditdecrease) {
      console.error("Decrement total credits failed:", creditdecrease);
    }

    // Step 4: incremental used credits
    const { error: creditincrease } = await supabase.rpc("used_credits", {
      user_id: userId,
    });
    if (creditincrease) {
      console.error("increment used credits failed:", creditincrease);
    }

    return res.status(200).json({
      success: true,
      number: {
        id: inserted.id,
        rent_id: inserted.rent_id,
        number:inserted.number,
        service_name: service.name,
        country_name: country.name,
        status: inserted.status,
        assignedAt: inserted.created_at,
        messages: 0,
        calls: 0,
      },
    });
  } catch (err) {
    console.error("Rent number error:", err);
    return res.status(500).json({ error: "Failed to rent number" });
  }
}