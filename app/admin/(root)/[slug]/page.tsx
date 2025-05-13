"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EditPostTypePage } from "@/components/Admin/EditPostType/EditPostTypePage";

export default function PostTypePage() {
  const { slug } = useParams() as { slug: string };
  const [postTypeTitle, setPostTypeTitle] = useState("");

  useEffect(() => {
    const fetchPostTypeName = async () => {
      try {
        const res = await fetch(`/api/admin/post-types?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPostTypeTitle(data.name || slug);
        }
      } catch (error) {
        console.error("Failed to fetch post type name:", error);
      }
    };

    fetchPostTypeName();
  }, [slug]);

  return <EditPostTypePage slug={slug} postTypeTitle={postTypeTitle} />;
}
