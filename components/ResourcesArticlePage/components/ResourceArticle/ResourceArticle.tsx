"use client";

import { ResourceHeader } from "./components/ResourceHeader";
import Image from "next/image";
import styles from "./styles.module.scss";
import "./style.css";
import { FormattedResource } from "@/models/resource";

interface Props {
  resource: FormattedResource;
}

export const ResourceArticle = ({ resource }: Props) => {
  return (
    <div className="relative flex justify-between min-[1400px]:gap-[50px]">
      <article className="relative px-4 pb-[100px] mt-[80px] max-w-[800px] min-[1400px]:w-[900px] min-[1400px]:max-w-none">
        <ResourceHeader
          date={resource.formatted_date}
          difficulty={resource?.acf.difficulty}
          title={resource?.title.rendered}
          short_description={resource?.acf.short_description}
          description={resource?.acf.description}
          github_link={resource?.acf.github_link}
          slug={resource?.slug}
        />

        <div className="relative h-[70vw] min-h-[300px] mt-[30px] rounded-xl overflow-hidden md:h-[575px]">
          <Image
            src={resource?.featured_image}
            width={1000}
            height={1000}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative w-ful h-full">
            <video
              className={`w-full h-full object-cover`}
              width="100%"
              height="auto"
              loop
              muted
              playsInline
              autoPlay
            >
              <source src={resource.featured_video} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          </div>
        </div>
        {!resource.content.protected && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: resource.content.rendered }}
          ></div>
        )}
      </article>
      
      {/*sections && (
        <aside className="hidden min-[1400px]:block sticky top-[75px] mt-[80px] self-start">
          <p className="text-[#4f576c] text-[12px]">Table of Contents</p>
          {sections.map((item, index) => (
            <p
              key={index}
              className="text-[#070b28] text-[14px] cursor-pointer"
            >
              {item.title}
            </p>
          ))}
        </aside>
      )*/}
    </div>
  );
};
