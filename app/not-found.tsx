import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card success-card">
      <h1>Page not found</h1>
      <p className="lead">
        Sorry, that page does not exist. The flats and the booking form are
        still exactly where you left them.
      </p>
      <div className="success-actions">
        <Link href="/book-a-viewing" className="btn btn-primary">
          Book a viewing
        </Link>
        <Link href="/" className="btn-text">
          Back to home
        </Link>
      </div>
    </div>
  );
}
