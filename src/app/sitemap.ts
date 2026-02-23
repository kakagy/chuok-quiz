import type { MetadataRoute } from "next";
import { getAllCategories } from "@/lib/quiz";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getAllCategories();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://chuokquiz.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/daily`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categories.map((cat) => ({
      url: `${baseUrl}/quiz/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
