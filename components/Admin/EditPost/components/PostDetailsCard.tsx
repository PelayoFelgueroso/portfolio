"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Post, Category } from "@/schemas/edit-post.schema";

interface Props {
  post: Post;
  title: string;
  setTitle: (title: string) => void;
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  categories: Category[];
  selectedCategory: Category | null;
  formatDate: (dateString: string) => string;
}

export const PostDetailsCard = ({
  post,
  title,
  setTitle,
  categoryId,
  setCategoryId,
  categories,
  selectedCategory,
  formatDate,
}: Props) => {
  return (
    <Card className="bg-white border-[#e1e1e1]">
      <CardHeader>
        <CardTitle className="text300">Post Details</CardTitle>
        <CardDescription className="text100 text-[#949596]">
          Basic information about the post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-[#393939]">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {post.createdAt ? formatDate(post.createdAt) : "N/A"}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span>{" "}
            {post.updatedAt ? formatDate(post.updatedAt) : "N/A"}
          </div>
          <div>
            <span className="font-medium">Slug:</span> {post.slug}
          </div>
          <div>
            <span className="font-medium">ID:</span> {post.id}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text100">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="border-[#e1e1e1]"
            />
          </div>

          {categories.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="category" className="text100">
                Category
              </Label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                defaultValue={categoryId}
              >
                <SelectTrigger
                  id="category"
                  className="border-[#e1e1e1] bg-white"
                >
                  <SelectValue placeholder="Select a category">
                    {selectedCategory
                      ? selectedCategory.name
                      : "Select a category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e1e1e1]">
                  <SelectItem value="none">None</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
