"use client";

import { FormattedResource } from "@/models/resource";
import { Category, getCategories } from "@/services/categories.service";
import { getFormattedResources } from "@/services/resources.service";
import { createContext, useContext, useEffect, useState } from "react";

interface ResourcesContextType {
  resources: FormattedResource[];
  loadingResources: boolean;
  categories: Category[];
  loadingCategories: boolean;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<FormattedResource[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

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

    const fetchCategories = async () => {
      const storedCategories = sessionStorage.getItem("cachedCategories");

      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
        setLoadingCategories(false);
      } else {
        const data = await getCategories();
        sessionStorage.setItem("cachedCategories", JSON.stringify(data));
        setCategories(data);
        setLoadingCategories(false);
      }
    };

    fetchResources();
    fetchCategories();
  }, []);

  return (
    <ResourcesContext.Provider
      value={{ categories, loadingCategories, resources, loadingResources }}
    >
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
