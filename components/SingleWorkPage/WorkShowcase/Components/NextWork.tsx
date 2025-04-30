import Image from "next/image";

interface Props {
  slug: string;
  image: string;
  title: string;
  niche: string;
}

export const NextWork = ({ slug, image, title, niche }: Props) => {
  return (
    <div className="relative w-fit h-full bg-blackCustom overflow-hidden next-work">
      <a
        href={`/works/${slug}`}
        className="absolute inset-0 z-[200] w-full h-full flex flex-col justify-center items-center gap-1 bg-[#0000008c]"
      >
        <div className="text400 text-whiteCustom">Next: {title}</div>
        <div className="text100 relative overflow-hidden text-whiteCustom">{niche}</div>
      </a>
      <Image
        src={image}
        alt={title}
        width={1000}
        height={1000}
        className="w-full h-full object-cover bg-grayCustom"
      />
    </div>
  );
};
