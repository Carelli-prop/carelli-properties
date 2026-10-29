import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";
import { bookableDates } from "@/lib/viewing";

export const metadata: Metadata = {
  title: "Book a viewing",
  alternates: { canonical: "/book-a-viewing" },
};

export default async function BookViewingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw =
    typeof params.apartment === "string" ? params.apartment.toLowerCase() : "";
  const initialApartment =
    raw === "88a" || raw === "88b" ? raw : undefined;

  return (
    <>
      <h1 className="sr-only">Book a viewing</h1>
      <BookingFlow
        initialApartment={initialApartment}
        initialDates={bookableDates()}
      />
    </>
  );
}
