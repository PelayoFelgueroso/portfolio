import type {
  Post,
  Category,
  MetaField,
  PostEditInput,
  UploadResult,
} from "@/schemas/edit-post.schema";

export async function fetchPost(
  postTypeSlug: string,
  postId: string,
): Promise<Post> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export async function fetchCategories(
  postTypeSlug: string,
): Promise<Category[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function fetchMetaFields(
  postTypeSlug: string,
): Promise<MetaField[]> {
  const res = await fetch(`/api/admin/${postTypeSlug}/meta`);

  if (!res.ok) {
    throw new Error("Failed to fetch meta fields");
  }

  return res.json();
}

export async function updatePost(
  postTypeSlug: string,
  postId: string,
  data: PostEditInput,
): Promise<Post> {
  const res = await fetch(`/api/admin/${postTypeSlug}/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update post");
  }

  return res.json();
}

export async function getSignature(folder: string) {
  const sigRes = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });

  if (!sigRes.ok) throw new Error("No se pudo firmar la subida");

  return sigRes.json() as Promise<{
    signature: string;
    timestamp: number;
    folder: string;
    apiKey: string;
    cloudName: string;
  }>;
}

/**
 * Infers the Cloudinary resource type based on the file's MIME type
 */
function inferResourceType(file: File): "image" | "video" | "raw" {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return "raw";
}

/**
 * Generic function to upload any file type to Cloudinary with optional progress tracking
 * @param file - The file to upload
 * @param options - Upload options
 * @param options.folder - Cloudinary folder path (default: "uploads")
 * @param options.resourceType - Override automatic resource type detection
 * @param options.onProgress - Callback for upload progress (0-100)
 * @returns Promise with upload result containing secure_url and public_id
 */
export async function uploadToCloudinary(
  file: File,
  options: {
    folder?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
    onProgress?: (percent: number) => void;
  } = {},
): Promise<UploadResult> {
  const {
    folder = "uploads",
    resourceType = "auto",
    onProgress,
  } = options;

  return new Promise(async (resolve, reject) => {
    try {
      const { signature, timestamp, folder: signedFolder, apiKey, cloudName } =
        await getSignature(folder);

      const detectedType = resourceType === "auto" ? inferResourceType(file) : resourceType;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", signedFolder);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/${detectedType}/upload`,
      );

      // Track upload progress if callback provided
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(formData);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @returns Promise with upload result
 */
export async function uploadFile(file: File): Promise<UploadResult> {
  return uploadToCloudinary(file, { folder: "images", resourceType: "image" });
}

/**
 * Upload a video file to Cloudinary with progress tracking
 * @param file - The video file to upload
 * @param onProgress - Callback for upload progress (0-100)
 * @returns Promise with upload result
 */
export function uploadVideoToCloudinary(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadResult> {
  return uploadToCloudinary(file, {
    folder: "videos",
    resourceType: "video",
    onProgress,
  });
}

export async function deleteFile(publicId: string): Promise<void> {
  const res = await fetch(`/api/upload`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_id: publicId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete file");
  }
}
