import { ContentLink } from "./components/ContentLink";

interface Props {
  sections: string[];
}

export const ResourceTableContents = ({ sections }: Props) => {
  return (
    <aside className="hidden min-[1400px]:block sticky top-[75px] mt-[80px] self-start">
      <p className="text-[#4f576c] text-[12px]">Table of Contents</p>
      {sections.map((item, index) => (
        <ContentLink key={index} item={item} />
      ))}
    </aside>
  );
};
