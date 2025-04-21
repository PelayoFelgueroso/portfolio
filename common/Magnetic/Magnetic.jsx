import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const Magnetic = ({ children, max }) => {
  const magnetic = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 3,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 3,
      ease: "power2.out",
    });

    magnetic.current.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * max);
      yTo(y * max);
    });
    magnetic.current.addEventListener("mouseleave", (e) => {
      xTo(0);
      yTo(0);
    });
  }, []);

  return React.cloneElement(children, { ref: magnetic });
};
