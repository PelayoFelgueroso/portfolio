"use client";

import { useState } from "react";

/**
 * Hook genérico para manejar estados async (loading, error, success)
 * Elimina la repetición en todos los hooks que hacen llamadas API
 */
export function useAsyncState() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetError = () => setError(null);
  const resetSuccess = () => setSuccessMessage(null);
  const resetAll = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const setSuccess = (message: string, duration = 3000) => {
    setSuccessMessage(message);
    if (duration > 0) {
      setTimeout(() => setSuccessMessage(null), duration);
    }
  };

  const executeAsync = async <T,>(
    fn: () => Promise<T>,
    options?: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
    }
  ): Promise<T | null> => {
    setIsLoading(true);
    resetAll();

    try {
      const result = await fn();
      if (options?.successMessage) {
        setSuccess(options.successMessage);
      }
      return result;
    } catch (err: any) {
      const errorMsg = options?.errorMessage || err.message || "An error occurred";
      setError(errorMsg);
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    successMessage,
    setIsLoading,
    setError,
    setSuccess,
    resetError,
    resetSuccess,
    resetAll,
    executeAsync,
  };
}
