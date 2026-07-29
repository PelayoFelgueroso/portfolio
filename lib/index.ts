/**
 * Barrel export para todas las utilidades del proyecto
 * Simplifica los imports en los componentes
 */

// ============= HOOKS COMUNES =============
export * from "./hooks/common";

// ============= CONTEXTOS =============
export {
  InViewBioProvider,
  useInViewBio,
  InViewContactProvider,
  useInViewContact,
  CursorHoverProvider,
  useCursorHover,
  createBooleanContext,
} from "./lib/context-factory";

// ============= UTILIDADES =============
export { apiClient, buildAdminUrl, buildQueryUrl } from "./lib/api-client";
export * from "./lib/form-utils";
export * from "./lib/animation-variants";

// ============= SERVICIOS =============
export {
  categoryService,
  postService,
  metaFieldService,
  postTypeService,
  postContentService,
} from "./services/api.service";
