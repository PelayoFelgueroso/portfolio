import { MDXContentRenderer } from "./components/ContentRenderer";

interface Props {
  content: string;
}

export const ResourceContent = ({ content }: Props) => {
  return <MDXContentRenderer content={content} />;
};
