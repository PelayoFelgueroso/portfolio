import { HoverLinkAnim } from "@/common/HoverLinkAnim/HoverLinkAnim";
import { useState } from "react";

interface Props {
  href: string;
  children: string;
  className: string;
  download?: boolean;
}

export const FooterLink = ({
  href,
  children,
  className,
  download = false,
}: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={href}
      target="_blank"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer ${className}`}
      download={download}
    >
      <HoverLinkAnim isHovered={isHovered}>{children}</HoverLinkAnim>
    </a>
  );
};
