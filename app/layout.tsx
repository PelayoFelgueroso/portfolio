import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "../lib/lenis";
import DotCursor from "@/components/DotCursor/DotCursor";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pelayo Felgueroso | Portfolio",
  description: "Portfolio de Pelayo Felgueroso",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${inter.className} antialiased font-helvetica`}
        >
          <Script
            strategy="beforeInteractive"
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          />
          {children}
          <DotCursor />
        </body>
      </ReactLenis>
    </html>
  );
}
