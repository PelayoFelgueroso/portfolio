import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  heading: string;
  content: string;
}

export const EmptyState = ({ icon, heading, content }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-[#e1e1e1] p-3 mb-4">{icon}</div>
      <h3 className="text200 mb-2">{heading}</h3>
      <p className="text100 text-[#949596] max-w-md">{content}</p>
    </div>
  );
};
