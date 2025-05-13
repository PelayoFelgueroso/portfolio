"use client";

import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteDialog } from "@/components/Admin/common/DeleteDialog";
import { useCreatePost } from "@/hooks/use-create-post";
import { PostsList } from "./components/PostList";
import { NewPostDialog } from "./components/NewPostDialog";

interface Props {
  postTypeSlug: string;
}

export const PostsTab = ({ postTypeSlug }: Props) => {
  const {
    posts,
    categories,
    isLoading,
    error,
    showDeleteDialog,
    isDeleting,
    showNewPostDialog,
    newPostTitle,
    categoryId,
    isSubmitting,
    setShowNewPostDialog,
    setNewPostTitle,
    setCategoryId,
    handleCreatePost,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  } = useCreatePost(postTypeSlug);

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <Alert
          variant="destructive"
          className="bg-red-50 text-red-800 border-red-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text300">Posts</h2>
        <Button
          onClick={() => setShowNewPostDialog(true)}
          className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Card className="bg-white border-[#e1e1e1]">
        <CardContent className="p-0">
          <PostsList
            posts={posts}
            isLoading={isLoading}
            onDeleteClick={handleDeleteClick}
            postTypeSlug={postTypeSlug}
          />
        </CardContent>
      </Card>

      <NewPostDialog
        isOpen={showNewPostDialog}
        onClose={() => setShowNewPostDialog(false)}
        onSubmit={handleCreatePost}
        title={newPostTitle}
        onTitleChange={setNewPostTitle}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        categories={categories}
        isSubmitting={isSubmitting}
      />

      <DeleteDialog
        isOpen={showDeleteDialog}
        isDeleting={isDeleting}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        type="post"
        title="Delete Post"
      />
    </div>
  );
};
