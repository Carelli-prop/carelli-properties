import { apartments } from "@/content/site";
import { FactsTable, BookCta } from "@/components/ui";
import Gallery from "@/components/Gallery";
import { notFound } from "next/navigation";

export default function ApartmentPage({ id }: { id: string }) {
  const flat = apartments.find((a) => a.id === id);
  if (!flat) notFound();

  return (
    <>
      <p className="meta">
        <a href="/apartments">Both apartments</a>
      </p>
      <h1>{flat.label}</h1>
      <Gallery
        label={flat.label}
        photos={[
          { src: flat.photos.hero, alt: flat.heroAlt },
          ...flat.photos.gallery,
        ]}
      />
      <p className="lead">{flat.summary}</p>
      <p>
        <strong>Who fits here:</strong> {flat.sleeps}
      </p>
      <FactsTable apartment={flat} />
      <div className="cta-wrap cta-wrap-flat">
        <BookCta apartment={flat} big label={`Book a viewing of ${flat.label}`} />
      </div>
    </>
  );
}
