import { notFound } from "next/navigation"
import BlogDetailClient from "./BlogDetailClient"
import { getBlogById, getPublishedBlogs } from "@/lib/cms/store"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogs()
  return posts.map((post) => ({ id: post.id }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params
  const post = await getBlogById(id)

  if (!post || !post.published) {
    notFound()
  }

  return <BlogDetailClient blogId={id} staticPost={post} />
}
