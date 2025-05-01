"use client";

import { FormattedTarea } from "@/models/tareas-conquer";
import { getFormattedTareas } from "@/services/tareas-conquer.service";
import { createContext, useContext, useEffect, useState } from "react";

interface TareasContextType {
  tareas: FormattedTarea[];
  loadingTareas: boolean;
}

const TareasContext = createContext<TareasContextType | undefined>(undefined);

export function TareasProvider({ children }: { children: React.ReactNode }) {
  const [tareas, setTareas] = useState<FormattedTarea[]>([]);
  const [loadingTareas, setLoadingTareas] = useState(true);

  useEffect(() => {
    const fetchTareas = async () => {
      const data = await getFormattedTareas();
      setTareas(data);
      setLoadingTareas(false);
    };

    fetchTareas();
  }, []);

  return (
    <TareasContext.Provider value={{ tareas, loadingTareas }}>
      {children}
    </TareasContext.Provider>
  );
}

export function useTareas() {
  const context = useContext(TareasContext);
  if (!context)
    throw new Error("useTareas debe usarse dentro de TareasProvider");
  return context;
}
