"use client";

import { useEffect, useState } from "react";

/**
 * Hook genérico y reutilizable para media queries
 * Reemplaza: useIsMobile, useIsDesktop, useHasHover
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatch = () => {
      setMatches(media.matches);
    };

    // Set initial value
    updateMatch();

    // Listen for changes
    media.addEventListener("change", updateMatch);

    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}

// Helpers específicos que usan el hook genérico
export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

export function useIsDesktop(breakpoint = 1024): boolean {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}

export function useHasHover(): boolean {
  const hasHoverCapability = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isLargeScreen = useMediaQuery("(min-width: 993px)");
  
  return hasHoverCapability && isLargeScreen;
}
