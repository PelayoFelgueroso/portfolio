import { ResourcesProvider } from "@/contexts/Resources.context";

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ResourcesProvider>{children}</ResourcesProvider>;
}
