import BlogPageClient from "./BlogPageClient"
import { getActiveBlogFilters, getPublishedBlogs } from "@/lib/cms/store"

export default async function BlogPage() {
  const [posts, filters] = await Promise.all([getPublishedBlogs(), getActiveBlogFilters()])
  return <BlogPageClient posts={posts} filters={filters} />
}
