import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface Props {
  children: string;
  className?: string;
}

export const BlurryScrollText = ({ children, className }: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 1", "start 0.85"],
  });

  const words = children.split(" ");

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const overlap = 0.25;

  return (
    <div
      ref={container}
      className={`${className} flex flex-wrap items-baseline`}
    >
      {words.map((word, i) => {
        const total = words.length;
        const start = clamp(i / total - overlap, 0, 1);
        const end = clamp((i + 1) / total + overlap, 0, 1);

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
}

const Word = ({ children, progress, range }: WordProps) => {
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
};
