"use client";

import { FormattedProject } from "@/models/project";
import { createContext, useContext } from "react";

const ProjectsContext = createContext<FormattedProject[] | null>(null);

export function ProjectsProvider({
  projects,
  children,
}: {
  projects: FormattedProject[];
  children: React.ReactNode;
}) {
  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context)
    throw new Error("useProjects debe usarse dentro de ProjectsProvider");
  return context;
}
