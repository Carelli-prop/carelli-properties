import { db } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await db()
    .from("viewings")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return new Response("Could not load", { status: 500 });
  }

  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head =
    "ref,apartment,date,time,status,name,email,phone,note,created_at";
  const lines = (data ?? []).map((r) =>
    [
      r.ref,
      r.apartment,
      r.date,
      r.time,
      r.status,
      r.name,
      r.email,
      r.phone,
      r.note,
      r.created_at,
    ]
      .map(esc)
      .join(",")
  );

  return new Response([head, ...lines].join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="carelli-bookings.csv"',
    },
  });
}
