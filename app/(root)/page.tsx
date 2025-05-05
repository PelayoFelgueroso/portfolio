"use client";

import { About } from "@/components/HomePage/About/About";
import { Hero } from "@/components/HomePage/Hero/Hero";
import { LogoPreoloader } from "@/components/HomePage/LogoPreloader/LogoPreloader";
import { Resources } from "@/components/HomePage/Resources/ResourcesSection/Resources";
import { SectionTitle } from "@/components/HomePage/SectionTitle/SectionTitle";
import { Projects } from "@/components/HomePage/Works/WorksNew";
import {
  AnimatePresence,
  useInView,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [inViewWorks, setInViewWorks] = useState(false);
  const [inViewResources, setInViewResources] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 1100);
  }, []);

  const heroRef = useRef(null);
  const worksRef = useRef(null);
  const resourcesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const inViewTitle = useInView(heroRef, {
    once: false,
  });
  const inViewAbout = useInView(aboutRef, {
    once: false,
  });

  const { scrollYProgress: scrollHero } = useScroll({
    target: heroRef,
    offset: ["50% end", "end 100%"],
  });


  const { scrollYProgress: scrollWorks } = useScroll({
    target: worksRef,
    offset: ["end 100%", "end 50%"],
  });

  const { scrollYProgress: scrollResources } = useScroll({
    target: resourcesRef,
    offset: ["end 100%", "end 50%"],
  });

  const { scrollYProgress: scrollAbout } = useScroll({
    target: aboutRef,
    offset: ["end 100%", "end 50%"],
  });

  const { scrollYProgress: scrollContact } = useScroll({
    target: contactRef,
    offset: ["end 100%", "end 50%"],
  });

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
        scrollHero={scrollHero}
        scrollWorks={scrollWorks}
        scrollResources={scrollResources}
        scrollAbout={scrollAbout}
        scrollContact={scrollContact}
      />

      <Hero heroRef={heroRef} scrollHero={scrollHero} />

      <Projects onInViewChange={setInViewWorks} worksRef={worksRef} />

      <Resources
        onInViewChange={setInViewResources}
        resourcesRef={resourcesRef}
      />

      <About scrollHero={scrollHero} ref={aboutRef} />
    </main>
  );
}
