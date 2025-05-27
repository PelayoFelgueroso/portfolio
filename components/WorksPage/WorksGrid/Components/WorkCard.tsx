import { useHasHover } from "@/hooks/user-has-hover";
import { CloudinaryImage } from "@/schemas/edit-post.schema";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  slug: string;
  title: string;
  niche: string;
  bg: CloudinaryImage;
  image: CloudinaryImage;
  date: string;
}

export const WorkCard = ({ slug, title, niche, bg, image, date }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [titleWidth, setTitleWidth] = useState(0);
  const [nicheWidth, setNicheWidth] = useState(0);
  const hasHover = useHasHover();

  const titleRef = useRef<HTMLParagraphElement>(null);
  const nicheRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (hasHover && titleRef.current && nicheRef.current) {
      setTitleWidth(titleRef.current.scrollWidth);
      setNicheWidth(nicheRef.current.scrollWidth);
    }
  }, [title, niche, hasHover]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 m-[5px] w-[calc(100%_-_10px)] md:w-[calc(50%_-_10px)] before:pt-[100%] 2md:before:pt-[90%] before:float-left rounded-lg overflow-hidden work-bg"
    >
      <a href={`/works/${slug}`} className="absolute z-[1000] w-full h-full" />
      <div className="w-full h-full cursor-pointer">
        <div className="absolute z-100 top-0 left-0 mx-auto w-full h-full flex justify-center items-center rounded-sm overflow-hidden">
          <div className="relative z-100 w-full h-full overflow-hidden 2md:scale-[1.03]">
            <Image
              src={bg.url}
              width={1000}
              height={1000}
              alt={title}
              className="relative w-full h-full object-cover"
            />
          </div>

          <Image
            src={bg.url}
            width={1000}
            height={1000}
            alt={title}
            className="absolute opacity-0"
          />

          <div className="absolute z-[200] w-[40%] path-work-img rounded-sm shadow-2xs overflow-hidden before:float-left before:pt-[100%]">
            <Image
              src={image.url}
              width={1000}
              height={1000}
              alt={title}
              className="absolute w-full h-full object-cover transition-all duration-[0.45]"
            />
          </div>
        </div>

        <div className="absolute z-200 left-0 top-0 w-full h-full flex justify-between items-end 2md:items-center px-[30px] py-[5px] 2md:py-[25px] 2md:opacity-0 work-card-text">
          <div className="transition-all duration-[0.15] ease-out">
            {hasHover ? (
              <motion.p
                initial={{ width: 0 }}
                animate={isHovered ? { width: titleWidth } : { width: 0 }}
                transition={{ type: "spring", duration: 0.45 }}
                className="text300 text-whiteCustom text-nowrap overflow-hidden"
              >
                {title}
              </motion.p>
            ) : (
              <p className="text200 text-whiteCustom text-nowrap overflow-hidden">
                {title}
              </p>
            )}
          </div>

          <div className="transition-all duration-[0.15] ease-out">
            {hasHover ? (
              <motion.p
                initial={{ width: 0 }}
                animate={isHovered ? { width: nicheWidth } : { width: 0 }}
                transition={{ type: "spring", duration: 0.45 }}
                className="text300 text-whiteCustom text-nowrap overflow-hidden"
              >
                {niche}
              </motion.p>
            ) : (
              <p className="text200 text-whiteCustom text-nowrap overflow-hidden">
                {niche}
              </p>
            )}
          </div>

          <div className="absolute invisible w-auto whitespace-nowrap pointer-events-none">
            <p ref={titleRef} className="text300">
              {title}
            </p>
            <p ref={nicheRef} className="text300">
              {niche}
            </p>
          </div>

          <div className="2md:hidden absolute top-[30px] left-[30px] px-[10px] py-[2px] bg-blackCustom rounded-sm">
            <span className="text100 text-whiteCustom">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
