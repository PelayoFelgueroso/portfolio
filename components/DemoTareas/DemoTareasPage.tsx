"use client";

import useTareaStore, { useTareaType } from "@/store/useTareaStore";


interface Props {
  slug: string;
}

export const DemoTareasPage = ({ slug }: Props) => {
  const { tareas } = useTareaStore() as useTareaType;

  const tarea = tareas.find((tarea) => tarea.slug === slug);

  if (!tarea) {
    return <p>Recurso no encontrado</p>;
  }

  return <div dangerouslySetInnerHTML={{ __html: tarea.content }} />;
};
