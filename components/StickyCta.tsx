"use client";

import { usePathname } from "next/navigation";

export default function StickyCta() {
  const pathname = usePathname();
  
  // Hide the sticky bar on the booking page, admin, and individual apartment pages
  if (
    pathname.startsWith("/book-a-viewing") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/apartments/")
  ) {
    return null;
  }

  return (
    <div className="sticky-cta">
      <a className="btn btn-primary btn-block" href="/book-a-viewing">
        Book a viewing
      </a>
    </div>
  );
}
