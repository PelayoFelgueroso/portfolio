"use client";

import { ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Category } from "@/schemas/category.schema";
import type { Post } from "@/schemas/create-post.schema";
import { CategoryPostsList } from "./CategoryPostList";

interface CategoryItemProps {
  category: Category;
  isExpanded: boolean;
  posts: Post[] | undefined;
  postsLoading: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  formatDate: (dateString: string) => string;
  onEditPost: (postId: string) => void;
}

export function CategoryItem({
  category,
  isExpanded,
  posts,
  postsLoading,
  onToggle,
  onEdit,
  onDelete,
  formatDate,
  onEditPost,
}: CategoryItemProps) {
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggle}
      className="border border-[#e1e1e1] rounded-md overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 bg-[#f8f8f8]">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle category</span>
            </Button>
          </CollapsibleTrigger>
          <h3 className="text200 font-medium">{category.name}</h3>
          {posts && (
            <Badge
              variant="outline"
              className="ml-2 bg-[#f0f0f0] text-[#393939]"
            >
              {posts.length} posts
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-[#1f77ff] hover:bg-[#e6f0ff] hover:text-[#1f77ff]"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit {category.name}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete {category.name}</span>
          </Button>
        </div>
      </div>
      <CollapsibleContent>
        <div className="p-4 border-t border-[#e1e1e1]">
          <CategoryPostsList
            posts={posts}
            isLoading={postsLoading}
            formatDate={formatDate}
            onEditPost={onEditPost}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
