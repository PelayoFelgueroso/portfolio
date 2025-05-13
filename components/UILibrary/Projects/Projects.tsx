"use client";

import styles from "./style.module.scss";
import { Rounded } from "@/common/RoundedButton/RoundedButton";
import { Project } from "./components/Project";

const projects = [
 {
  id: 0,
  slug: "project-1",
  title: "Charo Nieto",
  image: "http://res.cloudinary.com/difdtgohp/image/upload/v1746811698/cdzd5yap6iynegnorlpq.webp",
 },
 {
  id: 1,
  slug: "project-2",
  title: "Charo Nieto",
  image: "http://res.cloudinary.com/difdtgohp/image/upload/v1746811698/cdzd5yap6iynegnorlpq.webp",
 },
 {
  id: 2,
  slug: "project-3",
  title: "Charo Nieto",
  image: "http://res.cloudinary.com/difdtgohp/image/upload/v1746811698/cdzd5yap6iynegnorlpq.webp",
 },
 {
  id: 3,
  slug: "project-4",
  title: "Charo Nieto",
  image: "http://res.cloudinary.com/difdtgohp/image/upload/v1746811698/cdzd5yap6iynegnorlpq.webp",
 }
]

export const Projects = () => {
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
              title={project.title}
              featured_image={project.image}
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
