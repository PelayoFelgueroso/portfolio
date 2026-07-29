/**
 * Hook genérico para manejar fetch de datos con estados y refresco
 * Elimina la lógica repetitiva de carga de datos en múltiples hooks
 */

"use client";

import { useState, useEffect, useCallback } from "react";

interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean; // Permite deshabilitar la carga automática
  dependencies?: any[]; // Dependencias para recargar
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions<T> = {}
) {
  const { onSuccess, onError, enabled = true, dependencies = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    return fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    setData, // Permite actualizaciones optimistas
  };
}

/**
 * Hook para fetch de múltiples recursos en paralelo
 */
export function useFetchParallel<T extends Record<string, () => Promise<any>>>(
  fetchFns: T
): {
  data: { [K in keyof T]: Awaited<ReturnType<T[K]>> | null };
  isLoading: boolean;
  errors: { [K in keyof T]: Error | null };
  refetch: () => Promise<void>;
} {
  type DataType = { [K in keyof T]: Awaited<ReturnType<T[K]>> | null };
  type ErrorsType = { [K in keyof T]: Error | null };

  const [data, setData] = useState<DataType>({} as DataType);
  const [errors, setErrors] = useState<ErrorsType>({} as ErrorsType);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = async () => {
    setIsLoading(true);
    
    const results = await Promise.allSettled(
      Object.entries(fetchFns).map(async ([key, fn]) => {
        try {
          const result = await fn();
          return { key, result, error: null };
        } catch (err) {
          return {
            key,
            result: null,
            error: err instanceof Error ? err : new Error(String(err)),
          };
        }
      })
    );

    const newData = {} as DataType;
    const newErrors = {} as ErrorsType;

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const { key, result: data, error } = result.value;
        newData[key as keyof T] = data;
        newErrors[key as keyof T] = error;
      }
    });

    setData(newData);
    setErrors(newErrors);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    data,
    isLoading,
    errors,
    refetch: fetchAll,
  };
}
