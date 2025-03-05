"use client";

import styles from "../style.module.scss";
import { MotionValue, useTransform, motion } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const TextOnScroll = ({ scrollYProgress }: Props) => {
  const y = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.55, 0.75, 0.8, 1],
    ["100%", "0%", "0%", "-100%", "-100%", "-200%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.3], [0, 0, 1]);

  return (
    <div className={styles.scrollingHeadings}>
      <div className={`${styles.scrollingHeadingsContainer} text-white`}>
        <motion.div
          style={{
            willChange: "opacity",
            opacity,
          }}
          className={styles.scrollingHeadingsInner}
        >
          <motion.div
            style={{ willChange: "transform", y }}
            className={`${styles.headingContainer} `}
          >
            <h2 className={styles.heading}>This Text</h2>
          </motion.div>
          <motion.div
            style={{ willChange: "transform", y }}
            className={`${styles.headingContainer} `}
          >
            <h2 className={styles.heading}>Translates</h2>
          </motion.div>
          <motion.div
            style={{ willChange: "transform", y }}
            className={`${styles.headingContainer} `}
          >
            <h2 className={styles.heading}>on Scroll</h2>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
