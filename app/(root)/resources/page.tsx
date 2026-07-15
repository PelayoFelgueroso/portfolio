import { ResourcesGrid } from "@/components/HomePage/Resources/ResourcesGrid/ResourcesGrid";

export const metadata = {
  title: "Web Development Resources | Pelayo Felgueroso",
  description:
    "Curated resources, tips, and insights on full stack web development, Astro, React, Next.js, Node, and more.",
};

export default function ResourcesPage() {
  return (
    <>
      <main className="relative min-h-screen pt-[100px] z-10 bg-whiteCustom">
        <ResourcesGrid />
      </main>
    </>
  );
}
