import { Work } from "@/models/work";
import Image from "next/image";
import { NextWork } from "./NextWork";
import { CloudinaryImage } from "@/schemas/edit-post.schema";

interface Props {
  slug: string;
  title: string;
  niche: string;
  images: CloudinaryImage[];
  nextWork: Work;
}

export const WorkSlider = ({ slug, title, niche, images, nextWork }: Props) => {
  return (
    <div className="relative w-[100svw] flex flex-col items-start justify-start project-preview">
      <div className="relative w-full flex justify-start items-center h-[clamp(320px,_70vh,_520px)] md:h-[clamp(320px,_80vh,_600px)] 2md:h-[clamp(460px,_60vh,_960px)] px-[clamp(16px,_1.4vw,_24px)] overflow-hidden">
        <div className="relative h-full flex grow-0 justify-start items-center pb-[clamp(16px,_2vw,_24px)]">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={title}
              width={1000}
              height={1000}
              className="h-full object-cover bg-whiteCustom mr-1"
            />
          ))}
          <NextWork
            slug={nextWork.slug}
            image={nextWork.data.images_collection[0].url}
            title={nextWork.title}
          />
        </div>
      </div>

      <div className="relative z-20 w-full flex grow-0 basis-0 2md:basis-auto 2md:grow-[1] justify-start items-start px-[clamp(16px,_1.4vw,_24px)]">
        <div className="md:w-[60%] 2md:w-full flex self-stretch flex-col gap-[clamp(16px,_2vw,_24px)] pb-20 2md:pb-0">
          <div className="2md:w-[clamp(424px,_40vw,_468px)]">
            <h3 className="text400">{title}</h3>
            <p className="text100 text-darkGray">{niche}</p>
          </div>
        </div>
      </div>

      <a
        href={`/works/${slug}`}
        className="absolute inset-0 z-[200] w-full h-full"
      />
    </div>
  );
};
