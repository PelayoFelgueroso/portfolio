/**
 * Utilidades comunes de formularios para eliminar código duplicado
 * Funciones helper para manejo de archivos, validación, etc.
 */

import type { FieldError, UseFormSetError } from "react-hook-form";

/**
 * Formatea errores de Zod para mostrar en el formulario
 */
export function formatFieldError(error?: FieldError): string | undefined {
  return error?.message;
}

/**
 * Establece múltiples errores en un formulario
 */
export function setFormErrors<T extends Record<string, any>>(
  setError: UseFormSetError<T>,
  errors: Partial<Record<keyof T, string>>
) {
  Object.entries(errors).forEach(([field, message]) => {
    setError(field as keyof T, {
      type: "manual",
      message: message as string,
    });
  });
}

/**
 * Resetea archivos de input
 */
export function resetFileInput(ref: React.RefObject<HTMLInputElement>) {
  if (ref.current) {
    ref.current.value = "";
  }
}

/**
 * Obtiene el nombre de archivo de una URL
 */
export function getFileNameFromUrl(url: string): string {
  return url.split("/").pop() || "";
}

/**
 * Formatea nombres de múltiples archivos
 */
export function formatFileNames(files: Array<{ url: string }>): string {
  return files
    .map((file) => getFileNameFromUrl(file.url))
    .filter(Boolean)
    .join(", ");
}

/**
 * Valida el tamaño de un archivo
 */
export function validateFileSize(
  file: File,
  maxSizeMB: number = 5
): { valid: boolean; error?: string } {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Valida el tipo de un archivo
 */
export function validateFileType(
  file: File,
  allowedTypes: string[]
): { valid: boolean; error?: string } {
  const fileType = file.type;
  
  if (!allowedTypes.includes(fileType)) {
    return {
      valid: false,
      error: `File type must be one of: ${allowedTypes.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Combina validaciones de archivo
 */
export function validateFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; errors: string[] } {
  const { maxSizeMB, allowedTypes } = options;
  const errors: string[] = [];

  if (maxSizeMB) {
    const sizeValidation = validateFileSize(file, maxSizeMB);
    if (!sizeValidation.valid && sizeValidation.error) {
      errors.push(sizeValidation.error);
    }
  }

  if (allowedTypes) {
    const typeValidation = validateFileType(file, allowedTypes);
    if (!typeValidation.valid && typeValidation.error) {
      errors.push(typeValidation.error);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Convierte FormData a objeto plano
 */
export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  
  formData.forEach((value, key) => {
    if (obj[key]) {
      // Si ya existe, convertir a array
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  });

  return obj;
}

/**
 * Limpia valores vacíos de un objeto
 */
export function removeEmptyValues<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}
