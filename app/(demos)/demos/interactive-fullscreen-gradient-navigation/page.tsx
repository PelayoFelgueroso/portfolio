import { ArtHeader } from "@/components/UILibrary/GradientNavigation/Header";
import { CursorHoverProvider } from "@/contexts/CursorHover.context";

export default function Home() {
  return (
    <CursorHoverProvider>
      <ArtHeader />
      <main className="bg-gray min-h-screen"></main>
    </CursorHoverProvider>
  );
}
