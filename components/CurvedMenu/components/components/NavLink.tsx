import styles from "../../style.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../../anim";
import { Dispatch, SetStateAction } from "react";

interface Data {
  title: string;
  href: string;
  index: number;
}

interface Props {
  data: Data;
  isActive: boolean;
  setSelectedIndicator: Dispatch<SetStateAction<string>>;
}

export const NavLink = ({ data, isActive, setSelectedIndicator }: Props) => {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
