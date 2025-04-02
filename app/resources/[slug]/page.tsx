import { ResourcesArticlePage } from "@/components/ResourcesArticlePage/ResourcesArticlePage";
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
    title: `${pageTitleCapitalized} | BrainHome`,
  };
};

export default async function ResourcePage({ params }: Props) {
  const slug = (await params).slug;

  return (
    <main className="relative z-10 bg-[#F4F4F4] pt-[100px] flex flex-col items-center">
      <ResourcesArticlePage slug={slug} />
    </main>
  );
}
