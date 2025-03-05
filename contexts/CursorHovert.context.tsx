"use client";

import React, { createContext, useContext, useState } from "react";

interface CursorHoverType {
  cursorHover: boolean;
  setCursorHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CursorHover = createContext<CursorHoverType | undefined>(
  undefined
);

export const CursorHoverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cursorHover, setCursorHover] = useState<boolean>(false);

  return (
    <CursorHover.Provider value={{ cursorHover, setCursorHover }}>
      {children}
    </CursorHover.Provider>
  );
};

export const useCursorHover = (): CursorHoverType => {
  const context = useContext(CursorHover);
  if (!context)
    throw new Error("useCursorHover debe usarse dentro de CursorHoverProvider");
  return context;
};
