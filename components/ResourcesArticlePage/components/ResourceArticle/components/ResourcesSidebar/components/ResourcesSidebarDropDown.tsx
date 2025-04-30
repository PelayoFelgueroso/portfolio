'use client';

import { FormattedResource } from "@/models/resource";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  resources: FormattedResource[];
}

export const ResourcesSidebarDropDown = ({ title, resources }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [height, setHeight] = useState<number | null>(null);
  const dropfownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dropfownRef.current) {
      setHeight(isOpen ? dropfownRef.current.scrollHeight : 0);
    }
  }, [isOpen, resources]);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <div onClick={toggleIsOpen} className="cursor-pointer flex items-center">
        <h3 className="text-[16px] m-0 text-[#70b28]">{title}</h3>
        <ChevronRight
          className="w-3 h-3 ml-3 transition-all duration-500"
          style={
            isOpen
              ? { transform: "rotate(90deg)" }
              : { transform: "rotate(0deg)" }
          }
        />
      </div>
      <div
        ref={dropfownRef}
        className={`transition-[height] duration-1000 ease-in-out overflow-hidden`}
        style={isOpen ? { height: `${height}px` } : { height: "0px" }}
      >
        {resources.map((item) => (
          <a key={item.id} href={`/resources/${item.slug}/`} className="">
            <p className="m-0 px-[10px] py-[5px] rounded-[10px] text-[14px] text-[#4f576c]">
              {item.title.rendered}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};
