import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface Props {
  image: string;
  scrollProgress: MotionValue<number>;
  index: number;
  totalItems: number;
}

export const WorkBg = ({ image, scrollProgress, index, totalItems }: Props) => {
  const rangeStart = (index - 1) / (totalItems - 1);
  const rangeEnd = index / (totalItems - 1);

  const y = useTransform(
    scrollProgress,
    [rangeStart, rangeEnd],
    [`-${index * 100 - 100 > 0 ? index * 100 - 100 : 0}%`, `-${index * 100}%`]
  );

  return (
    <motion.div
      className="relative h-screen w-full flex justify-center items-center bg-blackCustom overflow-hidden"
      style={{
        willChange: "transform, opacity",
        y,
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div className="realtive w-full h-full scale-[1.03]">
          <Image
            src={image}
            width={1920}
            height={1080}
            alt="Image"
            className="w-full h-full relative z-100 object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};
