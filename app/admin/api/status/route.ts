import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { sendAdminEmail, type BookingRecord } from "@/lib/email";

const STATUSES = ["requested", "confirmed", "completed", "cancelled"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { id, status, email } = body as {
    id: string;
    status?: string;
    email?: string;
  };

  if (status && !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Bad status" }, { status: 400 });
  }

  const { data: row, error: readError } = await db()
    .from("viewings")
    .select("*")
    .eq("id", id)
    .single();

  if (readError || !row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const patch: Record<string, unknown> = {};
  if (status) patch.status = status;
  if (email === "reminder") patch.reminded_at = new Date().toISOString();

  if (Object.keys(patch).length > 0) {
    const { error: updateError } = await db()
      .from("viewings")
      .update(patch)
      .eq("id", id);
    if (updateError) {
      return NextResponse.json({ error: "Could not update" }, { status: 500 });
    }
  }

  let emailResult = "none";
  if (email) {
    emailResult = await sendAdminEmail(row as BookingRecord, email);
  }

  return NextResponse.json({ ok: true, email: emailResult });
}
