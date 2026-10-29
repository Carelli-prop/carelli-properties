"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyCta() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/book-a-viewing") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/apartments/")
  ) {
    return null;
  }

  return (
    <div className="sticky-cta">
      <Link className="btn btn-primary btn-block" href="/book-a-viewing">
        Book a viewing
      </Link>
    </div>
  );
}
