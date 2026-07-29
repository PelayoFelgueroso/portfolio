import { motion } from "framer-motion";
import React from "react";
import { blurryChar } from "./anim";

interface Props {
  text: string;
}

// Valores constantes fuera del componente para evitar recreaciones
const Y_VALUES = [30, -30, 20, -20, 25, -25] as const;

// Funciones puras fuera del componente
const getRandomYValue = () => {
  const randomIndex = Math.floor(Math.random() * Y_VALUES.length);
  return Y_VALUES[randomIndex];
};

const getRandomDelay = () => Math.random() * 0.3;

export const BlurryHoverText = React.memo(({ text }: Props) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        return <Word key={i}>{word}</Word>;
      })}
    </>
  );
});

BlurryHoverText.displayName = "BlurryHoverText";

interface WordProps {
  children: string;
}

const Word = React.memo(({ children }: WordProps) => {
  const chars = children.split("");

  return (
    <motion.span className="inline-block mr-1.5 last:mr-0">
      {chars.map((char, i) => (
        <Char key={i}>{char}</Char>
      ))}
    </motion.span>
  );
});

Word.displayName = "Word";

interface charProps {
  children: string;
}

const Char = ({ children }: charProps) => {
  return (
    <motion.span
      variants={blurryChar(getRandomYValue())}
      initial="initial"
      animate="open"
      exit="close"
      transition={{ duration: 0.5, delay: getRandomDelay() }}
      style={{ willChange: "opacity, filter, transform" }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};
