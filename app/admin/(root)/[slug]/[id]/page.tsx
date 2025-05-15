"use client";

import PostEditPage from "@/components/Admin/EditPost/EditPostPage";
import { useParams } from "next/navigation";

export default function EditPostPage() {
  const { slug, id } = useParams() as { slug: string; id: string };

  return <PostEditPage slug={slug} id={id} />;
}
