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
  featured_image: string;
}

export const Project = ({ slug, title, featured_image }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const splitCamelCase = (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const parts = title.includes(" ")
    ? title.split(" ")
    : splitCamelCase(title).split(" ");

  const title1 = parts[0];
  const title2 = parts.length > 1 ? parts.slice(1).join(" ") : "";

  return (
    <Link
      href={`/${slug}`}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => setIsActive(false)}
      className={styles.project}
    >
      <p>{title1}</p>
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        className={styles.imgContainer}
      >
        <Image src={featured_image} width={1000} height={1000} alt={title} />
      </motion.div>
      <p>{title2}</p>
    </Link>
  );
};
