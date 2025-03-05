"use client";
import styles from "./style.module.scss";
import { ResourceCard } from "./components/Card";

export type GridCardProps = {
  slug: string;
  image: string;
  video: string;
  date: string;
  category: string;
  title: string;
  description: string;
};

type Props = {
  className?: string;
  cards: GridCardProps[];
};

export const ResourcesGrid = ({ className, cards = [] }: Props) => {
  return (
    <section className={`${styles.resources_section} ${className}`}>
      <div className="w-full flex pb-[50px]">
        <div className="pl-[150px] w-[70%] relative block">
          <h2>Resources Gallery</h2>
        </div>
      </div>

      <div className={styles.resources_container}>
        {cards.map((item, index) => (
          <ResourceCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};
