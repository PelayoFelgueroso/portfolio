"use client";

import { Resource } from "@/models/resource";
import { createContext, useContext } from "react";

const ResourcesContext = createContext<Resource[] | null>(null);

export function ResourcesProvider({
  resources,
  children,
}: {
  resources: Resource[];
  children: React.ReactNode;
}) {
  return (
    <ResourcesContext.Provider value={resources}>
      {children}
    </ResourcesContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourcesContext);
  if (!context)
    throw new Error("useResources debe usarse dentro de ResourcesProvider");
  return context;
}
