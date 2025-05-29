import { FormattedCategory } from "@/models/Category";
import { Tarea } from "@/models/tareas-conquer";
import { create } from "zustand";

export interface useTareaType {
  tareas: Tarea[];
  categories: FormattedCategory[];
  fetchTareas: () => void;
  loading: boolean;
  error: Error | null;
}

const useTareaStore = create((set) => ({
  tareas: [],
  categories: [],
  loading: false,
  error: null,
  fetchTareas: async () => {
    set({ loading: true });
    try {
      const resTareas = await fetch(
        "/api/admin/tareas-conquer/posts"
      );
      const dataTareas = await resTareas.json();

      const resCategories = await fetch(
        "/api/admin/tareas-conquer/categories"
      );
      const dataCategories = await resCategories.json();

      set({
        tareas: dataTareas,
        categories: dataCategories,
        loading: false,
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useTareaStore;
