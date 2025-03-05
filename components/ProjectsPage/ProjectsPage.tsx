import { projects } from "@/content";
import { ProjectCard } from "./components/ProjectCard";
import styles from "./style.module.scss";
import Image from "next/image";

export const ProjectsPage = () => {
  return (
    <section className={styles.projectsSection}>
      <div className={styles.projectsCardsContainer}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            img={project.img}
            title={project.title}
            slug={project.slug}
          />
        ))}
      </div>
      <div className="fixed left-0 top-0 w-full h-lvh -z-[1] mix-blend-difference text-white pointer-events-none overflow-clip p-sides flex items-center justify-center">
        <h2 className="title text-2xl uppercase">[Projects]</h2>
      </div>
      <div className="hidden md:block fixed inset-0 -z-[2] pointer-events-none overflow-clip">
        {projects.map((project) => (
          <Image
            key={project.id}
            src={project.img}
            alt={project.title}
            className="size-full object-cover absolute blur-[32px] scale-125 opacity-0 data-[active='true']:opacity-100 transition-opacity duration-1000 ease-out-cubic"
          />
        ))}
      </div>
    </section>
  );
};
