"use client";

import { Loader2, Plus, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMetaFields } from "@/hooks/use-meta-fields";
import { DeleteDialog } from "@/components/Admin/common/DeleteDialog";
import { StatusAlert } from "../../../common/StatusAlert";
import { EmptyState } from "../../../common/EmptyState";
import { MetaFieldItem } from "./components/MetaFieldItem";

interface MetaFieldsTabProps {
  postTypeSlug: string;
}

export function MetaFieldsTab({ postTypeSlug }: MetaFieldsTabProps) {
  const {
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
  } = useMetaFields(postTypeSlug);

  return (
    <div className="flex flex-col gap-6">
      <StatusAlert error={error} successMessage={successMessage} />

      <Card className="bg-white border-[#e1e1e1]">
        <CardHeader>
          <CardTitle className="text300">Meta Fields</CardTitle>
          <CardDescription className="text100 text-[#949596]">
            Define custom fields for this post type
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {meta.length === 0 ? (
                <EmptyState
                  icon={<Settings className="h-6 w-6 text-[#393939]" />}
                  heading="No Meta Fields Defined"
                  content="Add custom fields to store additional data for this post type"
                />
              ) : (
                <div className="space-y-4">
                  {meta.map((field, index) => (
                    <MetaFieldItem
                      key={index}
                      field={field}
                      index={index}
                      onChange={updateField}
                      onRemove={handleDeleteClick}
                      onEnterPress={addField}
                      shouldFocus={index === newFieldIndex}
                      onFocused={clearNewFieldIndex}
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addField}
                  className="border-[#e1e1e1] hover:bg-[#f4f4f5] transition-all duration-100"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Field
                </Button>

                <Button
                  type="button"
                  onClick={saveFields}
                  disabled={isSaving || meta.length === 0}
                  className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Meta Fields"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteDialog
        isOpen={showDeleteDialog}
        isDeleting={isDeleting}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        type="meta field"
        title="Delete Meta Field"
      />
    </div>
  );
}
