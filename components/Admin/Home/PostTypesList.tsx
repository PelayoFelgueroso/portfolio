"use client";

import { Loader2, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostType {
  id: string;
  slug: string;
  name: string;
}

interface PostTypesListProps {
  postTypes: PostType[];
  isLoading: boolean;
  onDeleteClick: (id: string) => void;
}

export function PostTypesList({
  postTypes,
  isLoading,
  onDeleteClick,
}: PostTypesListProps) {
  return (
    <Card className="bg-white border-[#e1e1e1]">
      <CardHeader>
        <CardTitle className="text300">Available Post Types</CardTitle>
        <CardDescription className="text100 text-[#949596]">
          Manage your existing content types
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
          </div>
        ) : postTypes.length === 0 ? (
          <EmptyState />
        ) : (
          <PostTypesTable postTypes={postTypes} onDeleteClick={onDeleteClick} />
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-[#e1e1e1] p-3 mb-4">
        <Tag className="h-6 w-6 text-[#393939]" />
      </div>
      <h3 className="text200 mb-2">No Post Types Found</h3>
      <p className="text100 text-[#949596] max-w-md">
        Create your first post type to start organizing your content
      </p>
    </div>
  );
}

function PostTypesTable({
  postTypes,
  onDeleteClick,
}: {
  postTypes: PostType[];
  onDeleteClick: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-[#e1e1e1]">
      <table className="w-full text-left">
        <thead className="bg-[#f4f4f4] text100">
          <tr>
            <th className="px-4 py-3 font-medium text-[#393939]">Name</th>
            <th className="px-4 py-3 font-medium text-[#393939]">Slug</th>
            <th className="px-4 py-3 font-medium text-[#393939] text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e1e1e1]">
          {postTypes.map((postType) => (
            <tr key={postType.id} className="bg-white hover:bg-[#f4f4f4]">
              <td className="px-4 py-3 text100">
                <a
                  href={`/admin/${postType.slug}`}
                  className="font-medium text-[#1f77ff] hover:underline"
                >
                  {postType.name}
                </a>
              </td>
              <td className="px-4 py-3 text100 text-[#393939]">
                {postType.slug}
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteClick(postType.id)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete {postType.name}</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
