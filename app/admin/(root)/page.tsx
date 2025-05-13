"use client"

import { AddPostTypeForm } from "@/components/Admin/Home/AddPostTypeForm"
import { DeleteDialog } from "@/components/Admin/common/DeleteDialog"
import { ErrorAlert } from "@/components/Admin/Home/ErrorAlert"
import { PageHeader } from "@/components/Admin/Home/PageHeader"
import { PostTypesList } from "@/components/Admin/Home/PostTypesList"
import { usePostTypes } from "@/hooks/use-post-types"

export default function AdminPostTypesPage() {
  const {
    postTypes,
    isLoading,
    error,
    isDeleting,
    showDeleteDialog,
    addPostType,
    handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteDialog,
  } = usePostTypes()

  return (
    <div className="pb300">
      <div className="flex flex-col gap-6">
        <PageHeader title="Manage Post Types" description="Create, view, and manage your content types" />

        <ErrorAlert error={error} />

        <AddPostTypeForm onAddPostType={addPostType} />

        <PostTypesList postTypes={postTypes} isLoading={isLoading} onDeleteClick={handleDeleteClick} />
      </div>

      <DeleteDialog
        isOpen={showDeleteDialog}
        isDeleting={isDeleting}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
        type="post Type"
      />
    </div>
  )
}
