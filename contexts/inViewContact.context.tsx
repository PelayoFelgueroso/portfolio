"use client";

import { createBooleanContext } from "@/lib/context-factory";

// Usa el factory para crear el contexto
const InViewContactContext = createBooleanContext("inViewContact");

export const InViewContactProvider = InViewContactContext.Provider;
export const useInViewContact = InViewContactContext.useContext;
export const InViewContact = InViewContactContext;
