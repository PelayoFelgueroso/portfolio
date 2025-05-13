import type { ReactNode } from "react";

export default function PostTypeLayout({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}
