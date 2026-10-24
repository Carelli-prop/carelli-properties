import type { MetadataRoute } from "next";
import { apartments } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://carelli-properties.vercel.app";
  const now = new Date();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${base}/book-a-viewing`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    ...apartments.map((a) => ({
      url: `${base}/apartments/${a.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    })),
  ];
}
