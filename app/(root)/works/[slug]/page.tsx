import { SingleWorkPageTemplate } from "@/components/SingleWorkPage/SingleWorkPage";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SingleWorkPage ({ params }: Props) {
  const slug = (await params).slug;

  return (
    <main className="relative top-0 z-[200] h-full overflow-hidden">
      <SingleWorkPageTemplate slug={slug} />
    </main>
  );
}
