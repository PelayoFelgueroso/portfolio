"use client";

import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface InViewContactType {
  inViewContact: boolean;
  setInViewContact: React.Dispatch<SetStateAction<boolean>>;
}

export const InViewContact = createContext<InViewContactType | undefined>(undefined);

export const InViewContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inViewContact, setInViewContact] = useState<boolean>(false);

  return (
    <InViewContact.Provider value={{ inViewContact, setInViewContact }}>
      {children}
    </InViewContact.Provider>
  );
};

export const useInViewContact = (): InViewContactType => {
  const context = useContext(InViewContact);
  if (!context)
    throw new Error("useInViewContact debe usarse dentro de InViewContactProvider");
  return context;
};
