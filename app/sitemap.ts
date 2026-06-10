import type { MetadataRoute } from "next"
import { BLOG_POSTS } from "@/lib/landing-blog-posts"
import { PORTFOLIO_LIST } from "@/lib/landing-portfolio-seo"
import { PUBLIC_ROUTES, absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date("2025-06-01"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.id}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const portfolioEntries: MetadataRoute.Sitemap = PORTFOLIO_LIST.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.id}`),
    lastModified: new Date("2025-06-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...portfolioEntries]
}
