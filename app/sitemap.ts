import type { MetadataRoute } from "next"
import { getPublishedBlogs, getPublishedPortfolio } from "@/lib/cms/store"
import { PUBLIC_ROUTES, absoluteUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, portfolio] = await Promise.all([getPublishedBlogs(), getPublishedPortfolio()])

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date("2025-06-01"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: absoluteUrl(`/blog/${post.id}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const portfolioEntries: MetadataRoute.Sitemap = portfolio.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.id}`),
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...portfolioEntries]
}
