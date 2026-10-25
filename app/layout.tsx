import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/ui";
import StickyCta from "@/components/StickyCta";
import { nav, site } from "@/content/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://carelli-properties.vercel.app"
  ),
  title: {
    default: "Carelli Properties - Flats to rent in St John's, Worcester",
    template: "%s | Carelli Properties",
  },
  description:
    "Two small furnished flats to rent on Oldbury Road, Worcester. Rented direct from your landlady. No agency fees. Book a viewing in under a minute.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/photos/hero-living.jpg",
        width: 1200,
        height: 900,
        alt: "The living area, with duck egg panelling and an open door to the patio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carelli Properties - Flats to rent in St John's, Worcester",
    description:
      "Two small furnished flats to rent on Oldbury Road, Worcester. Rented direct from your landlady. No agency fees.",
    images: [{ url: "/photos/hero-living.jpg", width: 1200, height: 900 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="wrap header-row">
            <a className="logo" href="/" aria-label="Carelli Properties, home">
              <Logo />
            </a>
            <details className="site-menu">
              <summary>Menu</summary>
              <nav className="site-nav site-nav-panel" aria-label="Main">
                {nav.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </details>
            <nav className="site-nav site-nav-row" aria-label="Main">
              {nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a className="btn btn-primary" href="/book-a-viewing">
              Book a viewing
            </a>
          </div>
        </header>
        <main id="main" className="wrap">
          {children}
        </main>
        <footer className="site-footer">
          <div className="wrap">
            <p>
              {`${site.name}. Private landlord. ${site.address}.`}
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {" · "}
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`WhatsApp ${site.whatsappDisplay}`}
              </a>
            </p>
          </div>
        </footer>
        <StickyCta />
      </body>
    </html>
  );
}
