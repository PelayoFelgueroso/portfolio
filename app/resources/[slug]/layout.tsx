import { CurvedMenu } from "@/components/CurvedMenu/CurvedMenu";
import { Footer } from "@/components/Footer/Footer";

export default function ResourceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CurvedMenu />
      {children}
      <Footer />
    </>
  );
}
