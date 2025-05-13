interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text400 text-[#191a1b]">{title}</h1>
      <p className="text100 text-[#393939]">{description}</p>
    </div>
  );
}
