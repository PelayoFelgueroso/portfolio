"use client";

import styles from "./style.module.scss";
import React from "react";
import { motion } from "framer-motion";
import useMousePosition from "@/lib/utils";
import { useCursorHover } from "@/contexts/CursorHovert.context";
import Image from "next/image";
import { cursorPng } from "@/public";

export const DotCursor = () => {
  const { x, y } = useMousePosition();
  const { cursorHover } = useCursorHover();

  return (
    <div className={styles.cursor_wrapper}>
      <motion.div
        className={`${styles.dot_cursor} ${
          cursorHover ? styles.cursor_hover : "no hay hover"
        }`}
        animate={{
          translateX: `${x - 35 / 2}px`,
          translateY: `${y - 35 / 2}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.25 }}
      >
        <Image src={cursorPng} alt="" />
      </motion.div>
    </div>
  );
};

