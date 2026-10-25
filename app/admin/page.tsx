import type { Metadata } from "next";
import { db } from "@/lib/supabase";
import { humanDate } from "@/lib/viewing";
import AdminChrome from "@/components/AdminChrome";

export const metadata: Metadata = { title: "Admin | Carelli Properties" };
export const dynamic = "force-dynamic";

type Row = {
  id: string;
  apartment: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  created_at: string;
};

export default async function AdminPage() {
  const { data, error } = await db()
    .from("viewings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  const rows = (data ?? []) as Row[];

  return (
    <div className="admin-wrap">
      <AdminChrome />
      <h1>Bookings</h1>
      <p className="meta">
        {rows.length} request{rows.length === 1 ? "" : "s"} in total, soonest
        first.
      </p>
      {error ? (
        <p className="error-text">
          Could not load bookings. Check the Supabase environment variables.
        </p>
      ) : rows.length === 0 ? (
        <p>
          No bookings yet. They will appear here the moment someone requests
          a viewing.
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Flat</th>
                <th>Who</th>
                <th>Contact</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    {humanDate(r.date)} at {r.time}
                  </td>
                  <td>{r.apartment === "88a" ? "88A" : "88B"}</td>
                  <td>{r.name}</td>
                  <td>
                    {r.email}
                    {r.phone ? (
                      <>
                        <br />
                        {r.phone}
                      </>
                    ) : null}
                  </td>
                  <td>{r.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
