"use client";

import { Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Post } from "@/schemas/create-post.schema";

interface CategoryPostsListProps {
  posts: Post[] | undefined;
  isLoading: boolean;
  formatDate: (dateString: string) => string;
  onEditPost: (postId: string) => void;
}

export function CategoryPostsList({
  posts,
  isLoading,
  formatDate,
  onEditPost,
}: CategoryPostsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-[#1f77ff]" />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-4 text-[#949596]">
        No posts in this category
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="text100 font-medium mb-2">Posts in this category:</h4>
      <div className="overflow-hidden rounded-md border border-[#e1e1e1]">
        <table className="w-full text-left">
          <thead className="bg-[#f4f4f4] text100">
            <tr>
              <th className="px-4 py-3 font-medium text-[#393939]">Title</th>
              <th className="px-4 py-3 font-medium text-[#393939]">Created</th>
              <th className="px-4 py-3 font-medium text-[#393939]">Updated</th>
              <th className="px-4 py-3 font-medium text-[#393939] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e1e1]">
            {posts.map((post) => (
              <tr key={post.id} className="bg-white hover:bg-[#f4f4f4]">
                <td className="px-4 py-3 text100 font-medium">{post.title}</td>
                <td className="px-4 py-3 text100 text-[#393939]">
                  {post.createdAt ? formatDate(post.createdAt) : "N/A"}
                </td>
                <td className="px-4 py-3 text100 text-[#393939]">
                  {post.updatedAt ? formatDate(post.updatedAt) : "N/A"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditPost(post.id)}
                    className="text-[#1f77ff] hover:bg-[#e6f0ff] hover:text-[#1f77ff]"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit {post.title}</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
