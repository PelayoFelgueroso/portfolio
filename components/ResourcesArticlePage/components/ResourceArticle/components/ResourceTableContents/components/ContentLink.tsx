"use client";

import Link from "next/link";
import { useCallback } from "react";

interface Props {
  item: string;
}

export const ContentLink = ({ item }: Props) => {
  const title = item.replace(/-/g, " ");

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = e.currentTarget.getAttribute("href")?.substring(1);
    const targetElement = document.getElementById(targetId || "");

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <p className="text-darkBlueCustom text-[14px] cursor-pointer capitalize">
      <Link href={`#${item}`} onClick={handleClick}>
        {title}
      </Link>
    </p>
  );
};
