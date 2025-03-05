"use client";

import Image from "next/image";
import styles from "../style.module.scss";
import { motion, MotionValue, useTransform } from "framer-motion";
import { darkCave, darkMountain, shadowBench, shadowPerson } from "@/public";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const ImagesScrolling = ({ scrollYProgress }: Props) => {
  const x2 = useTransform(scrollYProgress, [0.3, 0.5], ["100%", "0%"]);
  const x3 = useTransform(scrollYProgress, [0.55, 0.75], ["100%", "0%"]);
  const x4 = useTransform(scrollYProgress, [0.8, 1], ["100%", "0%"]);

  return (
    <div className={`${styles.scrollingImagesContainer}`}>
      <div className={`${styles.image}`}>
        <Image
          className={styles.coverImage}
          src={shadowPerson}
          alt="Image"
          loading="lazy"
        />
      </div>
      <motion.div
        style={{ willChange: "transform", x: x2 }}
        className={`${styles.image}`}
      >
        <Image
          className={styles.coverImage}
          src={shadowBench}
          alt="Image"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        style={{ willChange: "transform", x: x3 }}
        className={`${styles.image}`}
      >
        <Image
          className={styles.coverImage}
          src={darkCave}
          alt="Image"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        style={{ willChange: "transform", x: x4 }}
        className={`${styles.image}`}
      >
        <Image
          className={styles.coverImage}
          src={darkMountain}
          alt="Image"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};
