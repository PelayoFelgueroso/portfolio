/**
 * Hook personalizado para simplificar múltiples useScroll con patrones similares
 */

import { useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollSection {
  ref: React.RefObject<HTMLElement>;
  scrollYProgress: MotionValue<number>;
}

interface UseScrollSectionsReturn {
  refs: {
    heroRef: React.RefObject<HTMLElement | null>;
    worksRef: React.RefObject<HTMLElement | null>;
    resourcesRef: React.RefObject<HTMLElement | null>;
    aboutRef: React.RefObject<HTMLElement | null>;
    contactRef: React.RefObject<HTMLElement | null>;
  };
  scrollValues: {
    scrollHero: MotionValue<number>;
    scrollWorks: MotionValue<number>;
    scrollResources: MotionValue<number>;
    scrollAbout: MotionValue<number>;
    scrollContact: MotionValue<number>;
  };
}

/**
 * Hook que crea múltiples refs y scroll progress values
 * Simplifica el código de la página principal
 */
export function useScrollSections(): UseScrollSectionsReturn {
  const heroRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const resourcesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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

  return {
    refs: {
      heroRef,
      worksRef,
      resourcesRef,
      aboutRef,
      contactRef,
    },
    scrollValues: {
      scrollHero,
      scrollWorks,
      scrollResources,
      scrollAbout,
      scrollContact,
    },
  };
}
