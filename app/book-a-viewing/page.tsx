import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";

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
  const initialApartment =
    typeof params.apartment === "string" ? params.apartment : undefined;

  return (
    <>
      <h1 className="sr-only">Book a viewing</h1>
      <BookingFlow initialApartment={initialApartment} />
    </>
  );
}
