"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TareasContainer } from "./components/TareasContainer";
import useTareaStore, { useTareaType } from "@/store/useTareaStore";

export const TareasPage = () => {
  const { tareas, fetchTareas, loading } = useTareaStore() as useTareaType;
  const [filteredTareas, setFilteredTareas] = useState(tareas);
  const container = useRef(null);

  useEffect(() => {
    fetchTareas();
  }, []);

  useEffect(() => {
    setFilteredTareas(tareas);
  }, [tareas]);

  return (
    <>
      <section
        ref={container}
        id="resources"
        className="relative pb-[200px] px-4"
      >
        <div className="perspective-distant w-full xl:max-w-[1600px] mx-auto min-h-[75vh]">
          <motion.div
            className={`perspective-distant relative grid-18 _1row p-3 rounded-lg gap-3 flex-col md:flex-row`}
            style={{
              willChange: "opacity",
            }}
          >
            <AnimatePresence mode="wait">
              {!loading && (
                <TareasContainer
                  tareas={tareas}
                  filteredTareas={filteredTareas}
                  onFilterChange={setFilteredTareas}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};
