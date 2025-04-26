"use client";

import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMousePosition from "@/lib/utils";

const DotCursor = () => {
  const { x, y } = useMousePosition();
  const [hoveringProject, setHoveringProject] = useState(false);
  const [hoveringResource, setHoveringResource] = useState(false);
  const [hoveringDark, setHoveringDark] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [hoveringLinkWider, setHoveringLinkWider] = useState(false);
  const [hoveringLogoLink, setHoveringLogoLink] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [hoveringInput, setHoveringInput] = useState(false);

  useEffect(() => {
    const observeDOMChanges = () => {
      const observer = new MutationObserver(() => {
        attachHoverListeners();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return observer;
    };

    const attachHoverListeners = () => {
      const projectCards = document.querySelectorAll(".project-preview");
      const resourceCards = document.querySelectorAll(".resource-card");
      const darkContainers = document.querySelectorAll(".cursor-light");
      const links = document.querySelectorAll(".link-hover");
      const linksWider = document.querySelectorAll(".link-hover-wider");
      const logoLink = document.querySelectorAll(".logo-link-hover");
      const buttons = document.querySelectorAll(".hover-button");
      const inputs = document.querySelectorAll(".input-form");

      projectCards.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringProject(true));
        el.addEventListener("mouseleave", () => setHoveringProject(false));
      });

      resourceCards.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringResource(true));
        el.addEventListener("mouseleave", () => setHoveringResource(false));
      });

      darkContainers.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringDark(true));
        el.addEventListener("mouseleave", () => setHoveringDark(false));
      });

      links.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringLink(true));
        el.addEventListener("mouseleave", () => setHoveringLink(false));
      });

      linksWider.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringLink(true));
        el.addEventListener("mouseenter", () => setHoveringLinkWider(true));
        el.addEventListener("mouseleave", () => setHoveringLink(false));
        el.addEventListener("mouseleave", () => setHoveringLinkWider(false));
      });

      logoLink.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringLogoLink(true));
        el.addEventListener("mouseleave", () => setHoveringLogoLink(false));
      });

      buttons.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringButton(true));
        el.addEventListener("mouseleave", () => setHoveringButton(false));
      });

      inputs.forEach((el) => {
        el.addEventListener("mouseenter", () => setHoveringInput(true));
        el.addEventListener("mouseleave", () => setHoveringInput(false));
      });
    };

    const observer = observeDOMChanges();
    attachHoverListeners();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`flex ${styles.cursor_wrapper}`}>
      <motion.div
        className={`${styles.dot_cursor} ${
          hoveringProject ? styles.project_preview : ""
        } ${hoveringResource ? styles.resource_demo : ""} ${
          hoveringDark ? styles.cursor_light : ""
        } ${hoveringLink ? styles.link_hover : ""} ${
          hoveringLinkWider ? styles.wider : ""
        } ${hoveringLogoLink ? styles.logo_hover : ""} ${
          hoveringButton ? styles.btn_hover : ""
        } ${hoveringInput ? styles.ipt_hover : ""}`}
        style={{ willChange: "transform" }}
        animate={
          hoveringProject
            ? {
                translateX: `${x + 100 / 2}px`,
                translateY: `${y - 35 / 2}px`,
              }
            : hoveringResource
            ? {
                translateX: `${x + 120 / 2}px`,
                translateY: `${y - 35 / 2}px`,
              }
            : {
                translateX: `${x - 20 / 2}px`,
                translateY: `${y - 20 / 2}px`,
              }
        }
        transition={{ type: "tween", ease: "backOut", duration: 0.25 }}
      >
        <AnimatePresence mode="wait">
          {hoveringProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                animate: { duration: 0.3, delay: 0.3 },
                exit: { duration: 0.3, delay: 0 },
              }}
              className={`relative text100 text-blackCustom flex items-center`}
            >
              <div className="w-2 h-2 rounded-full mr-2 bg-blackCustom" />
              Explore
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {hoveringResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                animate: { duration: 0.3, delay: 0.3 },
                exit: { duration: 0.3, delay: 0 },
              }}
              className={`relative text100 text-whiteCustom flex items-center text-nowrap`}
            >
              <div className="w-2 h-2 rounded-full mr-2 bg-whiteCustom" />
              View demo
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DotCursor;
