"use client";

import { CursorHoverProvider } from "@/contexts/CursorHover.context";
import { CurvedMenu } from "@/common/CurvedMenu/CurvedMenu";
import { Footer } from "@/common/Footer/Footer";
import { InViewBioProvider } from "@/contexts/inViewBio.context";
import { InViewContactProvider } from "@/contexts/inViewContact.context";
import DotCursor from "@/common/DotCursor/DotCursor";
import useResourceStore, { useResourceType } from "@/store/useResourceStore";
import { useEffect } from "react";
import useWorkStore, { UseWorkStoreType } from "@/store/useWorkStore";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { fetchResources } = useResourceStore() as useResourceType;
  const { fetchWorks } = useWorkStore() as UseWorkStoreType;

  useEffect(() => {
    fetchResources();
    fetchWorks();
  }, []);
  return (
    <>
      <CursorHoverProvider>
        <InViewBioProvider>
          <InViewContactProvider>
            <DotCursor />
            <CurvedMenu />
            {children}
            <Footer />
          </InViewContactProvider>
        </InViewBioProvider>
      </CursorHoverProvider>
    </>
  );
}
