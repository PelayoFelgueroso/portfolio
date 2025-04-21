"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { navLinks } from "@/content";
import Link from "next/link";
import { logoColor, slideDown } from "./anim";
import { DesktopNavLink } from "./components/DesktopNavLink";

export const CurvedMenu = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.header
      variants={slideDown}
      initial="initial"
      animate="entry"
      className={`${styles.header_wrapper}`}
    >
      <div className={styles.header_container}>
        <div className="relative z-[1000]">
          <Link href="/" className="">
            <motion.svg
              variants={logoColor}
              initial="closed"
              animate={isActive ? "open" : "closed"}
              width="44"
              height="42"
              viewBox="0 0 44 42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M43.4358 41.2359H32.3078C30.6986 41.2359 29.2881 40.8493 28.076 40.0761C26.8639 39.3028 25.9235 38.258 25.2548 36.9414C24.5861 35.6249 24.2517 34.162 24.2517 32.5529C24.2517 30.9438 24.5861 29.4914 25.2548 28.1957C25.9235 26.9001 26.8639 25.8656 28.076 25.0924C29.2881 24.3192 30.6986 23.9326 32.3078 23.9326H43.4358V27.0986H32.3078C31.3047 27.0986 30.4374 27.3494 29.706 27.8509C28.9746 28.3316 28.4104 28.9794 28.0133 29.7944C27.6162 30.6094 27.4177 31.5289 27.4177 32.5529C27.4177 33.5769 27.6162 34.5068 28.0133 35.3427C28.4104 36.1786 28.9746 36.8474 29.706 37.3489C30.4374 37.8296 31.3047 38.0699 32.3078 38.0699H40.2698V34.0889H31.2733V30.9229H43.4358V41.2359Z" />
              <path d="M18.0242 27.0986H3.166V41.2359H0V23.9326H18.0242V27.0986ZM15.9867 34.0889H4.63928V30.9229H15.9867V34.0889Z" />
              <path d="M44 12.1624C44 13.1028 43.7179 13.9596 43.1537 14.7328C42.5894 15.4852 41.8267 16.0912 40.8654 16.5509C39.925 17.0107 38.8801 17.2406 37.7307 17.2406H24.2517V14.1059H37.7307C38.5875 14.1059 39.3189 13.9178 39.925 13.5417C40.5519 13.1655 40.8654 12.7058 40.8654 12.1624V11.3788H30.4897C29.3403 11.3788 28.2954 11.0967 27.355 10.5324C26.4146 9.96818 25.6623 9.21586 25.0981 8.27547C24.5338 7.31418 24.2517 6.25885 24.2517 5.10948V0H27.355V5.10948C27.355 5.98718 27.658 6.72904 28.2641 7.33508C28.891 7.94111 29.6329 8.24413 30.4897 8.24413H40.8654V0H44V12.1624Z" />
              <path d="M19.7169 6.2693C19.7169 7.39777 19.4348 8.44265 18.8706 9.40394C18.3063 10.3652 17.5436 11.1384 16.5823 11.7236C15.6419 12.2878 14.597 12.5699 13.4476 12.5699H4.73332V9.46664H13.4476C14.3253 9.46664 15.0672 9.15317 15.6732 8.52624C16.3002 7.87841 16.6136 7.1261 16.6136 6.2693C16.6136 5.3916 16.3002 4.64973 15.6732 4.04369C15.0672 3.41676 14.3253 3.1033 13.4476 3.1033H3.1033V17.2406H0V0H13.4476C14.597 0 15.6419 0.282118 16.5823 0.846355C17.5436 1.41059 18.3063 2.17336 18.8706 3.13465C19.4348 4.07504 19.7169 5.11993 19.7169 6.2693Z" />
            </motion.svg>
          </Link>
        </div>

        <div className="md:hidden">
          <div className={styles.header}>
            <div
              onClick={() => {
                setIsActive(!isActive);
              }}
              className={styles.button}
            >
              <div
                className={`${styles.burger} ${
                  isActive ? styles.burgerActive : ""
                }`}
              />
            </div>
          </div>
          <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
        </div>

        <nav
          className={`${styles.navbar_wrapper} text-blackCustom hidden md:block`}
        >
          <ul className={styles.link_list}> 
            {navLinks.map((item, index) => (
              <DesktopNavLink key={index} href={item.href} title={item.title} />
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};
