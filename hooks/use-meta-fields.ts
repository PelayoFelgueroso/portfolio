"use client"

import { useState, useEffect } from "react"
import { type MetaField, MetaFieldsSchema } from "@/schemas/meta-field.schema"
import { fetchMetaFields, saveMetaFields } from "@/services/meta-field.service"
import { useDeleteDialog } from "./common/use-delete-dialog"
import { useAsyncState } from "./common/use-async-state"

export function useMetaFields(postTypeSlug: string) {
  const [meta, setMeta] = useState<MetaField[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [newFieldIndex, setNewFieldIndex] = useState<number | null>(null)

  // Usa los hooks genéricos
  const deleteDialog = useDeleteDialog<number>();
  const asyncState = useAsyncState();

  // Carga inicial de meta fields
  const loadMetaFields = async () => {
    const data = await asyncState.executeAsync(
      () => fetchMetaFields(postTypeSlug),
      { errorMessage: "Failed to load meta fields. Please try again." }
    );
    
    if (data) {
      setMeta(data || []);
    }
  };

  useEffect(() => {
    loadMetaFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postTypeSlug])

  const addField = () => {
    const newIndex = meta.length
    setMeta([...meta, { name: "", type: "string", label: "" }])
    setNewFieldIndex(newIndex)
    return newIndex
  }

  const updateField = <K extends keyof MetaField>(index: number, field: K, value: MetaField[K]) => {
    const updatedMeta = [...meta]
    updatedMeta[index][field] = value
    setMeta(updatedMeta)
  }

  // Eliminar meta field
  const confirmDelete = async (): Promise<void> => {
    await deleteDialog.executeDelete(async (index) => {
      const updatedMeta = meta.filter((_, i) => i !== index);
      setMeta(updatedMeta);
    });
  };

  const saveFields = async () => {
    asyncState.resetAll();

    // Validate with Zod
    const result = MetaFieldsSchema.safeParse(meta)
    if (!result.success) {
      asyncState.setError("Please fix the validation errors before saving")
      return
    }

    setIsSaving(true)

    try {
      await saveMetaFields(postTypeSlug, meta)
      asyncState.setSuccess("Meta fields saved successfully!")
    } catch (err) {
      asyncState.setError("Failed to save meta fields. Please try again.")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  // Limpiar el índice del nuevo campo después de que se haya enfocado
  const clearNewFieldIndex = () => {
    setNewFieldIndex(null)
  }

  return {
    meta,
    isLoading: asyncState.isLoading,
    isSaving,
    isDeleting: deleteDialog.isDeleting,
    error: asyncState.error,
    successMessage: asyncState.successMessage,
    showDeleteDialog: deleteDialog.showDeleteDialog,
    newFieldIndex,
    addField,
    updateField,
    handleDeleteClick: deleteDialog.handleDeleteClick,
    confirmDelete,
    closeDeleteDialog: deleteDialog.closeDeleteDialog,
    saveFields,
    clearNewFieldIndex,
  }
}
