import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Area",
  description: "A short, honest guide to living in St John's, Worcester.",
};

export default function AreaPage() {
  return (
    <>
      <h1>The Area</h1>
      <p className="lead">
        Oldbury Road sits in St John's. It is a quiet, residential pocket that
        is still close to everything you need.
      </p>

      <section className="card">
        <h2>Daily life</h2>
        <ul>
          <li>
            <strong>Groceries:</strong> There is a Co-op and a Tesco Express a
            short walk away for daily essentials.
          </li>
          <li>
            <strong>The High Street:</strong> St John's high street has local
            butchers, bakers, and a post office. 
          </li>
          <li>
            <strong>Parks:</strong> Cripplegate Park and the River Severn are
            close by for a weekend walk.
          </li>
        </ul>
      </section>

      <section className="card">
        <h2>Getting around</h2>
        <ul>
          <li>
            <strong>Walking:</strong> It is about a 15 to 20-minute walk into
            Worcester city centre.
          </li>
          <li>
            <strong>Trains:</strong> Worcester Foregate Street and Shrub Hill
            stations are easily accessible for commutes to Birmingham or
            London.
          </li>
          <li>
            <strong>Driving:</strong> Quick access to the M5 motorway (Junction
            6) for regional travel.
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
