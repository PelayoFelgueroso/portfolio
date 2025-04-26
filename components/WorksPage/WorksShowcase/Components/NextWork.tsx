import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
  image: string;
  title: string;
}

export const NextWork = ({ slug, image, title }: Props) => {
  return (
    <div className="relative max-w-[98vw] 2md:max-w-[680px] h-full object-cover bg-blackCustom overflow-hidden">
      <Link
        href={`/works/${slug}`}
        className="absolute inset-0 z-[200] w-full h-full flex flex-col justify-center items-center gap-1 bg-[#0000008c]"
      >
        <div className="text400 text-whiteCustom">Next: {title}</div>
        <div className="text100 relative overflow-hidden text-whiteCustom"></div>
      </Link>
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
