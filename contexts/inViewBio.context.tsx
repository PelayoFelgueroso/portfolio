"use client";

import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface InViewBioType {
  inViewBio: boolean;
  setInViewBio: React.Dispatch<SetStateAction<boolean>>;
}

export const InViewBio = createContext<InViewBioType | undefined>(undefined);

export const InViewBioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inViewBio, setInViewBio] = useState<boolean>(false);

  return (
    <InViewBio.Provider value={{ inViewBio, setInViewBio }}>
      {children}
    </InViewBio.Provider>
  );
};

export const useInViewBio = (): InViewBioType => {
  const context = useContext(InViewBio);
  if (!context)
    throw new Error("useInViewBio debe usarse dentro de InViewBioProvider");
  return context;
};
