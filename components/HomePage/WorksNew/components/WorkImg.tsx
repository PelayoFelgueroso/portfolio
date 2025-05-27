import { motion, MotionValue, useTransform } from "framer-motion";

interface Props {
  image: string;
  slug: string;
  scrollProgress: MotionValue<number>;
  index: number;
  totalItems: number;
}

export const WorkImg = ({
  image,
  slug,
  scrollProgress,
  index,
  totalItems,
}: Props) => {
  const rangeStart = (index - 1) / (totalItems - 1);
  const rangeEnd = index / (totalItems - 1);

  const y = useTransform(
    scrollProgress,
    [rangeStart, rangeEnd],
    [`-${index * 100 - 100 > 0 ? index * 100 - 100 : 0}%`, `-${index * 100}%`]
  );

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ willChange: "transform, opacity", y }}
    >
      <div className="relative w-full h-full">
        <motion.img
          loading="lazy"
          src={image}
          alt="Image"
          className="relative w-full h-full object-cover"
        />
      </div>

      <a href={`/works/${slug}`} className="absolute w-full h-full" />
    </motion.div>
  );
};
