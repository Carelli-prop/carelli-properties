import { Resend } from "resend";
import { site } from "@/content/site";

export type BookingRecord = {
  apartment: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
};

export async function sendBookingEmails(
  b: BookingRecord
): Promise<"sent" | "skipped"> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return "skipped";

  try {
    const resend = new Resend(key);
    const when = `${b.date} at ${b.time}`;
    const phoneLine = b.phone ? `Phone: ${b.phone}` : "Phone: not given";
    const noteLine = b.note ? `Note: ${b.note}` : "Note: none";

    await resend.emails.send({
      from,
      to: site.email,
      subject: `Viewing request: ${b.apartment}, ${when}`,
      html: `<p>New viewing request.</p><p>Flat: ${b.apartment}<br>Date: ${b.date}<br>Time: ${b.time}</p><p>Name: ${b.name}<br>Email: ${b.email}<br>${phoneLine}<br>${noteLine}</p><p>Reply within one working day.</p>`,
    });

    await resend.emails.send({
      from,
      to: b.email,
      subject: `Your viewing of ${b.apartment}, ${when}`,
      html: `<p>Hello ${b.name},</p><p>Thank you for asking to view ${b.apartment} at Oldbury Road, Worcester. We have your request for ${b.date} at ${b.time}.</p><p>Matt will confirm by email within one working day. If you need to change anything, reply to this email or WhatsApp ${site.whatsappDisplay}.</p><p>Carole and Matt<br>Carelli Properties</p>`,
    });

    return "sent";
  } catch (error) {
    console.error("Email send failed", error);
    return "skipped";
  }
}
