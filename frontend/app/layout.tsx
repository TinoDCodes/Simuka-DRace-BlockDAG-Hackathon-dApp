import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Orbitron, Space_Grotesk } from "next/font/google";

const fontHeading = Orbitron({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-heading",
});
const fontBody = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});
// reuse Orbitron for numbers too
const fontMono = Orbitron({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-number",
});

export const metadata: Metadata = {
  title: "RaceChain | On‑Chain Horse Race Betting",
  description:
    "Experience the future of horse race betting with RaceChain — fully on-chain, transparent, and fair. Powered by AI-generated odds, decentralized liquidity pools, and blockDAG technology.",
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  openGraph: {
    title: "RaceChain | On‑Chain Horse Race Betting",
    description:
      "Trustless, fast, and transparent horse race betting built for the decentralized world.",
    url: "https://yourdomain.com",
    siteName: "RaceChain",
    images: [
      {
        url: "/og-image.png", // Replace with your own image
        width: 1200,
        height: 630,
        alt: "RaceChain On‑Chain Betting",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RaceChain | On‑Chain Horse Race Betting",
    description:
      "Bringing horse race betting on‑chain with AI-powered odds and decentralized liquidity.",
    images: ["/og-image.png"], // Update if different
    creator: "@yourhandle", // Optional
  },
  authors: [
    {
      name: "Simuka Solutions",
    },
    {
      name: "Tinotenda Dauti",
    },
    {
      name: "Wayne Chibwana",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} antialiased bg-noise`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
