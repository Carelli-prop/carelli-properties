import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book a viewing",
};

export default function BookViewingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialApartment =
    typeof searchParams.apartment === "string" ? searchParams.apartment : undefined;

  return (
    <>
      <h1 className="sr-only">Book a viewing</h1>
      <BookingFlow initialApartment={initialApartment} />
    </>
  );
}
