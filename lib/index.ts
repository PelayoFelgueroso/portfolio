/**
 * Barrel export para todas las utilidades del proyecto
 * Simplifica los imports en los componentes
 */

// ============= HOOKS COMUNES =============
export * from "../hooks/common";

// ============= CONTEXTOS =============
export {
  InViewBioProvider,
  useInViewBio,
  InViewContactProvider,
  useInViewContact,
  CursorHoverProvider,
  useCursorHover,
  createBooleanContext,
} from "./context-factory";

// ============= UTILIDADES =============
export { apiClient, buildAdminUrl, buildQueryUrl } from "./api-client";
export * from "./form-utils";
export * from "./animation-variants";

// ============= SERVICIOS =============
export {
  categoryService,
  postService,
  metaFieldService,
  postTypeService,
  postContentService,
} from "../services/api.service";
