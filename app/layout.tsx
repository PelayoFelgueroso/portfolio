import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "../lib/lenis";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const metadata: Metadata = {
  title: "Pelayo Felgueroso | Frontend Developer",
  description:
    "Custom web development and scalable full stack apps using Astro, React, Next.js, and Node. Explore my work and see how I can help your company build better software.",
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
          </body>
        </ReactLenis>
      </ReCaptchaProvider>
    </html>
  );
}
