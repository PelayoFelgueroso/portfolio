"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Props {
  title: string;
  short_description: string;
  featured_image: string;
  featured_video: string;
  categories: number[];
  slug: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const PageCard = ({
  title,
  short_description,
  featured_image,
  featured_video,
  categories,
  slug,
}: Props) => {
  const video = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
    video.current?.play();
  };

  const handleNoHover = () => {
    setIsHovered(false);
    video.current?.pause();
  };

  return (
    <motion.div
      onMouseEnter={handleHover}
      onMouseLeave={handleNoHover}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col justify-between w-full overflow-hidden rounded-2xl bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="h-[220px] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10" />

        <Image
          src={featured_image || "/placeholder.svg"}
          width={400}
          height={300}
          alt={title}
          className={`object-cover w-full h-full transition-opacity duration-700 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        <video
          ref={video}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          width="100%"
          height="auto"
          loop
          muted
          playsInline
        >
          <source src={featured_video} type="video/mp4" />
          Your browser does not support videos.
        </video>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 z-20"
        >
          <Link
            target="_blank"
            href={`/resources/demos/${slug}`}
            className="rounded-full flex justify-center items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg"
          >
            Demo
            <ExternalLink className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col justify-between flex-grow p-5">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category, index) => (
              <span
                key={index}
                className="w-fit uppercase text-[0.65rem] font-medium border border-gray-200 px-2 py-1 rounded-full bg-gray-50 text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>

          <h3 className="font-bold text-[1.25rem] mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-[0.9rem] text-gray-600 line-clamp-3">
            {truncateText(short_description, 100)}
          </p>
        </div>

        <Link
          href={`/resources/${slug}`}
          className="mt-4 inline-block text-blue-500 font-medium text-sm hover:text-blue-700 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
};
