import { DemosHeader } from "@/common/DemosHeader/DemosHeader";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DemosHeader />
      <div className="relative bg-gray">{children}</div>
    </>
  );
}
