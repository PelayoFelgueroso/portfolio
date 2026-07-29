# ✨ Utilidades Comunes del Proyecto

Este directorio contiene todas las utilidades, hooks y helpers reutilizables del proyecto, organizados de manera profesional y siguiendo las mejores prácticas de React y Next.js.

## 📁 Estructura

```
├── hooks/
│   └── common/
│       ├── use-delete-dialog.ts    # Hook para diálogos de eliminación
│       ├── use-async-state.ts      # Hook para estados async
│       ├── use-fetch.ts            # Hook para fetch de datos
│       ├── use-media-query.ts      # Hooks de media queries
│       └── index.ts                # Barrel exports
│
├── lib/
│   ├── api-client.ts              # Cliente HTTP genérico
│   ├── context-factory.tsx        # Factory de contextos
│   ├── form-utils.ts              # Utilidades de formularios
│   ├── animation-variants.ts      # Variantes de Framer Motion
│   ├── utils.ts                   # Utilidades generales (existente)
│   └── index.ts                   # Barrel exports
│
└── services/
    └── api.service.ts             # Servicios API refactorizados
```

## 🎯 Uso Rápido

### Importación Simplificada

```typescript
// En lugar de múltiples imports:
import { useDeleteDialog } from "@/hooks/common/use-delete-dialog";
import { useAsyncState } from "@/hooks/common/use-async-state";
import { apiClient } from "@/lib/api-client";

// Puedes usar:
import { useDeleteDialog, useAsyncState, apiClient } from "@/lib";
```

### Ejemplos de Uso

#### 1. Hook con Delete Dialog

```typescript
import { useDeleteDialog, useAsyncState } from "@/lib";

function MyComponent() {
  const deleteDialog = useDeleteDialog<string>();
  const asyncState = useAsyncState();

  const handleDelete = async () => {
    await deleteDialog.executeDelete(async (id) => {
      await apiClient.delete(`/api/items/${id}`);
      // Actualizar estado local
    });
  };

  return (
    <DeleteDialog
      isOpen={deleteDialog.showDeleteDialog}
      isDeleting={deleteDialog.isDeleting}
      onConfirm={handleDelete}
      onClose={deleteDialog.closeDeleteDialog}
    />
  );
}
```

#### 2. Fetch de Datos

```typescript
import { useFetch } from "@/lib";

function MyComponent() {
  const { data, isLoading, error, refetch } = useFetch(
    () => apiClient.get("/api/data"),
    {
      onSuccess: (data) => console.log("Loaded:", data),
      enabled: true,
    }
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return <DataDisplay data={data} onRefresh={refetch} />;
}
```

#### 3. Media Queries

```typescript
import { useIsMobile, useIsDesktop, useMediaQuery } from "@/lib";

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

#### 4. Animaciones

```typescript
import { motion } from "framer-motion";
import { fadeUpVariants, transitions, scaleUpVariants } from "@/lib";

function AnimatedComponent() {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      transition={transitions.smooth}
      whileHover="hover"
      {...scaleUpVariants}
    >
      Contenido animado
    </motion.div>
  );
}
```

## 📚 Documentación Detallada

- [📄 Informe de Refactorización](../REFACTORING_REPORT.md) - Análisis completo del proyecto
- [🔄 Guía de Migración](../MIGRATION_GUIDE.md) - Cómo migrar código existente
- [💡 Ejemplos](../hooks/use-categories-refactored.example.ts) - Hooks refactorizados

## 🛠️ Hooks Disponibles

| Hook | Descripción | Uso Principal |
|------|-------------|---------------|
| `useDeleteDialog` | Maneja diálogos de eliminación | Confirmaciones de delete |
| `useAsyncState` | Estados async (loading/error/success) | Llamadas API |
| `useFetch` | Fetch de datos con estados | Carga de datos inicial |
| `useFetchParallel` | Múltiples fetches en paralelo | Carga de múltiples recursos |
| `useMediaQuery` | Media query genérica | Responsive design |
| `useIsMobile` | Detecta móvil | Vistas móviles |
| `useIsDesktop` | Detecta desktop | Vistas desktop |
| `useHasHover` | Detecta hover capability | Interacciones hover |

## 🔧 Utilidades Disponibles

### API Client

```typescript
apiClient.get<T>(url)
apiClient.post<T>(url, data)
apiClient.put<T>(url, data)
apiClient.delete<T>(url)
```

### Form Utils

```typescript
validateFile(file, options)
formatFieldError(error)
getFileNameFromUrl(url)
removeEmptyValues(obj)
```

### Animation Variants

```typescript
fadeVariants
fadeUpVariants
scaleVariants
slideFromLeftVariants
blurVariants
staggerContainerVariants
transitions.smooth
transitions.spring
```

## 🎨 Contextos

```typescript
// Crear contextos simples de forma automática
const { Provider, useContext } = createBooleanContext("myContext");

// O usar los pre-creados:
InViewBioProvider
InViewContactProvider
CursorHoverProvider
```

## 📊 Beneficios

✅ **DRY**: Sin código duplicado
✅ **Type-Safe**: Todo con TypeScript
✅ **Testable**: Fácil de testear
✅ **Composable**: Hooks pequeños y componibles
✅ **Documentado**: Comentarios JSDoc en cada función
✅ **Mantenible**: Un solo lugar para cambios

## 🚀 Próximos Pasos

1. Lee el [Informe de Refactorización](../REFACTORING_REPORT.md)
2. Sigue la [Guía de Migración](../MIGRATION_GUIDE.md)
3. Comienza migrando un hook a la vez
4. ¡Disfruta del código más limpio y mantenible!

---

**Creado por:** Análisis de refactorización automático
**Versión:** 1.0.0
**Última actualización:** 2026-07-24
