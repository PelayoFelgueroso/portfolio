"use client";

import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMousePosition from "@/lib/utils";

const HOVER_CLASSES = [
  { className: ".project-preview", stateKey: "project" },
  { className: ".resource-card", stateKey: "resource" },
  { className: ".cursor-light", stateKey: "dark" },
  { className: ".link-hover", stateKey: "link" },
  { className: ".link-hover-wider", stateKey: "linkWider" },
  { className: ".logo-link-hover", stateKey: "logoLink" },
  { className: ".hover-button", stateKey: "button" },
  { className: ".input-form", stateKey: "input" },
  { className: ".single-work-slider", stateKey: "singleWork" },
  { className: ".next-work", stateKey: "nextWork" },
];

const DotCursor = () => {
  const { x, y } = useMousePosition();
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    attachHoverListeners();

    function attachHoverListeners() {
      HOVER_CLASSES.forEach(({ className, stateKey }) => {
        document.querySelectorAll(className).forEach((el) => {
          el.addEventListener("mouseenter", () =>
            setHoverStates((s) => ({ ...s, [stateKey]: true }))
          );
          el.addEventListener("mouseleave", () =>
            setHoverStates((s) => ({ ...s, [stateKey]: false }))
          );
        });
      });
    }

    return () => observer.disconnect();
  }, []);

  const getCursorOffset = () => {
    if (hoverStates.project) return { x: x + 50, y: y - 17.5 };
    if (hoverStates.resource) return { x: x + 60, y: y - 17.5 };
    return { x: x - 10, y: y - 10 };
  };

  const offset = getCursorOffset();

  const dynamicClasses = [
    hoverStates.project && styles.project_preview,
    hoverStates.resource && styles.resource_demo,
    hoverStates.dark && styles.cursor_light,
    hoverStates.link && styles.link_hover,
    hoverStates.linkWider && styles.link_wider,
    hoverStates.logoLink && styles.logo_hover,
    hoverStates.button && styles.btn_hover,
    hoverStates.input && styles.ipt_hover,
    hoverStates.singleWork && styles.single_work_hover,
    hoverStates.nextWork && styles.next_work,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex ${styles.cursor_wrapper}`}>
      <motion.div
        className={`${styles.dot_cursor} ${dynamicClasses}`}
        style={{ willChange: "transform" }}
        animate={{
          translateX: `${offset.x}px`,
          translateY: `${offset.y}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.25 }}
      >
        <AnimatePresence mode="wait">
          {hoverStates.project && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              transition={{
                duration: 0.3,
              }}
              className={`relative text100 text-blackCustom flex items-center`}
            >
              <div className="w-2 h-2 rounded-full mr-2 bg-blackCustom" />
              Explore
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {hoverStates.resource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              transition={{
                duration: 0.3,
              }}
              className={`relative text100 text-whiteCustom flex items-center text-nowrap`}
            >
              <div className="w-2 h-2 rounded-full mr-2 bg-whiteCustom" />
              View demo
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {hoverStates.singleWork && (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              initial={{ rotate: 180 }}
              animate={{ rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="fill-darkBlueCustom max-w-5 mx-h-5"
            >
              <path d="M23.9951 0.901316C23.9937 0.886504 23.9909 0.87216 23.9888 0.857582C23.9863 0.83991 23.9842 0.822191 23.9807 0.804613C23.9774 0.787831 23.9728 0.771566 23.9687 0.755112C23.9649 0.739972 23.9615 0.724737 23.957 0.709737C23.9521 0.693565 23.946 0.677956 23.9403 0.662159C23.9349 0.647206 23.93 0.632112 23.9239 0.617346C23.9178 0.602581 23.9106 0.588471 23.9039 0.57408C23.8967 0.558893 23.8899 0.543565 23.882 0.528658C23.8746 0.514877 23.8662 0.501752 23.8582 0.488346C23.8494 0.473768 23.8412 0.459002 23.8317 0.444752C23.8218 0.429939 23.8107 0.416017 23.8001 0.401767C23.7912 0.389908 23.7829 0.37772 23.7735 0.366142C23.7527 0.340876 23.7309 0.316548 23.7077 0.293439C23.7076 0.293251 23.7079 0.293626 23.7077 0.293439C23.7076 0.293251 23.7069 0.292595 23.7067 0.292407C23.6836 0.269298 23.6593 0.247407 23.634 0.226642C23.6224 0.217126 23.6102 0.208876 23.5983 0.19997C23.5841 0.189329 23.5702 0.178313 23.5554 0.168423C23.5411 0.158907 23.5263 0.150657 23.5117 0.141938C23.4983 0.133922 23.4852 0.125532 23.4714 0.118125C23.4565 0.110157 23.4413 0.103407 23.426 0.0962348C23.4116 0.0894378 23.3975 0.082266 23.3828 0.0761253C23.368 0.0700315 23.3529 0.0650628 23.3379 0.059719C23.3221 0.0540471 23.3065 0.0480002 23.2904 0.0431252C23.2754 0.0385783 23.2601 0.0352501 23.245 0.0314533C23.2285 0.0272814 23.2123 0.0226876 23.1955 0.0193595C23.178 0.0158907 23.1602 0.0137813 23.1426 0.01125C23.128 0.00918754 23.1136 0.00637503 23.0988 0.00492189C23.066 0.00173438 23.0331 0 23.0001 0H16.0001C15.4478 0 15.0001 0.447705 15.0001 0.999988C15.0001 1.55227 15.4478 1.99998 16.0001 1.99998H20.5859L13.293 9.29291C12.9025 9.68343 12.9025 10.3166 13.293 10.7071C13.6835 11.0977 14.3167 11.0977 14.7072 10.7071L22.0001 3.41425V8.00005C22.0001 8.55233 22.4478 9.00004 23.0001 9.00004C23.5524 9.00004 24.0001 8.55233 24.0001 8.00005V1.00008C24.0001 0.967082 23.9984 0.934129 23.9951 0.901316Z" />
              <path d="M9.29291 13.293L2.00002 20.5858V16C2.00002 15.4478 1.55232 15.0001 1.00004 15.0001C0.447705 15.0001 0 15.4478 0 16V23.0001C0 23.033 0.00173438 23.0659 0.00496877 23.0987C0.0064219 23.1135 0.00918754 23.1278 0.0112969 23.1425C0.0138282 23.1601 0.0158907 23.1779 0.0194063 23.1954C0.0227345 23.2122 0.0273282 23.2284 0.0315001 23.2449C0.035297 23.2601 0.0386252 23.2753 0.043172 23.2903C0.0480471 23.3064 0.054094 23.322 0.0597659 23.3378C0.0651565 23.3528 0.0700784 23.3679 0.0761722 23.3827C0.082266 23.3974 0.0894847 23.4115 0.0962816 23.4259C0.103454 23.4411 0.110204 23.4564 0.118172 23.4713C0.125579 23.4851 0.133969 23.4982 0.141985 23.5116C0.150704 23.5262 0.158954 23.541 0.168469 23.5553C0.17836 23.5701 0.189376 23.5839 0.200016 23.5982C0.208923 23.6101 0.217173 23.6223 0.226688 23.6339C0.247454 23.6592 0.269345 23.6835 0.292454 23.7066C0.292267 23.7065 0.292642 23.7068 0.292454 23.7066C0.292642 23.7068 0.293298 23.7075 0.293486 23.7076C0.316595 23.7307 0.340923 23.7526 0.366189 23.7734C0.377767 23.7829 0.389955 23.7911 0.401814 23.8C0.416064 23.8106 0.429986 23.8217 0.444799 23.8316C0.459002 23.8411 0.473767 23.8493 0.488393 23.8581C0.501799 23.8661 0.514877 23.8745 0.528705 23.8819C0.543612 23.8898 0.55894 23.8966 0.574127 23.9038C0.588518 23.9106 0.602674 23.9177 0.617393 23.9238C0.632159 23.9299 0.647206 23.9348 0.662206 23.9402C0.678003 23.9459 0.693612 23.952 0.709784 23.9569C0.724784 23.9614 0.740019 23.9648 0.755159 23.9685C0.771612 23.9727 0.787878 23.9773 0.804659 23.9806C0.822238 23.9841 0.839956 23.9862 0.857628 23.9887C0.872207 23.9908 0.886597 23.9936 0.901363 23.995C0.934176 23.9983 0.967082 24 0.999988 24H8.00005C8.55233 24 9.00004 23.5523 9.00004 23C9.00004 22.4477 8.55233 22 8.00005 22H3.41425L10.7072 14.7071C11.0977 14.3166 11.0977 13.6834 10.7072 13.2929C10.3167 12.9023 9.68348 12.9024 9.29291 13.293Z" />
            </motion.svg>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {hoverStates.nextWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              transition={{
                duration: 0.3,
              }}
              className={`relative text100 text-blackCustom flex items-center`}
            >
              <div className="w-2 h-2 rounded-full mr-2 bg-blackCustom" />
              Next Work
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DotCursor;
