import { notFound } from "next/navigation"
import BlogDetailClient from "./BlogDetailClient"
import { getAllBlogPostIds, getBlogPostById } from "@/lib/landing-blog-posts"

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllBlogPostIds().map((id) => ({ id }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params
  const post = getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return <BlogDetailClient blogId={id} staticPost={post} />
}
