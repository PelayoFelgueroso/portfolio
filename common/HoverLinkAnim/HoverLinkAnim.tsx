import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { hoverAnimUp, hoverAnimDown } from "./anim";
import { Magnetic } from "../Magnetic/Magnetic";

interface HoverLinkAnimProps {
  children: string;
  isHovered: boolean;
  magnetic?: boolean;
}

export const HoverLinkAnim = React.memo(({
  children,
  isHovered,
  magnetic = false,
}: HoverLinkAnimProps) => {
  const chars = useMemo(() => children.split(""), [children]);

  const charElements = useMemo(
    () =>
      chars.map((char, i) => {
        const normalizedChar = char === " " ? "\u00A0" : char;
        const delay = i * 0.05;
        return {
          char: normalizedChar,
          delay,
          key: i,
        };
      }),
    [chars]
  );

  return (
    <>
      <div className="relative">
        <span className="overflow-hidden block">
          {charElements.map(({ char, delay, key }) => (
            <CharUp key={key} isHovered={isHovered} delay={delay}>
              {char}
            </CharUp>
          ))}
        </span>
      </div>
      {magnetic ? (
        <Magnetic max={2}>
          <div className="absolute top-0">
            <span className="overflow-hidden block">
              {charElements.map(({ char, delay, key }) => (
                <CharDown key={key} isHovered={isHovered} delay={delay}>
                  {char}
                </CharDown>
              ))}
            </span>
          </div>
        </Magnetic>
      ) : (
        <div className="absolute top-0">
          <span className="overflow-hidden block">
            {charElements.map(({ char, delay, key }) => (
              <CharDown key={key} isHovered={isHovered} delay={delay}>
                {char}
              </CharDown>
            ))}
          </span>
        </div>
      )}
    </>
  );
});

HoverLinkAnim.displayName = "HoverLinkAnim";

interface CharProps {
  children: string;
  isHovered: boolean;
  delay: number;
}

export const CharUp = React.memo(({
  children,
  isHovered,
  delay,
}: CharProps) => {
  return (
    <motion.div
      variants={hoverAnimUp(delay)}
      initial="initial"
      animate={isHovered ? "onHover" : "initial"}
      style={{ willChange: "filter, transform" }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
});

CharUp.displayName = "CharUp";

export const CharDown = React.memo(({
  children,
  isHovered,
  delay,
}: CharProps) => {
  return (
    <motion.div
      variants={hoverAnimDown(delay)}
      initial="initial"
      animate={isHovered ? "onHover" : "initial"}
      style={{ willChange: "filter, transform" }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
});

CharDown.displayName = "CharDown";
