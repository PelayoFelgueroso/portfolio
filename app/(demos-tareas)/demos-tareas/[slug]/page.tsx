import { DemoTareasPage } from "@/components/DemoTareas/DemoTareasPage";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = (await params).slug;

  const pageTitle = slug.replace(/-/g, " ").replace(/_/g, " ");
  const pageTitleCapitalized =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return {
    title: `${pageTitleCapitalized} | Pelayo Felgueroso`,
  };
};

export default async function DemoTareaConquerPage({ params }: Props) {
  const slug = (await params).slug;

  return (
    <>
      <DemoTareasPage slug={slug} />
    </>
  );
}
