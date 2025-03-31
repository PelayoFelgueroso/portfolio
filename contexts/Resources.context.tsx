"use client";

import { FormattedResource } from "@/models/resource";
import { getFormattedResources } from "@/services/resources.service";
import { createContext, useContext, useEffect, useState } from "react";

interface ResourcesContextType {
  resources: FormattedResource[];
  loadingResources: boolean;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<FormattedResource[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const storedResources = sessionStorage.getItem("cachedResources");

      if (storedResources) {
        setResources(JSON.parse(storedResources));
        setLoadingResources(false);
      } else {
        const data = await getFormattedResources();
        sessionStorage.setItem("cachedResources", JSON.stringify(data));
        setResources(data);
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <ResourcesContext.Provider value={{ resources, loadingResources }}>
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
