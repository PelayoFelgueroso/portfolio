"use client";

import type React from "react";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JsonValue } from "@prisma/client/runtime/library";

interface AddPostTypeFormProps {
  onAddPostType: (name: string) => Promise<{
    meta: JsonValue | null;
    name: string;
    slug: string;
    id: string;
    createdAt: Date;
  }>;
}

export function AddPostTypeForm({ onAddPostType }: AddPostTypeFormProps) {
  const [newPostType, setNewPostType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostType.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddPostType(newPostType);
      setNewPostType("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white border-[#e1e1e1]">
      <CardHeader>
        <CardTitle className="text300">Add New Post Type</CardTitle>
        <CardDescription className="text100 text-[#949596]">
          Create a new content type for your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <Label htmlFor="new-post-type" className="text100 mb-2 block">
              Post Type Name
            </Label>
            <Input
              id="new-post-type"
              type="text"
              value={newPostType}
              onChange={(e) => setNewPostType(e.target.value)}
              placeholder="e.g. Blog, Products, Services"
              className="border-[#e1e1e1] focus:border-[#1f77ff] focus:ring-[#1f77ff]"
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            className="bg-[#1f77ff] hover:bg-[#1f77ff]/90 text-white"
            disabled={isSubmitting || !newPostType.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Post Type
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
