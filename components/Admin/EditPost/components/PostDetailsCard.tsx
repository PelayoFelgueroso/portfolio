"use client";

import { useFormContext } from "react-hook-form";
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
import type { Post, Category, PostEditInput } from "@/schemas/edit-post.schema";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface PostDetailsCardProps {
  post: Post;
  categories: Category[];
  selectedCategory: Category | null;
  formatDate: (dateString: string) => string;
}

export function PostDetailsCard({
  post,
  categories,
  selectedCategory,
  formatDate,
}: PostDetailsCardProps) {
  const { control, setValue } = useFormContext<PostEditInput>();

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
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title" className="text100">
                  Title
                </Label>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    className="border-[#e1e1e1]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {categories.length > 0 && (
            <FormField
              control={control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="category" className="text100">
                    Category
                  </Label>
                  <Select
                    value={field.value?.[0] || "none"}
                    onValueChange={(value) => {
                      setValue("categoryIds", value === "none" ? [] : [value], {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <FormControl>
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
                    </FormControl>
                    <SelectContent className="bg-white border-[#e1e1e1]">
                      <SelectItem value="none">None</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
