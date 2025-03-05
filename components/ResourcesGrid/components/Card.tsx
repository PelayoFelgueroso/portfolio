"use client";

import Link from "next/link";
import styles from "../style.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { slideUp } from "./anim";

interface Resource {
  slug: string;
  image: string;
  video: string;
  date: string;
  category: string;
  title: string;
  description: string;
}

interface Props {
  item: Resource;
}

export const ResourceCard = ({ item }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div className={styles.card_wrapper}>
      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        className={styles.image_container}
      >
        <Link href={`/resources/${item.slug}`} style={{ position: "static" }}>
          <div className={styles.image_wrapper}>
            <Image
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                objectFit: "cover",
                color: "transparent",
              }}
              src={item.image}
              alt={item.title}
              width={200}
              height={200}
            />
          </div>
        </Link>

        <motion.div
          variants={slideUp}
          animate={isActive ? "open" : "closed"}
          className={styles.demo_tag}
        >
          <Link
            target="_blank"
            href={`/demos/${item.slug}`}
            className={styles.tag}
          >
            Demo
            <svg
              width="9"
              height="8"
              viewBox="0 0 9 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.tag_arrow}
            >
              <path
                d="M8.49966 1.01851C8.50988 0.742553 8.29446 0.510563 8.01851 0.500342L3.52159 0.33379C3.24564 0.32357 3.01365 0.538989 3.00343 0.814942C2.99321 1.09089 3.20862 1.32288 3.48458 1.33311L7.48184 1.48115L7.33379 5.47841C7.32357 5.75436 7.53899 5.98635 7.81494 5.99657C8.09089 6.0068 8.32288 5.79138 8.3331 5.51542L8.49966 1.01851ZM1.34023 7.8664L8.34023 1.3664L7.65977 0.633603L0.659774 7.1336L1.34023 7.8664Z"
                fill="white"
              ></path>
            </svg>
          </Link>
        </motion.div>

        <Link href={`/resources/${item.slug}`}>
          <div className={styles.video_wrapper}>
            <video
              className={styles.video}
              preload="none"
              loop
              poster={item.image}
              ref={videoRef}
            >
              <source src={item.video} />
            </video>
          </div>
        </Link>
      </div>

      <div className={styles.body}>
        <div className={styles.info}>
          <p>{item.date}</p>
          <div className={styles.category_container}>
            <Link
              className={styles.category}
              href={`/resources/${item.category}`}
            >
              {item.category}
            </Link>
          </div>
        </div>

        <div className={styles.text}>
          <Link
            className={styles.title_wrapper}
            href={`/resources/${item.slug}`}
          >
            <h2>{item.title}</h2>
          </Link>

          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};
