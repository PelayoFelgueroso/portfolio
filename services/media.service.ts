export const fetchMediaUrls = async (
  mediaIds: number[]
): Promise<Record<number, string>> => {
  if (mediaIds.length === 0) return {};

  const mediaRequests = mediaIds.map(async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}media/${id}`,
        {
          cache: "force-cache",
          next: { revalidate: 3600 },
        }
      );
      if (!res.ok) return { id, url: "" };
      const data = await res.json();
      return { id, url: data.source_url || "" };
    } catch (error) {
      console.error(`Error obtaining image for ID ${id}`, error);
      return { id, url: "" };
    }
  });

  const results = await Promise.all(mediaRequests);

  return results.reduce((acc, item) => {
    if (item && item.id) {
      acc[item.id] = item.url;
    }
    return acc;
  }, {} as Record<number, string>);
};
