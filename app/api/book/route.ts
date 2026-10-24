import { NextResponse } from "next/server";
import {
  bookableDates,
  isBookableDate,
  isValidSlot,
  nextAvailableSlot,
} from "@/lib/viewing";
import { db } from "@/lib/supabase";
import { sendBookingEmails, type BookingRecord } from "@/lib/email";

export async function POST(req: Request) {
  let body: BookingRecord;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const apartment = body.apartment === "88a" || body.apartment === "88b"
    ? body.apartment
    : null;
  const date = typeof body.date === "string" ? body.date : null;
  const time = typeof body.time === "string" ? body.time : null;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!apartment || !date || !time || !name || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Please complete every required field" },
      { status: 400 }
    );
  }
  if (!isBookableDate(date) || !isValidSlot(date, time)) {
    return NextResponse.json(
      { error: "That slot is outside our viewing windows" },
      { status: 400 }
    );
  }

  const dates = bookableDates();
  const from = dates[0]?.iso ?? date;
  const to = dates[dates.length - 1]?.iso ?? date;

  const { data: existing, error: readError } = await db()
    .from("viewings")
    .select("date, time")
    .eq("apartment", apartment)
    .gte("date", from)
    .lte("date", to);

  if (readError) {
    return NextResponse.json(
      { error: "Could not check availability. Please try again" },
      { status: 503 }
    );
  }

  const takenByDate: Record<string, string[]> = {};
  for (const row of existing ?? []) {
    const d = row.date as string;
    takenByDate[d] = takenByDate[d] ?? [];
    takenByDate[d].push(row.time as string);
  }

  if ((takenByDate[date] ?? []).includes(time)) {
    return NextResponse.json(
      {
        error: "slot-taken",
        next: nextAvailableSlot(takenByDate, date),
      },
      { status: 409 }
    );
  }

  const { error: insertError } = await db().from("viewings").insert({
    apartment,
    date,
    time,
    name,
    email,
    phone: body.phone?.trim() || null,
    note: body.note?.trim() || null,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json(
        {
          error: "slot-taken",
          next: nextAvailableSlot(takenByDate, date),
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }

  const emailStatus = await sendBookingEmails({
    apartment,
    date,
    time,
    name,
    email,
    phone: body.phone,
    note: body.note,
  });

  return NextResponse.json({ ok: true, emailStatus });
}
