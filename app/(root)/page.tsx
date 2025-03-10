"use client";

import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";
import { DotCursor } from "@/components/DotCursor/DotCursor";
import { HomeHero } from "@/components/HomeHero/HomeHero";
import { LogoPreoloader } from "@/components/LogoPreloader/LogoPreloader";
import { Resources } from "@/components/Resources/Resources";
import { Works } from "@/components/Works/Works";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 1100);
  }, []);

  return (
    <main className="relative z-10 bg-background text-foreground">
      <AnimatePresence mode="wait">
        {isLoading && <LogoPreoloader />}
      </AnimatePresence>

      <DotCursor />
      <HomeHero />
      <About />
      <Works />
      <Resources />
      <Contact />
    </main>
  );
}
