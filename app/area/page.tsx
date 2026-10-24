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
        Oldbury Road sits in St John's, a quiet residential neighbourhood on
        the west side of Worcester, a short way from the city centre.
      </p>

      <section className="card">
        <h2>Daily life</h2>
        <p>
          St John's is built for ordinary weeks. Local shops, a post office
          and takeaways are close by, and the city centre's supermarkets and
          high street are a short trip away.
        </p>
        <p>
          We keep this guide short on purpose. We would rather show you the
          area in person than list claims we cannot keep.
        </p>
      </section>

      <section className="card">
        <h2>Getting around</h2>
        <ul>
          <li>
            <strong>Walking:</strong> The city centre is an easy walk across
            the river, or a few minutes by car.
          </li>
          <li>
            <strong>Trains:</strong> Worcester Foregate Street and Worcester
            Shrub Hill both serve the city, with direct trains to Birmingham.
            London Paddington services run from Shrub Hill and Worcester
            Parkway.
          </li>
          <li>
            <strong>Driving:</strong> The M5 is close by at junctions 6 and 7,
            for Birmingham, Gloucester and the South West.
          </li>
        </ul>
      </section>

      <section className="card">
        <h2>At your viewing</h2>
        <p>
          Matt will walk the neighbourhood with you. He will show you where we
          shop, where to park, and the quickest way to the station. Ask him
          anything. He answers honestly.
        </p>
      </section>

      <div className="cta-wrap">
        <a className="btn btn-primary btn-big" href="/book-a-viewing">
          Book a viewing
        </a>
      </div>
    </>
  );
}
