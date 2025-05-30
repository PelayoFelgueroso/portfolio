import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
}

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const useOutsideClick = (
  callback: (event: MouseEvent | TouchEvent) => void,
  ref: React.RefObject<HTMLDivElement | null>,
  ref2?: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        (ref.current && ref.current.contains(event.target as Node)) ||
        (ref2?.current && ref2.current.contains(event.target as Node))
      ) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, ref2, callback]);
};

export const formatDate = (date: number) => {
  const dateString = date.toString();
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);

  const formattedDate = new Date(year, month - 1, day);

  const monthName = formattedDate.toLocaleString("en-US", { month: "long" });

  return `${monthName}, ${year}`;
};
