"use client";

import { createBooleanContext } from "@/lib/context-factory";

// Usa el factory para crear el contexto
const CursorHoverContext = createBooleanContext("cursorHover");

export const CursorHoverProvider = CursorHoverContext.Provider;
export const useCursorHover = CursorHoverContext.useContext;
export const CursorHover = CursorHoverContext;
