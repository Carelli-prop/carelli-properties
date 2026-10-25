import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Good To Know",
  description: "The plain rules, costs, and answers to common questions.",
};

export default function GoodToKnowPage() {
  return (
    <>
      <h1>Good To Know</h1>
      <p className="lead">
        The plain rules and costs for renting at Oldbury Road. No hidden
        clauses.
      </p>

            <details className="disclosure">
        <summary>Your details</summary>
        <div className="disclosure-body">
          <p>
            We only use your name and contact details to arrange and confirm
            viewings. We never sell them or pass them to anyone else. They are
            stored securely and deleted when no longer needed.
          </p>
        </div>
      </details>
      
      <details className="disclosure">
        <summary>House Rules</summary>
        <div className="disclosure-body">
          <p>
            <strong>Pets:</strong> Considered on request. Please tell us about
            your pet when you book a viewing so we can discuss it honestly.
          </p>
          <p>
            <strong>Smoking:</strong> No smoking or vaping inside the
            apartments. 
          </p>
        </div>
      </details>

      <details className="disclosure">
        <summary>Deposits and Bills</summary>
        <div className="disclosure-body">
          <p>
            <strong>The Deposit:</strong> By law, the deposit is capped at five
            weeks of rent. It is held safely in the Deposit Protection Service
            (DPS) for the duration of your tenancy.
          </p>
          <p>
            <strong>Bills:</strong> Rent does not include bills. You will set up
            and pay your own council tax, energy, and water directly to the
            providers. 
          </p>
        </div>
      </details>

      <details className="disclosure">
        <summary>Who fixes things when they break?</summary>
        <div className="disclosure-body">
          <p>
            Carole does. Because you rent direct from the landlady, there is no
            agency to chase. If the boiler acts up or a tap leaks, you call or
            text Matt, and we arrange the fix.
          </p>
        </div>
      </details>

      <div className="cta-wrap">
        <a className="btn btn-primary btn-big" href="/book-a-viewing">
          Book a viewing
        </a>
      </div>
    </>
  );
}
