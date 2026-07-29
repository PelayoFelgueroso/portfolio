/**
 * Hook personalizado para manejar el estado del preloader
 */

import { useEffect, useState } from "react";

interface UsePreloaderOptions {
  /**
   * Duración del preloader en milisegundos
   * @default 1100
   */
  duration?: number;
  /**
   * Callback que se ejecuta cuando el preloader termina
   */
  onComplete?: () => void;
}

/**
 * Hook que maneja el estado del preloader con limpieza automática
 * 
 * @example
 * ```tsx
 * const isLoading = usePreloader({
 *   duration: 1500,
 *   onComplete: () => console.log('Preloader completado')
 * });
 * 
 * return (
 *   <>
 *     {isLoading && <Preloader />}
 *     <MainContent />
 *   </>
 * );
 * ```
 */
export function usePreloader(options: UsePreloaderOptions = {}) {
  const { duration = 1100, onComplete } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return isLoading;
}
