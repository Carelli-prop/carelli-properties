import type { Metadata } from "next";
import { apartments } from "@/content/site";
import { FactsTable, BookCta } from "@/components/ui";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "The Apartments",
  description:
    "Facts, photos and pricing for Flat 88A and Flat 88B on Oldbury Road, Worcester.",
};

export default function ApartmentsPage() {
  return (
    <>
      <h1>The Apartments</h1>
      <p className="lead">
        Two small, freshly decorated furnished flats on Oldbury Road. Perfect
        for one person, or two who like each other very much.
      </p>

      {apartments.map((flat) => (
        <section
          key={flat.id}
          id={flat.id}
          className="flat-section"
          aria-labelledby={`heading-${flat.id}`}
        >
          <h2 id={`heading-${flat.id}`}>{flat.label}</h2>
          <Gallery
            label={flat.label}
            photos={[
              { src: flat.photos.hero, alt: flat.heroAlt },
              ...flat.photos.gallery,
            ]}
          />
          <p className="meta">{flat.summary}</p>
          <p>
            <strong>Who fits here:</strong> {flat.sleeps}
          </p>
          <FactsTable apartment={flat} />
          <div className="cta-wrap">
            <BookCta apartment={flat} big />
          </div>
        </section>
      ))}
    </>
  );
}
