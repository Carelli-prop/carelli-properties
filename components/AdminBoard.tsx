"use client";

import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/content/site";

type Row = {
  id: string;
  ref: string | null;
  apartment: string;
  date: string;
  time: string;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  reminded_at: string | null;
  created_at: string;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

function ageLabel(created: string): string {
  const hours = Math.floor((Date.now() - new Date(created).getTime()) / 3600000);
  if (hours < 1) return "received just now";
  if (hours < 24) return `received ${hours}h ago`;
  return `received ${Math.floor(hours / 24)}d ago`;
}

function overdue(created: string): boolean {
  return Date.now() - new Date(created).getTime() > 24 * 3600000;
}

export default function AdminBoard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const load = () =>
    fetch("/admin/api/list")
      .then((r) => r.json())
      .then((d) => setRows(d.rows ?? []));

  useEffect(() => {
    load();
  }, []);

  const act = async (id: string, payload: Record<string, unknown>) => {
    setBusy(id);
    setMessage("");
    try {
      const res = await fetch("/admin/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...payload }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          data.email === "sent"
            ? "Done. The email is on its way."
            : data.email === "skipped"
              ? "Done. Email skipped because Resend is not configured yet."
              : "Done."
        );
        await load();
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setMessage("Network error. Try again.");
    }
    setBusy("");
  };

  const wa = (r: Row) =>
    `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      `Hi, this is Matt from Carelli Properties about your viewing ref ${r.ref ?? ""} on ${r.date} at ${r.time}.`
    )}`;

  const card = (r: Row, actions: ReactNode) => (
    <div className="admin-card" key={r.id}>
      <h3>
        {r.date} at {r.time} · {r.apartment === "88a" ? "Flat 88A" : "Flat 88B"}
      </h3>
      <p className="admin-meta">
        {r.ref ?? "no ref"} · {r.name} · {r.email}
        {r.phone ? ` · ${r.phone}` : ""}
      </p>
      {r.note && <p className="admin-meta">Note: {r.note}</p>}
      <p
        className={`admin-meta ${
          r.status === "requested" && overdue(r.created_at) ? "admin-flag" : ""
        }`}
      >
        {ageLabel(r.created_at)} · status {r.status}
        {r.reminded_at ? " · reminder sent" : ""}
      </p>
      <div className="admin-row-actions">{actions}</div>
    </div>
  );

  const needs = rows.filter((r) => r.status === "requested");
  const upcoming = rows.filter(
    (r) => r.status === "confirmed" && r.date >= todayISO()
  );
  const rest = rows.filter(
    (r) => !needs.includes(r) && !upcoming.includes(r)
  );

  return (
    <>
      <p>
        <a className="btn btn-secondary btn-small" href="/admin/api/export">
          Download CSV
        </a>
      </p>
      {message && <p className="admin-message">{message}</p>}

      <h2>Needs action</h2>
      {needs.length === 0 ? (
        <p className="meta">Nothing waiting. New requests appear here.</p>
      ) : (
        needs.map((r) =>
          card(
            r,
            <>
              <button
                className="btn btn-primary btn-small"
                disabled={busy === r.id}
                onClick={() =>
                  act(r.id, { status: "confirmed", email: "confirm" })
                }
              >
                Confirm and email
              </button>
              <button
                className="btn btn-secondary btn-small"
                disabled={busy === r.id}
                onClick={() =>
                  act(r.id, { status: "cancelled", email: "cancel" })
                }
              >
                Cancel and email
              </button>
              <a
                className="btn btn-secondary btn-small"
                href={wa(r)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="btn btn-secondary btn-small"
                href={`mailto:${r.email}?subject=${encodeURIComponent(
                  `Your viewing ref ${r.ref ?? ""}`
                )}`}
              >
                Email
              </a>
            </>
          )
        )
      )}

      <h2>Upcoming confirmed</h2>
      {upcoming.length === 0 ? (
        <p className="meta">No confirmed viewings ahead.</p>
      ) : (
        upcoming.map((r) =>
          card(
            r,
            <>
              <button
                className="btn btn-primary btn-small"
                disabled={busy === r.id || !!r.reminded_at}
                onClick={() => act(r.id, { email: "reminder" })}
              >
                {r.reminded_at ? "Reminder sent" : "Send reminder"}
              </button>
              <button
                className="btn btn-secondary btn-small"
                disabled={busy === r.id}
                onClick={() =>
                  act(r.id, { status: "completed", email: "followup" })
                }
              >
                Completed and next steps
              </button>
              <button
                className="btn btn-secondary btn-small"
                disabled={busy === r.id}
                onClick={() =>
                  act(r.id, { status: "cancelled", email: "cancel" })
                }
              >
                Cancel and email
              </button>
              <a
                className="btn btn-secondary btn-small"
                href={wa(r)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </>
          )
        )
      )}

      <h2>Past and cancelled</h2>
      {rest.length === 0 ? (
        <p className="meta">Nothing here yet.</p>
      ) : (
        rest.map((r) =>
          card(
            r,
            <>
              <button
                className="btn btn-secondary btn-small"
                disabled={busy === r.id}
                onClick={() => act(r.id, { status: "requested" })}
              >
                Reopen
              </button>
              <a
                className="btn btn-secondary btn-small"
                href={wa(r)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </>
          )
        )
      )}
    </>
  );
}
