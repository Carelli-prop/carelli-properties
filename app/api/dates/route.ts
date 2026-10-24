import { NextResponse } from "next/server";
import { bookableDates } from "@/lib/viewing";

export async function GET() {
  return NextResponse.json({ dates: bookableDates() });
}
