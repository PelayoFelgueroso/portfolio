import Link from "next/link";
import styles from "../style.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import { hoverLink, toggleMenu, totoggleClose } from "../anim";
import { useCursorHover } from "@/contexts/CursorHover.context";

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export const ToggleButton = ({ onClick, isOpen }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorHover } = useCursorHover();

  const handleHover = () => {
    setIsHovered(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <Link
      onMouseOver={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
      href=""
      onClick={onClick}
      className={styles.nav_button}
      onMouseEnter={handleHover}
    >
      <div className={styles.button_wrapper}>
        <div className={styles.button_positioner}>
          <div className="text-white mr-2">
            <motion.div
              variants={hoverLink}
              initial="initial"
              animate={isHovered ? ["hovered", "return"] : "initial"}
              className={styles.button_container}
            >
              <motion.div
                variants={toggleMenu}
                initial="initial"
                animate={isOpen ? "isOpen" : "isNotOpen"}
                className={`${styles.button_text} ${styles.menu}`}
              >
                Menu
              </motion.div>
              <motion.div
                variants={totoggleClose}
                initial="initial"
                animate={isOpen ? "isOpen" : "isNotOpen"}
                className={`${styles.button_text} ${styles.close}`}
              >
                Close
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className={styles.dot}></div>
    </Link>
  );
};
