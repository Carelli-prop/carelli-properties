import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await db()
    .from("viewings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Could not load" }, { status: 500 });
  }
  return NextResponse.json({ rows: data ?? [] });
}
