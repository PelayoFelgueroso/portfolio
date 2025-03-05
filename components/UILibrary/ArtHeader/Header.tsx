"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import { externalLinks, headerInfo, navLinks } from "@/content";
import Image from "next/image";
import { logo, logoTransparent, menuGradient } from "@/public";
import { useState } from "react";
import { NavLink } from "./components/NavLink";
import { ExternalLink } from "./components/ExternalLink";
import useMousePosition from "@/lib/utils";
import { ToggleButton } from "./components/ToggleButton";
import { motion } from "framer-motion";
import { slideIn, slideUpLogo } from "./anim";

export const ArtHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y } = useMousePosition();

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const centerX = windowWidth / 2;
  const centerY = windowHeight;

  const translateX = (x - centerX) * 0.5;
  const translateY = (y - centerY) * 0.5;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={styles.header_element}>
      <Link href="/" className={styles.nav_logo_wrapper}>
        <div className={styles.nav_logo}>
          <Image src={logo} alt="logo" className={styles.logo} />
        </div>
      </Link>

      <ToggleButton onClick={() => toggleMenu()} isOpen={isOpen} />

      <div className={styles.nav_wrapper}>
        <motion.div
          variants={slideIn}
          initial="initial"
          animate={isOpen ? "open" : "close"}
          className={styles.nav_container}
        >
          <div className={styles.nav_body}>
            <div className={styles.internal_links}>
              <ul className={styles.navLinks}>
                {navLinks.map((link, i) => (
                  <li className="overflow-hidden" key={i}>
                    <NavLink
                      isOpen={isOpen}
                      onClick={() => setIsOpen(false)}
                      href={link.href}
                      title={link.title}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.external_links}>
              <ul className={styles.externalLinks}>
                {externalLinks.map((link, i) => (
                  <li className="overflow-hidden" key={i}>
                    <ExternalLink
                      isOpen={isOpen}
                      href={link.href}
                      title={link.title}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.nav_footer}>
            <motion.div
              variants={slideUpLogo}
              initial="initial"
              animate={isOpen ? "open" : "close"}
              className={styles.footer_container}
            >
              <div className={styles.gradient_container}>
                <Image
                  src={menuGradient}
                  alt=""
                  className={styles.gradient}
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                  }}
                />
              </div>

              <div className={styles.logo_gradient_container}>
                <Image
                  src={logoTransparent}
                  alt="Logo"
                  className={styles.logo}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div
        style={{
          display: "none",
        }}
        className={styles.navbar_info}
      >
        <div className={styles.separator}></div>
        <div className={styles.info_wrapper}>
          <div className={styles.info_container}>
            <div className={styles.info_inner}>
              {headerInfo.map((item, i) => (
                <div key={i} className={styles.info_item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
