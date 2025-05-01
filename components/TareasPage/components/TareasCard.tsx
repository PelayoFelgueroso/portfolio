"use client";

import Image from "next/image";
import styles from "../style.module.scss";

interface Props {
  title: string;
  featured_image: string;
  slug: string;
}

export const TareasCard = ({ title, featured_image, slug }: Props) => {
  return (
    <a
      target="_blank"
      href={`/tareas-conquer/${slug}`}
      className={`${styles.resource_wrapper} flex flex-col justify-between w-full overflow-hidden rounded-lg text-black p-2 max-w-[400px] border-[1px] border-grayCustom bg-white resource-card`}
    >
      <div
        className={`h-[200px] rounded-lg overflow-hidden relative ${styles.top_wrapper}`}
      >
        <Image
          src={featured_image}
          width={300}
          height={300}
          alt="title"
          className={`object-cover w-full h-full ${styles.image}`}
        />
      </div>

      <div className="flex flex-col justify-end h-fit  z-20 px-5 py-[18px] lg:p-[14px]">
        <h3 className="mt-[.8rem] mb-[.3rem] text300">{title}</h3>
      </div>
    </a>
  );
};
