"use client";

import { motion } from "framer-motion";
import styles from "../style.module.scss";
import { hoverLink, slideUp } from "../anim";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { externalArrow } from "@/public";
import { useCursorHover } from "@/contexts/CursorHovert.context";

interface Props {
  href: string;
  title: string;
  isOpen: boolean;
}

export const ExternalLink = ({ isOpen, href, title }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorHover } = useCursorHover();

  const handleHover = () => {
    setIsHovered(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <motion.div
      onMouseOver={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
      variants={slideUp}
      initial="initial"
      animate={isOpen ? "open" : "close"}
    >
      <Link
        href={href}
        target="_blank"
        className={styles.menu_item}
        onMouseEnter={handleHover}
      >
        <motion.div
          variants={hoverLink}
          initial="initial"
          animate={isHovered ? ["hovered", "return"] : "initial"}
          className={styles.menu_item_container}
        >
          <div className={styles.menu_item_text}>{title}</div>
          <div className={styles.external_arrow}>
            <Image src={externalArrow} alt="" className={styles.arrow} />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
