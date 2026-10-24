import type { Metadata } from "next";
import { Photo, LandlordIntro, BookCta } from "@/components/ui";

export const metadata: Metadata = {
  title: "Flats to rent in St John's, Worcester | Carelli Properties",
  description:
    "Two small furnished flats to rent on Oldbury Road, Worcester. Rented direct from your landlady. No agency fees.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Carelli Properties",
    "description": "Direct landlord letting two furnished apartments in St John's, Worcester.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "88 Oldbury Road",
      "addressLocality": "Worcester",
      "postalCode": "WR2 6AR",
      "addressCountry": "GB",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero">
        <Photo
          src="/photos/hero-living.jpg"
          alt="The living area, with duck egg panelling and an open door to the patio"
          width={1200}
          height={800}
          priority
        />
        <h1>Small, honest flats to rent in Worcester.</h1>
        <p className="lead">
          Two furnished homes on Oldbury Road. Rented direct from your
          landlady, Carole. No agency fees.
        </p>
        <BookCta big />
      </section>

      <LandlordIntro />

      <section className="card" style={{ marginTop: "var(--s6)" }}>
        <h2>The Apartments</h2>
        <p>
          Flat 88A and Flat 88B are compact, quiet, and freshly decorated. They
          suit one person, or two who like each other very much.
        </p>
        <a href="/apartments" className="btn btn-secondary">
          See the photos and facts &rarr;
        </a>
      </section>
    </>
  );
}
