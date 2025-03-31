import type { Metadata } from "next";
import { Red_Hat_Display, Outfit } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "../lib/lenis";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pelayo Felgueroso | Portfolio",
  description: "Portfolio de Pelayo Felgueroso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${redHatDisplay.variable} ${outfit.variable} antialiased`}
        >
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
