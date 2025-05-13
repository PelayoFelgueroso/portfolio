"use client"

import { useState, useEffect } from "react"
import { type MetaField, MetaFieldsSchema } from "@/schemas/meta-field.schema"
import { fetchMetaFields, saveMetaFields } from "@/services/meta-field.service"

export function useMetaFields(postTypeSlug: string) {
  const [meta, setMeta] = useState<MetaField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [newFieldIndex, setNewFieldIndex] = useState<number | null>(null)

  // Estados para el diálogo de eliminación
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const loadMetaFields = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchMetaFields(postTypeSlug)
        setMeta(data || [])
      } catch (err) {
        setError("Failed to load meta fields. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadMetaFields()
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

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async (): Promise<void> => {
    if (deleteIndex === null) return

    setIsDeleting(true)
    try {
      const updatedMeta = meta.filter((_, i) => i !== deleteIndex)
      setMeta(updatedMeta)
      setShowDeleteDialog(false)
    } catch (err) {
      setError("Failed to delete meta field.")
      console.error(err)
    } finally {
      setIsDeleting(false)
      setDeleteIndex(null)
    }
  }

  const closeDeleteDialog = () => {
    setDeleteIndex(null)
    setShowDeleteDialog(false)
  }

  const saveFields = async () => {
    setError(null)
    setSuccessMessage(null)

    // Validate with Zod
    const result = MetaFieldsSchema.safeParse(meta)
    if (!result.success) {
      setError("Please fix the validation errors before saving")
      return
    }

    setIsSaving(true)

    try {
      await saveMetaFields(postTypeSlug, meta)
      setSuccessMessage("Meta fields saved successfully!")

      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (err) {
      setError("Failed to save meta fields. Please try again.")
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
    isLoading,
    isSaving,
    isDeleting,
    error,
    successMessage,
    showDeleteDialog,
    newFieldIndex,
    addField,
    updateField,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
    saveFields,
    clearNewFieldIndex,
  }
}
