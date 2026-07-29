/**
 * Índice de exportaciones de hooks comunes
 * Facilita los imports y mantiene la organización
 */

// Hooks de estado
export { useDeleteDialog } from "./use-delete-dialog";
export { useAsyncState } from "./use-async-state";
export { useFetch, useFetchParallel } from "./use-fetch";

// Hooks de UI
export {
  useMediaQuery,
  useIsMobile,
  useIsDesktop,
  useHasHover,
} from "./use-media-query";

// Hooks de scroll y animación
export { useScrollSections } from "./use-scroll-sections";
export { usePreloader } from "./use-preloader";
