import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "taste.view | Taste is a verdict",
  description:
    "Reference, compare, compile, and verify AI-built websites before release.",
  openGraph: {
    title: "taste.view | Taste is a verdict",
    description:
      "The taste compiler and release gate for AI-built websites.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "taste.view turns design comparisons into a proven release verdict",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "taste.view | Taste is a verdict",
    description:
      "The taste compiler and release gate for AI-built websites.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
