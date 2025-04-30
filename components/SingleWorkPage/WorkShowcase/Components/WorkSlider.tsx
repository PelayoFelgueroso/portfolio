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
  description: string;
  date: string;
  services: string[];
  nextWork: FormattedProject;
}

export const WorkSlider = ({
  title,
  niche,
  images,
  description,
  date,
  services,
  nextWork,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [limits, setLimits] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const content = scrollContentRef.current;

    if (!container || !content) return;

    const updateLimits = () => {
      requestAnimationFrame(() => {
        const contentWidth = content.scrollWidth;
        const containerWidth = container.clientWidth;

        const maxScroll = contentWidth - containerWidth;
        setLimits({
          min: -maxScroll,
          max: 0,
        });
      });
    };

    updateLimits();

    const resizeObserver = new ResizeObserver(updateLimits);
    resizeObserver.observe(content);

    return () => {
      resizeObserver.disconnect();
    };
  }, [images]);

  useEffect(() => {
    let touchStartX: number | null = null;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const handleWheel = (e: WheelEvent) => {
      if (isTouchDevice || !isHovering) return;
      e.preventDefault();

      const currentX = x.get();
      const newX = currentX - e.deltaY;
      const clampedX = Math.max(limits.min, Math.min(limits.max, newX));

      animate(x, clampedX, { type: "tween", delay: 0, duration: 0 });
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isHovering) return;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX === null || !isHovering) return;

      const touchX = e.touches[0].clientX;
      const deltaX = touchStartX - touchX;
      const currentX = x.get();
      const newX = currentX - deltaX;
      const clampedX = Math.max(limits.min, Math.min(limits.max, newX));

      animate(x, clampedX, { type: "tween", delay: 0, duration: 0 });

      touchStartX = touchX;
    };

    if (!isTouchDevice) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isHovering, limits, x]);

  return (
    <div className="relative w-[100svw] h-full flex flex-col items-start justify-start">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full flex justify-start items-center h-[clamp(320px,_70vh,_520px)] md:h-[clamp(320px,_80vh,_600px)] 2md:h-[clamp(460px,_60vh,_960px)] pt-[69px] overflow-hidden"
      >
        <div
          ref={containerRef}
          className="w-full h-full flex justify-start pointer-coarse:overflow-y-scroll scrollbar-none"
        >
          <motion.div
            ref={scrollContentRef}
            style={{ willChange: "transform", x }}
            className="relative min-w-fit flex flex-none h-full justify-start items-center gap-2 pb-[clamp(16px,_2vw,_24px)] px-[clamp(16px,_1.4vw,_24px)]"
          >
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={title}
                width={1000}
                height={1000}
                className="h-full w-fit object-cover bg-whiteCustom single-work-slider"
              />
            ))}
            <NextWork
              slug={nextWork.slug}
              image={nextWork.images_collection[0]}
              title={nextWork.title.rendered}
              niche={nextWork.acf.niche}
            />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 w-full flex shrink grow-0 basis-auto 2md:grow-1 2md:basis-0 justify-start items-start px-[clamp(16px,_1.4vw,_24px)]">
        <div className="w-full hidden 2md:block" />
        <div className="md:w-[60%] 2md:w-full flex flex-col self-stretch gap-[clamp(16px,_2vw,_24px)] pb-[80px] 2md:pb-0">
          <div className="2md:w-[clamp(424px,_40vw,_468px)]">
            <h3 className="text400">{title}</h3>
            <p className="text100 text-darkGray">{niche}</p>
          </div>

          <div className="relative z-[100] 2md:h-full 2md:w-[clamp(424px,_40vw,_468px)]">
            <p className="text100">{description}</p>
          </div>

          <div className="relative items-start text-darkGray pb-[clamp(16px,_2vw,_24px)]">
            <p className="text100 text-darkGray">{date}</p>
            <p className="text100 text-darkGray">{services.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
