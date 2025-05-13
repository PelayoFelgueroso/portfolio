"use client";

import { FileText, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Post } from "@/schemas/create-post.schema";
import { EmptyState } from "@/components/Admin/common/EmptyState";

interface Props {
  posts: Post[];
  isLoading: boolean;
  onDeleteClick: (id: string) => void;
  postTypeSlug: string;
}

export const PostsList = ({
  posts,
  isLoading,
  onDeleteClick,
  postTypeSlug,
}: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-6 w-6 text-[#393939]" />}
        heading="No Posts Found"
        content="Create your first post to start adding content"
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-md">
      <table className="w-full text-left">
        <thead className="bg-[#f4f4f4] text100">
          <tr>
            <th className="px-4 py-3 font-medium text-[#393939]">Title</th>
            <th className="px-4 py-3 font-medium text-[#393939]">Slug</th>
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
              <td className="px-4 py-3 text100">
                <a
                  href={`/admin/${postTypeSlug}/${post.id}`}
                  className="font-medium text-[#1f77ff] hover:underline"
                >
                  {post.title}
                </a>
              </td>
              <td className="px-4 py-3 text100 text-[#393939]">{post.slug}</td>
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
                  onClick={() => onDeleteClick(post.id)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete {post.title}</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
