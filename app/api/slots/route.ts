import { NextResponse } from "next/server";
import { slotsForDate } from "@/lib/viewing";
import { db } from "@/lib/supabase";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const apartment = url.searchParams.get("apartment");
  const date = url.searchParams.get("date");
  if (!apartment || !date) {
    return NextResponse.json(
      { error: "Missing apartment or date" },
      { status: 400 }
    );
  }

  const all = slotsForDate(date);
  const { data, error } = await db()
    .from("viewings")
    .select("time")
    .eq("apartment", apartment)
    .eq("date", date);

  if (error) {
    return NextResponse.json(
      { error: "Could not check availability" },
      { status: 503 }
    );
  }

  const taken = new Set((data ?? []).map((row) => row.time as string));
  return NextResponse.json({
    available: all.filter((t) => !taken.has(t)),
    total: all.length,
    takenCount: taken.size,
  });
}
