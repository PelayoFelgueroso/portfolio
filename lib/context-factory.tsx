"use client";

import React, { createContext, useContext, useState, SetStateAction } from "react";

/**
 * Factory genérico para crear contextos simples de estado booleano
 * Elimina la duplicación de InViewBio, InViewContact, CursorHover
 */
export function createBooleanContext<T extends string>(contextName: T) {
  type ContextType = {
    [K in T]: boolean;
  } & {
    [K in `set${Capitalize<T>}`]: React.Dispatch<SetStateAction<boolean>>;
  };

  const Context = createContext<ContextType | undefined>(undefined);

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [value, setValue] = useState<boolean>(false);

    const contextValue = {
      [contextName]: value,
      [`set${contextName.charAt(0).toUpperCase() + contextName.slice(1)}`]: setValue,
    } as ContextType;

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  const useContextHook = (): ContextType => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `use${contextName.charAt(0).toUpperCase() + contextName.slice(1)} debe usarse dentro de ${
          contextName.charAt(0).toUpperCase() + contextName.slice(1)
        }Provider`
      );
    }
    return context;
  };

  return {
    Provider,
    useContext: useContextHook,
  };
}

// Creación de contextos específicos usando el factory
export const InViewBioContext = createBooleanContext("inViewBio");
export const InViewContactContext = createBooleanContext("inViewContact");
export const CursorHoverContext = createBooleanContext("cursorHover");

// Exports para mantener compatibilidad
export const InViewBioProvider = InViewBioContext.Provider;
export const useInViewBio = InViewBioContext.useContext;

export const InViewContactProvider = InViewContactContext.Provider;
export const useInViewContact = InViewContactContext.useContext;

export const CursorHoverProvider = CursorHoverContext.Provider;
export const useCursorHover = CursorHoverContext.useContext;
