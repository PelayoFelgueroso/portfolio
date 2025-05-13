"use client";

import { useParams } from "next/navigation";
import { ContentPage } from "@/components/Admin/ContentPage/ContentPage";

export default function PostContentPage() {
  const { slug, id } = useParams() as { slug: string; id: string };

  return <ContentPage slug={slug} id={id} />;
}
