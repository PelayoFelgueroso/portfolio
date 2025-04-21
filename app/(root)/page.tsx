"use client";

import { About } from "@/components/About/About";
import { LogoPreoloader } from "@/components/LogoPreloader/LogoPreloader";
import { Resources } from "@/components/Resources/Resources";
import { TitleNew } from "@/components/TitleIntro/TitleNew";
import { Projects } from "@/components/Works/WorksNew";
import {
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  motion,
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

  const opacity = useTransform(scrollHero, [0, 1], [1, 0.08]);

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

      <TitleNew
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

      <motion.section
        ref={heroRef}
        className="h-[200vh] width-[100svw] relative overflow-hidden"
        style={{ willChange: "opacity", opacity }}
      >
        <div className="fixed aspect-auto pointer-events-none w-screen top-[-18vh] left-0 right-0 z-10 h-[130vh] md:h-[150vh] 2md:h-screen"></div>
      </motion.section>

      <Projects onInViewChange={setInViewWorks} worksRef={worksRef} />

      <Resources
        onInViewChange={setInViewResources}
        resourcesRef={resourcesRef}
      />

      <About scrollHero={scrollHero} ref={aboutRef} />
    </main>
  );
}
