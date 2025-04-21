"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ResourcesMenuType {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export const ResourcesMenuContext = createContext<
  ResourcesMenuType | undefined
>(undefined);

export const ResourcesMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <ResourcesMenuContext.Provider value={{ isOpenMenu, setIsOpenMenu }}>
      {children}
    </ResourcesMenuContext.Provider>
  );
};

export const useResourcesMenu = (): ResourcesMenuType => {
  const context = useContext(ResourcesMenuContext);
  if (!context)
    throw new Error(
      "useResourcesMenu debe usarse dentro de ResourcesMenuProvider"
    );
  return context;
};
