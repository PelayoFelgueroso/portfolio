"use client";

import { About } from "@/components/About/About";
import { Contact } from "@/components/Contact/Contact";
import { DotCursor } from "@/components/DotCursor/DotCursor";
import { HomeHero } from "@/components/HomeHero/HomeHero";
import { LogoPreoloader } from "@/components/LogoPreloader/LogoPreloader";
import { Resources } from "@/components/Resources/Resources";
import { Works } from "@/components/Works/Works";
import { useProjects } from "@/contexts/Projects.context";
import { useResources } from "@/contexts/Resources.context";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { projects, loadingProjects } = useProjects();
  const { resources, loadingResources, categories, loadingCategories } = useResources();

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
      <AnimatePresence mode="wait">
        {!loadingProjects && !loadingResources && <HomeHero />}
      </AnimatePresence>

      <About />
      <AnimatePresence mode="wait">
        {!loadingProjects && <Works projects={projects} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loadingResources && !loadingCategories && <Resources categories={categories} resources={resources} />}
      </AnimatePresence>

      <Contact />
    </main>
  );
}
