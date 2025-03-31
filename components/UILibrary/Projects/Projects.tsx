'use client';

import styles from "./style.module.scss";
import { Rounded } from "@/common/RoundedButton/RoundedButton";
import { Project } from "./components/Project";
import { useProjects } from "@/contexts/Projects.context";

export const Projects = () => {
  const {projects} = useProjects();

  return (
    <section className={styles.projects}>
      <div className="w-full flex pb-[50px]">
        <div className="pl-[150px] w-[70%] relative block">
          <h2>Recent Work</h2>
        </div>
      </div>
      <div className={styles.body}>
        {projects.map((project) => {
          return (
            <Project
              key={project.id}
              slug={project.slug}
              title={project.title.rendered}
              featured_image={project.featured_image}
            />
          );
        })}
      </div>
      <Rounded>
        <p>More work</p>
      </Rounded>
    </section>
  );
};
