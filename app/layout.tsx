import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/ui";
import StickyCta from "@/components/StickyCta";
import { nav, site } from "@/content/site";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    images: [{ url: "/photos/hero-living.jpg", width: 1200, height: 900 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="wrap header-row">
            <a className="logo" href="/" aria-label="Carelli Properties, home">
              <Logo />
            </a>
            <nav className="site-nav" aria-label="Main">
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
