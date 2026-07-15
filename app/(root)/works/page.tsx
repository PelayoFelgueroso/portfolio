import { WorksPageTemplate } from "@/components/WorksPage/WorksPage";

export const metadata = {
  title: "Web Development Projects | Pelayo Felgueroso",
  description: "A showcase of custom web apps and full stack projects developed using modern technologies like Astro, React, Next.js, and Node."
};

export default function WorksPage() {
  return (
    <main className="relative top-0 z-[200] h-full overflow-hidden">
      <WorksPageTemplate />
    </main>
  );
}
