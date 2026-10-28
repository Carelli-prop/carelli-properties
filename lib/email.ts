import { Resend } from "resend";
import { site, apartments } from "@/content/site";

export type BookingRecord = {
  apartment: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
  ref?: string;
};

function entranceFor(apartment: string): string {
  return apartments.find((a) => a.id === apartment)?.entrance ?? "";
}

async function send(
  to: string,
  subject: string,
  html: string
): Promise<"sent" | "skipped"> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return "skipped";
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from, to, subject, html });
    return "sent";
  } catch (error) {
    console.error("Email send failed", error);
    return "skipped";
  }
}

export async function sendBookingEmails(
  b: BookingRecord
): Promise<"sent" | "skipped"> {
  const when = `${b.date} at ${b.time}`;
  const refLine = b.ref ? `Your reference is ${b.ref}.` : "";
  const phoneLine = b.phone ? `Phone: ${b.phone}` : "Phone: not given";
  const noteLine = b.note ? `Note: ${b.note}` : "Note: none";

  const mum = await send(
    site.email,
    `Viewing request: ${b.apartment}, ${when}`,
    `<p>New viewing request.</p><p>Flat: ${b.apartment}<br>Date: ${b.date}<br>Time: ${b.time}<br>Ref: ${b.ref ?? "none"}</p><p>Name: ${b.name}<br>Email: ${b.email}<br>${phoneLine}<br>${noteLine}</p><p>Open /admin to confirm, remind or follow up.</p>`
  );

  const booker = await send(
    b.email,
    `We have your viewing request, ${b.name}`,
    `<p>Hello ${b.name},</p><p>Thank you for asking to view ${b.apartment} at Oldbury Road, Worcester. We have your request for ${when}. ${refLine}</p><p>Matt will confirm by email within one working day. Nothing is booked until you receive that confirmation.</p><p>Questions before then? Reply to this email or WhatsApp ${site.whatsappDisplay}.</p><p>Carole and Matt<br>Carelli Properties</p>`
  );

  return mum === "sent" || booker === "sent" ? "sent" : "skipped";
}

export async function sendAdminEmail(
  b: BookingRecord,
  kind: string
): Promise<"sent" | "skipped"> {
  const when = `${b.date} at ${b.time}`;
  const ref = b.ref ?? "";
  const entrance = entranceFor(b.apartment);
  const label = b.apartment === "88a" ? "Flat 88A" : "Flat 88B";

  if (kind === "confirm") {
    return send(
      b.email,
      `Confirmed: your viewing of ${label}, ${when}`,
      `<p>Hello ${b.name},</p><p>Your viewing of ${label} is confirmed for ${when}. Ref ${ref}.</p><p>${entrance}. Parking: one allocated space on the driveway at the front, plus street parking for visitors.</p><p>Matt will meet you at the door. If anything changes, reply to this email or WhatsApp ${site.whatsappDisplay}.</p><p>Carole and Matt<br>Carelli Properties</p>`
    );
  }

  if (kind === "reminder") {
    return send(
      b.email,
      `Tomorrow at ${b.time}: your viewing of ${label}`,
      `<p>Hello ${b.name},</p><p>A quick reminder of your viewing of ${label} tomorrow, ${b.date} at ${b.time}. Ref ${ref}.</p><p>Address: Oldbury Road, Worcester, WR2 6AR. ${entrance}. Park in the allocated space on the driveway.</p><p>The viewing takes about 15 minutes. Bring any questions you have. Matt's mobile is ${site.whatsappDisplay} if you are running late.</p><p>See you tomorrow.<br>Matt, for Carole<br>Carelli Properties</p>`
    );
  }

  if (kind === "followup") {
    return send(
      b.email,
      `After your viewing of ${label}: what happens next`,
      `<p>Hello ${b.name},</p><p>Thank you for coming to see ${label} today. Ref ${ref}.</p><p>If you would like the flat, reply to this email or WhatsApp ${site.whatsappDisplay} and we will send the short application and referencing details. Where income is thin for the rent we ask for a guarantor or rent paid ahead, applied identically to every applicant.</p><p>If you are still deciding, take the time you need. We answer every question within one working day, and there are no agency fees at any point.</p><p>Carole and Matt<br>Carelli Properties</p>`
    );
  }

  if (kind === "cancel") {
    return send(
      b.email,
      `Your viewing of ${label} is cancelled`,
      `<p>Hello ${b.name},</p><p>Your viewing of ${label} on ${when} is cancelled. Ref ${ref}.</p><p>If you would like another time, book again at the website or WhatsApp ${site.whatsappDisplay}. No hard feelings, ever.</p><p>Carole and Matt<br>Carelli Properties</p>`
    );
  }

  return "skipped";
}
