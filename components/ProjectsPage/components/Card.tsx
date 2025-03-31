"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useWillChange } from "framer-motion";
import Image from "next/image";
import { cardSlideUp } from "./anim";
import useMousePosition from "@/lib/utils";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  featured_video: string;
  featured_image: string;
  featured_image_mobile: string;
  title: string;
}

export const Card = ({
  onMouseEnter,
  onMouseLeave,
  featured_image,
  featured_image_mobile,
  title,
}: Props) => {
  const container = useRef(null);
  const { x, y } = useMousePosition();
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const willChange = useWillChange();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const isInView = useInView(container, {
    once: false,
  });

  const rotateX = (y / windowHeight) * 15 - 7.5 || 0;
  const rotateY = (x / windowWidth) * 15 - 7.5 || 0;

  return (
    <motion.div
      ref={container}
      variants={cardSlideUp}
      initial="initial"
      animate={isInView ? "inView" : "initial"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative max-md:h-[85%] aspect-[1/2] lg:w-full lg:max-w-[1200px] lg:aspect-[16/9] mx-auto"
    >
      <motion.div
        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/25"
        style={{
          willChange,
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          perspective: "450px",
        }}
      >
        <Image
          src={featured_image_mobile}
          width={400}
          height={800}
          alt={title}
          className="md:hidden absolute inset-0 object-cover w-full h-full"
        />
        <Image
          src={featured_image}
          width={1920}
          height={1080}
          alt={title}
          className="hidden md:block absolute inset-0 object-cover w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
};
