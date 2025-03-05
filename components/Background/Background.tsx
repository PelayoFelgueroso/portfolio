"use client";

import React, { ReactNode, useEffect } from "react";
import grained from "./grained";

interface Props {
  children?: ReactNode;
}

export const GrainEffect: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const options = {
      animate: true,
      patternWidth: 350.4,
      patternHeight: 350.4,
      grainOpacity: 0.1,
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1,
    };

    grained("grain-container", options);
  }, []);

  return (
    <div
      id="grain-container"
      className="relative overflow-hidden w-full h-full z-10"
    >
      {children}
    </div>
  );
};
