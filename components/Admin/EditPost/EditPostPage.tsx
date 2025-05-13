"use client";

import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePostEdit } from "@/hooks/use-edit-post";
import { ActionButtons } from "./components/ActionButton";
import { PostDetailsCard } from "./components/PostDetailsCard";
import { MetaFieldsCard } from "./components/MetaFieldCard";
import { StatusAlert } from "../common/StatusAlert";


interface Props {
  slug: string;
  id: string;
}

export const EditPostPage = ({ slug, id }: Props) => {
  const {
    post,
    categories,
    metaFields,
    selectedCategory,
    title,
    setTitle,
    categoryId,
    setCategoryId,
    metaValues,
    fileNames,
    setFileNames,
    isLoading,
    isSaving,
    error,
    successMessage,
    fileInputRefs,
    handleMetaChange,
    handleSave,
    handleBack,
    navigateToContentEditor,
    formatDate,
  } = usePostEdit(slug, id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col gap-6">
        <Alert
          variant="destructive"
          className="bg-red-50 text-red-800 border-red-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Post not found. It may have been deleted.
          </AlertDescription>
        </Alert>
        <Button onClick={handleBack} variant="outline" className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
      </div>
    );
  }

  return (
    <div className="pb300">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text400 text-[#191a1b]">Edit Post</h1>
            <p className="text100 text-[#393939]">
              Edit post details, category, and meta fields
            </p>
          </div>

          <ActionButtons
            handleBack={handleBack}
            navigateToContentEditor={navigateToContentEditor}
            handleSave={handleSave}
            isSaving={isSaving}
            isValid={!!title.trim()}
          />
        </div>

        <StatusAlert error={error} successMessage={successMessage} />

        <PostDetailsCard
          post={post}
          title={title}
          setTitle={setTitle}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
          selectedCategory={selectedCategory}
          formatDate={formatDate}
        />

        <MetaFieldsCard
          metaFields={metaFields}
          metaValues={metaValues}
          fileNames={fileNames}
          setFileNames={setFileNames}
          handleMetaChange={handleMetaChange}
          fileInputRefs={fileInputRefs}
        />
      </div>
    </div>
  );
};
