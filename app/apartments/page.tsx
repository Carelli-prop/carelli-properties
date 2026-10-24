import type { Metadata } from "next";
import { apartments } from "@/content/site";
import { Photo, FactsTable, BookCta } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Apartments",
  description:
    "Facts, photos and pricing for Flat 88A and Flat 88B on Oldbury Road, Worcester.",
};

export default function ApartmentsPage() {
  return (
    <>
      <h1>The Apartments</h1>
      <p className="placeholder-note">
        Mockup: These photos show the style and finish of the flats. We will
        upload specific photos for each flat before the site goes live.
      </p>
      <p className="lead">
        Two small, freshly decorated furnished flats on Oldbury Road. Perfect
        for one person, or two who like each other very much.
      </p>

      {apartments.map((flat, index) => (
        <section
          key={flat.id}
          id={flat.id}
          className="flat-section"
          aria-labelledby={`heading-${flat.id}`}
        >
          <h2 id={`heading-${flat.id}`}>{flat.label}</h2>
          <Photo
            src={flat.photos.hero}
            alt={`The main living space for ${flat.label}`}
            width={1000}
            height={750}
            priority={index === 0}
          />
          <p className="meta">{flat.summary}</p>
          <p>
            <strong>Who fits here:</strong> {flat.sleeps}
          </p>
          <FactsTable apartment={flat} />
          <div className="gallery">
            {flat.photos.gallery.map((img) => (
              <Photo
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={600}
                height={450}
              />
            ))}
          </div>
          <div className="cta-wrap">
            <BookCta apartment={flat} big />
          </div>
        </section>
      ))}
    </>
  );
}
