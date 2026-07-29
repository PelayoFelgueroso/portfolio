import { useMediaQuery } from "./common/use-media-query";

export function useIsDesktop(breakpoint = 1024) {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}
