import "./style.css";

export const ResourceContent = ({ content }: { content: string }) => {
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
