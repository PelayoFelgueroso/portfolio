import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "../lib/lenis";
import DotCursor from "@/common/DotCursor/DotCursor";
import { ReCaptchaProvider } from "next-recaptcha-v3";

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
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <ReactLenis root>
          <body
            className={`${inter.className} antialiased font-helvetica scrollbar-none`}
          >
            {children}
            <DotCursor />
          </body>
        </ReactLenis>
      </ReCaptchaProvider>
    </html>
  );
}
