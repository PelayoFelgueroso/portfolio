import { FormattedCategory } from "@/models/Category";
import { Resource } from "@/models/resource";
import { create } from "zustand";

export interface useResourceType {
  resources: Resource[];
  categories: FormattedCategory[];
  fetchResources: () => void;
  loading: boolean;
  error: Error | null;
}

const useResourceStore = create((set) => ({
  resources: [],
  categories: [],
  loading: false,
  error: null,
  fetchResources: async () => {
    set({ loading: true });
    try {
      const resResources = await fetch("/api/admin/resources/posts", {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      const dataResources = await resResources.json();

      const resCategories = await fetch("/api/admin/resources/categories", {
        cache: "force-cache",
        next: { revalidate: 3600 },
      });
      const dataCategories = await resCategories.json();

      set({
        resources: dataResources,
        categories: dataCategories,
        loading: false,
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useResourceStore;
