"use client";

import { About } from "@/components/HomePage/About/About";
import { Hero } from "@/components/HomePage/Hero/Hero";
import { LogoPreoloader } from "@/components/HomePage/LogoPreloader/LogoPreloader";
import { Resources } from "@/components/HomePage/Resources/ResourcesSection/Resources";
import { SectionTitle } from "@/components/HomePage/SectionTitle/SectionTitle";
import { Works } from "@/components/HomePage/Works/Works";
import { useScrollSections, usePreloader } from "@/hooks/common";
import { AnimatePresence, useInView } from "framer-motion";
import { useCallback, useState } from "react";

export default function Home() {
  const [inViewWorks, setInViewWorks] = useState(false);
  const [inViewResources, setInViewResources] = useState(false);

  const isLoading = usePreloader({ duration: 1100 });
  const { refs, scrollValues } = useScrollSections();

  const inViewTitle = useInView(refs.heroRef, {
    once: false,
  });

  const inViewAbout = useInView(refs.aboutRef, {
    once: false,
  });

  const handleWorksInView = useCallback(
    (inView: boolean) => setInViewWorks(inView),
    []
  );

  const handleResourcesInView = useCallback(
    (inView: boolean) => setInViewResources(inView),
    []
  );

  return (
    <main className="relative z-50 bg-white text-blackCustom">
      <AnimatePresence mode="wait">
        {isLoading && <LogoPreoloader />}
      </AnimatePresence>

      <SectionTitle
        inViewTitle={inViewTitle}
        inViewWorks={inViewWorks}
        inViewResources={inViewResources}
        inViewAbout={inViewAbout}
        scrollHero={scrollValues.scrollHero}
        scrollWorks={scrollValues.scrollWorks}
        scrollResources={scrollValues.scrollResources}
        scrollAbout={scrollValues.scrollAbout}
        scrollContact={scrollValues.scrollContact}
      />

      <Hero heroRef={refs.heroRef} scrollHero={scrollValues.scrollHero} />

      <Works onInViewChange={handleWorksInView} worksRef={refs.worksRef} />

      <Resources
        onInViewChange={handleResourcesInView}
        resourcesRef={refs.resourcesRef}
      />

      <About scrollHero={scrollValues.scrollHero} ref={refs.aboutRef} />
    </main>
  );
}
