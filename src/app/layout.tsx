import type { Metadata, Viewport } from "next";
import { Cormorant, Inter } from "next/font/google";
import { SITE } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Morning With Jesus`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Following the Leader",
    "Dr. Joe Pettigrew",
    "Morning With Jesus",
    "daily devotional",
    "The Daily Huddle",
    "Christian devotional email",
    "In The Zone Ministries",
    "Christian books",
    "walk with Jesus",
    "morning devotion",
  ],
  authors: [{ name: "Dr. Joe Pettigrew" }],
  creator: "Dr. Joe Pettigrew",
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — Morning With Jesus`,
    description: SITE.description,
    url: SITE.url,
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Morning With Jesus`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
  category: "religion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-cream text-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
