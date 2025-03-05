"use client";

import { background, darkCave, darkMountain, shadowBench, shadowPerson, shortStreet } from "@/public";
import styles from "./style.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { ReactNode, useRef } from "react";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

export const ZoomParallax: React.FC<Props> = ({ children }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["1% start", "30% end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: background,
      scale: scale4,
    },
    {
      src: shadowPerson,
      scale: scale5,
    },
    {
      src: shadowBench,
      scale: scale6,
    },
    {
      src: shortStreet,
      scale: scale5,
    },
    {
      src: darkCave,
      scale: scale6,
    },
    {
      src: darkMountain,
      scale: scale8,
    },
    {
      src: background,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={`${styles.container}`}>
      <div className="sticky top-0 w-full h-screen object-cover bg-Iroko"></div>

      <div className={styles.sticky}>
        {pictures.slice(0, 1).map(({ scale }, index) => (
          <motion.div
            key={index}
            style={{ willChange: "transform", scale }}
            className={`${styles.el} sticky`}
          >
            <div className={`${styles.imageContainer}`}>
              <div className="w-full h-full sticky">{children}</div>
            </div>
          </motion.div>
        ))}
        {pictures.slice(1, 7).map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ willChange: "transform", scale }}
              className={styles.el}
            >
              <div className={`${styles.imageContainer}`}>
                <Image
                  src={src}
                  alt="image"
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
