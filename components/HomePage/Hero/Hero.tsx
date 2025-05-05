"use client";
import { heroImage } from "@/public";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface Props {
  heroRef: React.RefObject<HTMLElement | null>;
  scrollHero: MotionValue<number>;
}

export const Hero = ({ heroRef, scrollHero }: Props) => {
  const opacity = useTransform(scrollHero, [0.6, 1], [1, 0.08]);

  return (
    <motion.section
      ref={heroRef}
      className="h-[125vh] width-[100svw] relative overflow-hidden"
      style={{ willChange: "opacity", opacity }}
    >
        <div className="relative top-[12.5vh] h-[50vh] max-w-full mx-auto aspect-video">
          <Image
            src={heroImage}
            alt="hero"
            className="w-full h-full object-cover object-center rounded-lg"
            style={{
              maskImage: "linear-gradient(black 80%, transparent)",
              WebkitMaskImage: "linear-gradient(black 80%, transparent)",
            }}
            priority
          />
        </div>

      <div className="fixed aspect-auto pointer-events-none w-screen top-[-18vh] left-0 right-0 z-10 h-[130vh] md:h-[150vh] 2md:h-screen"></div>
    </motion.section>
  );
};
