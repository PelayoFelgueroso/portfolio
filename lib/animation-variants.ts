/**
 * Configuración y variantes de animación reutilizables para Framer Motion
 * Centraliza las animaciones comunes en un solo lugar
 */

import type { Variants, Transition } from "framer-motion";

// ============= TRANSICIONES COMUNES =============

export const transitions = {
  smooth: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } as Transition,
  fast: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } as Transition,
  slow: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } as Transition,
  spring: { type: "spring", stiffness: 100, damping: 15 } as Transition,
  springBouncy: { type: "spring", stiffness: 200, damping: 10 } as Transition,
};

// ============= VARIANTES DE FADE =============

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

// ============= VARIANTES DE SCALE =============

export const scaleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export const scaleUpVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// ============= VARIANTES DE SLIDE =============

export const slideFromLeftVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const slideFromRightVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

// ============= VARIANTES DE BLUR =============

export const blurVariants: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export const blurCharVariants = (y: number): Variants => ({
  initial: {
    y: 0,
    opacity: 0,
    filter: "blur(10px)",
  },
  open: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  close: {
    y: y,
    opacity: 0,
    filter: "blur(10px)",
  },
});

// ============= VARIANTES DE STAGGER =============

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ============= VARIANTES DE MODAL/DIALOG =============

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: transitions.spring,
  },
};

// ============= VARIANTES COMBINADAS =============

export const cardHoverVariants: Variants = {
  initial: { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    transition: transitions.fast,
  },
};

// ============= HELPERS =============

/**
 * Crea una variante de delay personalizado
 */
export function createDelayedVariant(
  baseVariants: Variants,
  delay: number
): Variants {
  const delayed: Variants = {};
  
  Object.keys(baseVariants).forEach((key) => {
    const variant = baseVariants[key];
    if (typeof variant === "object") {
      delayed[key] = {
        ...variant,
        transition: {
          ...(variant.transition || {}),
          delay,
        },
      };
    }
  });

  return delayed;
}

/**
 * Crea variantes de stagger con configuración personalizada
 */
export function createStaggerVariants(config: {
  staggerChildren?: number;
  delayChildren?: number;
}): {
  container: Variants;
  item: Variants;
} {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: config.staggerChildren || 0.1,
          delayChildren: config.delayChildren || 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  };
}
