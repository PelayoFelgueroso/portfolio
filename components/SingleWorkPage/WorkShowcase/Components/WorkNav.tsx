"use client";

import { HoverLinkAnim } from "@/common/HoverLinkAnim/HoverLinkAnim";
import { Magnetic } from "@/common/Magnetic/Magnetic";
import { Work } from "@/models/work";
import { useState } from "react";

interface Props {
  prevWork: Work;
  nextWork: Work;
}

export const WorkNav = ({ prevWork, nextWork }: Props) => {
  const [isHoveredNext, setIsHoveredNext] = useState(false);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);

  return (
    <div className="absolute z-[500] bottom-0 left-0 right-0 w-full flex items-end p-[clamp(12px,_1vw,_18px)]">
      <div className="w-full flex justify-start items-start gap-6">
        <Magnetic max={2}>
          <a
            onMouseEnter={() => setIsHoveredPrev(true)}
            onMouseLeave={() => setIsHoveredPrev(false)}
            href={`/works/${prevWork.slug}`}
            className="cursor-pointer relative max-w-full inline-block"
          >
            <div className="text100 text-darkBlueCustom">{prevWork.title}</div>
            <div className="relative text100 text-darkGray">
              <HoverLinkAnim isHovered={isHoveredPrev}>
                Prev Project
              </HoverLinkAnim>
            </div>
          </a>
        </Magnetic>
      </div>

      <div className="w-full flex justify-end items-start gap-6">
        <Magnetic max={2}>
          <a
            onMouseEnter={() => setIsHoveredNext(true)}
            onMouseLeave={() => setIsHoveredNext(false)}
            href={`/works/${nextWork.slug}`}
            className="cursor-pointer relative max-w-full inline-block"
          >
            <div className="text100 text-darkBlueCustom">{nextWork.title}</div>
            <div className="relative text100 text-darkGray">
              <HoverLinkAnim isHovered={isHoveredNext}>
                Next Project
              </HoverLinkAnim>
            </div>
          </a>
        </Magnetic>
      </div>
    </div>
  );
};
