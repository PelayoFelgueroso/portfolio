import React, { useState } from "react";
import styles from "../style.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "../anim";
import { NavLink } from "./components/NavLink";
import { HeaderFooter } from "./components/HeaderFooter";
import { Curve } from "./components/Curve";
import { navLinks } from "@/content";

export const Nav = () => {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navLinks.map((data, index) => {
            return (
              <NavLink
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            );
          })}
        </div>
        <HeaderFooter />
      </div>
      <Curve />
    </motion.div>
  );
};
