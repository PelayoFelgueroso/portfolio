import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef, useMemo, useCallback } from "react";

interface Props {
  children: string;
  className?: string;
}

// Función de clamp fuera del componente para evitar recreaciones
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const OVERLAP = 0.25;

export const BlurryScrollText = React.memo(({ children, className }: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 1", "start 0.85"],
  });

  const words = useMemo(() => children.split(" "), [children]);

  const wordRanges = useMemo(() => {
    const total = words.length;
    return words.map((word, i) => ({
      word,
      range: [clamp(i / total - OVERLAP, 0, 1), clamp((i + 1) / total + OVERLAP, 0, 1)],
    }));
  }, [words]);

  return (
    <div
      ref={container}
      className={`${className} flex flex-wrap items-baseline`}
    >
      {wordRanges.map(({ word, range }, i) => (
        <Word key={i} progress={scrollYProgress} range={range}>
          {word}
        </Word>
      ))}
    </div>
  );
});

BlurryScrollText.displayName = "BlurryScrollText";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
}

const Word = React.memo(({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  const y = useTransform(progress, range, ["10px", "0px"]);

  return (
    <motion.span
      style={{ willChange: "opacity, filter, transform", opacity, filter, y }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
});

Word.displayName = "Word";
