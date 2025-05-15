import { ResourceHeader } from "./components/ResourceHeader";
import Image from "next/image";
import { ResourceTableContents } from "./components/ResourceTableContents/ResourceTableContents";
import {ResourceContent} from "./components/ResourceContent/ResourceContent";
import { Resource } from "@/models/resource";

interface Props {
  resource: Resource;
}

export const ResourceArticle = ({ resource }: Props) => {
  const sections = null;

  return (
    <div className="relative center flex justify-between min-[1400px]:gap-[50px]">
      <article className="relative px-4 pb-[100px] mt-[80px] max-w-[800px] min-[1400px]:w-[900px] min-[1400px]:max-w-none">
        <ResourceHeader
          date={resource.data.date}
          difficulty={resource?.data.difficulty}
          title={resource?.title}
          short_description={resource?.data.short_description}
          description={resource?.data.description}
          github_link={resource?.data.github_link}
          slug={resource?.slug}
        />

        <div className="relative w-full aspect-[16/9] mt-[30px] rounded-xl overflow-hidden">
          <Image
            src={resource?.data.featured_image.url}
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
              <source src={resource.data.featured_video.url} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          </div>
        </div>
        <ResourceContent content={resource.content} />
      </article>

      {sections && <ResourceTableContents sections={sections} />}
    </div>
  );
};
