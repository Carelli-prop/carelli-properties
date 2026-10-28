import type { Metadata } from "next";
import ApartmentPage from "@/components/ApartmentPage";
import { apartments } from "@/content/site";

const flat = apartments.find((a) => a.id === "88b");

export const metadata: Metadata = {
  title: "Flat 88B, Oldbury Road",
  description: flat?.summary,
};

export default function Page() {
  return <ApartmentPage id="88b" />;
}
