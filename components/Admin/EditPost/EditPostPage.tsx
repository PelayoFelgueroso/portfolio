"use client";

import { FormProvider } from "react-hook-form";
import { usePostEdit } from "@/hooks/use-edit-post";
import { ActionButtons } from "./components/ActionButtons";
import { StatusAlert } from "../common/StatusAlert";
import { PostDetailsCard } from "./components/PostDetailsCard";
import { MetaFieldsCard } from "./components/MetaFieldCard";
import { LoadingState } from "./components/LoadingState";
import { PostNotFound } from "./components/PostNotFound";

interface Props {
  slug: string;
  id: string;
}

export default function EditPostPage({ slug, id }: Props) {
  const {
    post,
    categories,
    metaFields,
    selectedCategory,
    fileNames,
    setFileNames,
    isLoading,
    isSaving,
    error,
    successMessage,
    form,
    handleMetaChange,
    onSubmit,
    handleBack,
    navigateToContentEditor,
    formatDate,
  } = usePostEdit(slug, id);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!post) {
    return <PostNotFound handleBack={handleBack} />;
  }

  return (
    <div className="pb300">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                isSaving={isSaving}
                isValid={form.formState.isValid}
                onSave={form.handleSubmit(onSubmit)}
              />
            </div>

            <StatusAlert error={error} successMessage={successMessage} />

            <PostDetailsCard
              post={post}
              categories={categories}
              selectedCategory={selectedCategory}
              formatDate={formatDate}
            />

            <MetaFieldsCard
              metaFields={metaFields}
              fileNames={fileNames}
              setFileNames={setFileNames}
              handleMetaChange={handleMetaChange}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
