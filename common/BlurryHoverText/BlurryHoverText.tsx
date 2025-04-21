import { motion } from "framer-motion";
import React from "react";
import { blurryChar } from "./anim";

interface Props {
  text: string;
}

export const BlurryHoverText = ({ text }: Props) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        return <Word key={i}>{word}</Word>;
      })}
    </>
  );
};

interface WordProps {
  children: string;
}

const Word = ({ children }: WordProps) => {
  const chars = children.split("");

  return (
    <motion.span className="inline-block mr-1.5 last:mr-0">
      {chars.map((char, i) => (
        <Char key={i}>{char}</Char>
      ))}
    </motion.span>
  );
};

interface charProps {
  children: string;
}

const Char = ({ children }: charProps) => {
  const y = () => {
    const values = [30, -30, 20, -20, 25, -25];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  };

  const delay = () => {
    return Math.random() * 0.3;
  };

  return (
    <motion.span
      variants={blurryChar(y())}
      initial="initial"
      animate="open"
      exit="close"
      transition={{ duration: 0.5, delay: delay() }}
      style={{ willChange: "opacity, filter, transform" }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};
