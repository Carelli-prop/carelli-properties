import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a viewing",
};

export default function BookViewingPage() {
  return (
    <>
      <h1>Book a viewing</h1>
      <p className="placeholder-note">
        Step 1 of 4: Choose an apartment. (This is a static placeholder. The
        interactive wheel-pickers and database logic will be built in Pass 3).
      </p>
      <p className="lead">
        Viewings take about 15 minutes. Matt will meet you at the flat, show
        you around, and answer any questions.
      </p>
      <div className="cta-wrap">
        <a
          href="https://wa.me/447470303576"
          className="btn btn-secondary btn-big"
          target="_blank"
          rel="noopener noreferrer"
        >
          Or message Matt on WhatsApp
        </a>
      </div>
    </>
  );
}
