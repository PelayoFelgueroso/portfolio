"use client";

import { motion } from "framer-motion";
import styles from "../style.module.scss";
import { hoverLink, slideUp } from "../anim";
import { useState } from "react";
import { useCursorHover } from "@/contexts/CursorHovert.context";

interface Props {
  href: string;
  title: string;
  onClick: () => void;
  isOpen: boolean;
}

export const NavLink = ({ href, title, onClick, isOpen }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorHover } = useCursorHover();

  const handleHover = () => {
    setIsHovered(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <motion.a
      onMouseOver={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
      variants={slideUp}
      initial="initial"
      animate={isOpen ? "open" : "close"}
      onClick={onClick}
      href={href}
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
      </motion.div>
    </motion.a>
  );
};
