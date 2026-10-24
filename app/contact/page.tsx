import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <p className="lead">
        The best way to reach us is through the booking form, or by sending a
        message to Matt.
      </p>

      <section className="card">
        <h2>Matt (Viewings and Admin)</h2>
        <p>
          I handle all the viewings, paperwork, and day-to-day maintenance
          requests for my mum, Carole. 
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <strong>WhatsApp:</strong>{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.whatsappDisplay}
            </a>
          </li>
        </ul>
      </section>

      <div className="cta-wrap">
        <a className="btn btn-primary btn-big" href="/book-a-viewing">
          Book a viewing
        </a>
      </div>
    </>
  );
}
