"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { NextWork } from "./NextWork";
import { FormattedProject } from "@/models/project";

interface Props {
  slug: string;
  title: string;
  niche: string;
  images: string[];
  nextWork: FormattedProject;
}

export const WorkSlider = ({ title, niche, images, nextWork }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [limits, setLimits] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const content = scrollContentRef.current;

    if (container && content) {
      const containerWidth = container.offsetWidth;
      const contentWidth = content.scrollWidth;

      const maxScroll = contentWidth - containerWidth;
      setLimits({
        min: -maxScroll,
        max: 0,
      });
    }
  }, [images]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return;

      e.preventDefault();
      const currentX = x.get();
      const newX = currentX - e.deltaY * 1;

      const clampedX = Math.max(limits.min, Math.min(limits.max, newX));

      animate(x, clampedX, { type: "tween", delay: 0, duration: 0});
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isHovering, limits, x]);

  return (
    <div className="relative w-[100svw] flex flex-col items-start justify-start">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full flex justify-start items-center h-[clamp(320px,_70vh,_520px)] md:h-[clamp(320px,_80vh,_600px)] 2md:h-[clamp(460px,_60vh,_960px)] px-[clamp(16px,_1.4vw,_24px)] overflow-hidden"
      >
        <motion.div
          ref={scrollContentRef}
          style={{ willChange: "transform", x }}
          className="relative flex h-full justify-start items-center gap-2"
        >
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={title}
              width={1000}
              height={1000}
              className="h-full object-cover bg-whiteCustom"
            />
          ))}
          <NextWork
            slug={nextWork.slug}
            image={nextWork.images_collection[0]}
            title={nextWork.title.rendered}
          />
        </motion.div>
      </div>

      <div className="relative z-20 w-full flex justify-start items-start px-[clamp(16px,_1.4vw,_24px)]">
        <div className="md:w-[60%] 2md:w-full flex self-stretch flex-col gap-[clamp(16px,_2vw,_24px)] pb-20 2md:pb-0">
          <div className="2md:w-[clamp(424px,_40vw,_468px)]">
            <h3 className="text400">{title}</h3>
            <p className="text100 text-darkGrayCustom">{niche}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
