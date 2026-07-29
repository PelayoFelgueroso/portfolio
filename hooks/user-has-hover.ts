import { useMediaQuery } from "./common/use-media-query";

export function useHasHover() {
  const hasHoverCapability = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isLargeScreen = useMediaQuery("(min-width: 993px)");
  
  return hasHoverCapability && isLargeScreen;
}
