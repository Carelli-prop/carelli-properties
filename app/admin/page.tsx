import type { Metadata } from "next";
import AdminChrome from "@/components/AdminChrome";
import AdminBoard from "@/components/AdminBoard";

export const metadata: Metadata = { title: "Admin | Carelli Properties" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="admin-wrap">
      <AdminChrome />
      <h1>Bookings</h1>
      <p className="meta">
        Confirm, remind and follow up from one screen. Every button that sends
        an email tells you afterwards whether it went.
      </p>
      <AdminBoard />
    </div>
  );
}
