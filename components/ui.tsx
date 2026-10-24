"use client";

import Image from "next/image";
import { useState } from "react";
import { site, type Apartment, money } from "@/content/site";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 60 V30 Q10 8 32 8 Q54 8 54 30 V60 Z"
        stroke="#1D4E89"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M44 14 V24 A12 12 0 1 0 44 40 V52 L12 60"
        stroke="#1D4E89"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-text">
        <span className="logo-name">Carelli</span>
        <span className="logo-sub">PROPERTIES</span>
      </span>
    </span>
  );
}

export function Photo({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={`photo ${loaded ? "is-loaded" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 768px) 100vw, 1000px"
      />
    </span>
  );
}

export function FactsTable({ apartment }: { apartment: Apartment }) {
  return (
    <table className="facts">
      <caption className="sr-only">{`The plain facts for ${apartment.label}`}</caption>
      <tbody>
        <tr>
          <th scope="row">Rent</th>
          <td>{money(apartment.rentPcm)}</td>
        </tr>
        <tr>
          <th scope="row">Deposit</th>
          <td>{`£${apartment.deposit}. ${apartment.depositBasis}`}</td>
        </tr>
        <tr>
          <th scope="row">Available from</th>
          <td>{apartment.availableFrom}</td>
        </tr>
        <tr>
          <th scope="row">Furnishing</th>
          <td>{apartment.furnished}</td>
        </tr>
        <tr>
          <th scope="row">EPC rating</th>
          <td>
            {apartment.epc}
            {apartment.epcNote ? `. ${apartment.epcNote}` : ""}
          </td>
        </tr>
        <tr>
          <th scope="row">Council tax</th>
          <td>{apartment.councilTaxBand}</td>
        </tr>
        <tr>
          <th scope="row">Bills</th>
          <td>{apartment.bills}</td>
        </tr>
      </tbody>
    </table>
  );
}

export function BookCta({
  apartment,
  label = "Book a viewing",
  big = false,
}: {
  apartment?: Apartment;
  label?: string;
  big?: boolean;
}) {
  const href = apartment
    ? `/book-a-viewing?apartment=${apartment.id}`
    : "/book-a-viewing";
  return (
    <a className={`btn btn-primary ${big ? "btn-big" : ""}`} href={href}>
      {label}
    </a>
  );
}

export function LandlordIntro() {
  return (
    <section className="intro card" aria-labelledby="intro-title">
      <h2 id="intro-title">Your landlady is Carole</h2>
      <div className="intro-row">
        <Photo
          src="/photos/carole.jpg"
          alt="Carole, your landlady, smiling at the camera"
          width={160}
          height={160}
          className="intro-photo"
        />
        <div>
          <p>
            Hello. I am Carole. I own both flats at Oldbury Road, and I have
            looked after this kind of home for years. When something needs
            fixing, I fix it. When you call, I call back.
          </p>
          <p>
            {`My son ${site.adminFirstName} looks after viewings and paperwork for me. He will reply to your booking within one working day.`}
          </p>
          {site.noAgencyFees && (
            <p className="intro-fees">
              No agency fees. You rent direct from me, so there is nobody in
              the middle.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
