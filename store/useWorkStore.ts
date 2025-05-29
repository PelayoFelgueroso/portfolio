import { Work } from "@/models/work";
import { create } from "zustand";

export interface UseWorkStoreType {
  works: Work[];
  fetchWorks: () => void;
  loading: boolean;
  error: Error | null;
}

const useWorkStore = create((set) => ({
  works: [],
  loading: false,
  error: null,
  fetchWorks: async () => {
    set({ loading: true });
    try {
      const res = await fetch(
        "/api/admin/works/posts"
      );
      const data = await res.json();
      set({ works: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useWorkStore;
