export default function ApartmentStickyCta({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <div className="sticky-cta">
      <a
        className="btn btn-primary btn-block"
        href={`/book-a-viewing?apartment=${id}`}
      >
        Book a viewing of {label}
      </a>
    </div>
  );
}
