"use client";

import { FormattedProject } from "@/models/project";
import { getFormattedProjects } from "@/services/projects.service";
import { createContext, useContext, useEffect, useState } from "react";

interface ProjectsContextType {
  projects: FormattedProject[];
  loadingProjects: boolean;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<FormattedProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getFormattedProjects();
      setProjects(data);
      setLoadingProjects(false);
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loadingProjects }}>
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
