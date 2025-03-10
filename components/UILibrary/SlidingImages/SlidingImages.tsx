"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";
import {
  darkCave,
  darkMountain,
  oldBuilding,
  shadowBench,
  shadowPerson,
  shortStreet,
} from "@/public";

const slider1 = [
  {
    src: darkCave,
  },
  {
    src: darkMountain,
  },
  {
    src: shadowPerson,
  },
  {
    src: shadowBench,
  },
];

const slider2 = [
  {
    src: oldBuilding,
  },
  {
    src: shortStreet,
  },
  {
    src: darkCave,
  },
  {
    src: oldBuilding,
  },
];

export const SlidingImages = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((item, index) => {
          return (
            <div key={index} className={styles.project}>
              <div className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={item.src} />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((item, index) => {
          return (
            <div key={index} className={styles.project}>
              <div key={index} className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={item.src} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
