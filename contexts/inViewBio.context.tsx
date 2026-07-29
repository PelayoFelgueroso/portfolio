"use client";

import { createBooleanContext } from "@/lib/context-factory";

// Usa el factory para crear el contexto
const InViewBioContext = createBooleanContext("inViewBio");

export const InViewBioProvider = InViewBioContext.Provider;
export const useInViewBio = InViewBioContext.useContext;
export const InViewBio = InViewBioContext;
