"use client";

import { useRef } from "react";
import { ImagesScrolling } from "./components/ImagesScrolling";
import { TextOnScroll } from "./components/TextOnScroll";
import styles from "./style.module.scss";
import { ZoomParallax } from "./ZoomParallax/ZoomParallax";
import { useScroll } from "framer-motion";

export const ScrollingImages = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 100%", "end 100%"],
  });

  return (
    <section ref={container} id="explore" className="bg-gray">
      <ZoomParallax>
        <div className={`${styles.scrollingImages} w-full h-full`}>
          <ImagesScrolling scrollYProgress={scrollYProgress} />
          <TextOnScroll scrollYProgress={scrollYProgress} />
        </div>
      </ZoomParallax>
    </section>
  );
};
