"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { Rounded } from "@/common/RoundedButton/RoundedButton";
import { Magnetic } from "@/common/Magnetic/Magnetic";
import Line from "./Line";
import { profilePicture } from "@/public";

export const Footer = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <motion.footer style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <h3>
            <span>
              <div className={styles.imageContainer}>
                <Image fill={true} alt={"image"} src={profilePicture} />
              </div>
              Let&apos;s work
            </span>
            together
          </h3>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#334BD3"} className={styles.button}>
              <p>Get in touch</p>
            </Rounded>
          </motion.div>
          <motion.svg
            className={styles.svg}
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5h5.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
          <Line />
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>pfelguerosogalguera@gmail.com</p>
          </Rounded>
          <Rounded>
            <p>+34 684 35 35 95</p>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div className={styles.bottom}>
            <span>
              <h5>Version</h5>
              <p>2025 © Edition</p>
            </span>
            <span>
              <h5>Version</h5>
              <p>11:49 PM GMT+2</p>
            </span>
          </div>
          <div className={styles.top}>
            <span>
              <h5>socials</h5>
            </span>
            <div className="">
              <Magnetic max={2}>
                <p>Awwwards</p>
              </Magnetic>
              <Magnetic max={2}>
                <p>Instagram</p>
              </Magnetic>
              <Magnetic max={2}>
                <p>Dribbble</p>
              </Magnetic>
              <Magnetic max={2}>
                <p>Linkedin</p>
              </Magnetic>
            </div>
            <div className={styles.stripe}></div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
