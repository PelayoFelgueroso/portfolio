"use client";

import { EditPostPage } from "@/components/Admin/EditPost/EditPostPage";
import { useParams } from "next/navigation";

export default function PostEditPage() {
  const { slug, id } = useParams() as { slug: string; id: string };

  return <EditPostPage slug={slug} id={id} />;
}
