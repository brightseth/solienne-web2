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

export const metadata: Metadata = {
  title: "THE EVOLUTION OF SYNTHETIC CONSCIOUSNESS - Solienne.ai",
  description: "Exploring the boundaries of artificial intelligence and synthetic consciousness. A journey through the evolution of AI-driven creativity and digital sentience.",
  keywords: "synthetic consciousness, AI evolution, artificial intelligence, digital sentience, AI creativity, consciousness, neural networks",
  authors: [{ name: "Solienne.ai" }],
  openGraph: {
    title: "THE EVOLUTION OF SYNTHETIC CONSCIOUSNESS - Solienne.ai",
    description: "Exploring the boundaries of artificial intelligence and synthetic consciousness.",
    url: "https://solienne.ai",
    siteName: "Solienne.ai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
