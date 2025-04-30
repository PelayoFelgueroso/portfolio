import { HoverLinkAnim } from "@/common/HoverLinkAnim/HoverLinkAnim";
import { useState } from "react";

interface Props {
  href: string;
  title: string;
}

export const DesktopNavLink = ({ href, title }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li>
      <a
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`text200 ${
          title.length > 7 ? "link-hover-wider" : "link-hover"
        } inline-block relative`}
      >
        <HoverLinkAnim isHovered={isHovered} magnetic={true}>
          {title}
        </HoverLinkAnim>
      </a>
    </li>
  );
};
