import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Update with your actual deployment URL
const SITE_URL = "https://asimov-teste-tecnico-pearl.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.svg" },
  title: "Positivus — Digital Marketing Agency",
  description:
    "Navigating the digital landscape for success. SEO, PPC, social media marketing and content creation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Positivus — Digital Marketing Agency",
    description:
      "Navigating the digital landscape for success. SEO, PPC, social media marketing and content creation.",
    type: "website",
    url: "/",
    siteName: "Positivus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Positivus Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Positivus — Digital Marketing Agency",
    description:
      "Navigating the digital landscape for success. SEO, PPC, social media marketing and content creation.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Positivus",
  description:
    "Digital marketing agency helping businesses grow and succeed online.",
  url: SITE_URL,
  logo: `${SITE_URL}/Logo.svg`,
  offers: {
    "@type": "AggregateOffer",
    itemOffered: [
      { "@type": "Service", name: "Search Engine Optimization" },
      { "@type": "Service", name: "Pay-Per-Click Advertising" },
      { "@type": "Service", name: "Social Media Marketing" },
      { "@type": "Service", name: "Email Marketing" },
      { "@type": "Service", name: "Content Creation" },
      { "@type": "Service", name: "Analytics and Tracking" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
