import { motion } from "framer-motion";
import { hoverAnimUp, hoverAnimDown } from "./anim";
import { Magnetic } from "../Magnetic/Magnetic";

export const HoverLinkAnim = ({
  children,
  isHovered,
  magnetic = false,
}: {
  children: string;
  isHovered: boolean;
  magnetic?: boolean;
}) => {
  const chars = children.split("");

  return (
    <>
      <div className="relative">
        <span className="overflow-hidden block">
          {chars.map((char, i) => (
            <CharUp key={i} isHovered={isHovered} delay={i * 0.05}>
              {char === " " ? "\u00A0" : char}
            </CharUp>
          ))}
        </span>
      </div>
      {magnetic ? (
        <Magnetic max={2}>
          <div className="absolute top-0">
            <span className="overflow-hidden block">
              {chars.map((char, i) => (
                <CharDown key={i} isHovered={isHovered} delay={i * 0.05}>
                  {char === " " ? "\u00A0" : char}
                </CharDown>
              ))}
            </span>
          </div>
        </Magnetic>
      ) : (
        <div className="absolute top-0">
          <span className="overflow-hidden block">
            {chars.map((char, i) => (
              <CharDown key={i} isHovered={isHovered} delay={i * 0.05}>
                {char === " " ? "\u00A0" : char}
              </CharDown>
            ))}
          </span>
        </div>
      )}
    </>
  );
};

export const CharUp = ({
  children,
  isHovered,
  delay,
}: {
  children: string;
  isHovered: boolean;
  delay: number;
}) => {
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
};

export const CharDown = ({
  children,
  isHovered,
  delay,
}: {
  children: string;
  isHovered: boolean;
  delay: number;
}) => {
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
};
