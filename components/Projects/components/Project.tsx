"use client";

import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const anim = {
  initial: { width: 0 },
  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  closed: { width: 0 },
};

interface Props {
  slug: string;
  title: string;
  description: string;
  featured_image: string;
  featured_video: string;
  live_demo: string;
  github_link?: string;
  technologies: string[];
}

export const Project = ({
  slug,
  title,
  description,
  featured_image,
  featured_video,
  live_demo,
  github_link,
  technologies,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      href={`/${slug}`}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => setIsActive(false)}
      className={styles.project}
    >
      <p>{title}</p>
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        className={styles.imgContainer}
      >
        <Image src={featured_image} width={1000} height={1000} alt={title} />
      </motion.div>
      <p>{description}</p>
    </Link>
  );
};
