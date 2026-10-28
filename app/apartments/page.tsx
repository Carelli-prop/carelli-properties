import type { Metadata } from "next";
import { apartments, money } from "@/content/site";
import { Photo } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Apartments",
  description:
    "Two small furnished flats to rent on Oldbury Road, Worcester. Choose a flat to see its photos, facts and price.",
};

export default function ApartmentsIndex() {
  return (
    <>
      <h1>The Apartments</h1>
      <p className="lead">
        Two small, freshly decorated furnished flats on Oldbury Road. Perfect
        for one person, or two who like each other very much. Choose the one
        you want to see.
      </p>
      <div className="flat-cards">
        {apartments.map((flat) => (
          <a key={flat.id} className="card flat-card" href={flat.path}>
            <Photo
              src={flat.photos.hero}
              alt={flat.heroAlt}
              width={600}
              height={450}
            />
            <h2>{flat.label}</h2>
            <p className="meta">{money(flat.rentPcm)}</p>
            <p>{flat.summary}</p>
            <span className="btn btn-secondary">See {flat.label}</span>
          </a>
        ))}
      </div>
    </>
  );
}
