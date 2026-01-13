import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { employeeId, position, rh, zone, action } = req.body;

  if (!employeeId || !position || !action) {
    return res.status(400).json({ ok: false });
  }

  try {
    await supabase.from("employee_logs").insert({
      employee_id: employeeId,
      position,
      rh,
      zone,
      action
    });
  } catch (e) {
    // intentionally silent
  }

  return res.status(200).json({ ok: true });
}
