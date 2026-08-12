"use client";

import useResourceStore, { useResourceType } from "@/store/useResourceStore";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { fetchResources } = useResourceStore() as useResourceType;

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return <>{children}</>;
}
