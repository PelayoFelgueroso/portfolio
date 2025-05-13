import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DashBoardSidebar } from "@/components/Admin/common/SideBar";
import { authOptions } from "@/lib/authOptions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/log-in-admin");
  }

  return (
    <DashBoardSidebar>
      <main>{children}</main>
    </DashBoardSidebar>
  );
}
